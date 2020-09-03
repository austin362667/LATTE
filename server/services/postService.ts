import { PostRepository } from "../repositories/postRepository.ts";
import { Post } from "../../model/postModel.ts";
const Post = new PostRepository();

class PostService {
  createPost = async (post: any) => {
    const r = await Post.create(post);
    return r;
  };

  getAllPosts = async () => {
    const result = await Post.all();
    const posts = new Array<Post>();

    result.rows.map((post: any) => {
      var temp: any = {};
      result.rowDescription.columns.map((item: any, index: any) => {
        temp[item.name] = post[index];
      });
      posts.push(temp);
    });
    return posts;
  };

  getPostsByTerm = async (term: string) => {
    const result = await Post.search(term);
    const posts = new Array<Post>();

    result.rows.map((post: any) => {
      var temp: any = {};
      result.rowDescription.columns.map((item: any, index: any) => {
        temp[item.name] = post[index];
      });
      posts.push(temp);
    });
    return posts;
  };



  getPostsById = async (id: string) => {
    const result = await Post.id(id);
    const posts = new Array<Post>();

    result.rows.map((post: any) => {
      var temp: any = {};
      result.rowDescription.columns.map((item: any, index: any) => {
        temp[item.name] = post[index];
      });
      posts.push(temp);
    });
    return posts;
  };

}
export { PostService };
