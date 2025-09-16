import type { Metadata } from "next";
import "@/app/globals.css";
import "@/app/style.css";

export const metadata: Metadata = {
  title: "StockExpress",
  description: "AppWeb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
