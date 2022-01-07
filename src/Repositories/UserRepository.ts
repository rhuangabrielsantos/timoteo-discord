import { model } from "mongoose";
import { User } from "../Interfaces";
import { UserSchema } from "../Schemas/UserSchema";

class UserRepository {
  private UserModel = model<User>("User", UserSchema);

  public async findAll(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  public async findOneById(id: string): Promise<User> {
    return await this.UserModel.findOne({ id });
  }

  public async create(user: User): Promise<User> {
    return await this.UserModel.create(user);
  }

  public async update(user: User): Promise<void> {
    await this.UserModel.updateOne({ id: user.id }, user);
  }

  public async delete(userId: string): Promise<void> {
    await this.UserModel.deleteOne({ id: userId });
  }
}

export default UserRepository;
