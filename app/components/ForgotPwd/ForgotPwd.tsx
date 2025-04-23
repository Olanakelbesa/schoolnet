"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ForgotPwd() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  interface ValidateEmail {
    (email: string): boolean;
  }

  const validateEmail: ValidateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    // Client-side email validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    router.push("/forgot-pwd/verificationcode");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen w-full">
      <div className="w-1/2 pl-2">
        <h1 className="font-bold text-3xl text-[#5A3B82]">
          Forgot your password?
        </h1>
        <p className="flex flex-col py-2 text-gray-500">
          <span>Don’t worry. We’ll reset your password</span>
          <span>and send you a link to create a new one.</span>
        </p>
        <form className="flex gap-4 py-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-80">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="border-2 border-[#B188E3] rounded-full p-2 pl-3"
              disabled={isLoading}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-bold py-2 px-4 rounded-full disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </button>
        </form>
      </div>
      <div>
        <Image
          src="/forgot-password1.svg"
          alt="Forgot Password"
          className="text-[#5A3B82]"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}

export default ForgotPwd;
