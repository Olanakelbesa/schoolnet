"use client"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ReportDateRangeProps {
  filters: {
    reportType: string
    dateRange: string
    customStartDate: string
    customEndDate: string
  }
  setFilters: (filters: any) => void
}

export function ReportDateRange({ filters, setFilters }: ReportDateRangeProps) {
  const handleDateRangeChange = (value: string) => {
    setFilters({ ...filters, dateRange: value })
  }

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setFilters({ ...filters, customStartDate: format(date, "yyyy-MM-dd") })
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setFilters({ ...filters, customEndDate: format(date, "yyyy-MM-dd") })
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Select value={filters.dateRange} onValueChange={handleDateRangeChange}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="quarter">This Quarter</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {filters.dateRange === "custom" && (
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal sm:w-[150px]",
                  !filters.customStartDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.customStartDate ? format(new Date(filters.customStartDate), "PPP") : "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.customStartDate ? new Date(filters.customStartDate) : undefined}
                onSelect={handleStartDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal sm:w-[150px]",
                  !filters.customEndDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.customEndDate ? format(new Date(filters.customEndDate), "PPP") : "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.customEndDate ? new Date(filters.customEndDate) : undefined}
                onSelect={handleEndDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  )
}
