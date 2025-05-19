import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface Facility {
  id: string
  label: string
  icon: React.ReactNode
}

interface FacilityCheckboxListProps {
  facilities: Facility[]
  selectedFacilities: Record<string, boolean>
  onFacilityChange: (facilityId: string, checked: boolean) => void
}

export function FacilityCheckboxList({ facilities, selectedFacilities, onFacilityChange }: FacilityCheckboxListProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {facilities.map((facility) => (
        <div key={facility.id} className="flex items-center space-x-2">
          <Checkbox
            id={facility.id}
            checked={selectedFacilities[facility.id] || false}
            onCheckedChange={(checked) => onFacilityChange(facility.id, checked as boolean)}
            className="data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
          />
          <label
            htmlFor={facility.id}
            className="flex cursor-pointer items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <span className="text-gray-500">{facility.icon}</span>
            {facility.label}
          </label>
        </div>
      ))}
    </div>
  )
}
