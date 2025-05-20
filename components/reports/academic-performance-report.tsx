"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AcademicPerformanceReportProps {
  dateRange: string
}

export function AcademicPerformanceReport({ dateRange }: AcademicPerformanceReportProps) {
  // Sample data - in a real app, this would come from an API
  const academicData = {
    averageGrade: "B+",
    gradeDistribution: {
      A: 32,
      B: 45,
      C: 18,
      D: 4,
      F: 1,
    },
    subjectPerformance: {
      Mathematics: 85,
      Science: 82,
      English: 88,
      History: 79,
      Art: 92,
    },
  }

  return (
    <Card>
      <CardHeader className="bg-purple-50">
        <CardTitle className="text-lg text-purple-700">Academic Performance</CardTitle>
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
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="subjects">By Subject</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-purple-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-700">{academicData.averageGrade}</div>
                  <div className="text-sm text-gray-500">Average Grade</div>
                </div>
              </div>
              <div className="mt-6 grid w-full grid-cols-2 gap-4">
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <div className="text-xl font-semibold text-green-600">77%</div>
                  <div className="text-xs text-gray-500">Above Average</div>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4 text-center">
                  <div className="text-xl font-semibold text-yellow-600">5%</div>
                  <div className="text-xs text-gray-500">Needs Improvement</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="distribution">
            <div className="space-y-4">
              {Object.entries(academicData.gradeDistribution).map(([grade, percentage]) => (
                <div key={grade} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Grade {grade}</span>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-purple-100">
                    <div className="h-2 rounded-full bg-purple-600" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="subjects">
            <div className="space-y-4">
              {Object.entries(academicData.subjectPerformance).map(([subject, score]) => (
                <div key={subject} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject}</span>
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
