"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import young_man from "@/public/signup-image.png";
import logo from "@/public/logo.png";
import {
  EmailOutlined,
  PhoneAndroidOutlined,
  LockOutlined,
} from "@mui/icons-material";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/redux/slices/authSlice";
import { RootState, AppDispatch } from "@/redux/store";
import NotificationContainer from "./Notification"; // Adjust the path as needed

function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notifications, setNotifications] = useState<
    {
      id: number;
      message: string;
      type: "success" | "error" | "warning" | "info";
    }[]
  >([]);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error: reduxError,
    verificationMessage,
  } = useSelector((state: RootState) => state.auth);

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

  // Clear verification message when the component is mounted
  useEffect(() => {
    dispatch({ type: "auth/clearAuth" });
  }, [dispatch]);

  // Update notifications for errors and verification message
  useEffect(() => {
    if (reduxError) {
      addNotification(reduxError, "error");
    }
    if (verificationMessage) {
      addNotification(verificationMessage, "info"); // Changed to 'info' for clarity
      setTimeout(() => {
        router.push("/verify-email"); // Redirect to email verification page
      }, 2000); // Delay for user to read the notification
    }
  }, [reduxError, verificationMessage, router]);

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Invalid email format";
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) return "Phone number is required";
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value) ? "" : "Invalid 10-digit phone number";
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) return "Password is required";
    return value.length >= 8 ? "" : "Password must be at least 8 characters";
  };

  const validateConfirmPassword = (value: string, original: string) => {
    if (!value.trim()) return "Confirm password is required";
    return value === original ? "" : "Passwords do not match";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const emailValidation = validateEmail(email);
    const phoneValidation = validatePhone(phone);
    const passwordValidation = validatePassword(password);
    const confirmValidation = validateConfirmPassword(confirmPwd, password);

    setEmailError(emailValidation);
    setPhoneError(phoneValidation);
    setPasswordError(passwordValidation);
    setConfirmPwdError(confirmValidation);

    if (
      !emailValidation &&
      !phoneValidation &&
      !passwordValidation &&
      !confirmValidation
    ) {
      await dispatch(
        signup({
          email,
          password,
          phoneNumber: phone,
          passwordConfirm: confirmPwd,
        })
      );
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.scrollIntoView({ behavior: "auto", block: "center" });
    window.scrollTo({ top: window.scrollY, behavior: "auto" });
  };

  return (
    <div className="flex flex-col">
      {/* Notifications */}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />

      <div className="relative block lg:hidden">
        <div className="bg-gradient-to-r from-[#3F3D56] to-[#b188e3] relative w-full h-96 rounded-b-full flex justify-center items-center">
          <h1 className="font-bold text-6xl text-white">Sign-Up</h1>
        </div>
        <Image
          src={young_man}
          alt="young man"
          className="absolute top-32 left-10 w-80 md:w-96"
          width={400}
          height={400}
        />
      </div>

      <div className="flex gap-40 justify-center lg:items-center flex-1">
        <div className="hidden lg:block h-screen relative">
          <Image
            src={young_man}
            alt="young man"
            className="relative z-10 top-52 left-14 w-90"
            width={400}
            height={400}
          />
          <div className="absolute -bottom-7 bg-gradient-to-r from-[#48484b] to-[#b188e3] lg:h-[85%] p-40 rounded-t-full"></div>
        </div>

        <div className="flex flex-col justify-center items-center w-full lg:w-1/3 min-h-[700px] lg:min-h-screen login-form-container pb-20">
          <div className="hidden lg:block mx-auto">
            <Link href={"/"} className="mx-auto w-1/2 py-5 flex justify-center">
              <Image src={logo} alt="logo" width={150} height={150} />
            </Link>
            <h1 className="text-4xl font-bold pt-6">
              <span className="text-[#B188E3]">Create</span>{" "}
              <span>Account</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="w-full px-10">
            {/* Email */}
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
                placeholder="email@example.com"
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
              <p className="text-red-500 text-sm pl-2">{emailError}</p>
            )}

            {/* Phone */}
            <div className="relative flex flex-col gap-4 mt-8 mx-auto">
              <label className="absolute left-8 -top-3 bg-white px-3 font-bold text-gray-500">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (isSubmitted) setPhoneError(validatePhone(e.target.value));
                }}
                onFocus={handleFocus}
                placeholder="1234567890"
                className={`outline-none border-2 border-gray-300 ${
                  phoneError
                    ? "border-red-500"
                    : "focus:border-[#B188E3] focus:border-2 focus:shadow-lg focus:shadow-[#efe7f9]"
                } rounded-full px-3 py-3 pl-8`}
              />
              <PhoneAndroidOutlined
                fontSize="small"
                className="text-gray-400 absolute top-4 left-2"
              />
            </div>
            {isSubmitted && phoneError && (
              <p className="text-red-500 text-sm pl-2">{phoneError}</p>
            )}

            {/* Password */}
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

            {/* Submit */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-bold py-3 px-10 rounded-full w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div>
            <p className="text-center text-gray-500 py-8">
              Already have an account?
              <Link
                href={"/login"}
                className="text-[#B188E3] font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
