import { apiConfigs } from "@src/configs";
import { Currency, Market } from "@src/types";

const transformCurrency = (c: any): Currency => ({
  code: c.code,
  color: c.color,
  id: c.id,
  image: c.image,
  title: c.title,
  titleFA: c.title_fa,
});

const transformMarket = (m: any): Market => ({
  code: m.code,
  id: m.id,
  marketCap: m.market_cap,
  price: m.price,
  currency1: transformCurrency(m.currency1),
  currency2: transformCurrency(m.currency2),
  titleFA: m.title_fa,
  volume24H: m.volume_24h,
});

export async function fetchMarkets() {
  const res = await fetch(`${apiConfigs.origin}/v1/mkt/markets/`);
  const rawData = await res.json();

  // transform huge data to usable small data
  // so that we only send what we need to the client
  const transformedData: Market[] = rawData.results.map(transformMarket);
  return transformedData;
}
