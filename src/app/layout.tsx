import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@src/components/Header/Header";
import IThemeProvider from "@src/components/ThemeContextProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Order",
  description: "A sample App to show Percentage Ordering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <IThemeProvider>
            <CssBaseline />
            <Header />
            {children}
          </IThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
