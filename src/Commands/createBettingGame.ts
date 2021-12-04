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
  name: "criar-jogo-apostas",
  description: "Criar jogo de apostas.",
  options: [
    {
      name: "nome-aposta",
      description: "Qual será o nome do jogo de apostas",
      type: "STRING",
      required: true,
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const pollName = options.get("nome-aposta")!.value! as string;
    const pollCode = moment().format("x");

    const embed = new MessageEmbed();
    embed
      .setTitle(`Aposta: ${pollName}`)
      .setDescription(
        `Código da aposta: **${pollCode}**.\n\nPara apostar envie o comando abaixo: \n**/apostar <codigo> <aposta>** (formatos de tempo: s, m, h, d).\n\nExemplo: 1h30m, 1m30s, 1d`
      )
      .setFields([
        {
          name: "Apostas",
          value: "Nenhuma aposta.",
        },
      ])
      .setColor("#0099ff")
      .setFooter("Copyright © 2021 Timóteo - Todos os direitos reservados.")
      .setThumbnail("https://i.imgur.com/8M80dzo.png")
      .setTimestamp();

    const betGameRepository = new BetGameRepository();
    await betGameRepository.create({
      pollCode,
      pollName,
      bets: [],
      created_at: moment().toDate(),
    });

    await interaction.channel.send({ embeds: [embed] });
    return `Criado Jogo de Apostas com sucesso!`;
  },
};
