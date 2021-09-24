import Client from "../Client";
import { CommandInteractionOptionResolver, Interaction } from "discord.js";

interface Run {
  (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ): Promise<string>;
}

interface CommandOptions {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface Command {
  name: string;
  description: string;
  options: CommandOptions[];
  run: Run;
}
