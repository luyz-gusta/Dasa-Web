import type { Metadata } from "next";
import "@/app/globals.css";
import "@/app/style.css";
import GlobalProvider from "@/contexts/GlobalContext";
import { AppSidebar } from "./../components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "StockExpress",
  description: "AppWeb",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning className={`antialiased`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
