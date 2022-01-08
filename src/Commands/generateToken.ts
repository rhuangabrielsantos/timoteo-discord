import { Interaction } from "discord.js";

import Client from "../Client";
import { Command } from "../Interfaces";

import { generateComponentsToToken } from "../Helpers/ComponentsHelper";

import GenerateTokenRepository from "../Repositories/GenerateTokenRepository";

export const command: Command = {
  name: "gerar-token",
  description: "Gera token para usuário",
  options: [],
  run: async (client: Client, interaction: Interaction) => {
    const generateToken = new GenerateTokenRepository();
    await generateToken.create({
      userId: interaction.user.id,
    });

    return {
      content: "Selecione um usuário e um tipo de token",
      components: await generateComponentsToToken({
        userId: interaction.user.id,
      }),
    };
  },
};
