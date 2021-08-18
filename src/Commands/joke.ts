import MessageHelper from "../Helpers/MessageHelpers";
import { Command, Message } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "joke",
  aliases: ["j"],
  description: "Get a random joke",
  run: async (client, message, args) => {
    const jokes = await new JokeRepository().getAll();
    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    const messageArguments = {
      title: joke.text,
      description: "Uma piada para alegrar seu dia!",
      color: "WHITE",
    } as Message;

    const embedMessage = new MessageHelper().createEmbedMessage(
      messageArguments
    );

    message.channel.send({ embeds: [embedMessage] });
  },
};
