import { Schema } from "mongoose";
import { TicTacToe } from "../Interfaces";

export const TicTacToeSchema = new Schema<TicTacToe>({
  first_player: { type: String, required: true },
  second_player: { type: String, required: true },
  board_marks: { type: [Number], required: true },
  guild_id: { type: String, required: true },
  active: { type: Boolean, default: false },
});
