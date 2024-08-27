import { Box } from "@mui/material";

import styles from "./error.module.scss";

export type ErrorProps = {
  message: string;
};

export default function Error({ message }: ErrorProps) {
  return <Box className={styles.error}>{message}</Box>;
}
