import { multiParser } from "../lib.ts";
import { UserService } from "./services/userService.ts";
import { PostService } from "./services/postService.ts";
const User = new UserService();
const Post = new PostService();

class Controller {
  async login(context: any) {
    const result = await context.request.body();
    const { email, password } = result.value;
    var userDb: any;
    try {
      userDb = await User.getUserByEmail(email);
    } catch (e) {
      console.log(`UserController.login=>${e}`);
    }

    if (password === userDb.password) {
      console.log(`${userDb.name} Login success!`);
      context.cookies.set("email", `${userDb.email}`);
      context.response.headers.set("Content-Type", "application/json");
      context.response.body = { "message": "success" };
    } else {
      console.log(`${userDb.name} Login failed..`);
    }
  }

  async signup(context: any) {
    const result = await context.request.body();
    const user = result.value;
    try {
      await User.createUser(user);
      console.log(`${user.name} Signup success!`);
      context.cookies.set("email", `${user.email}`);
      context.response.headers.set("Content-Type", "application/json");
      context.response.body = { "message": "success" };
    } catch (e) {
      console.log(`UserController.signup=>${e}`);
      console.log(`${user.name} Signup failed..`);
    }
  }

  async upload(context: any, next: any) {
    // const form:any = await multiParser.multiParser(context.request.serverRequest)
    try {
      const { photo } = context.uploadedFiles;
      const { filename, type, size, data } = photo;
      var today = new Date();
      const fsn = `${today.getTime()}--${filename}`;
      Deno.writeFile(`./public/file/img/${fsn}.jpeg`, data);
      console.log(context.uploadedFiles);
      context.response.headers.set("Content-Type", "application/json");
      context.response.body = { "data": fsn };
    } catch (e) {
      console.log(`UserController.upload=>${e}`);
    }
  }

  async post(context: any) {
    try {
      const result = await context.request.body();
      const { product, detail, price, photo } = result.value;
      const userDb = await User.getUserByEmail(context.cookies.get("email"));
      const post = {
        owner: userDb.name,
        email: userDb.email,
        product: product,
        groups: "xxbrand",
        detail: detail,
        price: price,
        photo: photo,
      };
      await Post.createPost(post);
      context.response.headers.set("Content-Type", "application/json");
      console.log(post);
      context.response.body = post;
    } catch (e) {
      console.log(`UserController.upload=>${e}`);
    }
  }

  async profile(context: any) {
    const userEmail: string = context.cookies.get("email");
    var userDb: any;
    if (userEmail != undefined && userEmail != "") {
      userDb = await User.getUserByEmail(userEmail);
      console.log(`${userDb.name} Profile success!`);
      context.response.headers.set("Content-Type", "appilcation/json");
      context.response.body = { "data": userDb };
    } else {
      console.log(`Profile failed..`);
    }
  }

  async logout(context: any) {
    console.log("Logout success!");
    context.cookies.set("email", "");
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { "message": "success" };
  }

  async list(context: any) {
    const postsDb = await Post.getAllPosts();
    context.response.headers.set("Content-Type", "appilcation/json");
    context.response.body = { "data": postsDb };
  }
}
export { Controller };
