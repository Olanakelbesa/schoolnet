"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInbox } from "@/contexts/inbox-context"
import { Send, Paperclip } from "lucide-react"
import type { Message } from "@/types/inbox"
import { format } from "date-fns"
import { Progress } from "@/components/ui/progress"

interface ForwardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  originalMessage: Message
}

export function ForwardDialog({ open, onOpenChange, originalMessage }: ForwardDialogProps) {
  const { sendMessage } = useInbox()
  const [to, setTo] = useState("")
  const [cc, setCc] = useState("")
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState<Array<{ name: string; size: string; type: string }>>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSending, setIsSending] = useState(false)

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setTo("")
      setCc("")
      setContent("")
      // Include original attachments
      setAttachments(originalMessage.attachments || [])
    }
  }, [open, originalMessage.attachments])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!to) {
      alert("Please enter at least one recipient")
      return
    }

    setIsSending(true)

    // Format the forwarded message with original details
    const formattedDate = format(new Date(originalMessage.timestamp), "PPP 'at' p")
    const forwardContent = `${content}\n\n---------- Forwarded message ----------\nFrom: ${originalMessage.sender.name} <${originalMessage.sender.email}>\nDate: ${formattedDate}\nSubject: ${originalMessage.subject}\nTo: ${originalMessage.recipients.join(", ")}\n\n${originalMessage.content}`

    // Simulate sending delay
    setTimeout(() => {
      sendMessage({
        to: to.split(",").map((email) => email.trim()),
        cc: cc ? cc.split(",").map((email) => email.trim()) : [],
        subject: `Fwd: ${originalMessage.subject}`,
        content: forwardContent,
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
          <DialogTitle>Forward: {originalMessage.subject}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="forward-to" className="text-sm font-medium">
              To <span className="text-red-500">*</span>
            </label>
            <Input
              id="forward-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="forward-cc" className="text-sm font-medium">
              CC
            </label>
            <Input id="forward-cc" value={cc} onChange={(e) => setCc(e.target.value)} placeholder="cc@example.com" />
          </div>

          <div>
            <label htmlFor="forward-content" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="forward-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a message (optional)"
              className="min-h-[100px]"
            />
          </div>

          {/* Original attachments */}
          {attachments.length > 0 && (
            <div className="rounded-md border p-3">
              <h4 className="mb-2 text-sm font-medium">Attachments ({attachments.length})</h4>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-2">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">({file.size})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              <label htmlFor="forward-file-upload" className="cursor-pointer">
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Attach More Files
                </div>
                <input
                  id="forward-file-upload"
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
              {isSending ? "Sending..." : "Forward Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
