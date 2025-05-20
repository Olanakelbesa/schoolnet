"use client"

import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useProfile } from "@/contexts/profile-context"
import { useInbox } from "@/contexts/inbox-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { profile } = useProfile()
  const { unreadCount } = useInbox()
  const router = useRouter()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-medium text-purple-500">Welcome, {profile.userName}</h1>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full p-1 hover:bg-gray-100"
          onClick={() => router.push("/inbox")}
        >
          <Bell className="h-5 w-5 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1.5 text-xs font-medium text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={profile.userAvatar || "/placeholder.svg?height=32&width=32"} alt={profile.userName} />
            <AvatarFallback>
              {profile.userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <div className="font-medium">{profile.userName}</div>
            <div className="text-gray-500">{profile.userRole}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
