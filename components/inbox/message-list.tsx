"use client"

import type React from "react"

import { useInbox } from "@/contexts/inbox-context"
import { MessageItem } from "@/components/inbox/message-item"

interface MessageListProps {
  messages: any[]
  selectedMessageId: string | null
  onSelectMessage: (messageId: string) => void
}

export function MessageList({ messages, selectedMessageId, onSelectMessage }: MessageListProps) {
  const { markAsRead, markAsUnread, archiveMessage, deleteMessage } = useInbox()

  const handleMarkAsRead = (e: React.MouseEvent, messageId: string) => {
    e.stopPropagation()
    markAsRead(messageId)
  }

  const handleMarkAsUnread = (e: React.MouseEvent, messageId: string) => {
    e.stopPropagation()
    markAsUnread(messageId)
  }

  const handleArchive = (e: React.MouseEvent, messageId: string) => {
    e.stopPropagation()
    archiveMessage(messageId)
  }

  const handleDelete = (e: React.MouseEvent, messageId: string) => {
    e.stopPropagation()
    deleteMessage(messageId)
  }

  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isSelected={message.id === selectedMessageId}
          onSelect={() => onSelectMessage(message.id)}
          onMarkAsRead={(e) => handleMarkAsRead(e, message.id)}
          onMarkAsUnread={(e) => handleMarkAsUnread(e, message.id)}
          onArchive={(e) => handleArchive(e, message.id)}
          onDelete={(e) => handleDelete(e, message.id)}
        />
      ))}
    </div>
  )
}
