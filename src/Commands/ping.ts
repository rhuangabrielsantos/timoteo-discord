import MessageHelper from "../Helpers/MessageHelpers";
import { Command, Message } from "../Interfaces";

export const command: Command = {
  name: "ping",
  aliases: ["p"],
  description: "Checks the bot's response time.",
  run: async (client, message, args) => {
    const messageArguments = {
      title: "Pong!",
      description: `O servidor respondeu em ${client.ws.ping}ms!`,
      color: "WHITE",
    } as Message;

    const embedMessage = new MessageHelper().createEmbedMessage(
      messageArguments
    );

    await message.channel.send({ embeds: [embedMessage] });
  },
};
