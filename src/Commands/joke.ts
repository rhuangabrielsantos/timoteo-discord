import MessageHelper from "../Helpers/MessageHelpers";
import { Command, Message } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "joke",
  aliases: ["j"],
  description: "Leia uma piada aleatória",
  example: `${process.env.BOT_PREFIX}joke`,
  run: async (client, message, args) => {
    const jokes = await new JokeRepository().getAll();
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    const year = new Date(randomJoke.created_at).getFullYear();

    const messageArguments = {
      title: randomJoke.message,
      description: `Autor: **${randomJoke.author}**, ${year}`,
      color: "WHITE",
    } as Message;

    const embedMessage = new MessageHelper().createEmbedMessage(
      messageArguments
    );

    message.channel.send({ embeds: [embedMessage] });
  },
};
