import MessageHelper from "../Helpers/MessageHelper";
import { Command, Message } from "../Interfaces";

export const command: Command = {
  name: "ping",
  aliases: ["p"],
  description: "Verifica o tempo de resposta do bot.",
  example: `${process.env.BOT_PREFIX}ping`,
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
