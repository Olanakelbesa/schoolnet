"use client"

import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface RecentActivitySectionProps {
  hasActivity: boolean
  activities?: Array<{
    id: string
    title: string
    date: string
    content: string
  }>
  onCreatePost?: () => void
  onLearnHow?: () => void
}

export function RecentActivitySection({
  hasActivity,
  activities = [],
  onCreatePost,
  onLearnHow,
}: RecentActivitySectionProps) {
  return (
    <div className="mt-8 w-full">
      <h2 className="mb-4 text-xl font-medium text-purple-500">Recent Activity</h2>

      {hasActivity && activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardContent className="p-4">
                <h3 className="font-medium">{activity.title}</h3>
                <p className="text-sm text-gray-500">{activity.date}</p>
                <p className="mt-2">{activity.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-[#b188e3]/10 shadow-md shadow-[#b188e3]/30 ">
          <CardContent className="p-6">
            <div className="flex flex-col items-start justify-start ">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-medium">You haven't post any updates yet</h3>
              <p className="text-sm text-gray-500">Share your announcement to keep parents informed.</p>
              <div className="mt-6 flex gap-4">
                <Button className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#b188e3] hover:to-[#3F3D56]" onClick={onCreatePost}>
                  Create Your Post
                </Button>
                <Button
                  variant="outline"
                  className="border-[#b188e3] bg-transparent text-purple-700 hover:bg-purple-100"
                  onClick={onLearnHow}
                >
                  Learn How
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
