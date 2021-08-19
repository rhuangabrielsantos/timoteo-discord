import { Schema } from "mongoose";
import { Joke } from "../Interfaces";

export const JokeSchema = new Schema<Joke>({
  text: { type: String, required: true },
  status: {
    type: Boolean,
    required: false,
    default: false,
  },
});
