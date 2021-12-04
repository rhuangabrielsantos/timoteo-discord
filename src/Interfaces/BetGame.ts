import { Bet } from "./Bet";

export interface BetGame {
  pollCode: string;
  pollName: string;
  bets: Bet[];
  created_at: Date;
}
