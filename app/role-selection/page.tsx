"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { School, Users } from "lucide-react";
import {
  updateUserRole,
  updateRole,
  setRoleUpdateRetries,
} from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";

export default function RoleSelection() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  console.log("Role Selection - Current user from Redux:", user);

  const [selectedRole, setSelectedRole] = useState<"parent" | "school" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Check if user should be on this page
  useEffect(() => {
    console.log("Role Selection - User:", user);
    if (user?.role && user.role !== "user") {
      console.log("Role Selection - User already has role:", user.role);
      if (user.role === "parent") {
        router.push("/parentquestionnaire");
      } else if (user.role === "school") {
        router.push("/school-dashboard");
      }
    }
  }, [user, router]);

  const handleRoleSelection = async (role: "parent" | "school") => {
    console.log("Role Selection - Starting role selection for:", role);
    setSelectedRole(role);
    setIsLoading(true);
    setError(null);
    setRetryCount(0);

    try {
      if (!token) throw new Error("No authentication token found");

      // Update the role in the backend
      const response = await updateRole(role);
      console.log("Role Selection - Role updated successfully:", response);

      // Update Redux state with the new role from backend response
      if (response?.data?.user) {
        console.log(
          "Role Selection - Updating Redux with user:",
          response.data.user
        );
        dispatch(updateUserRole(response.data.user.role));
        dispatch(setRoleUpdateRetries(0));

        // Redirect based on role from backend response
        if (response.data.user.role === "parent") {
          console.log("Role Selection - Redirecting to parent questionnaire");
          // Force a hard navigation to ensure the page reloads
          window.location.href = "/parentquestionnaire";
        } else if (response.data.user.role === "school") {
          console.log("Role Selection - Redirecting to school dashboard");
          window.location.href = "/school-dashboard";
        }
      } else {
        console.log("Role Selection - No user data in response:", response);
        setError("Failed to update role. Please try again.");
      }
    } catch (error) {
      console.error("Role Selection - Error updating role:", error);
      setRetryCount((prev) => prev + 1);
      dispatch(setRoleUpdateRetries(retryCount + 1));

      if (retryCount >= 1) {
        setError(
          error instanceof Error
            ? `Failed to update role after multiple attempts: ${error.message}`
            : "Failed to update role. Please try again later."
        );
      } else {
        setError(
          error instanceof Error
            ? `Failed to update role: ${error.message}. Retrying...`
            : "Failed to update role. Retrying..."
        );
        // Retry automatically after 1 second
        setTimeout(() => handleRoleSelection(role), 1000);
      }
    } finally {
      if (retryCount >= 1) {
        setIsLoading(false);
      }
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
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => selectedRole && handleRoleSelection(selectedRole)}
            disabled={!selectedRole || isLoading}
            className="w-full md:w-auto bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white"
          >
            {isLoading ? "Processing..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
