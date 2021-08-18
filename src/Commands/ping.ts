import { Command } from "../Interfaces";

export const command: Command = {
  name: "ping",
  aliases: ["p"],
  description: "Checks the bot's response time.",
  run: async (client, message, args) => {
    message.channel.send(`${client.ws.ping} pong!`);
  },
};
