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
  name: "finalizar-jogo-apostas",
  description: "Criar jogo de apostas.",
  options: [
    {
      name: "codigo",
      description: "Qual será o nome do jogo de apostas",
      type: "STRING",
      required: true,
    },
    {
      name: "resultado",
      description: "Qual foi o resultado do jogo?",
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
    const result = options.get("resultado")!.value! as string;

    const betGameRepository = new BetGameRepository();
    const betGame = await betGameRepository.findOneByCode(pollCode);

    if (!betGame) {
      return "Não foi possível encontrar o jogo com o código informado.";
    }

    const winner = betGame.bets.find(bet => bet.value === result);

    const bets = betGame.bets
      .map(bet => `${bet.authorName} - ${bet.value}`)
      .join("\n");

    const embed = new MessageEmbed();
    embed
      .setTitle(`Aposta: ${betGame.pollName}`)
      .setDescription(`Resultado: **${result}**`)
      .setFields([
        {
          name: "Apostas",
          value: bets !== "" ? bets : "Nenhuma aposta.",
        },
        {
          name: "Vencedor",
          value: winner ? `${winner.authorName}` : "Não houve vencedor",
        },
      ])
      .setColor("#0099ff")
      .setFooter("Copyright © 2021 Timóteo - Todos os direitos reservados.")
      .setThumbnail("https://i.imgur.com/8M80dzo.png")
      .setTimestamp();

    await betGameRepository.deleteByCode(pollCode);

    await interaction.channel.send({ embeds: [embed] });
    return `Finalizado Jogo de Apostas!`;
  },
};
