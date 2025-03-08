"use client";

import * as React from "react";
import {
  BookOpenCheck,
  ChartNoAxesCombined,
  ClipboardList,
  Heart,
  MessageCircle,
  Settings,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Listings",
      url: "/user/dashboard/listing",
      icon: ClipboardList,
    },
    {
      title: "Wish List",
      url: "/user/dashboard/wish",
      icon: Heart,
    },
    {
      title: "Sales-History",
      url: "/user/dashboard/sales-history",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Purchases-History",
      url: "/user/dashboard/purchases-history",
      icon: BookOpenCheck,
    },
    {
      title: "Conversation",
      url: "/messages",
      icon: MessageCircle,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-gray-900 ">
      <SidebarHeader className="p-4 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-2">
                <h2 className="font-bold text-xl">Restore</h2>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
