import MessageHelper from "../Helpers/MessageHelper";
import { Command, Message } from "../Interfaces";
import ThoughtRepository from "../Repositories/ThoughtRepository";

export const command: Command = {
  name: "thought",
  aliases: ["t"],
  description: "Leia um pensamento aleatório.",
  example: `${process.env.BOT_PREFIX}thought`,
  run: async (client, message, args) => {
    const thought = await new ThoughtRepository().getAll();
    const randomThought = thought[Math.floor(Math.random() * thought.length)];
    const year = new Date(randomThought.created_at).getFullYear();

    const messageArguments = {
      title: randomThought.message,
      description: `Autor: **${randomThought.author}**, ${year}`,
      color: "WHITE",
    } as Message;

    const embedMessage = new MessageHelper().createEmbedMessage(
      messageArguments
    );

    await message.channel.send({ embeds: [embedMessage] });
  },
};
