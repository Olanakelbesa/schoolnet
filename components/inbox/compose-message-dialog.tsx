"use client"

import type React from "react"

import { useState } from "react"
import { X, Paperclip, Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useInbox } from "@/contexts/inbox-context"
import { Progress } from "@/components/ui/progress"

interface ComposeMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  replyTo?: {
    id: string
    subject: string
    sender: {
      name: string
      email: string
    }
  }
}

export function ComposeMessageDialog({ open, onOpenChange, replyTo }: ComposeMessageDialogProps) {
  const { sendMessage } = useInbox()
  const [to, setTo] = useState(replyTo ? replyTo.sender.email : "")
  const [cc, setCc] = useState("")
  const [subject, setSubject] = useState(replyTo ? `Re: ${replyTo.subject}` : "")
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState<Array<{ name: string; size: string; type: string }>>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!to || !subject || !content) {
      alert("Please fill in all required fields")
      return
    }

    setIsSending(true)

    // Simulate sending delay
    setTimeout(() => {
      sendMessage({
        to: to.split(",").map((email) => email.trim()),
        cc: cc ? cc.split(",").map((email) => email.trim()) : [],
        subject,
        content,
        attachments,
      })

      // Reset form and close dialog
      setTo("")
      setCc("")
      setSubject("")
      setContent("")
      setAttachments([])
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

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compose Message</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="to" className="text-sm font-medium">
              To <span className="text-red-500">*</span>
            </label>
            <Input
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="cc" className="text-sm font-medium">
              CC
            </label>
            <Input id="cc" value={cc} onChange={(e) => setCc(e.target.value)} placeholder="cc@example.com" />
          </div>

          <div>
            <label htmlFor="subject" className="text-sm font-medium">
              Subject <span className="text-red-500">*</span>
            </label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Message subject"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="text-sm font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message here..."
              className="min-h-[200px]"
              required
            />
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="rounded-md border p-3">
              <h4 className="mb-2 text-sm font-medium">Attachments</h4>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-2">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">({file.size})</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove attachment</span>
                    </Button>
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
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Attach Files
                </div>
                <input
                  id="file-upload"
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
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
