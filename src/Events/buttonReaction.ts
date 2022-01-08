import { Interaction } from "discord.js";

import Client from "../Client";
import { Event } from "../Interfaces";

import { generateComponentsToToken } from "../Helpers/ComponentsHelper";
import { generateTokenToUser } from "../Helpers/GenerateToken";

import GenerateTokenRepository from "../Repositories/GenerateTokenRepository";

export const event: Event = {
  name: "interactionCreate",
  run: async (client: Client, interaction: Interaction) => {
    if (!interaction.isButton()) return;

    const generateTokenRepository = new GenerateTokenRepository();
    const generateToken = await generateTokenRepository.findByUserId(
      interaction.user.id
    );

    if (!generateToken) {
      return;
    }

    if (interaction.customId === "finish") {
      if (!generateToken.selectedUser || !generateToken.tokenType) {
        await interaction.update({
          content: `Você precisa selecionar um usuário e um tipo de token antes de concluir.`,
          components: await generateComponentsToToken(generateToken),
        });
        return;
      }

      await generateTokenRepository.delete(generateToken.userId);

      const token = await generateTokenToUser(generateToken);

      await interaction.update({
        content: `Token Gerado! \`\`\`${token}\`\`\``,
        components: [],
      });
    }

    if (interaction.customId === "cancel") {
      await generateTokenRepository.delete(generateToken.userId);

      await interaction.update({
        content: `Cancelada geração do token.`,
        components: [],
      });
    }
  },
};
