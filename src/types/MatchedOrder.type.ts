export type MatchedOrder = {
  time: number;
  price: string;
  value: string;
  matchAmount: string;
  matchId: string;
  type: "buy" | "sell";
};
