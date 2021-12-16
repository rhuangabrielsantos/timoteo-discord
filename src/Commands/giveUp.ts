import { CommandInteractionOptionResolver, Interaction } from "discord.js";

import Client from "../Client";
import { Command } from "../Interfaces";

import TicTacToeService from "../Services/TicTacToeService";

export const command: Command = {
  name: "desistir",
  description: "Comando para desistir do jogo atual.",
  options: [],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const playerId = interaction.user.id;

    const ticTacToeService = new TicTacToeService(interaction);
    await ticTacToeService.deleteGameByFirstPlayer(playerId);

    return `O jogador <@${playerId}> desistiu da partida.\nFicou com medinho foi? :clown:`;
  },
};
