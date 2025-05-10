"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOtp,
  signup,
  setLoading,
  setError,
  setVerificationMessage,
  setOtpSent,
} from "@/redux/slices/authSlice";
import { RootState, AppDispatch } from "@/redux/store";
import NotificationContainer from "./Notification";
import Image from "next/image";

function VerifyOtp() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState<
    {
      id: number;
      message: string;
      type: "success" | "error" | "warning" | "info";
    }[]
  >([]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: reduxError } = useSelector(
    (state: RootState) => state.auth
  );

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

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
      }, 5000);
    }
  };

  // Remove notification
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Update notifications for errors
  useEffect(() => {
    if (reduxError) {
      addNotification(reduxError, "error");
    }
  }, [reduxError]);

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take only the last character if multiple are pasted
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const otpArray = pastedData.split("");
      setOtp(otpArray);

      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email) {
      addNotification("Email not found", "error");
      return;
    }

    dispatch(setLoading(true));
    try {
      const result = await verifyOtp({ email, otp: otp.join("") });
      dispatch(setVerificationMessage(result.message));
      addNotification(result.message, "success");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      dispatch(setError(error.message));
      addNotification(error.message, "error");
    } finally {
      dispatch(setLoading(false));
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      addNotification("Email not found", "error");
      return;
    }

    dispatch(setLoading(true));
    try {
      // Call signup endpoint to resend OTP
      const result = await signup({
        email,
        password: "", // These fields are required by the API but not used for resending OTP
        phoneNumber: "",
        passwordConfirm: "",
      });

      dispatch(setOtpSent(true));
      setCountdown(60);
      setCanResend(false);
      addNotification("New OTP has been sent to your email", "success");
    } catch (error: any) {
      dispatch(setError(error.message));
      addNotification(error.message, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Purple background with OTP text */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-[#B188E3] to-[#3F3D56] relative overflow-hidden">
        {/* Large circle shapes */}
        <div className="absolute -top-10 right-12 w-64 h-60 rounded-full bg-purple-400 opacity-20 -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-60 rounded-full bg-purple-400 opacity-20 translate-y-1/4 -translate-x-1/4"></div>

        {/* OTP text */}
        <div className="flex items-center justify-center w-full">
          <h1 className="text-white text-6xl font-bold">OTP</h1>
        </div>
      </div>

      {/* Right side - OTP verification form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <NotificationContainer
            notifications={notifications}
            onClose={removeNotification}
          />

          {/* Envelope icon */}
          <div className="flex justify-center">
            <Image
              src="/images/email-open.png"
              alt="otp-icon"
              width={60}
              height={60}
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Enter your code
            </h2>
            <p className="mt-2 text-gray-600">
              We sent a code to <span className="font-medium">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto">
            {/* OTP input fields */}
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              ))}
            </div>

            {/* Resend link */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">
                Don't receive the email?{" "}
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-purple-600 hover:underline font-medium"
                  >
                    Click to resend
                  </button>
                ) : (
                  <span className="text-gray-400">Resend in {countdown}s</span>
                )}
              </p>
            </div>

            {/* Continue button */}
            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || otp.some((digit) => digit === "")}
                className={`w-2/3 h-12 bg-gradient-to-r from-[#B188E3] to-[#3F3D56] hover:from-[#3F3D56] hover:to-[#B188E3] text-white rounded-full ${
                  isSubmitting || otp.some((digit) => digit === "")
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? "Verifying..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
