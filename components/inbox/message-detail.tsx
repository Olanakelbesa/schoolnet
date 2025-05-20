"use client"

import { format } from "date-fns"
import { useState, useEffect } from "react"
import { Reply, Forward, Download, Paperclip, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Message } from "@/types/inbox"
import { Badge } from "@/components/ui/badge"
import { ReplyDialog } from "@/components/inbox/reply-dialog"
import { ForwardDialog } from "@/components/inbox/forward-dialog"
import { MessageActions } from "@/components/inbox/message-actions"
import { useInbox } from "@/contexts/inbox-context"
import { Progress } from "@/components/ui/progress"

interface MessageDetailProps {
  message: Message
  onBack?: () => void
}

export function MessageDetail({ message, onBack }: MessageDetailProps) {
  // Format the date for display
  const formattedDate = format(new Date(message.timestamp), "PPP 'at' p")

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [forwardDialogOpen, setForwardDialogOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({})
  const { markAsRead } = useInbox()

  // Mark message as read when viewed - using useEffect instead of useState
  useEffect(() => {
    if (!message.read) {
      markAsRead(message.id)
    }
  }, [message.id, message.read, markAsRead])

  const handleDownload = (attachmentName: string) => {
    setIsDownloading((prev) => ({ ...prev, [attachmentName]: true }))

    // Simulate download
    setTimeout(() => {
      setIsDownloading((prev) => ({ ...prev, [attachmentName]: false }))
      alert(`Downloaded ${attachmentName}`)
    }, 1500)
  }

  return (
    <div className="rounded-lg border bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={onBack}
            aria-label="Back to message list"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium">{message.subject}</h2>
        </div>
        {message.priority === "high" && (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Priority</Badge>
        )}
      </div>

      <Separator />

      <div className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={message.sender.avatar || "/placeholder.svg?height=40&width=40"}
              alt={message.sender.name}
            />
            <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium">{message.sender.name}</h3>
                <p className="text-sm text-gray-500">{message.sender.email}</p>
              </div>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-sm text-gray-500">To:</span>
              <span className="text-sm">{message.recipients.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="p-4">
        <div className="prose max-w-none">
          {message.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-medium">Attachments ({message.attachments.length})</h4>
            <div className="space-y-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{attachment.name}</span>
                    <span className="text-xs text-gray-500">({attachment.size})</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDownload(attachment.name)}
                    disabled={isDownloading[attachment.name]}
                  >
                    {isDownloading[attachment.name] ? (
                      <div className="w-6">
                        <Progress value={66} indicatorClassName="bg-purple-600" className="h-1" />
                      </div>
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    <span className="sr-only">Download {attachment.name}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setReplyDialogOpen(true)}>
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" onClick={() => setForwardDialogOpen(true)}>
            <Forward className="mr-2 h-4 w-4" />
            Forward
          </Button>
        </div>

        <div className="flex gap-2">
          <MessageActions
            messageId={message.id}
            isRead={message.read}
            isPriority={message.priority === "high"}
            onMarkAsRead={() => {}}
            onMarkAsUnread={() => {}}
            onArchive={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>

      <ReplyDialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen} originalMessage={message} />
      <ForwardDialog open={forwardDialogOpen} onOpenChange={setForwardDialogOpen} originalMessage={message} />
    </div>
  )
}
