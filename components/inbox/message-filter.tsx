"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useInbox } from "@/contexts/inbox-context"

export function MessageFilter() {
  const { setFilter } = useInbox()
  const [open, setOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
    unread: false,
    priority: false,
    hasAttachments: false,
  })

  const handleFilterChange = (key: string, checked: boolean) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: checked }))

    // Apply filters
    if (key === "unread" && checked) {
      setFilter("unread")
    } else if (key === "priority" && checked) {
      // In a real app, you would have a more sophisticated filtering system
      // that can combine multiple filters
      alert("Priority filtering would be implemented in a real app")
    } else if (key === "hasAttachments" && checked) {
      alert("Attachment filtering would be implemented in a real app")
    } else if (Object.values(selectedFilters).every((v) => !v)) {
      setFilter("all")
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          Filter
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Messages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedFilters.unread}
          onCheckedChange={(checked) => handleFilterChange("unread", checked as boolean)}
        >
          Unread
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.priority}
          onCheckedChange={(checked) => handleFilterChange("priority", checked as boolean)}
        >
          Priority
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.hasAttachments}
          onCheckedChange={(checked) => handleFilterChange("hasAttachments", checked as boolean)}
        >
          Has Attachments
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
