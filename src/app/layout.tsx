import type { Metadata } from "next";

import '../styles/style.scss';
import StoreProvider from "./StoreProvider";
import Header from "@/components/header/Header";

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
          <Header />
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
