"use client"

import { Inbox, Search, Archive, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInbox } from "@/contexts/inbox-context"

interface EmptyInboxProps {
  filterType: string
}

export function EmptyInbox({ filterType }: EmptyInboxProps) {
  const { refreshMessages } = useInbox()

  // Determine the content based on the filter type
  const getContent = () => {
    switch (filterType) {
      case "unread":
        return {
          icon: <Search className="h-12 w-12 text-purple-300" />,
          title: "No unread messages",
          description: "You've read all your messages. Great job staying on top of things!",
        }
      case "archived":
        return {
          icon: <Archive className="h-12 w-12 text-purple-300" />,
          title: "No archived messages",
          description: "You haven't archived any messages yet. Archived messages will appear here.",
        }
      case "deleted":
        return {
          icon: <Trash className="h-12 w-12 text-purple-300" />,
          title: "No deleted messages",
          description: "Your trash is empty. Deleted messages will be stored here for 30 days.",
        }
      default:
        return {
          icon: <Inbox className="h-12 w-12 text-purple-300" />,
          title: "Your inbox is empty",
          description: "You don't have any messages yet. New messages will appear here.",
        }
    }
  }

  const content = getContent()

  return (
    <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center">
        {content.icon}
        <h3 className="mt-4 text-lg font-medium">{content.title}</h3>
        <p className="mt-2 text-sm text-gray-500">{content.description}</p>
        <Button className="mt-4 bg-purple-600 hover:bg-purple-700" onClick={refreshMessages}>
          Refresh
        </Button>
      </div>
    </div>
  )
}
