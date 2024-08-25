import { fetchMarkets } from "@src/apiLoaders";
import MarketViewer from "@src/components/MarketViewer";
import { SwipeableTab } from "@src/components/SwipeableTabs";
import Error from "./error";
import { Market } from "@src/types";

export default async function Home() {
  let data;
  try {
    // fetch data on the server and use ssr
    data = await fetchMarkets();
  } catch (e) {
    return <Error />;
  }

  // using for so that we wouldn't need to loop through data twice
  const baseToMarketMap: { [key: string]: Market[] } = {};
  for (const market of data) {
    const base = market.currency2.code;
    if (!baseToMarketMap[base]) baseToMarketMap[base] = [];
    baseToMarketMap[base].push(market);
  }

  // TODO: configure i18n
  return (
    <main>
      <SwipeableTab
        tabs={Object.entries(baseToMarketMap).map(([base, markets]) => ({
          title: markets[0].currency2.titleFA,
          element: <MarketViewer base={base} markets={markets} />,
        }))}
      />
    </main>
  );
}
