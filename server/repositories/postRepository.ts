import { Db } from "../../db.ts";
import { Post } from "../../model/postModel.ts";
import { oPost } from "../../model/postModel.ts";

class PostRepository {
  async all() {
    await Db.connect();
    const r = await Db.query("SELECT * FROM posts ORDER BY created_at DESC;");
    await Db.end();
    return r;
  }

  async id(id: string) {
    await Db.connect();
    const r = await Db.query(
      `SELECT * FROM users WHERE email=$1;`, id
    );
    await Db.end();
    return r;
  }

  async search(term: string) {
    await Db.connect();
    const r = await Db.query(
      `SELECT * FROM posts where product % ANY(STRING_TO_ARRAY('${term}',' ')) or detail % ANY(STRING_TO_ARRAY('${term}',' ')) or '${term}' % owner or '${term}' % groups or product LIKE '%${term}%' or detail LIKE '%${term}%'order by similarity(product, '%${term}%') desc, similarity(groups, '%${term}%') desc, similarity(detail, '%${term}%') desc ;`,
    );
    await Db.end();
    return r;
  }

  async create(post: oPost) {
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
