import { useMemo, useState } from "react";
import { Decimal } from "decimal.js";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { orderConfigs } from "@src/configs";
import { Order } from "@src/types";
import { toPrettyFarsiNumber } from "@src/utils/numbers";

import styles from "./PlaceOrder.module.scss";

const marks = [
  { value: 0, label: "0%" },
  { value: 25, label: "۲۵٪" },
  { value: 50, label: "۵۰٪" },
  { value: 75, label: "۷۵٪" },
  { value: 100, label: "۱۰۰٪" },
];

export function calculatePlacedOrder(orders: Order[], totalRemain: Decimal, percentageValue: number) {
  if (percentageValue > 100 || percentageValue < 0) throw new Error("invalid value");

  const totalNeededRemain = totalRemain.mul(percentageValue).div(100);

  const res = {
    remain: new Decimal(0),
    price: new Decimal(0),
    totalValue: new Decimal(0),
  };

  if (percentageValue === 0) return res;

  for (const order of orders) {
    const remainingNeededRemain = totalNeededRemain.minus(res.remain);
    // if the current order remain is less than what we need
    if (new Decimal(order.remain).lessThanOrEqualTo(remainingNeededRemain)) {
      res.remain = res.remain.add(order.remain);
      res.totalValue = res.totalValue.add(new Decimal(order.price).mul(order.remain));
      // if the current order remain is more than what we need
    } else if (new Decimal(order.remain).greaterThan(remainingNeededRemain)) {
      res.remain = res.remain.add(remainingNeededRemain);
      res.totalValue = res.totalValue.add(remainingNeededRemain.mul(order.price));
      break;
    }
  }
  // check if we calculated correctly
  if (!res.remain.equals(totalNeededRemain)) throw new Error("error in calculations");

  res.price = res.totalValue.div(res.remain);
  return res;
}

export type PlaceOrderProps = {
  orders: Order[];
  totalRemain?: Decimal;
};

export default function PlaceOrder({ orders, totalRemain }: PlaceOrderProps) {
  const [sliderValue, setSliderValue] = useState(0);

  const nonEmptyTotalRemain = totalRemain ?? orders.reduce((total, order) => total.add(order.remain), new Decimal(0));

  // here if placed 100% the total value is a little different from the previous page BuyOrSell
  // this is due to the fact that in BuyOrSell we simply summed  values which did not enough precision points
  const placedOrder = useMemo(
    () => calculatePlacedOrder(orders, nonEmptyTotalRemain, sliderValue),
    [orders, nonEmptyTotalRemain, sliderValue],
  );

  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <Typography variant="h6" component="h2">
          سفارش درخواستی:
        </Typography>
        <Typography variant="body1">درصد سفارش درخواستی خود را با کمک اسلایدر زیر وارد کنید</Typography>
      </Box>
      <Box className={styles.center}>
        <Box maxWidth="sm" sx={{ padding: 2 }}>
          <Slider
            aria-label=" Percentage Order"
            value={sliderValue}
            onChange={(_, value) => setSliderValue(value as number)}
            valueLabelDisplay="on"
            valueLabelFormat={v => `${toPrettyFarsiNumber(v)}٪`}
            marks={marks}
            step={1}
            min={0}
            max={100}
          />
        </Box>
      </Box>
      <Box className={styles.orderResults} sx={{ gap: 1 }}>
        <Typography variant="body1">برای سفارش درخواستی، مقدار ارزش کل برابر با</Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }} data-testid="total-value">
          {toPrettyFarsiNumber(placedOrder.totalValue.toFixed(orderConfigs.numberOfFixedPoints))}
        </Typography>
        <Typography variant="body1"> با میانگین قیمت</Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }} data-testid="average-price">
          {toPrettyFarsiNumber(placedOrder.price.toFixed(orderConfigs.numberOfFixedPoints))}
        </Typography>
        <Typography variant="body1">و مقدار کل</Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }} data-testid="total-remain">
          {toPrettyFarsiNumber(placedOrder.remain.toFixed(orderConfigs.numberOfFixedPoints))}
        </Typography>
      </Box>
    </Box>
  );
}
