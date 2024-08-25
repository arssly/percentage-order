"use client";
import { Market } from "@src/types";
import DefaultContainer from "@components/DefaultContainer";
import MarketCard from "@components/MarketCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useCallback } from "react";
import { marketConfigs } from "@src/configs";
import { useSelector } from "@legendapp/state/react";
import { selectMarketPageIndex$ } from "@src/store/market/selectors";
import { setMarketPageIndex } from "@src/store/market/actions";

import styles from "./marketViewer.module.scss";

export type MarketViewerProps = {
  base: string;
  markets: Market[];
};

const marketsPerPage = marketConfigs.marketsPerPage;

export default function MarketViewer({ base, markets }: MarketViewerProps) {
  const page = useSelector(selectMarketPageIndex$(base)) || 1;

  const handleChange = useCallback(
    (page: number) => {
      setMarketPageIndex(base, page);
    },
    [base],
  );

  const marketsInView =
    markets.length <= marketsPerPage ? markets : markets.slice((page - 1) * marketsPerPage, page * marketsPerPage);

  return (
    <DefaultContainer>
      <Grid container spacing={2}>
        {marketsInView.map(market => (
          <Grid item key={market.id} xs={6} md={4}>
            <MarketCard market={market} />
          </Grid>
        ))}
      </Grid>
      <Box className={styles.center} sx={{ mt: 3 }}>
        <Pagination
          count={Math.ceil(markets.length / marketsPerPage)}
          page={page}
          onChange={(e, page) => handleChange(page)}
        />
      </Box>
    </DefaultContainer>
  );
}
