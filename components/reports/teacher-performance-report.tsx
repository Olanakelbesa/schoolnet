"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TeacherPerformanceReportProps {
  dateRange: string
}

export function TeacherPerformanceReport({ dateRange }: TeacherPerformanceReportProps) {
  // Sample data - in a real app, this would come from an API
  const teacherData = {
    totalTeachers: 65,
    averageRating: 4.2,
    topPerformers: [
      { name: "Ms. Johnson", subject: "Mathematics", rating: 4.9 },
      { name: "Mr. Williams", subject: "Science", rating: 4.8 },
      { name: "Mrs. Davis", subject: "English", rating: 4.7 },
    ],
    performanceMetrics: {
      "Student Achievement": 85,
      "Classroom Management": 88,
      "Parent Satisfaction": 90,
      "Professional Development": 82,
      "Curriculum Implementation": 86,
    },
  }

  return (
    <Card>
      <CardHeader className="bg-purple-50">
        <CardTitle className="text-lg text-purple-700">Teacher Performance</CardTitle>
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
            <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-purple-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-700">{teacherData.averageRating}</div>
                  <div className="text-sm text-gray-500">Average Rating</div>
                </div>
              </div>
              <div className="mt-6 grid w-full grid-cols-2 gap-4">
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <div className="text-xl font-semibold text-purple-600">{teacherData.totalTeachers}</div>
                  <div className="text-xs text-gray-500">Total Teachers</div>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <div className="text-xl font-semibold text-green-600">92%</div>
                  <div className="text-xs text-gray-500">Retention Rate</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="top-performers">
            <div className="space-y-4">
              {teacherData.topPerformers.map((teacher, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{teacher.name}</h4>
                      <p className="text-sm text-gray-500">{teacher.subject}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {teacher.rating}
                    </div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-purple-100">
                    <div
                      className="h-2 rounded-full bg-purple-600"
                      style={{ width: `${(teacher.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button className="text-sm font-medium text-purple-600 hover:text-purple-700">View All Teachers</button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="metrics">
            <div className="space-y-4">
              {Object.entries(teacherData.performanceMetrics).map(([metric, score]) => (
                <div key={metric} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric}</span>
                    <span className="text-sm font-medium">{score}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-purple-100">
                    <div className="h-2 rounded-full bg-purple-600" style={{ width: `${score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
