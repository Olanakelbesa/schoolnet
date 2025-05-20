import type React from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
