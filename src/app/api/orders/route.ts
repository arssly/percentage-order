import { apiConfigs } from "@src/configs";

// calling our own route apis mostly for cors reasons
// but also it's better to have your own api close to your own application
export async function POST(req: Request) {
  const l = await req.json();
  const res = await fetch(`${apiConfigs.origin}/v2/mth/actives/${l.marketId}/?type=${l.buy}`, { mode: "no-cors" });
  const data = await res.json();
  return Response.json(data);
}
