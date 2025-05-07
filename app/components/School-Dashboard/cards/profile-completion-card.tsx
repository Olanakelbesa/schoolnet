"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckOutlined, CheckRounded, ForkRight } from "@mui/icons-material"

interface ProfileCompletionCardProps {
  percentage: number
  onCompleteProfile?: () => void
}

export function ProfileCompletionCard({ percentage, onCompleteProfile }: ProfileCompletionCardProps) {
  return (
    <Card className="flex flex-col justify-between bg-[#b188e3]/10 shadow-md shadow-[#b188e3]/30 ">
      
      <div className="w-full flex justify-between pr-8">
      <CardHeader className="pb-2">
        <CardDescription className="text-sm text-purple-400">Profile</CardDescription>
        <CardTitle className="text-lg text-purple-700">Completion</CardTitle>
      </CardHeader>
        <div className="bg-[#B188E3]/10 rounded-full p-2 w-10 h-10 flex justify-center items-center ">
          <CheckOutlined className="text-[#B188E3]" />
        </div>
      </div>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm text-purple-500 font-medium">{percentage}% complete</div>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-[#B188E3] to-[#3F3D56] hover:from-[#3F3D56] hover:to-[#B188E3]" onClick={onCompleteProfile}>
            Complete Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
