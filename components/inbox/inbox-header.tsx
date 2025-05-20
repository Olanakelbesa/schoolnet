"use client"

import type React from "react"

import { useState } from "react"
import { Search, RefreshCcw, MoreVertical, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useInbox } from "@/contexts/inbox-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export function InboxHeader() {
  const { refreshMessages, markAllAsRead, totalMessages, unreadCount, searchMessages } = useInbox()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    searchMessages(searchQuery)
    setTimeout(() => setIsSearching(false), 500) // Simulate search delay
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    searchMessages("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-medium text-purple-500">Inbox</h1>
          <p className="text-sm text-gray-500">
            {totalMessages} messages, {unreadCount} unread
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={refreshMessages} title="Refresh" aria-label="Refresh messages">
            <RefreshCcw className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="hidden sm:flex"
            aria-label="Mark all messages as read"
          >
            Mark All as Read
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="More options">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="sm:hidden" onClick={markAllAsRead}>
                Mark All as Read
              </DropdownMenuItem>
              <DropdownMenuItem>Export Messages</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Inbox Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search messages..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search messages"
          />
          {searchQuery && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuCheckboxItem checked>All Messages</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>With Attachments</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>High Priority</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Clear Filters</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </form>
    </div>
  )
}
