import { Interaction } from "discord.js";

import Client from "../Client";
import { Event } from "../Interfaces";

import { generateComponentsToToken } from "../Helpers/ComponentsHelper";
import { generateTokenToUser } from "../Helpers/GenerateToken";

import GenerateTokenRepository from "../Repositories/GenerateTokenRepository";
import UserRepository from "src/Repositories/UserRepository";

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
      const usuarioRepository = new UserRepository();
      const user = await usuarioRepository.findOneById(generateToken.userId);

      const response = await generateTokenToUser(generateToken);

      await interaction.update({
        content: `**Usuário:** ${
          user.name
        }\n**Tipo Token:** ${generateToken.tokenType.toUpperCase()}\n**Resposta do servidor:**`,
        components: [],
      });

      await interaction.channel.send({
        content: `\`\`\`${response}\`\`\``,
      });
      return;
    }

    if (interaction.customId === "cancel") {
      await generateTokenRepository.delete(generateToken.userId);

      await interaction.update({
        content: `Cancelada geração do token.`,
        components: [],
      });
      return;
    }

    await interaction.update({
      content: `Ocorreu um erro inesperado`,
      components: [],
    });
  },
};
