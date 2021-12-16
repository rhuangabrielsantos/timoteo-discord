import { model } from "mongoose";
import { TicTacToe } from "../Interfaces";
import { TicTacToeSchema } from "../Schemas/TicTacToeSchema";

class TicTacToeRepository {
  private TicTacToeModel = model<TicTacToe>("TicTacToe", TicTacToeSchema);

  public async create(TicTacToe: TicTacToe): Promise<TicTacToe> {
    return this.TicTacToeModel.create(TicTacToe);
  }

  public async getGameByPlayerId(playerId: string): Promise<TicTacToe> {
    return this.TicTacToeModel.findOne()
      .or([
        { first_player: playerId, active: true },
        { second_player: playerId, active: true },
      ])
      .exec();
  }

  public async activeGameByFistPlayerId(playerId: string): Promise<TicTacToe> {
    return this.TicTacToeModel.findOneAndUpdate(
      { first_player: playerId },
      { active: true }
    );
  }

  public async updateBoardMarksByPlayerId(
    playerId: string,
    boardMarks: number[]
  ): Promise<void> {
    this.TicTacToeModel.findOne()
      .or([
        { first_player: playerId, active: true },
        { second_player: playerId, active: true },
      ])
      .update({
        board_marks: boardMarks,
      })
      .exec();
  }

  public async deleteGameByFirstPlayer(playerId: string): Promise<TicTacToe> {
    return this.TicTacToeModel.findOneAndDelete({ first_player: playerId });
  }
}

export default TicTacToeRepository;
