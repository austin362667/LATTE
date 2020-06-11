import { oak, upload_middleware_for_oak_framework } from "./lib.ts";
import { Controller } from "./server/controller.ts";

const Application = oak.Application;
const Router = oak.Router;
const isHttpError = oak.isHttpError;
const Status = oak.Status;
const send = oak.send;
const uploader = upload_middleware_for_oak_framework.upload
const Ctr = new Controller();

const router = new Router();
router
  .post("/api/v1.0/user/profile", Ctr.profile)
  .post("/api/v1.0/user/login", Ctr.login)
  .post("/api/v1.0/user/logout", Ctr.logout)
  .post("/api/v1.0/user/signup", Ctr.signup)
  .post("/api/v1.0/post/list", Ctr.list)
  .post(
    "/api/v1.0/post/upload",
    uploader('uploads', ["jpeg", "jpg", "png"], 20000000, 10000000,true, false, true, true),
    Ctr.upload,
  )
  .post("/api/v1.0/post/post", Ctr.post);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx: any) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}`,
    index: "/public/index.html",
  });
});
// app.use(async (ctx: any) => {
//   if(ctx.request.url.pathname.split('/')[0] === "uploads"){
//   await send(ctx, ctx.request.url.pathname, {
//     root: `${Deno.cwd()}/`,
//   }});
// });
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          console.log("Handle NotFound statuses : ");
          console.log(err);
          break;
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

app.addEventListener("error", (evt) => {
  console.log(`Error Event : ${evt.error}`);
});

const main = async function () {
  console.log(`${Deno.cwd()}`)
  console.log("Server Up!");
  await app.listen({ port: 80 });
};

main();
