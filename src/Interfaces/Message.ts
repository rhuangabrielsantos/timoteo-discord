import { ColorResolvable } from "discord.js";

export interface Message {
  title: string;
  description: string;
  color: ColorResolvable;
  author?: string;
}
