import { Schema } from "mongoose";
import { BetGame } from "../Interfaces";

export const BetGameSchema = new Schema<BetGame>({
  pollCode: {
    type: String,
    required: true,
  },
  pollName: {
    type: String,
    required: true,
  },
  bets: {
    type: [{ authorId: String, authorName: String, value: String }],
  },
  created_at: {
    type: Date,
    required: true,
  },
});
