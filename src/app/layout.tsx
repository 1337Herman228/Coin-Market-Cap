import type { Metadata } from "next";

import '../styles/style.scss';
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Coin Market App",
  description: "Coin Market App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
