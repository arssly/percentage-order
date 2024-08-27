import OrdersVeiwer from "@src/components/OrdersViewer";
import MatchedOrders from "@src/components/MatchedOrdersViewer";
import { SwipeableTab } from "@src/components/SwipeableTabs";
import { redirect } from "next/navigation";

export default function MarketPage({ params: { id } }: { params: { id: string } }) {
  const buyTitle = "سفارشات خرید";
  const sellTitle = "سفارشات فروش";
  const matchesTitle = "معاملات انجام شده";

  if (isNaN(Number(id))) redirect("/404");

  return (
    <main>
      <SwipeableTab
        tabs={[
          { title: buyTitle, element: <OrdersVeiwer buy marketId={Number(id)} /> },
          { title: sellTitle, element: <OrdersVeiwer sell marketId={Number(id)} /> },
          { title: matchesTitle, element: <MatchedOrders marketId={Number(id)} /> },
        ]}
      />
    </main>
  );
}
