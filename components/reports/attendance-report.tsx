"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AttendanceReportProps {
  dateRange: string
}

export function AttendanceReport({ dateRange }: AttendanceReportProps) {
  // Sample data - in a real app, this would come from an API
  const attendanceData = {
    overall: 92,
    byGrade: {
      "Grade 1": 94,
      "Grade 2": 91,
      "Grade 3": 89,
      "Grade 4": 93,
      "Grade 5": 95,
    },
    trend: [88, 90, 91, 93, 92, 94, 92],
  }

  return (
    <Card>
      <CardHeader className="bg-purple-50">
        <CardTitle className="text-lg text-purple-700">Attendance Report</CardTitle>
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
            <TabsTrigger value="by-grade">By Grade</TabsTrigger>
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
                    strokeDasharray={`${attendanceData.overall * 2.51} 251`}
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-3xl font-bold text-purple-700">{attendanceData.overall}%</div>
                  <div className="text-sm text-gray-500">Attendance</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-semibold text-green-600">96%</div>
                  <div className="text-xs text-gray-500">On Time</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-yellow-600">4%</div>
                  <div className="text-xs text-gray-500">Late</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-red-600">8%</div>
                  <div className="text-xs text-gray-500">Absent</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="by-grade">
            <div className="space-y-4">
              {Object.entries(attendanceData.byGrade).map(([grade, percentage]) => (
                <div key={grade} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{grade}</span>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-purple-100">
                    <div className="h-2 rounded-full bg-purple-600" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="trend">
            <div className="h-60">
              <div className="flex h-full items-end justify-between">
                {attendanceData.trend.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div className="w-full max-w-[30px] rounded-t bg-purple-600" style={{ height: `${value}%` }}></div>
                    <div className="mt-2 text-xs text-gray-500">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                    </div>
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
