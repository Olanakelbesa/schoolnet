"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Archive, Flag, Trash2, Mail, MailOpen } from "lucide-react"
import { useInbox } from "@/contexts/inbox-context"

interface MessageActionsProps {
  messageId: string
  isRead: boolean
  isPriority: boolean
  onMarkAsRead: (e: React.MouseEvent) => void
  onMarkAsUnread: (e: React.MouseEvent) => void
  onArchive: (e: React.MouseEvent) => void
  onDelete: (e: React.MouseEvent) => void
  vertical?: boolean
}

export function MessageActions({
  messageId,
  isRead,
  isPriority,
  onMarkAsRead,
  onMarkAsUnread,
  onArchive,
  onDelete,
  vertical = false,
}: MessageActionsProps) {
  const { togglePriority } = useInbox()

  const handleTogglePriority = (e: React.MouseEvent) => {
    e.stopPropagation()
    togglePriority(messageId)
  }

  return (
    <TooltipProvider>
      <div className={`flex ${vertical ? "flex-col" : ""} gap-1`}>
        {isRead ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onMarkAsUnread}
                aria-label="Mark as unread"
              >
                <MailOpen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as unread</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onMarkAsRead} aria-label="Mark as read">
                <Mail className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as read</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleTogglePriority}
              aria-label={isPriority ? "Remove priority" : "Mark as priority"}
            >
              <Flag className={`h-4 w-4 ${isPriority ? "text-red-500 fill-red-500" : ""}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isPriority ? "Remove priority" : "Mark as priority"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onArchive} aria-label="Archive message">
              <Archive className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Archive</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500"
              onClick={onDelete}
              aria-label="Delete message"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
