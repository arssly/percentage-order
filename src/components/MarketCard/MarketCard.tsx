import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Market } from "@src/types";
import Image from "next/image";
import Typography from "@mui/material/Typography";

import styles from "./marketCard.module.scss";

export type MarketCardProps = {
  market: Market;
};

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box className={styles.image}>
        <Image
          src={market.currency1.image}
          priority
          alt={`image of the ${market.currency1.title}`}
          width={50}
          height={50}
        />
      </Box>
      <Typography variant="h6" className={styles.oneLineText}>
        {market.titleFA}
      </Typography>
      <Box sx={{ my: 2 }} className={`${styles.priceRow} ${styles.oneLineText}`}>
        <Typography variant="body2" sx={{ ml: 2 }}>
          قیمت:
        </Typography>
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {market.price}
        </Typography>
        <Typography variant="body2">{market.currency2.titleFA}</Typography>
      </Box>
    </Paper>
  );
}
