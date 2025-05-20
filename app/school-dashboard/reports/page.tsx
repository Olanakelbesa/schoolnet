"use client"

import { useState } from "react"
import { ReportFilters } from "@/components/reports/report-filters"
import { ReportGrid } from "@/components/reports/report-grid"
import { ReportExportButton } from "@/components/reports/report-export-button"
import { ReportDateRange } from "@/components/reports/report-date-range"

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    reportType: "all",
    dateRange: "month",
    customStartDate: "",
    customEndDate: "",
  })

  const handleExportReport = () => {
    // In a real app, this would generate and download a report
    alert("Report export functionality would be implemented here")
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-medium text-purple-500">School Reports</h1>
          <ReportExportButton onClick={handleExportReport} />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <ReportFilters filters={filters} setFilters={setFilters} />
          <ReportDateRange filters={filters} setFilters={setFilters} />
        </div>

        <ReportGrid filters={filters} />
      </div>
    </>
  )
}
