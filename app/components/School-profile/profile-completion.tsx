"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProfileCompletionProps {
  percentage: number;
  onSave: () => void;
}

export function ProfileCompletion({
  percentage,
  onSave,
}: ProfileCompletionProps) {
  // Determine status text and color based on percentage
  const getStatusInfo = () => {
    if (percentage < 30) {
      return { text: "Just Started", color: "text-red-600" };
    } else if (percentage < 70) {
      return { text: "In Progress", color: "text-yellow-600" };
    } else if (percentage < 100) {
      return { text: "Almost Complete", color: "text-green-600" };
    } else {
      return { text: "Complete", color: "text-green-600" };
    }
  };

  const { text, color } = getStatusInfo();

  // Determine progress bar color based on percentage
  const getProgressColor = () => {
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="text-sm font-medium text-gray-700">
            Profile Completion
          </span>
          <div className="pr-4">
            <span className={`text-sm font-medium ${color}`}>
              {percentage}%
            </span>
            <span className={`ml-1 text-xs ${color}`}>({text})</span>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-[#B188E3] to-[#3F3D56] hover:from-[#3F3D56] hover:to-[#B188E3]" onClick={onSave}>
          Save Changes
        </Button>
      </div>
      <Progress
        value={percentage}
        className={` w-full bg-purple-100 `}
      />
      {percentage < 100 && (
        <p className="text-xs text-gray-500">
          Complete your profile to improve visibility and provide better
          information to parents and students.
        </p>
      )}
    </div>
  );
}
