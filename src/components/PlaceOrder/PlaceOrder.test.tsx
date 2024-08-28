import { fireEvent, render, screen } from "@testing-library/react";
import PlaceOrder from ".";
import { calculatePlacedOrder } from "./PlaceOrder";
import Decimal from "decimal.js";
import { toPrettyFarsiNumber } from "@src/utils/numbers";
import { orderConfigs } from "@src/configs";

describe("calculate Placed Order", () => {
  const orders = [
    { amount: "0.1", remain: "0.2", price: "3", value: "1" },
    { amount: "0.2", remain: "0.2", price: "4", value: "2" },
    { amount: "0.2", remain: "0.2", price: "5", value: "3" },
    { amount: "0.3", remain: "0.3", price: "6", value: "4" },
    { amount: "0.3", remain: "0.3", price: "7", value: "5" },
  ];
  const totalRemain = orders.reduce((total, order) => total.add(order.remain), new Decimal(0));

  describe("test price,totalValue, remain calculations", () => {
    test("when zero percent", () => {
      const zeroResult = calculatePlacedOrder(orders, totalRemain, 0);
      expect(zeroResult).toEqual({ remain: new Decimal(0), price: new Decimal(0), totalValue: new Decimal(0) });
    });
    test("when 50 percent", () => {
      const halfResult = calculatePlacedOrder(orders, totalRemain, 50);
      expect(halfResult).toEqual({ remain: new Decimal(0.6), price: new Decimal(4), totalValue: new Decimal(2.4) });
    });

    test("when total remain is tooo wrong", () => {
      expect(() => calculatePlacedOrder(orders, totalRemain.mul(5), 50)).toThrow();
    });
  });

  describe("test the Place Order Component Itself", () => {
    render(<PlaceOrder orders={orders} />);

    fireEvent.change(screen.getByRole(`slider`), { target: { value: 50 } });
    expect(screen.getByTestId("average-price")).toHaveTextContent(
      toPrettyFarsiNumber(new Decimal(4).toFixed(orderConfigs.numberOfFixedPoints)),
    );
    expect(screen.getByTestId("total-value")).toHaveTextContent(
      toPrettyFarsiNumber(new Decimal(2.4).toFixed(orderConfigs.numberOfFixedPoints)),
    );
    expect(screen.getByTestId("total-remain")).toHaveTextContent(
      toPrettyFarsiNumber(new Decimal(0.6).toFixed(orderConfigs.numberOfFixedPoints)),
    );
  });
});
