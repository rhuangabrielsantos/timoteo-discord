import { Interaction } from "discord.js";

import { MarkEnum } from "../Enums/MarkEnum";
import { TicTacToe } from "../Interfaces";

import {
  generateEmptyBoard,
  getPlayerNumber,
  refreshBoard,
  verifyIfHasAWinner,
  verifyIfIsBoardFull,
} from "../Helpers/TicTacToeHelper";

import validatePlayNewGame from "../Validators/PlayValidator";
import validateMarkTheCell from "../Validators/MarkValidator";

import TicTacToeRepository from "../Repositories/TicTacToeRepository";

interface BoardProps {
  view: string;
  markings: number[];
}

export default class TicTacToeService {
  private gameRepository = new TicTacToeRepository();

  constructor(public interaction: Interaction) {}

  async createGame(
    idFirstPlayer: string,
    idSecondPlayer: string,
    guildId: string
  ): Promise<void> {
    await validatePlayNewGame(
      {
        firstPlayer: idFirstPlayer,
        secondPlayer: idSecondPlayer,
      },
      this.interaction
    );

    const board = generateEmptyBoard();

    await this.gameRepository.create({
      first_player: idFirstPlayer,
      second_player: idSecondPlayer,
      board_marks: board.markings,
      guild_id: guildId,
    });
  }

  async getGame(playerId: string): Promise<TicTacToe> {
    return await this.gameRepository.getGameByPlayerId(playerId);
  }

  async acceptGame(idFirstPlayer: string): Promise<void> {
    await this.gameRepository.activeGameByFistPlayerId(idFirstPlayer);
  }

  async deleteGameByFirstPlayer(idFirstPlayer: string): Promise<void> {
    await this.gameRepository.deleteGameByFirstPlayer(idFirstPlayer);
  }

  async markTheCell(cell: string, playerId: string): Promise<BoardProps> {
    const ticTacToeRepository = new TicTacToeRepository();
    const game = await ticTacToeRepository.getGameByPlayerId(playerId);

    await validateMarkTheCell(game, playerId, cell);

    const playerNumber = getPlayerNumber(game, playerId);
    const refreshedBoard = refreshBoard(game.board_marks, playerNumber, cell);

    await this.gameRepository.updateBoardMarksByPlayerId(
      playerId,
      refreshedBoard.markings
    );

    return refreshedBoard;
  }

  async verifyIfIsGameOver(
    markings: number[],
    playerId: string
  ): Promise<string> {
    const hasAWinner = verifyIfHasAWinner(markings);
    const isBoardFull = verifyIfIsBoardFull(markings);

    const playerGame = await this.gameRepository.getGameByPlayerId(playerId);

    const firstPlayerMention = `<@!${playerGame.first_player}>`;
    const secondPlayerMention = `<@!${playerGame.second_player}>`;

    if (hasAWinner !== 0 || isBoardFull) {
      await this.gameRepository.deleteGameByFirstPlayer(
        playerGame.first_player
      );
    }

    if (hasAWinner === MarkEnum.X) {
      return `O ${firstPlayerMention} ?? o vencedor, quem sabe em uma pr??xima vez ${secondPlayerMention}!\n `;
    }

    if (hasAWinner === MarkEnum.O) {
      return `O ${secondPlayerMention} ?? o vencedor, quem sabe em uma pr??xima vez ${firstPlayerMention}!\n `;
    }

    if (isBoardFull) {
      return (
        "Ihh, deu velha. Ou os dois jogadores s??o muito bons, ou s??o muito ruins.\n" +
        "S?? tem um jeito de descobrir isso, vamos jogar novamente?"
      );
    }
  }
}
