"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NotificationContainer from "../Notification";
import { forgotPassword } from "@/redux/slices/authSlice";

export default function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notifications, setNotifications] = useState<
    {
      id: number;
      message: string;
      type: "success" | "error" | "warning" | "info";
    }[]
  >([]);
  const router = useRouter();

  // Generate unique ID for notifications
  const generateId = () => Math.floor(Math.random() * 1000000);

  // Add notification with optional auto-dismiss
  const addNotification = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    const id = generateId();
    setNotifications((prev) => [...prev, { id, message, type }]);
    if (type !== "error") {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000); // Auto-dismiss after 5 seconds for non-error notifications
    }
  };

  // Remove notification
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Invalid email format";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsSubmitting(true);

    const emailValidationResult = validateEmail(email);
    setEmailError(emailValidationResult);

    if (!emailValidationResult) {
      try {
        await forgotPassword(email);
        addNotification("Reset link sent to your email", "success");
        router.push("/forgot-pwd/verify"); // Use router for navigation
      } catch (error: any) {
        addNotification(error.message, "error");
      }
    }
    setIsSubmitting(false);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.scrollIntoView({ behavior: "auto", block: "center" });
    window.scrollTo({ top: window.scrollY, behavior: "auto" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Notifications */}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />

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
      <div className="bg-white/90 backdrop-blur-sm p-8 border bordder-[#d5c7e6] rounded-lg z-10 mx-auto text-center py-24 px-14">
        <h1 className="text-2xl font-bold mb-2">Reset your Password</h1>
        <p className="text-gray-600 mb-6">
          We will send you an email to reset your password
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isSubmitted) setEmailError(validateEmail(e.target.value));
              }}
              onFocus={handleFocus}
              placeholder="Email"
              className={`outline-none border-2 border-gray-300 w-full ${
                emailError
                  ? "border-red-500"
                  : "focus:border-[#B188E3] focus:border-2 focus:shadow-lg focus:shadow-[#efe7f9]"
              } rounded-lg p-2 pl-8`}
            />
            {isSubmitted && emailError && (
              <p className="text-red-500 text-sm pl-2 pt-1 text-left">
                {emailError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#5a3b82] hover:bg-[#4a2e69] text-white p-2 rounded-md ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
