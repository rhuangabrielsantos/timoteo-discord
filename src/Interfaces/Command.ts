import Client from "../Client";
import {
  ApplicationCommandOption,
  CommandInteractionOptionResolver,
  Interaction,
  InteractionReplyOptions,
  MessagePayload,
} from "discord.js";

interface Run {
  (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ): Promise<string | MessagePayload | InteractionReplyOptions>;
}

export type CommandResponse = Promise<
  string | MessagePayload | InteractionReplyOptions
>;

export interface Command {
  name: string;
  description: string;
  options: ApplicationCommandOption[];
  run: Run;
}
