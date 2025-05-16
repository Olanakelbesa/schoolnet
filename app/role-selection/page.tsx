"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { School, Users } from "lucide-react";
import { updateRole, updateUserRole } from "@/redux/slices/authSlice";

export default function RoleSelection() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<"parent" | "school" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user already has a role
  useEffect(() => {
    if (session?.user?.role && session.user.role !== "user") {
      console.log(
        "User already has a role, redirecting to appropriate dashboard..."
      );
      if (session.user.role === "parent") {
        router.push("/dashboard");
      } else if (session.user.role === "school") {
        router.push("/school-dashboard");
      }
    }
  }, [session, router]);

  const handleRoleSelection = async (role: "parent" | "school") => {
    setIsLoading(true);
    setError(null);
    try {
      if (!session?.user?.accessToken) {
        throw new Error("No authentication token found");
      }

      // Call the backend API to update the role using JWT token
      const response = await fetch("/api/updateRole", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({ role }),
      });

      // First check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await response.json();
      console.log("role response:", data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.data?.user?.role) {
        throw new Error("Invalid response format from server");
      }

      // Update the session with the selected role
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          role: data.data.user.role,
        },
      };

      const res = await update(updatedSession);
      console.log("session update response:", res);

      // Redirect based on role
      if (data.data.user.role === "parent") {
        router.push("/parentquestionnaire");
      } else {
        router.push("/school-dashboard");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update role"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Role
          </h1>
          <p className="text-gray-600">Select how you want to use SchoolNet</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Parent Role Card */}
          <div
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedRole === "parent"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200 hover:border-purple-400"
            }`}
            onClick={() => setSelectedRole("parent")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Parent</h2>
              <p className="text-gray-600">
                Access school information, manage your children's education, and
                connect with schools
              </p>
            </div>
          </div>

          {/* School Role Card */}
          <div
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedRole === "school"
                ? "border-purple-600 bg-purple-50"
                : "border-gray-200 hover:border-purple-400"
            }`}
            onClick={() => setSelectedRole("school")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <School className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">School</h2>
              <p className="text-gray-600">
                Manage your school profile, connect with parents, and handle
                admissions
              </p>
     