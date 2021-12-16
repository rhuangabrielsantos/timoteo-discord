import { TicTacToe } from "../Interfaces";

import { MarkEnum } from "../Enums/MarkEnum";
import { CellEnum } from "../Enums/CellEnum";

import { getPlayerNumber } from "../Helpers/TicTacToeHelper";

export default async function validateMarkTheCell(
  game: TicTacToe,
  playerId: string,
  cell: string
) {
  await validateIfPlayerHasActiveGame(game);
  await validateIfIsPlayerTurn(game, playerId);
  await validateIfCellIsBlank(game, cell);
}

async function validateIfPlayerHasActiveGame(game: TicTacToe) {
  if (!game) {
    throw new Error("Você não possui uma partida ativa.");
  }
}

async function validateIfIsPlayerTurn(game: TicTacToe, playerId: string) {
  const markings = game.board_marks;
  const playerNumber = getPlayerNumber(game, playerId);

  let turnsFirstPlayer = 0;
  let turnsSecondPlayer = 0;

  markings.forEach(mark => {
    if (mark === MarkEnum.X) {
      turnsFirstPlayer++;
      return;
    }

    if (mark === MarkEnum.O) {
      turnsSecondPlayer++;
      return;
    }
  });

  if (playerNumber === MarkEnum.X && turnsFirstPlayer === turnsSecondPlayer) {
    return;
  }

  if (playerNumber === MarkEnum.O && turnsFirstPlayer > turnsSecondPlayer) {
    return;
  }

  throw new Error("Não é a vez de jogar!");
}

async function validateIfCellIsBlank(game: TicTacToe, typedCell: string) {
  if (!game) {
    return {};
  }

  let markings = game.board_marks;
  let boardPosition = CellEnum[typedCell];

  if (markings[boardPosition] !== 0) {
    throw new Error("Essa casa está marcada!");
  }
}
