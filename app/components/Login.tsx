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
import NotificationContainer from "./Notification";
import { login, setAuth } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

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
  const dispatch = useDispatch();

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
        const data = await login(email, password);
        console.log("Login responseeee:", data);


        // Store in Redux
        dispatch(setAuth({ user: data.user, token: data.token }));

        addNotification("Login successful!", "success");

        // Redirect based on role
        if (!data.user.role || data.user.role === "user") {
          router.push("/role-selection");
        } else if (data.user.role === "parent") {
          router.push("/dashboard");
        } else if (data.user.role === "school") {
          router.push("/school-dashboard");
        }
      } catch (error: any) {
        addNotification(
          error.message || "An error occurred during login. Please try again.",
          "error"
        );
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
    <div className="min-h-screen flex flex-col w-full">
      {/* Notifications */}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />

      <div className="relative block lg:hidden">
        <div className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3]  relative w-full h-96 rounded-b-full flex justify-center items-center">
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

      <div className="flex flex-col lg:flex-row  gap-40 mx-auto w-full justify-center">
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
