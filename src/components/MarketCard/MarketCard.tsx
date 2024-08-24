import Paper from "@mui/material/Paper";
import { Market } from "@src/types";

export type MarketCardProps = {
  market: Market;
};

export default function MarketCard({ market }: MarketCardProps) {
  return <Paper elevation={3}>{market.titleFA}</Paper>;
}
