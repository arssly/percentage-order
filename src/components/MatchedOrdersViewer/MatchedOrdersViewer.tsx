"use client";
import useSWR from "swr";
import Box from "@mui/material/Box";
import { orderConfigs } from "@src/configs";
import DefaultContainer from "@components/DefaultContainer";
import { fetchMatchedOrders } from "@src/apiLoaders";
import FullLoading from "@components/FullLoading";
import ErrorComponent from "@components/ErrorComponent";
import ListTable from "@components/ListTable";
import { formatDate } from "@src/utils/dateUtils";
import { toPrettyFarsiNumber } from "@src/utils/numbers";

import styles from "./matchedOrdersViewer.module.scss";

export type MatchedOrdersProps = {
  marketId: number;
};

export default function MatchedOrders({ marketId }: MatchedOrdersProps) {
  const { data, isLoading, error } = useSWR(`matches/${marketId}/`, fetchMatchedOrders, {
    errorRetryCount: orderConfigs.numberOfRetries,
    refreshInterval: orderConfigs.refreshEvery,
  });

  if (isLoading) return <FullLoading />;

  const errorMessage = "مشکلی در دریافت داده پیش امده است";
  if (error || data === undefined) return <ErrorComponent message={errorMessage} />;

  const headings = ["قیمت", "‌مقدار", "زمان"];

  if (Array.isArray(data) && data.length === 0) {
    return <Box className={styles.noData}>داده‌ای برای نمایش وجود ندارد</Box>;
  }
  return (
    <DefaultContainer>
      <ListTable
        headings={headings}
        rows={data.map(d => [
          toPrettyFarsiNumber(d.price),
          toPrettyFarsiNumber(d.matchAmount),
          formatDate(d.time * 1000),
        ])}
      />
    </DefaultContainer>
  );
}
