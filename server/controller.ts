import { UserService } from "./services/userService.ts";
import { PostService } from "./services/postService.ts";
import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts';

const User = new UserService();
const Post = new PostService();

class Controller {
  async login(context:any) {
    const result = await context.request.body();
    const { email, password } = result.value;
    var userDb;
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

  async signup(context:any) {
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
  async upload(context:any) {
    // const form:any = await multiParser.multiParser(context.request.serverRequest)
    try {
      const uuid = new ShortUniqueId();
      const dts = uuid(12)
      const result = await context.request.body(
 {       contentTypes: {
          json: ['application/json'],
          form: ['multipart', 'urlencoded'],
          text: ['text']
        }}
      );
      console.log(result.type)
      var obj
      if(result.type === 'form-data'){
        obj = await result.value.read()
      console.log(obj)
      }
      console.log(obj.fields.product)

      const fsn = obj.files[0].filename.split('/')[3]//aws:3 //local:1
      console.log(fsn)
      // await Deno.writeFile(`./public/file/img/${fsn}`, context.uploadedFiles['photo']['data']);
      // await Deno.remove(`./${context.uploadedFiles['photo']['tempfile']}`);
      // context.respond = false;
      await Deno.copyFile(`${obj.files[0].filename}`, `./public/file/img/${fsn}`);
      const userDb = await User.getUserByEmail(context.cookies.get("email"));
      const post = {
        owner: userDb.name,
        email: userDb.email,
        product: obj.fields.product,
        groups: obj.fields.groups,
        detail: obj.fields.detail,
        price: obj.fields.price,
        photo: fsn,
      };
      
      await Post.createPost(post);
      console.log(post)
      context.response.headers.set("Content-Type", "application/json");
      context.response.body = {"message": "success"};
      // context.respond = true;
    } catch (e) {
      console.log(`UserController.upload=>${e}`);
    }
  }



  async profile(context:any) {
    const userEmail = context.cookies.get("email");
    var userDb;
    if (userEmail != undefined && userEmail != "") {
      userDb = await User.getUserByEmail(userEmail);
      console.log(`${userDb.name} Profile success!`);
      context.response.headers.set("Content-Type", "appilcation/json");
      context.response.body = { "data": userDb };
    } else {
      console.log(`Profile failed..`);
    }
  }

  async logout(context:any) {
    console.log("Logout success!");
    context.cookies.set("email", "");
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = { "message": "success" };
  }

  async list(context:any) {
    const postsDb = await Post.getAllPosts();
    context.response.headers.set("Content-Type", "appilcation/json");
    context.response.body = { "data": postsDb };
  }

  async listByTitle(context:any) {

    const result = await context.request.body(
      {       contentTypes: {
               json: ['application/json'],
               form: ['multipart', 'urlencoded'],
               text: ['text']
             }}
           );
           console.log(result.type)
           var obj
           if(result.type === 'form-data'){
             obj = await result.value.read()
           console.log(obj)
           }
           const term = obj.fields.term;
           console.log(term)

    const postsDb = await Post.getPostsByTtile(term);
    context.response.headers.set("Content-Type", "appilcation/json");
    context.response.body = { "data": postsDb };
  }
}
export { Controller };
