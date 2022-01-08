import { model } from "mongoose";
import { GenerateToken } from "../Interfaces";
import { GenerateTokenSchema } from "../Schemas/GenerateTokenSchema";

class GenerateTokenRepository {
  private GenerateTokenModel = model<GenerateToken>(
    "generateToken",
    GenerateTokenSchema
  );

  public async findByUserId(userId: string): Promise<GenerateToken> {
    return this.GenerateTokenModel.findOne({ userId }).exec();
  }

  public async create(GenerateToken: GenerateToken): Promise<GenerateToken> {
    return this.GenerateTokenModel.create(GenerateToken);
  }

  public async update(generateToken: GenerateToken): Promise<void> {
    await this.GenerateTokenModel.updateOne(
      { id: generateToken.userId },
      generateToken
    );
  }

  public async delete(userId: string): Promise<void> {
    await this.GenerateTokenModel.deleteOne({ userId });
  }
}

export default GenerateTokenRepository;
