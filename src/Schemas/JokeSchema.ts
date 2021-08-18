import { Schema } from "mongoose";
import { Joke } from "../Interfaces";

export const JokeSchema = new Schema<Joke>({
  text: { type: String, required: true },
});
