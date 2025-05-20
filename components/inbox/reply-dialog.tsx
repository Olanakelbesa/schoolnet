"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useInbox } from "@/contexts/inbox-context"
import { Send, Paperclip } from "lucide-react"
import type { Message } from "@/types/inbox"
import { format } from "date-fns"
import { Progress } from "@/components/ui/progress"

interface ReplyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  originalMessage: Message
}

export function ReplyDialog({ open, onOpenChange, originalMessage }: ReplyDialogProps) {
  const { sendMessage } = useInbox()
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState<Array<{ name: string; size: string; type: string }>>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSending, setIsSending] = useState(false)

  // Reset content when dialog opens
  useEffect(() => {
    if (open) {
      setContent("")
      setAttachments([])
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!content) {
      alert("Please enter a message")
      return
    }

    setIsSending(true)

    // Format the reply with quoted original message
    const formattedDate = format(new Date(originalMessage.timestamp), "PPP 'at' p")
    const replyContent = `${content}\n\n---\nOn ${formattedDate}, ${originalMessage.sender.name} wrote:\n\n${originalMessage.content}`

    // Simulate sending delay
    setTimeout(() => {
      sendMessage({
        to: [originalMessage.sender.email],
        subject: `Re: ${originalMessage.subject}`,
        content: replyContent,
        attachments,
      })

      setIsSending(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Add files to attachments
    const newAttachments = Array.from(files).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type.split("/")[1] || "file",
    }))

    setAttachments((prev) => [...prev, ...newAttachments])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Reply to: {originalMessage.subject}</DialogTitle>
        </DialogHeader>

        <div className="mb-4 rounded-md border bg-gray-50 p-3 text-sm">
          <p className="font-medium">
            To: {originalMessage.sender.name} &lt;{originalMessage.sender.email}&gt;
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your reply here..."
            className="min-h-[200px]"
            required
          />

          {isUploading && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} indicatorClassName="bg-purple-600" />
            </div>
          )}

          <div className="flex justify-between">
            <div className="flex gap-2">
              <label htmlFor="reply-file-upload" className="cursor-pointer">
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Attach Files
                </div>
                <input
                  id="reply-file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSending || isUploading}>
              <Send className="mr-2 h-4 w-4" />
              {isSending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
