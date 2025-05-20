"use client"

import { AttendanceReport } from "@/components/reports/attendance-report"
import { AcademicPerformanceReport } from "@/components/reports/academic-performance-report"
import { EnrollmentReport } from "@/components/reports/enrollment-report"
import { FinancialReport } from "@/components/reports/financial-report"
import { ParentEngagementReport } from "@/components/reports/parent-engagement-report"
import { TeacherPerformanceReport } from "@/components/reports/teacher-performance-report"

interface ReportGridProps {
  filters: {
    reportType: string
    dateRange: string
    customStartDate: string
    customEndDate: string
  }
}

export function ReportGrid({ filters }: ReportGridProps) {
  // Filter reports based on selected report type
  const shouldShowReport = (reportType: string) => {
    return filters.reportType === "all" || filters.reportType === reportType
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {shouldShowReport("attendance") && <AttendanceReport dateRange={filters.dateRange} />}
      {shouldShowReport("academic") && <AcademicPerformanceReport dateRange={filters.dateRange} />}
      {shouldShowReport("enrollment") && <EnrollmentReport dateRange={filters.dateRange} />}
      {shouldShowReport("financial") && <FinancialReport dateRange={filters.dateRange} />}
      {shouldShowReport("all") && <ParentEngagementReport dateRange={filters.dateRange} />}
      {shouldShowReport("all") && <TeacherPerformanceReport dateRange={filters.dateRange} />}
    </div>
  )
}
