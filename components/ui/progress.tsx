"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  function getProgressColor() {
    if (value === undefined || value === null) {
      return "bg-gray-300"; // Default color for undefined progress
    } else if (value < 33) {
      return "bg-red-500"; // Red for low progress
    } else if (value < 66) {
      return "bg-yellow-500"; // Yellow for medium progress
    } else {
      return "bg-green-500"; // Green for high progress
    }
  }
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-4 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`${getProgressColor()} h-full w-full flex-1 transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
