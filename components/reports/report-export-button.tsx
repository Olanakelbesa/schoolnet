"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ReportExportButtonProps {
  onClick: () => void
}

export function ReportExportButton({ onClick }: ReportExportButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onClick}>Export as PDF</DropdownMenuItem>
        <DropdownMenuItem onClick={onClick}>Export as Excel</DropdownMenuItem>
        <DropdownMenuItem onClick={onClick}>Export as CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
