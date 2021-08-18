import { Event, Command } from "../Interfaces";
import { Message } from "discord.js";

export const event: Event = {
  name: "messageCreate",
  run: (client, message: Message) => {
    const botPrefix = process.env.BOT_PREFIX || "!tinbot ";

    if (message.author.bot || !message.content.startsWith(botPrefix)) {
      return;
    }

    const args = message.content.slice(botPrefix.length).trim().split(/ +/g);

    const cmd = args.shift()?.toLocaleLowerCase();

    if (!cmd) return;

    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (command) (command as Command).run(client, message, args);
  },
};
