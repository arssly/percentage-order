"use client";
import { useMemo } from "react";
import useSWR from "swr";
import { Decimal } from "decimal.js";
import Box from "@mui/material/Box";
import { Order } from "@src/types";
import { orderConfigs } from "@src/configs";
import DefaultContainer from "@components/DefaultContainer";
import { fetchOrders } from "@src/apiLoaders";
import FullLoading from "@components/FullLoading";
import ErrorComponent from "@components/ErrorComponent";
import ListTable from "@components/ListTable";
import PlaceOrder from "../PlaceOrder";
import { toPrettyFarsiNumber } from "@src/utils/numbers";

import styles from "./ordersViewer.module.scss";

function calculateTotalOrder(orders?: Order[]) {
  const res = {
    remain: new Decimal(0),
    price: new Decimal(0),
    value: new Decimal(0),
  };
  if (!orders) return res;
  for (const order of orders) {
    res.remain = res.remain.add(order.remain);
    res.value = res.value.add(order.value);
    res.price = res.price.add(new Decimal(order.price).times(order.remain));
  }
  res.price = res.price.div(res.remain);
  return res;
}

export type BuySellOrdersProps = {
  marketId: number;
  buy?: boolean;
  sell?: boolean;
};

export default function OrdersVeiwer({ marketId, buy, sell }: BuySellOrdersProps) {
  if ((buy && sell) || (!buy && !sell)) {
    throw new Error("one and only one of buy or sell props should be true");
  }

  const { data, isLoading, error } = useSWR({ marketId, buy: buy ? "buy" : "sell" }, fetchOrders, {
    errorRetryCount: orderConfigs.numberOfRetries,
    refreshInterval: orderConfigs.refreshEvery,
  });
  const totalOrder = useMemo(() => calculateTotalOrder(data), [data]);

  if (isLoading) return <FullLoading />;

  const errorMessage = "مشکلی در دریافت داده پیش امده است";
  if (error || data === undefined) return <ErrorComponent message={errorMessage} />;

  const headings = ["قیمت", "باقی‌مانده", "ارزش"];
  const totalHeadings = ["میانگین قیمت", "مجموع باقی‌مانده", "مجموع ارزش"];

  if (Array.isArray(data) && data.length === 0) {
    return <Box className={styles.noData}>داده‌ای برای نمایش وجود ندارد</Box>;
  }
  return (
    <DefaultContainer>
      <ListTable
        headings={headings}
        rows={data.map(d => [
          toPrettyFarsiNumber(d.price),
          toPrettyFarsiNumber(d.remain),
          toPrettyFarsiNumber(d.value),
        ])}
      />
      <Box sx={{ my: 2 }}>
        <ListTable
          headings={totalHeadings}
          rows={[
            [
              toPrettyFarsiNumber(totalOrder?.price.toFixed(orderConfigs.numberOfFixedPoints)),
              toPrettyFarsiNumber(totalOrder?.remain.toFixed(orderConfigs.numberOfFixedPoints)),
              toPrettyFarsiNumber(totalOrder?.value.toFixed(orderConfigs.numberOfFixedPoints)),
            ],
          ]}
        />
      </Box>
      <PlaceOrder orders={data} totalRemain={totalOrder.remain} />
    </DefaultContainer>
  );
}
