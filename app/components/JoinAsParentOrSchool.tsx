"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { School, User } from "lucide-react";
import { PiGreaterThan } from "react-icons/pi";

export default function UserTypeSelection() {
  const [userType, setUserType] = useState<"parent" | "school" | null>(null);
  const router = useRouter();

  const handleQuestionnaire = () => {
    if (!userType) return;

    // Navigate to the appropriate registration form based on user type
    router.push(`/parentquestionnaire/question`);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute top-10 left-10 w-1/2 flex justify-start mb-8"
      >
        <Image
          src="/logo.png"
          alt="SchoolNet Logo"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </Link>
      <div className="w-full max-w-md">
        {/* Logo */}

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-2xl font-medium text-center">
            Which one are you?
          </h1>
          <p className="text-center text-gray-600">
            Are you looking to find a school for your child or are you a school
            looking to connect with parents
          </p>

          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <Card
              className={`flex flex-col items-center justify-center p-6 cursor-pointer border-2 transition-all ${
                userType === "parent"
                  ? " bg-[#5a3b82]/90 text-white"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setUserType("parent")}
            >
              <User className="h-6 w-6 mb-2" />
              <span className="font-medium">Parent</span>
            </Card>

            <Card
              className={`flex flex-col items-center justify-center p-6 cursor-pointer border-2 transition-all ${
                userType === "school"
                  ? "bg-[#5a3b82]/90 text-white"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setUserType("school")}
            >
              <School className="h-6 w-6 mb-2 " />
              <span className="font-medium">School</span>
            </Card>
          </div>
          <div className="flex flex-col items-center space-y-4 pt-10">
            {/* Create Account Button */}
            <Button
              className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white px-6 py-4 rounded-lg h-10 w-full flex items-center justify-center gap-2"
              onClick={handleQuestionnaire}
              disabled={!userType}
            >
              Next 
              <PiGreaterThan className="font-bold"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
