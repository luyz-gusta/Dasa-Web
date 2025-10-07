"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import DashboardIcon from "@/components/icons/Dashboard";
import BoxIcon from "@/components/icons/Box";
import TagIcon from "@/components/icons/Tag";
import PackageIcon from "@/components/icons/Package";
import UsersIcon from "@/components/icons/Users";
import TrendingUpIcon from "@/components/icons/TrendingUp";
import UserIcon from "@/components/icons/User";
import SettingsIcon from "@/components/icons/Settings";
import Image from "next/image";

// Menu items
const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: DashboardIcon,
  },
  {
    title: "Material",
    url: "/material",
    icon: BoxIcon,
    badge: "10",
  },
  {
    title: "Tipo material",
    url: "/tipo-material",
    icon: TagIcon,
  },
  {
    title: "Estoque",
    url: "/estoque",
    icon: PackageIcon,
  },
  {
    title: "Usuários",
    url: "/usuarios",
    icon: UsersIcon,
  },
  {
    title: "Tipo movimentação",
    url: "/tipo-movimentacao",
    icon: TrendingUpIcon,
  },
];

// Settings items
const settingsItems = [
  {
    title: "Conta",
    url: "/conta",
    icon: UserIcon,
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: SettingsIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center justify-center px-4 py-3">
          <Image
            src="/logo-menu.svg"
            alt="StockExpress Logo"
            width={240}
            height={64}
            className="shrink-0 group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="py-5 flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === `/admin${item.url}`;
            return (
              <SidebarMenuItem key={item.title} className="rounded-lg">
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "relative rounded-lg text-general-80 hover:bg-primary-90 hover:text-general-30 transition-all duration-150",
                    isActive && "!text-white !bg-primary-100"
                  )}
                >
                  <Link
                    href={`/admin/${item.url}`}
                    className="flex items-center gap-3 py-6 px-4"
                  >
                    <item.icon className="h-8 w-8" height={24} width={24} />
                    <span className="flex-1">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <div className="px-2 py-2">
          <p className="text-xs text-muted-foreground font-medium mb-2 group-data-[collapsible=icon]:hidden">
            Settings
          </p>
          <SidebarMenu>
            {settingsItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      isActive && "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
