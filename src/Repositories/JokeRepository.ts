import { model } from "mongoose";
import { Joke } from "../Interfaces";
import { JokeSchema } from "../Schemas/JokeSchema";

class JokeRepository {
  private JokeModel = model<Joke>("Joke", JokeSchema);

  public async getAll(): Promise<Joke[]> {
    return this.JokeModel.find({ status: true }).exec();
  }

  public async create(joke: Joke): Promise<Joke> {
    return this.JokeModel.create(joke);
  }
}

export default JokeRepository;
