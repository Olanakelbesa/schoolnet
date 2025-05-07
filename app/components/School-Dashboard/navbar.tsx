"use client";

import { Bell, Menu } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  userName: string;
  userRole: string;
  userAvatar?: string;
  onMobileMenuClick?: () => void;
}

export function Navbar({
  userName,
  userRole,
  userAvatar,
  onMobileMenuClick,
}: NavbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-[#f7f3fc] px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuClick}
          className="rounded-full p-1 hover:bg-purple-100 md:hidden"
        >
          <Menu className="h-5 w-5 text-[#B188E3]" />
          <span className="sr-only">Open menu</span>
        </button>
        <h1 className="hidden md:block text-lg font-medium text-purple-500">
          Welcome, {userName}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-1 hover:bg-purple-100">
          <Bell className="h-5 w-5 text-[#B188E3]" />
          <span className="sr-only">Notifications</span>
        </button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border">
            <AvatarImage
              src={userAvatar || "/dandiboru.jpg"}
              alt={userName}
            />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-xs">
            <div className="font-medium">{userName}</div>
            <div className="text-gray-500">{userRole}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
