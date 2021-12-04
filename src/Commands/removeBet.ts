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
  name: "remover-aposta",
  description: "Remover uma aposta de um jogo existente.",
  options: [
    {
      name: "codigo",
      description: "Qual o código do jogo?",
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

    const betGameRepository = new BetGameRepository();
    const betGame = await betGameRepository.findOneByCode(pollCode);

    if (!betGame) {
      return "Não foi possível encontrar o jogo com o código informado.";
    }

    const pollIndex = betGame.bets.findIndex(
      bet => bet.authorId === interaction.user.id
    );

    console.log(pollIndex);

    if (pollIndex === -1) {
      return "Você não apostou neste jogo.";
    }

    betGame.bets.splice(pollIndex, 1);

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
    return `Aposta removida com sucesso!`;
  },
};
