import { marketState$ } from "./state";

export const selectMarketPageIndex$ = (market: string) => marketState$[market]?.pageIndex;
