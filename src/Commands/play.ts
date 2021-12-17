import {
  CommandInteractionOptionResolver,
  Interaction,
  MessageReaction,
  User,
} from "discord.js";
import Client from "../Client";

import { Command } from "../Interfaces";
import { CommandResponse } from "../Interfaces/Command";

import MessageHelper from "../Helpers/MessageHelper";
import { generateBoardView } from "../Helpers/TicTacToeHelper";

import TicTacToeService from "../Services/TicTacToeService";

export const command: Command = {
  name: "play",
  description: "Inicia um jogo da velha.",
  options: [
    {
      name: "desafiado",
      description: "Jogador desafiado.",
      type: "MENTIONABLE",
      required: true,
    },
  ],
  run: async (
    client: Client,
    interaction: Interaction,
    options: CommandInteractionOptionResolver
  ): CommandResponse => {
    const idFirstPlayer = interaction.user.id;
    const idSecondPlayer = options.get("desafiado").value as string;

    const ticTacToeService = new TicTacToeService(interaction);

    try {
      await ticTacToeService.createGame(
        idFirstPlayer,
        idSecondPlayer,
        interaction.guild.id
      );
    } catch (error) {
      return error.message;
    }

    const messageHelper = new MessageHelper();
    const challengeEmbed = messageHelper.createEmbedMessage({
      title: "Uma solicitação de partida foi feita!",
      description: `<@${idSecondPlayer}> foi desafiado(a) por <@${idFirstPlayer}> para uma partida de Jogo da Velha.\n\n**Você aceita?**`,
      color: "#0099ff",
    });

    const message = interaction.channel.send({ embeds: [challengeEmbed] });

    const response = await message.then(async message => {
      await message.react("✅").then(() => message.react("⛔"));

      const filter = (reaction: MessageReaction, user: User) =>
        user.id == idSecondPlayer &&
        (reaction.emoji.name == "✅" || reaction.emoji.name == "⛔");

      return await message
        .awaitReactions({ filter, max: 1, time: 30000, errors: ["time"] })
        .then(async collected => {
          if (collected.first().emoji.name == "✅") {
            const board = generateBoardView([0, 0, 0, 0, 0, 0, 0, 0, 0]);

            const messageTitle = "A partida foi aceita!";
            const messageDescription = `<@${idFirstPlayer}> você começa o jogo!\n\nPara jogar envie o comando **/marcar <casa>**\n\n`;

            const successMessage = messageHelper.createEmbedMessage({
              title: messageTitle,
              description: messageDescription,
              color: "#0099ff",
            });
            await ticTacToeService.acceptGame(idFirstPlayer);

            await message.reactions.removeAll();
            await message.edit({ embeds: [successMessage] });
            await interaction.channel.send(board);

            return "Finalmente tenemos un juego, hermanito";
          }

          await ticTacToeService.deleteGameByFirstPlayer(idFirstPlayer);

          const messageTitle = "A partida não foi aceita!";
          const messageDescription = `Alguem não está com vontade de jogar <@${idFirstPlayer}> :pensive:`;

          const refusedMessage = messageHelper.createEmbedMessage({
            title: messageTitle,
            description: messageDescription,
            color: "#0099ff",
          });

          await message.reactions.removeAll();
          await message.edit({ embeds: [refusedMessage] });
          return "Ihhh, parece que ele ficou com medinho!";
        })
        .catch(async () => {
          await ticTacToeService.deleteGameByFirstPlayer(idFirstPlayer);

          const messageTitle = "Acabou o tempo!";
          const messageDescription =
            `Já se passou 30 segundos e o adversário não aceitou a partida.\n` +
            `Eu acho que ele(a) está te ignorando <@${idFirstPlayer}> :flushed:`;

          const timeoutMessage = messageHelper.createEmbedMessage({
            title: messageTitle,
            description: messageDescription,
            color: "#0099ff",
          });

          await message.reactions.removeAll();
          await message.edit({ embeds: [timeoutMessage] });

          return "Timeooooout, alow tem alguém aí?";
        });
    });

    return response;
  },
};
