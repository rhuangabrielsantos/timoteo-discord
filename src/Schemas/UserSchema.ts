import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

import { User } from "../Interfaces";

export const UserSchema = new Schema<User>({
  id: {
    type: String,
    unique: true,
    default: uuidv4(),
  },
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  electronicSignature: {
    type: String,
    required: true,
  },
  accessPassword: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});
