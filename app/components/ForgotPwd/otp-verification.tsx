"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MailOpenIcon as Envelope } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import { addNotification } from "@/redux/slices/notificationSlice";
import { forgotPassword, verifyForgotResetOtp } from "@/services/authService";

export default function OtpVerification() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      router.push("/forgot-pwd"); // Redirect if no email found
      return;
    }
    setEmail(storedEmail);
  }, [router]);

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

    try {
      const response = await verifyForgotResetOtp({
        email: email,
        otp: otp.join(""),
      });
      console.log("OTP verification response: ", response);

      // Store the password reset token if it exists in the response
      if (response.passwordResetToken) {
        localStorage.setItem("passwordResetToken", response.passwordResetToken);
        console.log(
          "Stored password reset token:",
          response.passwordResetToken
        );
      } else {
        console.error("No password reset token in response:", response);
      }

      router.push("/forgot-pwd/set-pwd");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      addNotification({
        message: error.message || "Failed to verify OTP",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await forgotPassword(email);
      addNotification({
        message: "OTP resent successfully",
        type: "success",
      });
    } catch (error: any) {
      addNotification({
        message: error.message || "Failed to resend OTP",
        type: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Left side - Purple background with OTP text */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-[#B188E3] to-[#3F3D56]  relative overflow-hidden">
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
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-purple-600 hover:underline font-medium"
                  >
                    Click to resend
                  </button>
                </p>
              </div>

              {/* Continue button */}
              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  className="w-2/3 h-12 bg-gradient-to-r from-[#B188E3] to-[#3F3D56] hover:from-[#3F3D56] hover:to-[#B188E3] text-white rounded-full"
                  disabled={isSubmitting || otp.some((digit) => digit === "")}
                >
                  {isSubmitting ? "Verifying..." : "Continue"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
