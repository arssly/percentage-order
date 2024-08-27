"use client";

import React, { useMemo, useState, createContext, PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { defaultTheme } from "@src/theme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function IThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme(
        Object.assign({}, defaultTheme, {
          palette: {
            mode,
          },
        }),
      ),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
