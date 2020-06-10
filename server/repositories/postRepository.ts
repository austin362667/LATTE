import { Db } from "../../db.ts";
import { Post } from "../../model/postModel.ts";

class PostRepository {
  async all() {
    await Db.connect();
    const r = await Db.query("SELECT * FROM posts;");
    await Db.end();
    return r;
  }

  async create(post: Post) {
    try {
      await Db.connect();
      const r = await Db.query(
        "INSERT INTO posts (owner, email, groups, product, detail, price, photo) VALUES ($1, $2, $3, $4, $5, $6, $7);",
        post.owner,
        post.email,
        post.groups,
        post.product,
        post.detail,
        post.price,
        post.photo,
      );
    } catch (err) {
      console.log(err);
    } finally {
      await Db.end();
    }
  }
}
export { PostRepository };
