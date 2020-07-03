import { oak } from "./lib.ts";
import { Controller } from "./server/controller.ts";
import { chatView } from './chat.ts';
import { SocketServer } from "https://deno.land/x/sockets@master/mod.ts";

// import { serveTLS, listenAndServeTLS } from "https://deno.land/std/http/server.ts";

const options = {
  // secure: true,
  // port: 443,
  port: 80,
  // certFile: "/etc/letsencrypt/live/lattemall.company/fullchain.pem",
  // keyFile: "/etc/letsencrypt/live/lattemall.company/privkey.pem",
};

const optionsWS = {
  secure: true,
  port: 8080,
  // port: 80
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
  .post("/api/v1.0/post/list", Ctr.list)
  .post("/api/v1.0/post/list/title", Ctr.listByTitle)
  .post("/api/v1.0/post/upload", Ctr.upload)
  // .post("/api/v1.0/post/post", Ctr.post);
  .get('/chat', chatView)
  // .get('/ws', handleSocket);


const __dirname = new URL('.', import.meta.url).pathname;
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx: any) => {

  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        // case Status.NotFound:
        //   console.log("Handle NotFound statuses : ");
        //   console.log(err);
        //   break;
        default:
          console.log("Handle other statuses : ");
          console.log(err);
          // handle other statuses
      }
    } else {
      console.log("Rethrow if you can't handle the error : ");
      console.log(err);
      // rethrow if you can't handle the error
      throw err;
    }
  }
});

app.use(async (ctx: any, next) => {
  
  if(!ctx.request.secure) {

    return ctx.response.redirect(['https://', ctx.request.url.host, ctx.request.url.pathname].join());
  }
  next();

});

app.addEventListener("error", (evt) => {
  console.log(`Error Event : ${evt.error}`);
});


const main = async function () {

// // websocket serve
// const socketServer = new SocketServer();
// socketServer.run(optionsWS)
// socketServer.on("connection", function (ws: any) {

// 	ws.on("message", function (message: string) {

// 		console.log(message);
// 		//ws.send(message);

// 		// broadcast message
// 		socketServer.clients.forEach(function each(client:any) {
// 			if (!client.isClosed) {
// 				client.send(message);
// 			}
// 		});

// 	});

// });


  console.log("Server Up!");
  console.log(__dirname)
  app.listen(options);
};



// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";

async function handleWs(sock: WebSocket) {
  console.log("socket connected!");
  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        // text message
        console.log("ws:Text", ev);
        await sock.send(ev);
      } else if (ev instanceof Uint8Array) {
        // binary message
        console.log("ws:Binary", ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        // ping
        console.log("ws:Ping", body);
      } else if (isWebSocketCloseEvent(ev)) {
        // close
        const { code, reason } = ev;
        console.log("ws:Close", code, reason);
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  }
}

main();


  /** websocket echo server */
  const port = "8080";
  console.log(`websocket server is running on :${port}`);
  for await (const req of serve(`:${port}`)) {
    const { conn, r: bufReader, w: bufWriter, headers } = req;
    acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })
      .then(handleWs)
      .catch(async (err) => {
        console.error(`failed to accept websocket: ${err}`);
        await req.respond({ status: 400 });
      });
  }



