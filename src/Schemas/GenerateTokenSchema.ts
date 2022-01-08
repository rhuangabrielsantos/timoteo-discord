import { Schema } from "mongoose";
import { GenerateToken } from "../Interfaces";

export const GenerateTokenSchema = new Schema<GenerateToken>({
  userId: {
    type: String,
    required: true,
  },
  selectedUser: {
    type: String,
    required: false,
  },
  tokenType: {
    type: String,
    required: false,
  },
});
