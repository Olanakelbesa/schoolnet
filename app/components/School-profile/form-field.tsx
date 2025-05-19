import type React from "react"

interface FormFieldProps {
  label: string
  htmlFor: string
  required?: boolean
  children: React.ReactNode
  className?: string
  description?: string
}

export function FormField({ label, htmlFor, required = false, children, className = "", description }: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
        {!required && label.toLowerCase() !== "facilities" && label.toLowerCase() !== "social media" && (
          <span className="ml-1 text-gray-400">(optional)</span>
        )}
      </label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      {children}
    </div>
  )
}
