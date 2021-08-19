import { Event, Command } from "../Interfaces";
import { Message } from "discord.js";
import MessageHelper from "../Helpers/MessageHelpers";

export const event: Event = {
  name: "messageCreate",
  run: (client, message: Message) => {
    const botPrefix = process.env.BOT_PREFIX || "!tinbot ";

    if (message.author.bot || !message.content.startsWith(botPrefix)) {
      return;
    }

    const args = message.content.slice(botPrefix.length).trim().split(/ +/g);

    const cmd = args.shift()?.toLocaleLowerCase();

    if (!cmd) return;

    const command = client.commands.get(cmd) || client.aliases.get(cmd);

    if (command) {
      return (command as Command).run(client, message, args);
    }

    const messageHelper = new MessageHelper();
    const embedMessage = messageHelper.createEmbedMessage({
      title: "Commando não encontrado 😞",
      description: `O comando digitado não foi encontrado, para verificar os comandos disponíveis utilize o comando: \n\n \`${process.env.BOT_PREFIX}help\``,
      color: "WHITE",
    });

    message.channel.send({ embeds: [embedMessage] });
  },
};
