import { Db } from "../../db.ts";
import { User } from "../../model/userModel.ts";

class UserRepository {
  async find(email: string) {
    await Db.connect();
    const r = await Db.query("SELECT * FROM users WHERE email=$1;", email);
    await Db.end();
    return r;
  }

  async create(user: User) {
    await Db.connect();
    const r = await Db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
      user.name,
      user.email,
      user.password,
    );
    await Db.end();
    return r;
  }

  // async update(id: number, book: User) {
  //   return Db.query(
  //     {
  //       text: "UPDATE users SET name=$1, email=$2, WHERE id=$4;",
  //       args: [
  //         book.name,
  //         book.email,
  //         id,
  //       ],
  //     },
  //   );
  // }

  // async delete(id: number) {
  //   return Db.query(
  //     {
  //       text: "DELETE FROM users WHERE id=$1;",
  //       args: [id],
  //     },
  //   );
  // }
}
export { UserRepository };
