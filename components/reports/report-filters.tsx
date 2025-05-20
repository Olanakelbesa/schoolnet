"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReportFiltersProps {
  filters: {
    reportType: string
    dateRange: string
    customStartDate: string
    customEndDate: string
  }
  setFilters: (filters: any) => void
}

export function ReportFilters({ filters, setFilters }: ReportFiltersProps) {
  const handleReportTypeChange = (value: string) => {
    setFilters({ ...filters, reportType: value })
  }

  return (
    <div className="flex-1">
      <Select value={filters.reportType} onValueChange={handleReportTypeChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Report Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Reports</SelectItem>
          <SelectItem value="attendance">Attendance</SelectItem>
          <SelectItem value="academic">Academic Performance</SelectItem>
          <SelectItem value="enrollment">Enrollment</SelectItem>
          <SelectItem value="financial">Financial</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
