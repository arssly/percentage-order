import { fetchMarkets } from "@src/apiLoaders";
import MarketViewer from "@src/components/MarketViewer";
import { SwipeableTab } from "@src/components/SwipeableTabs";
import { Market } from "@src/types";

export default async function Home() {
  // fetch data on the server and use ssr
  const data = await fetchMarkets();

  // using for so that we wouldn't need to loop through data twice
  const tetherMarkets: Market[] = [];
  const tomanMarkets: Market[] = [];
  for (const market of data) {
    if (market.currency2.code === "USDT") {
      tetherMarkets.push(market);
    } else if (market.currency2.code === "IRT") {
      tomanMarkets.push(market);
    }
  }
  // TODO: configure i18n
  return (
    <main>
      <SwipeableTab
        tabs={[
          { title: "پایه تتر", element: <MarketViewer base="tether" markets={tetherMarkets} /> },
          { title: "پایه تومان", element: <MarketViewer base="toman" markets={tomanMarkets} /> },
        ]}
      />
    </main>
  );
}
