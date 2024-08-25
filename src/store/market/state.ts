import { observable } from "@legendapp/state";

interface MarketState {
  [market: string]: {
    pageIndex: number;
  };
}

export const marketState$ = observable<MarketState>({
  IRT: { pageIndex: 1 },
  USDT: { pageIndex: 1 },
});
