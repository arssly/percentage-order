"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  direction: "rtl",
  // fix styling issue with rtl pages
  components: {
    MuiSlider: {
      styleOverrides: {
        markLabel: {
          transform: "translateX(50%)",
          top: "10",
        },
        thumb: {
          transform: "translate(50%, -50%)",
        },
        mark: {
          transform: "translate(1px, -50%)",
        },
      },
    },
  },
});

export default theme;
