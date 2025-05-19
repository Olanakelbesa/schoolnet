import type React from "react"
import { Input } from "@/components/ui/input"

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
}

export function InputWithIcon({ icon, className = "", ...props }: InputWithIconProps) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</span>
      <Input className={`pl-10 ${className}`} {...props} />
    </div>
  )
}
