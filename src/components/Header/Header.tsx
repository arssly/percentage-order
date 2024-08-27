"use client";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../ThemeContextProvider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import styles from "./header.module.scss";

export default function Header() {
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="relative" color="transparent">
      <Toolbar className={styles.spaceBetween}>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Link href="/" color="inherit" underline="none" component={NextLink}>
          خانه
        </Link>
      </Toolbar>
    </AppBar>
  );
}
