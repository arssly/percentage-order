import { apiConfigs } from "@src/configs";
import { Currency, Market, Order } from "@src/types";
import { MatchedOrder } from "@src/types/MatchedOrder.type";

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

const transformMatchedOrder = (m: any): MatchedOrder => ({
  time: m.time,
  price: m.price,
  value: m.value,
  matchAmount: m.match_amount,
  type: m.type,
  matchId: m.match_id,
});

export async function fetchMarkets() {
  const res = await fetch(`${apiConfigs.origin}/v1/mkt/markets/`);
  if (!res.ok) throw new Error(res.statusText);
  const rawData = await res.json();

  // transform huge data to usable small data
  // so that we only send what we need to the client
  const transformedData: Market[] = rawData.results.map(transformMarket);
  return transformedData;
}

export async function fetchOrders(restOfUrl: string) {
  const res = await fetch(`${apiConfigs.origin}/v2/mth/${restOfUrl}`);
  if (!res.ok) {
    const error = new Error(res.statusText);
    error.cause = res.status;
    throw error;
  }
  const rawData = await res.json();
  const transformedData: Order[] = rawData.orders;
  return transformedData.slice(0, 10);
}

export async function fetchMatchedOrders(restOfUrl: string) {
  const res = await fetch(`${apiConfigs.origin}/v1/mth/${restOfUrl}`);
  if (!res.ok) {
    const error = new Error(res.statusText);
    error.cause = res.status;
    throw error;
  }
  const rawData = await res.json();
  const transformedData: MatchedOrder[] = rawData.map(transformMatchedOrder);
  return transformedData.slice(0, 10);
}
