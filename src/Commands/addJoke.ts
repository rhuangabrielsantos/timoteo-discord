import MessageHelper from "../Helpers/MessageHelpers";
import { Command, Message } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "add-joke",
  aliases: ["j"],
  description: "Add a new joke",
  run: async (client, message, args) => {
    const joke = args.join(" ");
    const repository = new JokeRepository();
    await repository.create({ text: joke });

    const messageArguments = {
      title: "A piada foi adicionada!",
      description:
        "A piada foi adicionada no meu banco de dados, obrigado por ajudar minha inteligencia artificial!",
      color: "WHITE",
    } as Message;

    const embedMessage = new MessageHelper().createEmbedMessage(
      messageArguments
    );

    message.channel.send({ embeds: [embedMessage] });
  },
};
