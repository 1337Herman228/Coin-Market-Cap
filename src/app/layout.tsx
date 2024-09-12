import type { Metadata } from "next";

import '../styles/style.scss';

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
      <body>
        {children}
      </body>
    </html>
  );
}
