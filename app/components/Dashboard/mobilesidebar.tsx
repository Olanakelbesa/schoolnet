'use client'

import React from 'react'
import { X, Home, Mail, List, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  onClose: () => void
}

const MobileSidebar: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-transparent  bg-opacity-40 z-50">
      <div className="w-64 h-full bg-white p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-10">
            <Image src={"/logo.png"} alt="logo" width={100} height={100} />
            <X className="cursor-pointer text-[#614B7D] text-md" onClick={onClose} />
          </div>

          <div className="space-y-2">
            <MobileNavItem href="/dashboard" icon={<Home  className='text-[#b188e3] ' size={20}/>} label="Dashboard" className='text-[#614B7D]'/>
            <MobileNavItem href="/dashboard" icon={<Mail className='text-[#b188e3] ' size={20}/>} label="Inbox" className='text-[#614B7D]' />
            <MobileNavItem href="/dashboard" icon={<List className='text-[#b188e3] ' size={20}/>} label="My List" className='text-[#614B7D]'/>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="text-xs font-semibold text-gray-500 mb-2">SETTINGS</div>
          <MobileNavItem href="/settings" icon={<Settings className='text-[#b188e3] ' size={20}/>} label="Settings" className='text-[#614B7D]'/>
          <MobileNavItem href="/logout" icon={<LogOut className='text-[#b188e3] ' size={20}/>} label="Logout" className="text-red-500" />
        </div>
      </div>
    </div>
  )
}

interface MobileNavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  className?: string
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ href, icon, label, className }) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 ${className}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default MobileSidebar
