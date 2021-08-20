import MessageHelper from "../Helpers/MessageHelpers";
import { Command, Message } from "../Interfaces";
import ThoughtRepository from "../Repositories/ThoughtRepository";

export const command: Command = {
  name: "add-thought",
  aliases: ["at"],
  description: "Adiciona um novo pensamento",
  example: `${process.env.BOT_PREFIX}add-thought Um elefante caiu na lama`,
  run: async (client, message, args) => {
    const thought = args.join(" ");

    if (!thought) {
      message.reply("Você precisa inserir um pensamento na frente do comando");
      return;
    }

    const repository = new ThoughtRepository();
    await repository.create({
      message: thought,
      author: message.author.username,
      created_at: new Date().toISOString(),
    });

    const messageArguments = {
      title: "Um pensamento foi adicionado!",
      description:
        `O usuário **${message.author.username}** adicionou o pensamento abaixo para aprovação: \n\n` +
        `- *${thought}*`,
      color: "WHITE",
    } as Message;

    const embedMessage = new MessageHelper().createEmbedMessage(
      messageArguments
    );

    await message.channel.send({ embeds: [embedMessage] });
  },
};
