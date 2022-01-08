import { Interaction } from "discord.js";
import { Event } from "../Interfaces";

import { generateComponentsToToken } from "../Helpers/ComponentsHelper";

import GenerateTokenRepository from "../Repositories/GenerateTokenRepository";

export const event: Event = {
  name: "interactionCreate",
  run: async (client, interaction: Interaction) => {
    if (!interaction.isSelectMenu()) return;

    const generateTokenRepository = new GenerateTokenRepository();
    const generateToken = await generateTokenRepository.findByUserId(
      interaction.user.id
    );

    if (!generateToken) {
      return;
    }

    if (interaction.customId === "users") {
      generateToken.selectedUser = interaction.values[0];
      await generateTokenRepository.update(generateToken);
    }

    if (interaction.customId === "type") {
      generateToken.tokenType = interaction.values[0];
      await generateTokenRepository.update(generateToken);
    }

    await interaction.update({
      content: "Selecione um usuário e um tipo de token",
      components: await generateComponentsToToken(generateToken),
    });
  },
};
