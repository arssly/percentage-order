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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
