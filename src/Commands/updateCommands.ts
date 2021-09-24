import { Interaction } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import Client from "../Client";

import { Command } from "../Interfaces";

export const command: Command = {
  name: "atualizar-comandos",
  description: "Atualiza os comandos do bot para os mais recentes disponíveis.",
  options: [],
  run: async (client: Client, interaction: Interaction) => {
    const commandsToDeploy = [];

    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach(async file => {
      const { command } = require(`${commandPath}/${file}`);

      const commandFormatted = {
        name: command.name,
        description: command.description,
        options: command.options,
      };

      commandsToDeploy.push(commandFormatted);
    });

    await interaction.guild.commands.set(commandsToDeploy);

    return "Commands updated!";
  },
};
