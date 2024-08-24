import { Currency } from "./Currency.type";

export type Market = {
  code: string;
  id: number;
  marketCap: string;
  price: string;
  currency1: Currency;
  currency2: Currency;
  titleFA: string;
  volume24H: string;
};
