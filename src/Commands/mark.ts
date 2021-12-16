import { CommandInteractionOptionResolver, Interaction } from "discord.js";
import MessageHelper from "../Helpers/MessageHelper";
import TicTacToeService from "../Services/TicTacToeService";
import Client from "../Client";

import { Command } from "../Interfaces";

export const command: Command = {
  name: "marcar",
  description: "Comando usado para marcar uma casa no jogo TicTacToe.",
  options: [
    {
      name: "casa",
      description: "Casa que deseja marcar.",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "A1",
          value: "A1",
        },
        {
          name: "A2",
          value: "A2",
        },
        {
          name: "A3",
          value: "A3",
        },
        {
          name: "B1",
          value: "B1",
        },
        {
          name: "B2",
          value: "B2",
        },
        {
          name: "B3",
          value: "B3",
        },
        {
          name: "C1",
          value: "C1",
        },
        {
          name: "C2",
          value: "C2",
        },
        {
          name: "C3",
          value: "C3",
        },
      ],
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ) => {
    const cell = options.get("casa").value as string;
    const playerId = interaction.user.id;

    const messageHelper = new MessageHelper();
    const ticTacToeService = new TicTacToeService(interaction);

    try {
      const refreshedBoard = await ticTacToeService.markTheCell(cell, playerId);
      const isGameOver = await ticTacToeService.verifyIfIsGameOver(
        refreshedBoard.markings,
        playerId
      );

      if (isGameOver) {
        const messageTitle = "O jogo acabou!";

        const gameOverEmbed = messageHelper.createEmbedMessage({
          title: messageTitle,
          description: isGameOver,
          color: "#0099ff",
        });

        await interaction.channel.send(refreshedBoard.view);

        return { embeds: [gameOverEmbed] };
      }

      const game = await ticTacToeService.getGame(playerId);

      const idNextPlayer =
        playerId === game.first_player ? game.second_player : game.first_player;
      const mentionNextPlayer = `<@!${idNextPlayer}>`;

      await interaction.channel.send(`Sua vez ${mentionNextPlayer}!`);

      return refreshedBoard.view;
    } catch (error) {
      return error.message;
    }
  },
};
