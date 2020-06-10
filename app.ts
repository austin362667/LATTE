import { abc } from "./lib.ts";
import { Controller } from "./server/controller.ts";

// const Application = oak.Application;
// const Router = oak.Router;
// const isHttpError = oak.isHttpError;
// const Status = oak.Status;
// const send = oak.send;

const Ctr = new Controller();

// const router = new Router();
const app = new abc.Application();

app
  .post("/api/v1.0/user/profile", Ctr.profile)
  .post("/api/v1.0/user/login", Ctr.login)
  .post("/api/v1.0/user/logout", Ctr.logout)
  .post("/api/v1.0/user/signup", Ctr.signup)
  .post("/api/v1.0/post/list", Ctr.list)
  .post("/api/v1.0/post/upload", Ctr.upload)
  .static("/", `${Deno.cwd()}/public/index.html`);

// const app = new Application();
// app.use(router.routes());
// app.use(router.allowedMethods());
// app.use(async (ctx:any) => {
//   await send(ctx, ctx.request.url.pathname, {
//     root: `${Deno.cwd()}/public`,
//     index: "index.html",
//   });
// });
// app.use(async (context, next) => {
//   try {
//     await next();
//   } catch (err) {
//     if (isHttpError(err)) {
//       switch (err.status) {
//         case Status.NotFound:
//           console.log("Handle NotFound statuses : ")
//           console.log(err)
//           break;
//         default:
//           console.log("Handle other statuses : ")
//           console.log(err)
//         // handle other statuses
//       }
//     } else {
//       console.log("Rethrow if you can't handle the error : ")
//       console.log(err)
//       // rethrow if you can't handle the error
//       throw err;
//     }
//   }
// });

// app.addEventListener("error", (evt) => {
//   console.log(`Error Event : ${evt.error}`);
// });

const main = async function () {
  console.log("Server Up!");
  await app.start({ port: 8000 });
};

main();
