"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EnrollmentReportProps {
  dateRange: string
}

export function EnrollmentReport({ dateRange }: EnrollmentReportProps) {
  // Sample data - in a real app, this would come from an API
  const enrollmentData = {
    totalStudents: 1250,
    newEnrollments: 45,
    withdrawals: 12,
    byGrade: {
      Kindergarten: 120,
      "Grade 1": 115,
      "Grade 2": 118,
      "Grade 3": 125,
      "Grade 4": 130,
      "Grade 5": 122,
      "Grade 6": 135,
      "Grade 7": 128,
      "Grade 8": 132,
      "Grade 9": 125,
      "Grade 10": 130,
    },
    trend: [1200, 1210, 1225, 1240, 1250],
  }

  return (
    <Card>
      <CardHeader className="bg-purple-50">
        <CardTitle className="text-lg text-purple-700">Enrollment Report</CardTitle>
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
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg bg-purple-50 p-4">
                <div className="text-2xl font-bold text-purple-700">{enrollmentData.totalStudents}</div>
                <div className="text-xs text-gray-500">Total Students</div>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <div className="text-2xl font-bold text-green-600">+{enrollmentData.newEnrollments}</div>
                <div className="text-xs text-gray-500">New Enrollments</div>
              </div>
              <div className="rounded-lg bg-red-50 p-4">
                <div className="text-2xl font-bold text-red-600">-{enrollmentData.withdrawals}</div>
                <div className="text-xs text-gray-500">Withdrawals</div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border p-4">
              <h4 className="mb-2 text-sm font-medium">Enrollment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gender Ratio:</span>
                  <span>52% Female, 48% Male</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Class Size:</span>
                  <span>24 Students</span>
                </div>
                <div className="flex justify-between">
                  <span>Student-Teacher Ratio:</span>
                  <span>18:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity Utilization:</span>
                  <span>92%</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="by-grade">
            <div className="h-60 overflow-y-auto pr-2">
              <div className="space-y-3">
                {Object.entries(enrollmentData.byGrade).map(([grade, count]) => (
                  <div key={grade} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{grade}</span>
                      <span className="text-sm font-medium">{count} students</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-purple-100">
                      <div
                        className="h-2 rounded-full bg-purple-600"
                        style={{ width: `${(count / 150) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="trend">
            <div className="h-60">
              <div className="flex h-full items-end justify-between">
                {enrollmentData.trend.map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div
                      className="w-full max-w-[40px] rounded-t bg-purple-600"
                      style={{ height: `${(value / 1300) * 100}%` }}
                    ></div>
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
