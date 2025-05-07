"use client"

import type React from "react"

import { ChevronRight, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Notification {
  id: string
  title: string
  time: string
  icon?: React.ReactNode
  onClick?: () => void
}

interface NotificationCenterSectionProps {
  notifications: Notification[]
}

export function NotificationCenterSection({ notifications }: NotificationCenterSectionProps) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-medium text-purple-500">Notification Center</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="bg-[#b188e3]/10 shadow-md shadow-[#b188e3]/30 hover:bg-purple-100">
            <CardContent
              className="flex items-center justify-between px-4 cursor-pointer  transition-colors"
              onClick={notification.onClick}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  {notification.icon || <MessageSquare className="h-5 w-5 text-purple-500" />}
                </div>
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
