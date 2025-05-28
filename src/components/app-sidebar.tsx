"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Settings, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const dummyChatHistory = [
  {
    category: "Today",
    chats: [
      { id: "today-1", title: "Chia nhánh và đẩy code" },
      { id: "today-2", title: "Tạo tập dữ liệu tin nhắn" },
      { id: "today-3", title: "Sidebar ShadCN UI" },
    ],
  },
  {
    category: "Previous 7 Days",
    chats: [
      { id: "7day-1", title: "Quay lại commit gần nhất" },
      { id: "7day-2", title: "Tạo giao diện Next.js" },
      { id: "7day-3", title: "Lỗi khi tạo view" },
      { id: "7day-4", title: "Lỗi cột không tồn tại" },
      { id: "7day-5", title: "Chào và hỗ trợ" },
      { id: "7day-6", title: "Khắc phục lỗi Composer" },
      { id: "7day-7", title: "Cài đặt Yarn trên máy" },
      { id: "7day-8", title: "Giới thiệu về DeFi" },
      { id: "7day-9", title: "Quay lại commit gần nhất" },
      { id: "7day-10", title: "Tạo giao diện Next.js" },
      { id: "7day-11", title: "Lỗi khi tạo view" },
      { id: "7day-12", title: "Lỗi cột không tồn tại" },
      { id: "7day-13", title: "Chào và hỗ trợ" },
      { id: "7day-14", title: "Khắc phục lỗi Composer" },
      { id: "7day-15", title: "Cài đặt Yarn trên máy" },
      { id: "7day-16", title: "Giới thiệu về DeFi" },
    ],
  },
  {
    category: "Previous 30 Days",
    chats: [
      { id: "30day-1", title: "Lỗi kết nối API" },
      { id: "30day-2", title: "Kết nối API" },
    ],
  },
];

export function AppSidebar() {
  const handleAdd = () => {
    alert("Add new chat functionality is not implemented yet.");
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <h1 className="text-xl font-semibold">STSV.2025</h1>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        {/* Các mục cố định và Lịch sử Chat */}
        <ScrollArea className="flex-grow pr-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button
                  variant="dark"
                  onClick={handleAdd}
                >
                  <SquarePen className="w-4 h-4" />
                  <p className="font-semibold text-start ml-3">New Chat</p>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {dummyChatHistory.map((group) => (
            <SidebarGroup key={group.category} className="mt-4">
              <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4">
                {group.category}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.chats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/chat/${chat.id}`} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white truncate">

                          <span>{chat.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>

      {/* Phần Footer của Sidebar */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-between">
                  <h1>Settings</h1>
                  <Settings className="h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>
                  <Link href="/settings/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings/notifications">Notifications</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}