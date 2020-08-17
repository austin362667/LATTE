import { oak } from "./lib.ts";
import { Controller } from "./server/controller.ts";
import { chatView } from './chat.ts';
import { WebSocket, WebSocketServer } from "https://deno.land/x/websocket/mod.ts";


const options = {
  secure: true,
  port: 443,
  // port: 80,
  certFile: "/etc/letsencrypt/live/lattemall.company/fullchain.pem",
  keyFile: "/etc/letsencrypt/live/lattemall.company/privkey.pem",
};


const Application = oak.Application;
const Router = oak.Router;
const isHttpError = oak.isHttpError;
const Status = oak.Status;
const send = oak.send;
const Ctr = new Controller();

const router = new Router();
router
  .post("/api/v1.0/user/profile", Ctr.profile)
  .post("/api/v1.0/user/login", Ctr.login)
  .post("/api/v1.0/user/logout", Ctr.logout)
  .post("/api/v1.0/user/signup", Ctr.signup)
  // .post("/api/v1.0/post/list", Ctr.list)
  .post("/api/v1.0/post/list/title", Ctr.shopeeSearch)
  // .post("/api/v1.0/post/upload", Ctr.upload)
  // .post("/api/v1.0/post/list/id", Ctr.listById)
  .get('/chat', chatView)
  // .get('/ws', handleSocket);


const __dirname = new URL('.', import.meta.url).pathname;
const app = new Application();
app.use(async (ctx: any) => {
  if(!ctx.request.secure) {

    return ctx.response.redirect(['https://lattemall.company/', ctx.request.url.pathname].join());
  }
});
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx: any) => {

  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});
// app.use(async (context, next) => {
//   try {
//     await next();
//   } catch (err) {
//     if (isHttpError(err)) {
//       switch (err.status) {
//         // case Status.NotFound:
//         //   console.log("Handle NotFound statuses : ");
//         //   console.log(err);
//         //   break;
//         default:
//           console.log("Handle other statuses : ");
//           console.log(err);
//           // handle other statuses
//       }
//     } else {
//       console.log("Rethrow if you can't handle the error : ");
//       console.log(err);
//       // rethrow if you can't handle the error
//       throw err;
//     }
//   }
// });

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );
});

app.addEventListener("error", (evt) => {
  console.log(`Error Event : ${evt.error}`);
});


const main = async function () {

// websocket serve
const wss = new WebSocketServer(8080);
wss.on("connection", function (ws: WebSocket) {

	ws.on("message", function (message: string) {

		console.log(message);
		//ws.send(message);

		// broadcast message
		wss.clients.forEach(function each(client) {
			if (!client.isClosed) {
				client.send(message);
			}
		});

	});

});


  console.log("Server Up!");
  console.log(__dirname)
  app.listen(options);
};

main();
