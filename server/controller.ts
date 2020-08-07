import { UserService } from "./services/userService.ts";
// import { PostService } from "./services/postService.ts";
import { ShopeeService } from "./services/shopeeService.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts';
import { Keyword } from "../model/keywordModel.ts";
import { Post } from "../model/postModel.ts";
import { Feed } from "../model/feedModel.ts";

const User = new UserService();
// const Post = new PostService();
const Shopee = new ShopeeService();

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
//   async upload(context:any) {
//     // const form:any = await multiParser.multiParser(context.request.serverRequest)

//       const userEmail = context.cookies.get("email");
//       if(userEmail){
//         try {
//       const uuid = new ShortUniqueId();
//       const dts = uuid(12)
//       const result = await context.request.body(
//  {       contentTypes: {
//           json: ['application/json'],
//           form: ['multipart', 'urlencoded'],
//           text: ['text']
//         }}
//       );
//       console.log(result.type)
//       var obj
//       if(result.type === 'form-data'){
//         obj = await result.value.read()
//       console.log(obj)
//       }
//       console.log(obj.fields.product)

//       const fsn = obj.files[0].filename.split('/')[3]//aws:3 //local:1
//       console.log(fsn)
//       // await Deno.writeFile(`./public/file/img/${fsn}`, context.uploadedFiles['photo']['data']);
//       // await Deno.remove(`./${context.uploadedFiles['photo']['tempfile']}`);
//       // context.respond = false;
//       await Deno.copyFile(`${obj.files[0].filename}`, `./public/file/img/${fsn}`);
//       const userDb = await User.getUserByEmail(context.cookies.get("email"));
//       const post = {
//         owner: userDb.name,
//         email: userDb.email,
//         product: obj.fields.product,
//         groups: obj.fields.groups,
//         detail: obj.fields.detail,
//         price: obj.fields.price,
//         photo: fsn,
//       };
      
//       await Post.createPost(post);
//       console.log(post)
//       context.response.headers.set("Content-Type", "application/json");
//       context.response.body = {"message": "success"};
//       // context.respond = true;
//     } catch (e) {
//       console.log(`UserController.upload=>${e}`);
//     }
//   }
//   }



  async profile(context:any) {
    const userEmail = context.cookies.get("email");
    const ruserName = context.cookies.get("ruserName");
    var userDb;
    if (userEmail) {
      userDb = await User.getUserByEmail(userEmail);
      console.log(`${userDb.name} Profile success!`);
      context.response.headers.set("Content-Type", "appilcation/json");
      context.response.body = { "data": userDb , "ruserName": ruserName};
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

  // async list(context:any) {
  //   const postsDb = await Post.getAllPosts();
  //   context.response.headers.set("Content-Type", "appilcation/json");
  //   context.response.body = { "data": postsDb };
  // }


  // async listById(context:any) {

  //   const result = await context.request.body(
  //   {       
  //     contentTypes: {
  //             json: ['application/json'],
  //             form: ['multipart', 'urlencoded'],
  //             text: ['text']
  //           }}
  //         );
  //     var obj
  //       if(result.type === 'form-data'){
  //           obj = await result.value.read()
  //         }
  //         const id = obj.fields.term;
  //         console.log(id)

  //         const postsDb = await Post.getPostsById(id);
  //         context.response.headers.set("Content-Type", "appilcation/json");
  //         context.response.body = { "data": postsDb };
  //         console.log({postsDb})
  // }

  // async listByTerm(context:any) {

  //   const result = await context.request.body(
  //     {       contentTypes: {
  //              json: ['application/json'],
  //              form: ['multipart', 'urlencoded'],
  //              text: ['text']
  //            }}
  //          );
  //         //  console.log(result.type)
  //          var obj
  //          if(result.type === 'form-data'){
  //            obj = await result.value.read()
  //         //  console.log(obj)
  //          }
  //          const term = obj.fields.term;
  //          console.log(term)

  //   const postsDb = await Post.getPostsByTerm(term);
  //   context.response.headers.set("Content-Type", "appilcation/json");
  //   context.response.body = { "data": postsDb };
  //   console.log({postsDb})
  // }

  async shopeeSearch(ctx:any){

    const result = await ctx.request.body(
      {       contentTypes: {
               json: ['application/json'],
               form: ['multipart', 'urlencoded'],
               text: ['text']
             }}
           );
           var obj
           if(result.type === 'form-data'){
             obj = await result.value.read()
           }
           const word:string = obj.fields.term;
           console.log(word)

    var keywordData:Keyword[];
    var keyword:Keyword;
    keywordData = await Shopee.getKeywordData(word);
    
    var posts:Post[];
    if(keywordData.length===1){
      //Not firt search
      keyword = keywordData[0];
      console.log({keyword});

      if(await Shopee.checkNeedUpdate(keyword.LastSearchTime)){
        //Old enough to update, then update Keyword Table
        posts = await Shopee.fetchShopeeData(word);
        
        for(var i=0; i<posts.length;i++){
          const checkPost = await Shopee.getPostByItemIdAndShopId(posts[i].ItemId, posts[i].ShopId);
          if(checkPost.length === 0){
            await Shopee.createPost(posts[i]);
            const feed:Feed = {KeywordId:keyword.KeywordId,PostId:posts[i].PostId}
            await Shopee.createFeed(feed);
          }
        }

        var avgPrice = 0.0;
        for(var i=0; i<posts.length;i++){
          avgPrice+=posts[i].Price;
        }
  
        // const keywordId = v4.generate();
        const currentTime:number = new Date().getTime();
        const updateSearchCount = keyword.SearchCount+1
        const updateKeyword:Keyword = {...keyword, SearchCount:updateSearchCount,AvgPrice:avgPrice,LastSearchTime:currentTime};
        await Shopee.updateKeyword(updateKeyword);

        posts = await Shopee.getFeedPosts(keyword.KeywordId);
        console.log(posts.length);

      }else{
        //Just get feed because it's newly generated
        posts = await Shopee.getFeedPosts(keyword.KeywordId);
      }
    }else{
      //First time search

      const keywordId = v4.generate();
      const currentTime:number = new Date().getTime();


      posts = await Shopee.fetchShopeeData(word);
      console.log(posts.length);
      for(var i=0; i<posts.length;i++){
        const checkPost = await Shopee.getPostByItemIdAndShopId(posts[i].ItemId, posts[i].ShopId);
        if(checkPost.length === 0){
        await Shopee.createPost(posts[i]);
        console.log(posts[i].Title);
        const feed:Feed = {KeywordId:keywordId,PostId:posts[i].PostId}
        await Shopee.createFeed(feed);
        console.log(feed.PostId);
        }
      }

      var avgPrice = 0.0;
      for(var i=0; i<posts.length;i++){
        avgPrice+=(posts[i].Price/100000.0);
      }
      console.log(avgPrice);
      keyword = { KeywordId:keywordId, Content:word, SearchCount:1,AvgPrice:avgPrice,LastSearchTime:currentTime};
      await Shopee.createKeyword(keyword);
      console.log(keyword.KeywordId);
      console.log(keyword.Content);
      console.log(keyword.SearchCount);
      console.log(keyword.LastSearchTime);
      posts = await Shopee.getFeedPosts(keyword.KeywordId);
      console.log(posts.length);

    }



    ctx.response.headers.set("Content-Type", "appilcation/json");
    ctx.response.body = { "data": posts };
    console.log({posts})

  }
}
export { Controller };
