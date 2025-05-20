"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Message } from "@/types/inbox"

// Sample message data
const initialMessages: Message[] = [
  {
    id: "1",
    subject: "Welcome to SchoolNet!",
    content:
      "Dear Administrator,\n\nWelcome to SchoolNet! We're excited to have you on board. This platform will help you manage your school more efficiently.\n\nTo get started, please complete your school profile and explore the various features available to you.\n\nIf you have any questions, feel free to reach out to our support team.\n\nBest regards,\nThe SchoolNet Team",
    preview: "Welcome to SchoolNet! We're excited to have you on board...",
    sender: {
      name: "SchoolNet Team",
      email: "support@schoolnet.com",
      avatar: "",
    },
    recipients: ["admin@dandibaru.edu"],
    timestamp: "2023-05-20T09:00:00Z",
    read: false,
    archived: false,
    deleted: false,
    priority: "normal",
    attachments: [
      {
        name: "getting_started_guide.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
    ],
  },
  {
    id: "2",
    subject: "Parent-Teacher Conference Schedule",
    content:
      "Hello,\n\nThe parent-teacher conferences are scheduled for next week. Please review the attached schedule and let me know if you have any conflicts.\n\nWe'll be meeting in the main conference room. Each session is allocated 20 minutes.\n\nThank you,\nPrincipal Johnson",
    preview: "The parent-teacher conferences are scheduled for next week...",
    sender: {
      name: "Principal Johnson",
      email: "principal@dandibaru.edu",
      avatar: "",
    },
    recipients: ["admin@dandibaru.edu", "teachers@dandibaru.edu"],
    timestamp: "2023-05-19T14:30:00Z",
    read: true,
    archived: false,
    deleted: false,
    priority: "high",
    attachments: [
      {
        name: "conference_schedule.xlsx",
        size: "1.2 MB",
        type: "xlsx",
      },
    ],
  },
  {
    id: "3",
    subject: "New Science Curriculum Materials",
    content:
      "Dear Colleagues,\n\nI'm pleased to share the new science curriculum materials for the upcoming academic year. These resources include lesson plans, activity guides, and assessment tools.\n\nPlease review them and provide your feedback by the end of the month.\n\nBest regards,\nDr. Martinez\nScience Department Head",
    preview: "I'm pleased to share the new science curriculum materials...",
    sender: {
      name: "Dr. Martinez",
      email: "martinez@dandibaru.edu",
      avatar: "",
    },
    recipients: ["admin@dandibaru.edu"],
    timestamp: "2023-05-18T11:15:00Z",
    read: false,
    archived: false,
    deleted: false,
    priority: "normal",
    attachments: [
      {
        name: "science_curriculum.pdf",
        size: "3.7 MB",
        type: "pdf",
      },
      {
        name: "lab_activities.docx",
        size: "1.5 MB",
        type: "docx",
      },
    ],
  },
  {
    id: "4",
    subject: "Budget Approval for Field Trip",
    content:
      "Hello Admin,\n\nI'm writing to request approval for the budget for our upcoming field trip to the Science Museum. The total cost is estimated at $1,200, which includes transportation, admission fees, and lunch for 40 students.\n\nPlease let me know if you need any additional information to process this request.\n\nThank you,\nMs. Williams\n5th Grade Teacher",
    preview: "I'm writing to request approval for the budget for our upcoming field trip...",
    sender: {
      name: "Ms. Williams",
      email: "williams@dandibaru.edu",
      avatar: "",
    },
    recipients: ["admin@dandibaru.edu", "finance@dandibaru.edu"],
    timestamp: "2023-05-17T15:45:00Z",
    read: true,
    archived: false,
    deleted: false,
    priority: "normal",
    attachments: [
      {
        name: "field_trip_budget.pdf",
        size: "0.8 MB",
        type: "pdf",
      },
    ],
  },
  {
    id: "5",
    subject: "System Maintenance Notice",
    content:
      "Dear Users,\n\nWe will be performing system maintenance this weekend, from Saturday 10 PM to Sunday 2 AM. During this time, the platform will be unavailable.\n\nWe apologize for any inconvenience this may cause and appreciate your understanding.\n\nBest regards,\nIT Support Team",
    preview: "We will be performing system maintenance this weekend...",
    sender: {
      name: "IT Support",
      email: "it@schoolnet.com",
      avatar: "",
    },
    recipients: ["all-users@dandibaru.edu"],
    timestamp: "2023-05-16T10:00:00Z",
    read: true,
    archived: true,
    deleted: false,
    priority: "normal",
    attachments: [],
  },
  {
    id: "6",
    subject: "Annual Sports Day Planning",
    content:
      "Hello Team,\n\nIt's time to start planning for our Annual Sports Day event. I've attached last year's schedule and activities list for reference.\n\nPlease share your ideas and suggestions for this year's event by the end of the week.\n\nRegards,\nPhysical Education Department",
    preview: "It's time to start planning for our Annual Sports Day event...",
    sender: {
      name: "PE Department",
      email: "pe@dandibaru.edu",
      avatar: "",
    },
    recipients: ["admin@dandibaru.edu", "teachers@dandibaru.edu"],
    timestamp: "2023-05-15T13:20:00Z",
    read: false,
    archived: false,
    deleted: false,
    priority: "normal",
    attachments: [
      {
        name: "sports_day_previous_year.docx",
        size: "1.1 MB",
        type: "docx",
      },
    ],
  },
  {
    id: "7",
    subject: "Library Book Donation",
    content:
      "Dear Administrator,\n\nWe've received a generous donation of 200 books from the local community library. These books cover various subjects and are appropriate for all grade levels.\n\nWe'll need to catalog these books and make space in our library. Could you please allocate some budget for new bookshelves?\n\nThank you,\nLibrarian",
    preview: "We've received a generous donation of 200 books from the local community library...",
    sender: {
      name: "School Librarian",
      email: "library@dandibaru.edu",
      avatar: "",
    },
    recipients: ["admin@dandibaru.edu"],
    timestamp: "2023-05-14T09:30:00Z",
    read: true,
    archived: false,
    deleted: true,
    priority: "normal",
    attachments: [
      {
        name: "book_list.xlsx",
        size: "0.5 MB",
        type: "xlsx",
      },
    ],
  },
  {
    id: "8",
    subject: "Emergency Contact Information Update",
    content:
      "Dear Parents and Guardians,\n\nWe are updating our emergency contact information database. Please review and update your contact information using the attached form.\n\nIt's crucial that we have the most current information in case of emergencies.\n\nThank you for your cooperation,\nSchool Administration",
    preview: "We are updating our emergency contact information database...",
    sender: {
      name: "School Admin",
      email: "admin@dandibaru.edu",
      avatar: "",
    },
    recipients: ["parents@dandibaru.edu"],
    timestamp: "2023-05-13T16:00:00Z",
    read: true,
    archived: false,
    deleted: false,
    priority: "high",
    attachments: [
      {
        name: "emergency_contact_form.pdf",
        size: "0.3 MB",
        type: "pdf",
      },
    ],
  },
  {
    id: "9",
    subject: "Cafeteria Menu Changes",
    content:
      "Hello Everyone,\n\nWe're making some changes to our cafeteria menu starting next month. The new menu includes more vegetarian options and locally sourced ingredients.\n\nPlease review the attached menu and share any feedback or dietary concerns.\n\nBest regards,\nCafeteria Management",
    preview: "We're making some changes to our cafeteria menu starting next month...",
    sender: {
      name: "Cafeteria Management",
      email: "cafeteria@dandibaru.edu",
      avatar: "",
    },
    recipients: ["all-users@dandibaru.edu"],
    timestamp: "2023-05-12T11:45:00Z",
    read: false,
    archived: true,
    deleted: false,
    priority: "normal",
    attachments: [
      {
        name: "new_menu.pdf",
        size: "1.0 MB",
        type: "pdf",
      },
    ],
  },
  {
    id: "10",
    subject: "Professional Development Workshop",
    content:
      "Dear Teachers,\n\nWe're organizing a professional development workshop on 'Integrating Technology in the Classroom' next month. The workshop will be conducted by education technology experts.\n\nPlease register your interest by responding to this email.\n\nRegards,\nHR Department",
    preview: "We're organizing a professional development workshop on 'Integrating Technology in the Classroom'...",
    sender: {
      name: "HR Department",
      email: "hr@dandibaru.edu",
      avatar: "",
    },
    recipients: ["teachers@dandibaru.edu"],
    timestamp: "2023-05-11T14:15:00Z",
    read: true,
    archived: false,
    deleted: false,
    priority: "normal",
    attachments: [
      {
        name: "workshop_details.pdf",
        size: "0.7 MB",
        type: "pdf",
      },
    ],
  },
]

// Define the inbox context type
interface InboxContextType {
  messages: Message[]
  totalMessages: number
  unreadCount: number
  currentFilter: string
  refreshMessages: () => void
  markAsRead: (messageId: string) => void
  markAsUnread: (messageId: string) => void
  markAllAsRead: () => void
  archiveMessage: (messageId: string) => void
  deleteMessage: (messageId: string) => void
  setFilter: (filter: string) => void
  searchMessages: (query: string) => void
  sendMessage: (message: {
    to: string[]
    cc?: string[]
    subject: string
    content: string
    attachments?: Array<{ name: string; size: string; type: string }>
  }) => void
  togglePriority: (messageId: string) => void
}

// Create the context
const InboxContext = createContext<InboxContextType | undefined>(undefined)

// Create a provider component
export function InboxProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("schoolDashboardMessages")
      return savedMessages ? JSON.parse(savedMessages) : initialMessages
    }
    return initialMessages
  })

  const [currentFilter, setCurrentFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("schoolDashboardMessages", JSON.stringify(messages))
    }
  }, [messages])

  // Filter messages based on current filter
  const filteredMessages = messages.filter((message) => {
    // First apply the filter
    const passesFilter = (() => {
      switch (currentFilter) {
        case "unread":
          return !message.read && !message.archived && !message.deleted
        case "archived":
          return message.archived && !message.deleted
        case "deleted":
          return message.deleted
        default: // "all"
          return !message.archived && !message.deleted
      }
    })()

    // Then apply the search if there is one
    if (!passesFilter) return false
    if (!searchQuery) return true

    // Search in subject, content, sender name, and sender email
    const searchLower = searchQuery.toLowerCase()
    return (
      message.subject.toLowerCase().includes(searchLower) ||
      message.content.toLowerCase().includes(searchLower) ||
      message.sender.name.toLowerCase().includes(searchLower) ||
      message.sender.email.toLowerCase().includes(searchLower)
    )
  })

  // Count total and unread messages
  const totalMessages = filteredMessages.length
  const unreadCount = messages.filter((m) => !m.read && !m.archived && !m.deleted).length

  // Refresh messages (in a real app, this would fetch from an API)
  const refreshMessages = () => {
    // For demo purposes, we'll just reset to initial messages
    setMessages(initialMessages)
  }

  // Mark a message as read
  const markAsRead = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => (message.id === messageId ? { ...message, read: true } : message)),
    )
  }

  // Mark a message as unread
  const markAsUnread = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => (message.id === messageId ? { ...message, read: false } : message)),
    )
  }

  // Mark all messages as read
  const markAllAsRead = () => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        currentFilter === "all" ||
        (currentFilter === "unread" && !message.read) ||
        (currentFilter === "archived" && message.archived) ||
        (currentFilter === "deleted" && message.deleted)
          ? { ...message, read: true }
          : message,
      ),
    )
  }

  // Archive a message
  const archiveMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => (message.id === messageId ? { ...message, archived: true } : message)),
    )
  }

  // Delete a message
  const deleteMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) => (message.id === messageId ? { ...message, deleted: true } : message)),
    )
  }

  // Set the current filter
  const setFilter = (filter: string) => {
    setCurrentFilter(filter)
  }

  // Add the search function:
  const searchMessages = (query: string) => {
    setSearchQuery(query)
  }

  const sendMessage = (message: {
    to: string[]
    cc?: string[]
    subject: string
    content: string
    attachments?: Array<{ name: string; size: string; type: string }>
  }) => {
    // Create a new message object
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2, 9), // Generate a random ID
      subject: message.subject,
      content: message.content,
      preview: message.content.substring(0, 100) + (message.content.length > 100 ? "..." : ""),
      sender: {
        name: "You", // In a real app, this would be the current user
        email: "admin@dandibaru.edu", // In a real app, this would be the current user's email
        avatar: "", // In a real app, this would be the current user's avatar
      },
      recipients: [...message.to, ...(message.cc || [])],
      timestamp: new Date().toISOString(),
      read: true, // Sent messages are automatically marked as read
      archived: false,
      deleted: false,
      priority: "normal",
      attachments: message.attachments || [],
    }

    // Add the new message to the messages array
    setMessages((prevMessages) => [newMessage, ...prevMessages])
  }

  const togglePriority = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              priority: message.priority === "high" ? "normal" : "high",
            }
          : message,
      ),
    )
  }

  // Provide the context value
  const contextValue = {
    messages: filteredMessages,
    totalMessages,
    unreadCount,
    currentFilter,
    refreshMessages,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    archiveMessage,
    deleteMessage,
    setFilter,
    searchMessages,
    sendMessage,
    togglePriority,
  }

  return <InboxContext.Provider value={contextValue}>{children}</InboxContext.Provider>
}

// Create a hook to use the inbox context
export function useInbox() {
  const context = useContext(InboxContext)
  if (context === undefined) {
    throw new Error("useInbox must be used within an InboxProvider")
  }
  return context
}
