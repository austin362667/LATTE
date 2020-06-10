import { UserRepository } from "../repositories/userRepository.ts";
import { User } from "../../model/userModel.ts";
const User = new UserRepository();

class UserService {
  getUserByEmail = async (email: string) => {
    const result = await User.find(email);
    var user: any = {};
    result.rows.map((items: any) => {
      result.rowDescription.columns.map((item: any, index: any) => {
        user[item.name] = items[index];
      });
    });
    return user;
  };

  createUser = async (user: User) => {
    return await User.create(user);
  };
}

export { UserService };
