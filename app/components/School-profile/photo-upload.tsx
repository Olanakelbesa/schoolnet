"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, X, UploadIcon } from "lucide-react"

interface PhotoUploadProps {
  onUpload: (file: File, index: number) => void
  onRemove: (index: number) => void
  photos: Array<{ url: string; file?: File }>
  count?: number
  maxSize?: number // in MB
  format?: string
  className?: string
}

export function PhotoUpload({
  onUpload,
  onRemove,
  photos,
  count = 3,
  maxSize = 5, // 5MB
  format = "JPG or PNG",
  className = "",
}: PhotoUploadProps) {
  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      setError(`Invalid file type. Please upload ${format} files only.`)
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit.`)
      return
    }

    setError(null)
    onUpload(file, index)
  }

  const triggerFileInput = (index: number) => {
    fileInputRefs.current[index]?.click()
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Facilities Photos (Optional)</label>
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`relative flex h-32 flex-col items-center justify-center rounded-md border border-dashed p-4 text-center ${
              photos[index]?.url
                ? "border-purple-400 bg-purple-50"
                : "border-purple-300 bg-purple-50 hover:border-purple-400"
            }`}
          >
            <input
              type="file"
              ref={(el) => {
                fileInputRefs.current[index] = el
              }}
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => handleFileChange(e, index)}
            />

            {photos[index]?.url ? (
              <>
                <div className="relative h-full w-full">
                  <img
                    src={photos[index].url || "/placeholder.svg"}
                    alt={`Facility photo ${index + 1}`}
                    className="h-full w-full rounded object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={() => onRemove(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-2 text-purple-400">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-500 hover:bg-purple-100 hover:text-purple-600"
                  onClick={() => triggerFileInput(index)}
                >
                  <UploadIcon className="mr-1 h-3 w-3" />
                  Upload Photo
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">
        {format} format, max {maxSize}MB per image
      </p>
    </div>
  )
}
