import { Interaction } from "discord.js";
import TicTacToeRepository from "../Repositories/TicTacToeRepository";

interface PlayersProps {
  firstPlayer: string;
  secondPlayer: string;
}

export default async function validatePlayNewGame(
  players: PlayersProps,
  interaction: Interaction
): Promise<void> {
  await validateAdversaryIsABot(players.secondPlayer, interaction);
  await validateWhetherPlayersAlreadyHaveAnActivatedGame(players);
}

async function validateAdversaryIsABot(
  secondPlayer: string,
  interaction: Interaction
) {
  const secondPlayerUser = await interaction.guild.members.fetch(secondPlayer);

  if (secondPlayerUser.user.bot) {
    throw new Error("O adversário não pode ser um bot :clown:");
  }
}

async function validateWhetherPlayersAlreadyHaveAnActivatedGame({
  firstPlayer,
  secondPlayer,
}: PlayersProps) {
  const ticTacToeRepository = new TicTacToeRepository();

  const firstHasAlreadyAGame = await ticTacToeRepository.getGameByPlayerId(
    firstPlayer
  );
  const secondHasAlreadyAGame = await ticTacToeRepository.getGameByPlayerId(
    secondPlayer
  );

  if (firstHasAlreadyAGame || secondHasAlreadyAGame) {
    throw new Error("Os jogadores já possuem um jogo ativo.");
  }
}
