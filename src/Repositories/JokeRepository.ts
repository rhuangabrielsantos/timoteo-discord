import { model } from "mongoose";
import { Joke } from "../Interfaces";
import { JokeSchema } from "../Schemas/JokeSchema";

class JokeRepository {
  private JokeModel = model<Joke>("Joke", JokeSchema);

  public async getAll(): Promise<Joke[]> {
    return await this.JokeModel.find({}).exec();
  }

  public async create(joke: Joke): Promise<Joke> {
    return await this.JokeModel.create(joke);
  }
}

export default JokeRepository;
