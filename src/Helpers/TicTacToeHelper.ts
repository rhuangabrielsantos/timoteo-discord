import { CellEnum } from "../Enums/CellEnum";
import { TicTacToe } from "../Interfaces";
import { MarkEnum } from "../Enums/MarkEnum";

export function generateEmptyBoard() {
  let view =
    ":blue_square::one::two::three::blue_square:\n" +
    ":regional_indicator_a::white_large_square::white_large_square::white_large_square::regional_indicator_a:\n" +
    ":regional_indicator_b::white_large_square::white_large_square::white_large_square::regional_indicator_b:\n" +
    ":regional_indicator_c::white_large_square::white_large_square::white_large_square::regional_indicator_c:\n" +
    ":blue_square::one::two::three::blue_square:";

  let markings = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  return {
    view,
    markings,
  };
}

export function generateBoardView(markedBoard: number[]) {
  let board =
    ":blue_square::one::two::three::blue_square:\n:regional_indicator_a:";
  let number = 0;

  for (number; number < 3; number++) {
    board += createCell(markedBoard[number]);
  }

  board += ":regional_indicator_a:\n:regional_indicator_b:";

  for (number; number < 6; number++) {
    board += createCell(markedBoard[number]);
  }

  board += ":regional_indicator_b:\n:regional_indicator_c:";

  for (number; number < 9; number++) {
    board += createCell(markedBoard[number]);
  }

  board +=
    ":regional_indicator_c:\n:blue_square::one::two::three::blue_square:";

  return board;
}

function createCell(mark: number) {
  if (mark === 1) {
    return ":negative_squared_cross_mark:";
  }

  if (mark === 2) {
    return ":o2:";
  }

  return ":white_large_square:";
}

export function getPlayerNumber(playerGame: TicTacToe, idPlayer: string) {
  if (idPlayer === playerGame.first_player) {
    return MarkEnum.X;
  }

  return MarkEnum.O;
}

export function refreshBoard(
  markings: number[],
  playerNumber: number,
  typedCell: string
) {
  let boardPosition = CellEnum[typedCell];

  markings[boardPosition] = playerNumber;

  let view = generateBoardView(markings);

  return {
    view,
    markings,
  };
}

export function verifyIfHasAWinner(markings) {
  let playersMarkings = getPlayersMarkings(markings);

  let firstPlayerMarks = playersMarkings.firstPlayerMarks;
  let secondPlayerMarks = playersMarkings.secondPlayerMarks;

  let winner = 0;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  winningCombinations.map(combination => {
    let xIsWinner = 0;
    let oIsWinner = 0;

    combination.map(value => {
      if (firstPlayerMarks.indexOf(value) > -1) {
        xIsWinner++;
        return;
      }

      if (secondPlayerMarks.indexOf(value) > -1) {
        oIsWinner++;
        return;
      }
    });

    if (xIsWinner === 3) {
      winner = MarkEnum.X;
      return;
    }

    if (oIsWinner == 3) {
      winner = MarkEnum.O;
      return;
    }
  });

  return winner;
}

function getPlayersMarkings(markings) {
  let firstPlayerMarks = [];
  let secondPlayerMarks = [];

  if (!markings) {
    return {
      firstPlayerMarks,
      secondPlayerMarks,
    };
  }

  markings.forEach((mark, index) => {
    if (mark === MarkEnum.X) {
      firstPlayerMarks.push(index);
      return;
    }

    if (mark === MarkEnum.O) {
      secondPlayerMarks.push(index);
      return;
    }
  });

  return {
    firstPlayerMarks,
    secondPlayerMarks,
  };
}

export function verifyIfIsBoardFull(markings: number[]) {
  let isBoardFull = true;

  markings.forEach(mark => {
    if (mark === 0) {
      isBoardFull = false;
    }
  });

  return isBoardFull;
}
