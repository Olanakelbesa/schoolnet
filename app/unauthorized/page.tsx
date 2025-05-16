"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this page. Please contact your
            administrator if you believe this is a mistake.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => router.back()}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
