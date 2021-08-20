import { Schema } from "mongoose";
import { Thought } from "../Interfaces";

export const ThoughtSchema = new Schema<Thought>({
  message: { type: String, required: true },
  author: { type: String, required: true },
  status: {
    type: Boolean,
    required: false,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
