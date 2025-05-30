"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LockOutlined } from "@mui/icons-material";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { resetPassword } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/slices/notificationSlice";

export default function SetNewPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState<string>("");

  const validatePassword = (value: string) => {
    if (!value.trim()) return "Password is required";
    return value.length >= 8 ? "" : "Password must be at least 8 characters";
  };

  const validateConfirmPassword = (value: string, original: string) => {
    if (!value.trim()) return "Confirm password is required";
    return value === original ? "" : "Passwords do not match";
  };

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/forgot-pwd"); // Redirect if no email found
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const passwordValidation = validatePassword(password);
    const confirmValidation = validateConfirmPassword(confirmPwd, password);

    setPasswordError(passwordValidation);
    setConfirmPwdError(confirmValidation);

    if (!passwordValidation && !confirmValidation) {
      setIsSubmitting(true);
      try {
        if (!email) {
          throw new Error(
            "Email not found. Please start the password reset process again."
          );
        }

        console.log("Submitting password reset with data:", {
          email,
          newPassword: password,
          passwordConfirm: confirmPwd,
        });

        const response = await resetPassword({
          email: email,
          newPassword: password,
          passwordConfirm: confirmPwd,
        });
        console.log("Password reset response:", response);

        // Clear stored data after successful password reset
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetToken");

        dispatch(
          addNotification({
            message: "Password updated successfully",
            type: "success",
            duration: 5000,
          })
        );
        router.push("/login");
      } catch (error: any) {
        dispatch(
          addNotification({
            message:
              error.message || "Failed to set new password. Please try again.",
            type: "error",
            duration: 5000,
          })
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.scrollIntoView({ behavior: "auto", block: "center" });
    window.scrollTo({ top: window.scrollY, behavior: "auto" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-custom-bg-image bg-cover bg-center bg-no-repeat opacity-100"
        style={{
          backgroundImage: "url('/images/reset-pwd-bg.png')",
          minHeight: "100vh",
          width: "100%",
        }}
      />

      {/* Card */}
      <div className="w-full max-w-md z-10">
        <div className="bg-white/90 backdrop-blur-sm p-8 border border-[#d5c7e6] rounded-lg z-10 mx-auto text-center py-16 px-10">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Set new Password
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Must be at least 8 characters
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password field */}
            <div className="relative flex flex-col gap-4 mt-8 mx-auto">
              <label className="absolute left-8 -top-3 bg-white px-3 font-bold text-gray-500">
                Password
              </label>
              <LockOutlined
                fontSize="small"
                className="text-gray-400 absolute top-4 left-2"
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (isSubmitted)
                    setPasswordError(validatePassword(e.target.value));
                }}
                onFocus={handleFocus}
                placeholder="Enter your password"
                className={`outline-none border-2 border-gray-300 ${
                  passwordError
                    ? "border-red-500"
                    : "focus:border-[#B188E3] focus:border-2 focus:shadow-lg focus:shadow-[#efe7f9]"
                } rounded-full px-3 py-3 pl-8`}
              />
              <div
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <BsEyeSlash size={20} className="text-[#b188e3] font-bold" />
                ) : (
                  <BsEye size={20} className="text-[#b188e3] font-bold" />
                )}
              </div>
            </div>
            {isSubmitted && passwordError && (
              <p className="text-red-500 text-sm pl-2">{passwordError}</p>
            )}

            {/* Confirm Password */}
            <div className="relative flex flex-col gap-4 mt-8 mx-auto">
              <label className="absolute left-8 -top-3 bg-white px-3 font-bold text-gray-500">
                Confirm
              </label>
              <LockOutlined
                fontSize="small"
                className="text-gray-400 absolute top-4 left-2"
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={confirmPwd}
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                  if (isSubmitted)
                    setConfirmPwdError(
                      validateConfirmPassword(e.target.value, password)
                    );
                }}
                onFocus={handleFocus}
                placeholder="Confirm password"
                className={`outline-none border-2 border-gray-300 ${
                  confirmPwdError
                    ? "border-red-500"
                    : "focus:border-[#B188E3] focus:border-2 focus:shadow-lg focus:shadow-[#efe7f9]"
                } rounded-full px-3 py-3 pl-8`}
              />
              <div
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <BsEyeSlash size={20} className="text-[#b188e3] font-bold" />
                ) : (
                  <BsEye size={20} className="text-[#b188e3] font-bold" />
                )}
              </div>
            </div>
            {isSubmitted && confirmPwdError && (
              <p className="text-red-500 text-sm pl-2">{confirmPwdError}</p>
            )}

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-bold py-3 px-10 rounded-full w-full ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Setting password..." : "Set new password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
