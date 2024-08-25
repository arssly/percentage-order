import { render, screen } from "@testing-library/react";
import { Market } from "@src/types";
import MarketCard from "./MarketCard";

test("MarketCard", () => {
  const market: Market = {
    code: "BTC_IRT",
    id: 1,
    marketCap: "43370130583253964.000000000000000000",
    price: "3805875790",
    currency1: {
      code: "BTC",
      color: "f7931a",
      id: 1,
      image: "https://cdn.bitpin.ir/media/market/currency/1697370601.svg",
      title: "Bitcoin",
      titleFA: "بیت کوین",
    },
    currency2: {
      code: "IRT",
      color: "00fd22",
      id: 2,
      image: "https://cdn.bitpin.ir/media/market/currency/1719939237.svg",
      title: "Toman",
      titleFA: "تومان",
    },
    titleFA: "بیت کوین/تومان",
    volume24H: "2318294704054686.000000000000000000",
  };

  render(<MarketCard market={market} />);

  // check image
  expect(screen.getByAltText(market.currency1.title, { exact: false })).toBeInTheDocument();
  // check header
  expect(screen.getByRole("heading")).toHaveTextContent(market.titleFA);
  // check price
  expect(screen.getByText(market.price)).toBeInTheDocument();
});
