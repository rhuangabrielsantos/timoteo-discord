import {
  CommandInteractionOptionResolver,
  Interaction,
  MessageEmbed,
} from "discord.js";
import moment from "moment";

import Client from "../Client";
import { Command } from "../Interfaces";

import BetGameRepository from "../Repositories/BetGameRepository";

export const command: Command = {
  name: "apostar",
  description: "Apostar em um jogo existente.",
  options: [
    {
      name: "codigo",
      description: "Qual o código do jogo?",
      type: "STRING",
      required: true,
    },
    {
      name: "aposta",
      description: "Qual sua aposta?",
      type: "STRING",
      required: true,
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const pollCode = options.get("codigo")!.value! as string;
    const toBet = options.get("aposta")!.value! as string;

    const betGameRepository = new BetGameRepository();
    const betGame = await betGameRepository.findOneByCode(pollCode);

    if (!betGame) {
      return "Não foi possível encontrar o jogo com o código informado.";
    }

    if (betGame.bets.find(bet => bet.authorId === interaction.user.id)) {
      return "Você já apostou neste jogo.";
    }

    if (betGame.bets.find(bet => bet.value === toBet)) {
      return "Já existe uma aposta com este valor.";
    }

    betGame.bets.push({
      authorId: interaction.user.id,
      authorName: interaction.user.username,
      value: toBet,
    });

    const bets = betGame.bets
      .map(bet => `${bet.authorName} - ${bet.value}`)
      .join("\n");

    const embed = new MessageEmbed();
    embed
      .setTitle(`Aposta: ${betGame.pollName}`)
      .setDescription(
        `Código da aposta: **${pollCode}**.\n\nPara apostar envie o comando abaixo: \n**/apostar <codigo> <aposta>** (formatos de tempo: s, m, h, d).\n\nExemplo: 1h30m, 1m30s, 1d`
      )
      .setFields([
        {
          name: "Apostas",
          value: bets !== "" ? bets : "Nenhuma aposta.",
        },
      ])
      .setColor("#0099ff")
      .setFooter("Copyright © 2021 Timóteo - Todos os direitos reservados.")
      .setThumbnail("https://i.imgur.com/8M80dzo.png")
      .setTimestamp();

    await betGameRepository.updateByCode(pollCode, betGame);

    await interaction.channel.send({ embeds: [embed] });
    return `Realizada aposta com sucesso!`;
  },
};
