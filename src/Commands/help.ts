import { readdirSync } from "fs";
import path from "path";
import MessageHelper from "../Helpers/MessageHelpers";
import { Command } from "../Interfaces";

export const command: Command = {
  name: "help",
  aliases: ["h"],
  description: "Mostra uma lista de comandos ou ajuda em um comando específico",
  example: `${process.env.BOT_PREFIX}help or ${process.env.BOT_PREFIX}help joke`,
  run: async (client, message, args) => {
    if (args.length > 0) {
      const command = client.commands.get(args[0]);
      if (command) {
        const embedMessage = new MessageHelper().createEmbedMessage({
          title: `Comando ${command.name}`,
          description:
            "**Descrição**: " +
            command.description +
            "\n\n **Aliases**: " +
            command.aliases.join(", ") +
            "\n Exemplo: `" +
            command.example +
            "`",
          color: "WHITE",
        });
        await message.channel.send({ embeds: [embedMessage] });
        return;
      }

      const embedMessage = new MessageHelper().createEmbedMessage({
        title: "Commando não encontrado 😞",
        description: `O comando digitado não foi encontrado, para verificar os comandos disponíveis utilize o comando: \n\n \`${process.env.BOT_PREFIX}help\``,
        color: "WHITE",
      });
      await message.channel.send({ embeds: [embedMessage] });
      return;
    }

    const commands: String[] = [];

    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach(file => {
      const { command } = require(`${commandPath}/${file}`);
      commands.push(command.name);
    });

    const embedMessage = new MessageHelper().createEmbedMessage({
      title: "Comandos disponíveis atualmente",
      description: `\`${commands.join(
        "` `"
      )}\` \n\n Para ajuda em um comando específico utilize \`${
        process.env.BOT_PREFIX
      }help [nome-comando]\``,
      color: "WHITE",
    });
    await message.channel.send({ embeds: [embedMessage] });
  },
};
