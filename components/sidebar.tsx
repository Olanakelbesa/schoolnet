"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, Users, FileText, BarChart3, Settings, HelpCircle, LogOut, Inbox } from "lucide-react"
import { useProfile } from "@/contexts/profile-context"
import { useInbox } from "@/contexts/inbox-context"

interface SidebarProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Sidebar({ activeTab = "dashboard", onTabChange }: SidebarProps) {
  const { profile } = useProfile()
  const { unreadCount } = useInbox()

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  return (
    <div className="fixed hidden h-screen w-64 flex-col border-r bg-white p-4 md:flex">
      <div className="flex items-center gap-2 py-4">
        {profile.schoolLogoUrl ? (
          <Image
            src={profile.schoolLogoUrl || "/placeholder.svg"}
            height={40}
            width={40}
            alt={profile.schoolName}
            className="h-10 w-10 rounded-md object-cover"
          />
        ) : (
          <Image
            src="/placeholder.svg?height=40&width=40"
            height={40}
            width={40}
            alt="SchoolNet Logo"
            className="h-10 w-10"
          />
        )}
        <span className="text-xl font-semibold text-purple-600">{profile.schoolName}</span>
      </div>
      <nav className="mt-8 flex flex-1 flex-col overflow-y-auto">
        <div className="space-y-1">
          <NavItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => handleTabClick("dashboard")}
            href="/"
          />
          <NavItem
            icon={<Users className="h-5 w-5" />}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => handleTabClick("profile")}
            href="/profile"
          />
          <NavItem
            icon={<FileText className="h-5 w-5" />}
            label="Posts"
            active={activeTab === "posts"}
            onClick={() => handleTabClick("posts")}
            href="/posts"
          />
          <NavItem
            icon={<Inbox className="h-5 w-5" />}
            label="Inbox"
            active={activeTab === "inbox"}
            onClick={() => handleTabClick("inbox")}
            href="/inbox"
            badge={unreadCount > 0 ? unreadCount : undefined}
          />
          <NavItem
            icon={<BarChart3 className="h-5 w-5" />}
            label="Reports"
            active={activeTab === "reports"}
            onClick={() => handleTabClick("reports")}
            href="/reports"
          />
          <NavItem
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => handleTabClick("settings")}
            href="/settings"
          />
        </div>
        <div className="mt-auto space-y-1">
          <NavItem
            icon={<HelpCircle className="h-5 w-5" />}
            label="Help/Support"
            active={activeTab === "help"}
            onClick={() => handleTabClick("help")}
            href="/help"
          />
          <NavItem
            icon={<LogOut className="h-5 w-5" />}
            label="Logout"
            active={activeTab === "logout"}
            onClick={() => handleTabClick("logout")}
            href="/logout"
          />
        </div>
      </nav>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  href: string
  badge?: number
}

function NavItem({ icon, label, active, onClick, href, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
        active ? "bg-purple-100 text-purple-700 font-medium" : "text-gray-500 hover:bg-gray-100"
      }`}
      onClick={(e) => {
        // Allow the onClick handler to work without navigating if it's just for UI state
        if (href === "#") {
          e.preventDefault()
        }
        onClick()
      }}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-600 px-1.5 text-xs font-medium text-white">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  )
}
