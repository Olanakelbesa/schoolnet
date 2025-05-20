"use client"

import type React from "react"

import { formatDistanceToNow } from "date-fns"
import { Paperclip, Flag } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message } from "@/types/inbox"
import { cn } from "@/lib/utils"
import { MessageActions } from "@/components/inbox/message-actions"
import { Badge } from "@/components/ui/badge"

interface MessageItemProps {
  message: Message
  isSelected: boolean
  onSelect: () => void
  onMarkAsRead: (e: React.MouseEvent) => void
  onMarkAsUnread: (e: React.MouseEvent) => void
  onArchive: (e: React.MouseEvent) => void
  onDelete: (e: React.MouseEvent) => void
}

export function MessageItem({
  message,
  isSelected,
  onSelect,
  onMarkAsRead,
  onMarkAsUnread,
  onArchive,
  onDelete,
}: MessageItemProps) {
  // Format the date for display
  const formattedDate = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Check if message has attachments
  const hasAttachments = message.attachments && message.attachments.length > 0

  return (
    <div
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
        message.read ? "bg-white" : "bg-purple-50 font-medium",
        isSelected ? "border-purple-300 ring-1 ring-purple-200" : "hover:bg-gray-50",
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect()
          e.preventDefault()
        }
      }}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={message.sender.avatar || "/placeholder.svg?height=40&width=40"} alt={message.sender.name} />
        <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className={cn("truncate text-sm", !message.read && "font-medium")}>{message.sender.name}</h3>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-1">{message.subject}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 line-clamp-1">{message.preview}</p>
          <div className="flex items-center gap-1">
            {message.priority === "high" && (
              <Flag className="h-3 w-3 text-red-500 fill-red-500" aria-label="High priority" />
            )}
            {hasAttachments && <Paperclip className="h-3 w-3 text-gray-400" aria-label="Has attachments" />}
            {!message.read && <Badge className="h-2 w-2 rounded-full bg-purple-600 p-0" aria-label="Unread message" />}
          </div>
        </div>
      </div>

      <div className="ml-2 hidden flex-shrink-0 sm:flex">
        <MessageActions
          messageId={message.id}
          isRead={message.read}
          isPriority={message.priority === "high"}
          onMarkAsRead={onMarkAsRead}
          onMarkAsUnread={onMarkAsUnread}
          onArchive={onArchive}
          onDelete={onDelete}
          vertical={true}
        />
      </div>
    </div>
  )
}
