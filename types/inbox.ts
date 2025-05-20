export interface Message {
    id: string
    subject: string
    content: string
    preview: string
    sender: {
      name: string
      email: string
      avatar: string
    }
    recipients: string[]
    timestamp: string
    read: boolean
    archived: boolean
    deleted: boolean
    priority: "normal" | "high"
    attachments?: Array<{
      name: string
      size: string
      type: string
    }>
  }
  