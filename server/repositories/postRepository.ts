import { Db } from "../../db.ts";
import { Post } from "../../model/postModel.ts";

class PostRepository {
  async all() {
    await Db.connect();
    const r = await Db.query("SELECT * FROM posts ORDER BY created_at DESC;");
    await Db.end();
    return r;
  }

  async title(term: string) {
    await Db.connect();
    const r = await Db.query(
      `SELECT * FROM posts WHERE product LIKE '%${term}%' OR owner LIKE '%${term}%' OR detail LIKE '%${term}%' OR groups LIKE '%${term}%' ORDER BY created_at DESC;`,
    );
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
