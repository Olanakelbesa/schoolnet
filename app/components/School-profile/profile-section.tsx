import type React from "react"

interface ProfileSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ProfileSection({ title, description, children, className = "" }: ProfileSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h2 className="text-lg font-medium text-gray-800">{title}</h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
