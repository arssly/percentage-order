import { marketState$ } from "./state";

export const setMarketPageIndex = (base: string, index: number) => marketState$[base].pageIndex.set(index);
