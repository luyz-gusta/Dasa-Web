import "@/app/globals.css";
import "@/app/style.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import GlobalProvider from "@/contexts/GlobalContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="rounded-2xl">
        <header className="flex min-h-16 shadow-[0_1px_4px_0_rgba(21,34,50,0.08)] items-center gap-2 bg-background py-5 px-3.5 rounded-t-2xl">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center"></div>
        </header>
        <div className="flex flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
