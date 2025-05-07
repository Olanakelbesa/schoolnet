import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PasswordSuccessProps {
  redirectUrl?: string
}

export default function PasswordSuccess({ redirectUrl = "/" }: PasswordSuccessProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Background shapes */}
      <div
        className="absolute inset-0 bg-custom-bg-image bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: "url('/images/reset-pwd-bg.png')",
          minHeight: "100vh",
          width: "100%",
        }}
      />

      {/* Success message card */}
      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-10">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-xl font-medium text-[#3F3D56]">Password change successfully</h2>

            <Link href={"/login"} passHref>
              <Button className="px-8 py-2 bg-gradient-to-r from-[#B188E3] to-[#3F3D56] hover:from-[#3F3D56] hover:to-[#B188E3] text-white rounded-md">ok</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
