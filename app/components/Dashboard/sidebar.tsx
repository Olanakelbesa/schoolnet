import type React from "react"
import Link from "next/link"
import { Home, Mail, List, Settings, LogOut } from "lucide-react"
import Image from "next/image"

export function Sidebar() {
  return (
    <div className="w-64 h-screen border-r p-4 hidden md:flex flex-col justify-between">
      {/* Wrapper with flex and space between sections */}
      <div className="flex flex-col h-full justify-between">
        {/* Logo Section */}
        <Link href={"/"} className="mb-8">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className=""/>
        </Link>

        {/* Navigation Links Section */}
        <div className="space-y-2">
          <NavItem href="/dashboard" icon={<Home className="h-5 w-5" />} label="Dashboard" active />
          <NavItem href="/dashboard" icon={<Mail className="h-5 w-5" />} label="Inbox" />
          <NavItem href="/dashboard" icon={<List className="h-5 w-5" />} label="My List" />
        </div>

        {/* Settings Section */}
        <div className="border-t pt-4 mt-4">
          <div className="text-xs font-semibold text-gray-500 mb-2">SETTINGS</div>
          <NavItem href="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
          <NavItem href="/login" icon={<LogOut className="h-5 w-5" />} label="Logout" className="text-red-500" />
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
  className?: string
}

function NavItem({ href, icon, label, active = false, className }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 p-2 rounded-md ${active ? "bg-gray-100" : "hover:bg-gray-100"} ${className}`}
    >
      <div className={`h-6 w-6 ${active ? "text-purple-600" : "text-gray-500"}`}>{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}
