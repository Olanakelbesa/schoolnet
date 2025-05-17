"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import young_man from "@/public/young-man.png";
import logo from "@/public/logo.svg";
import young from "@/public/login-image.png";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import NotificationContainer from "./Notification";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<
    {
      id: number;
      message: string;
      type: "success" | "error" | "warning" | "info";
    }[]
  >([]);
  const router = useRouter();
  const { data: session, update } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    console.log("Session state changed:", session);
    if (session?.user) {
      console.log("User session details:", {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
      });

      // If user has no role or is a new user, redirect to role selection
      if (!session.user.role || session.user.role === "user") {
        console.log("User needs role selection, redirecting...");
        router.push("/role-selection");
      } else {
        // If user already has a role, redirect to appropriate dashboard
        console.log("User has role, redirecting to dashboard...");
        if (session.user.role === "parent") {
          router.push("/dashboard");
        } else if (session.user.role === "school") {
          router.push("/school-dashboard");
        }
      }
    }
  }, [session, router]);

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

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Invalid email format";
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) return "Password is required";
    return value.length >= 8 ? "" : "Password must be at least 8 characters";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);

    setEmailError(emailValidationResult);
    setPasswordError(passwordValidationResult);

    if (!emailValidationResult && !passwordValidationResult) {
      setIsLoading(true);
      try {
        console.log("Attempting to sign in...");
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/dashboard",
        });
        console.log("Sign in result:", result);

        if (result?.error) {
          console.log("Login error:", result.error);
          // Handle specific error cases
          if (result.error.includes("Invalid email or password")) {
            addNotification(
              "Invalid email or password. Please try again.",
              "error"
            );
          } else if (result.error.includes("Invalid request")) {
            addNotification("Please check your input and try again.", "error");
          } else {
            addNotification(result.error, "error");
          }
        } else if (result?.ok) {
          console.log("Login successful, updating session...");
          addNotification("Login successful!", "success");

          // Force a session update
          const updatedSession = await update();
          console.log("Updated session:", updatedSession);

          if (updatedSession?.user) {
            console.log("Session updated successfully, checking role...");
            // If user has no role or is a new user, redirect to role selection
            if (
              !updatedSession.user.role ||
              updatedSession.user.role === "user"
            ) {
              console.log("User needs role selection, redirecting...");
              router.push("/role-selection");
            } else {
              // If user already has a role, redirect to appropriate dashboard
              console.log("User has role, redirecting to dashboard...");
              if (updatedSession.user.role === "parent") {
                router.push("/dashboard");
              } else if (updatedSession.user.role === "school") {
                router.push("/school-dashboard");
              }
            }
          } 
          // else {
          //   console.error("Session update failed:", updatedSession);
          //   addNotification(
          //     "Login successful but session not set. Please try again.",
          //     "error"
          //   );
          // }
        }
      } catch (error: any) {
        console.error("Login error:", error);
        // Handle specific error cases
        if (error.message.includes("Invalid email or password")) {
          addNotification(
            "Invalid email or password. Please try again.",
            "error"
          );
        } else if (error.message.includes("Invalid request")) {
          addNotification("Please check your input and try again.", "error");
        } else {
          addNotification(
            error.message ||
              "An error occurred during login. Please try again.",
            "error"
          );
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.scrollIntoView({ behavior: "auto", block: "center" });
    window.scrollTo({ top: window.scrollY, behavior: "auto" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Notifications */}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />

      <div className="relative block lg:hidden">
        <div className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] relative w-full h-96 rounded-b-full flex justify-center items-center">
          <h1 className="font-bold text-6xl text-white">Log In</h1>
        </div>
        <Image
          src={young}
          alt="young man"
          className="absolute top-30 right-10 w-80 md:w-96"
          width={400}
          height={400}
        />
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full lg:w-1/3 min-h-[600px] lg:min-h-screen">
          <div className="hidden lg:block">
            <Link href={"/"} className="mx-auto w-1/2 pt-8">
              <Image src={logo} alt="logo" width={200} height={200} />
            </Link>
            <h1 className="text-4xl font-bold">
              <span className="text-[#B188E3]">Welcome</span>
              <span> Back!</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full px-10">
            {/* Email Input */}
            <div className="relative flex flex-col gap-4 mt-8 mx-auto">
              <label className="absolute left-8 -top-3 bg-white px-3 font-bold text-gray-500">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isSubmitted) setEmailError(validateEmail(e.target.value));
                }}
                onFocus={handleFocus}
                placeholder="email@gmail.com"
                className={`outline-none border-2 border-gray-300 ${
                  emailError
                    ? "border-red-500"
                    : "focus:border-[#B188E3] focus:border-2 focus:shadow-lg focus:shadow-[#efe7f9]"
                } rounded-full px-3 py-3 pl-8`}
              />
              <EmailOutlined
                fontSize="small"
                className="text-gray-400 absolute top-4 left-2"
              />
            </div>
            {isSubmitted && emailError && (
              <p className="text-red-500 text-sm pl-2 pt-1">{emailError}</p>
            )}

            {/* Password Input */}
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
              <p className="text-red-500 text-sm pl-2 pt-1">{passwordError}</p>
            )}
            <Link
              href={"/forgot-pwd"}
              className="font-bold flex justify-end py-2 cursor-pointer text-[#b188e3] hover:underline w-full"
            >
              Forgot Password?
            </Link>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-bold py-3 px-10 rounded-full w-full ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div>
            <p className="text-center text-gray-500 py-8">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#B188E3] font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Desktop Image Section */}
        <div className="hidden lg:block h-screen relative lg:justify-center lg:items-center">
          <Image
            src={young_man}
            alt="young man"
            className="relative z-10 top-60 right-14 w-72"
            width={400}
            height={400}
          />
          <div className="absolute bottom-0 bg-gradient-to-r from-[#b188e3] to-[#3F3D56] lg:h-[80%] p-40 rounded-t-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
