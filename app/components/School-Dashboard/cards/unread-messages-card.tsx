"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, MessagesSquare } from "lucide-react"

interface UnreadMessagesCardProps {
  count: number
  onViewInbox?: () => void
}

export function UnreadMessagesCard({ count, onViewInbox }: UnreadMessagesCardProps) {
  return (
    <Card className="flex flex-col justify-between bg-[#b188e3]/10 shadow-md shadow-[#b188e3]/30 ">
      
      <div className="w-full flex justify-between pr-8">
      <CardHeader className="pb-2 w-full">
        <CardDescription className="text-sm text-purple-400">Messages</CardDescription>
        <CardTitle className="text-lg text-purple-700">Unread Messages</CardTitle>
      </CardHeader>
        <div className="bg-[#B188E3]/10 rounded-full p-2 w-10 h-10 flex justify-center items-center ">
          <MessagesSquare className="text-[#B188E3]" />
        </div>
      </div>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm text-purple-500 font-medium">{count} new</div>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-[#B188E3] to-[#3F3D56] hover:from-[#3F3D56] hover:to-[#B188E3]" onClick={onViewInbox}>
            View Inbox
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
