import MessageHelper from "../Helpers/MessageHelpers";
import { Command, Message } from "../Interfaces";
import JokeRepository from "../Repositories/JokeRepository";

export const command: Command = {
  name: "add-joke",
  aliases: ["j"],
  description: "Adiciona uma nova piada",
  example: `${process.env.BOT_PREFIX}add-joke Um elefante caiu na lama`,
  run: async (client, message, args) => {
    const joke = args.join(" ");

    if (!joke) {
      message.reply("Você precisa inserir uma piada na frente do comando");
      return;
    }

    const repository = new JokeRepository();
    await repository.create({ text: joke });

    const messageArguments = {
      title: "A piada foi adicionada!",
      description:
        "A piada foi adicionada no meu banco de dados, obrigado por ajudar minha inteligencia artificial! \n Ela estará disponível assim que um administrador autorizá-la.",
      color: "WHITE",
    } as Message;

    const embedMessage = new MessageHelper().createEmbedMessage(
      messageArguments
    );

    message.channel.send({ embeds: [embedMessage] });
  },
};
