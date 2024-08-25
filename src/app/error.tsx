"use client";

import { Box } from "@mui/material";

import styles from "./error.module.scss";

export default function Error() {
  const errorMessage = "مشکلی در دریافت داده پیش امده است لطفا بعدا دوباره تلاش کنید";
  return <Box className={styles.error}>{errorMessage}</Box>;
}
