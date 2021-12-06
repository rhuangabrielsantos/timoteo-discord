import { model } from "mongoose";
import { BetGame } from "../Interfaces";
import { BetGameSchema } from "../Schemas/BetGameSchema";

class BetGameRepository {
  private BetGameModel = model<BetGame>("BetGame", BetGameSchema);

  public async findOneByCode(pollCode: string): Promise<BetGame> {
    return this.BetGameModel.findOne({ pollCode }).exec();
  }

  public async create(betGame: BetGame): Promise<BetGame> {
    return this.BetGameModel.create(betGame);
  }

  public async updateByCode(pollCode: String, betGame: BetGame): Promise<void> {
    this.BetGameModel.findOneAndUpdate(
      {
        pollCode,
      },
      betGame
    ).exec();
  }

  public async deleteByCode(pollCode: String): Promise<void> {
    this.BetGameModel.findOneAndDelete({ pollCode }).exec();
  }

  public async findAll(): Promise<BetGame[]> {
    return this.BetGameModel.find().exec();
  }
}

export default BetGameRepository;
