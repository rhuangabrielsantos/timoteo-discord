import MessageHelper from "../Helpers/MessageHelpers";
import { Command, Message } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "add-joke",
  aliases: ["aj"],
  description: "Adiciona uma nova piada",
  example: `${process.env.BOT_PREFIX}add-joke Um elefante caiu na lama`,
  run: async (client, message, args) => {
    const joke = args.join(" ");

    if (!joke) {
      message.reply("Você precisa inserir uma piada na frente do comando");
      return;
    }

    const repository = new JokeRepository();
    await repository.create({
      message: joke,
      author: message.author.username,
      created_at: new Date().toISOString(),
    });

    const messageArguments = {
      title: "A piada foi adicionada!",
      description:
        `O usuário **${message.author.username}** adicionou a piada abaixo para aprovação: \n\n` +
        `- *${joke}*`,
      color: "WHITE",
    } as Message;

    const embedMessage = new MessageHelper().createEmbedMessage(
      messageArguments
    );

    await message.channel.send({ embeds: [embedMessage] });
  },
};
