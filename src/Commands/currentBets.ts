import {
  CommandInteractionOptionResolver,
  Interaction,
  MessageEmbed,
} from "discord.js";

import Client from "../Client";
import { Command } from "../Interfaces";

import BetGameRepository from "../Repositories/BetGameRepository";

export const command: Command = {
  name: "apostas-atuais",
  description: "Visualiza as apostas atuais da casa de apostas.",
  options: [],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const betGameRepository = new BetGameRepository();
    const bets = await betGameRepository.findAll();

    const values = bets.map(bet => {
      return {
        name: bet.pollName,
        value: bet.pollCode,
        inline: true,
      };
    });

    if (values.length === 0) {
      values.push({
        name: "Nenhuma aposta encontrada",
        value:
          "Para criar uma aposta, use o comando\n**/criar-jogo-apostas <nome-aposta>**",
        inline: true,
      });
    }

    const embed = new MessageEmbed();
    embed
      .setTitle(`Jogos de apostas atuais`)
      .setDescription("Abaixo estão as apostas atuais.")
      .setFields(values)
      .setColor("#0099ff")
      .setFooter("Copyright © 2021 Timóteo - Todos os direitos reservados.")
      .setThumbnail("https://i.imgur.com/8M80dzo.png")
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });

    return "Jogos de apostas atuais";
  },
};
