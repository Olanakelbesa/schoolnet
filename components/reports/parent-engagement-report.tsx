"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ParentEngagementReportProps {
  dateRange: string
}

export function ParentEngagementReport({ dateRange }: ParentEngagementReportProps) {
  // Sample data - in a real app, this would come from an API
  const engagementData = {
    totalParents: 950,
    activeParents: 720,
    appUsage: 76,
    meetingAttendance: 68,
    communicationStats: {
      "Messages Sent": 1250,
      "Messages Read": 1150,
      "Responses Received": 820,
      "Forms Completed": 680,
    },
    engagementTrend: [65, 68, 72, 75, 76],
  }

  return (
    <Card>
      <CardHeader className="bg-purple-50">
        <CardTitle className="text-lg text-purple-700">Parent Engagement</CardTitle>
        <CardDescription>
          {dateRange === "week"
            ? "This Week"
            : dateRange === "month"
              ? "This Month"
              : dateRange === "quarter"
                ? "This Quarter"
                : dateRange === "year"
                  ? "This Year"
                  : "Custom Date Range"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="trend">Trend</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="stroke-current text-purple-100"
                    strokeWidth="10"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="stroke-current text-purple-600"
                    strokeWidth="10"
                    strokeDasharray={`${engagementData.appUsage * 2.51} 251`}
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-3xl font-bold text-purple-700">{engagementData.appUsage}%</div>
                  <div className="text-sm text-gray-500">App Usage</div>
                </div>
              </div>
              <div className="mt-4 grid w-full grid-cols-2 gap-4">
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <div className="text-xl font-semibold text-purple-600">
                    {Math.round((engagementData.activeParents / engagementData.totalParents) * 100)}%
                  </div>
                  <div className="text-xs text-gray-500">Active Parents</div>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <div className="text-xl font-semibold text-blue-600">{engagementData.meetingAttendance}%</div>
                  <div className="text-xs text-gray-500">Meeting Attendance</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="communication">
            <div className="space-y-4">
              {Object.entries(engagementData.communicationStats).map(([metric, value]) => (
                <div key={metric} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-purple-100">
                    <div
                      className="h-2 rounded-full bg-purple-600"
                      style={{
                        width: `${
                          metric === "Messages Sent"
                            ? (value / 1500) * 100
                            : metric === "Messages Read"
                              ? (value / 1250) * 100
                              : metric === "Responses Received"
                                ? (value / 1150) * 100
                                : (value / 950) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="trend">
            <div className="h-60">
              <div className="flex h-full items-end justify-between">
                {engagementData.engagementTrend.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div className="w-full max-w-[40px] rounded-t bg-purple-600" style={{ height: `${value}%` }}></div>
                    <div className="mt-2 text-xs text-gray-500">{["Jan", "Feb", "Mar", "Apr", "May"][index]}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
