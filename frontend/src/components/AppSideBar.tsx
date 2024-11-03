"use client"
import { Calendar, Home, Inbox } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: Inbox,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="z-50">
      <SidebarContent className="gap-3">
        <SidebarGroup className="mt-3 gap-3">
          <SidebarGroupLabel>
            <Link href={"/"} className="flex items-center">
              <Image
                alt="AdminDash Logo"
                width={300}
                height={400}
                src={logo}
                className="max-h-14  max-w-14"
              />
              <span className="text-3xl hover:text-gray-600 text-black font-bold tracking-tighter ">
                AdminDash
              </span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-3">
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton
                    className={`${
                      pathname == item.url && " bg-[#d9f3ee] "
                    } h-full w-full p-3 hover:bg-[#75ddc8]`}
                    asChild
                  >
                    <Link
                      className="relative text-xl tracking-tighter block after:block after:content-[''] after:absolute after:mt-9 after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-90 after:transition after:duration-300 after:origin-left"
                      href={item.url}
                    >
                      <div className="flex gap-6 items-center">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
