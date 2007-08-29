import { MessageReaction, User } from "discord.js";
import Client from "../Client";
import { Event } from "../Interfaces";
import StatusChanger from "../Services/StatusChanger";

export const event: Event = {
  name: "messageReactionAdd",
  run: async (client: Client, reaction: MessageReaction, user: User) => {
    if (user?.bot) return;

    new StatusChanger().handler(client, reaction, user);
  },
};
