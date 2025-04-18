import Image from "next/image";
import React from "react";
import young_man from "@/public/signup-image.png";
import logo from "@/public/logo.svg";

import {
  Apple,
  EmailOutlined,
  Facebook,
  Google,
  LockOutlined,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
import { BsEyeSlash } from "react-icons/bs";
import Link from "next/link";

function SignUp() {
  return (
    <div>
      <div className="relative block lg:hidden">
        <div className="bg-[#B188E3] relative w-full h-90 rounded-b-full flex justify-center items-center">
          <h1 className="font-bold text-6xl text-[#553922]">Sign-Up</h1>
        </div>
        <Image
          src={young_man}
          alt="young man"
          className="absolute top-30 left-10 w-80 md:w-96 "
        />
      </div>

      <div className="flex gap-40 justify-center lg:items-center ">
        <div className="hidden lg:block h-screen relative ">
          <Image
            src={young_man}
            alt="young man"
            className="relative z-10 top-40 left-20 w-80"
          />
          <div className="absolute bottom-0  bg-[#b188e3] lg:h-2/3 p-40 rounded-t-full"></div>
        </div>
        <div className="flex flex-col justify-center items-center w-full lg:w-1/3  h-screen ">
          <div className="hidden lg:block">
            <div className="mx-auto w-1/2 pt-8">
              <Image src={logo} alt="logo" width={200} height={200} />
            </div>
            <h1 className="text-4xl font-bold">
              <span>Create</span>{" "}
              <span className="text-[#B188E3]">Account</span>
            </h1>
          </div>
          <form action="" className=" w-full">
            <div className="px-10 ">
              <div className="relative  flex flex-col gap-4 mt-10 mx-auto ">
                <label className="absolute left-8 -top-3 bg-white px-3 font-bold text-gray-500">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="email@gmail.com"
                  className=" outline-none border focus:border-[#B188E3] focus:border-2 focus:shadow-lg focus:shadow-[#efe7f9]  rounded-full px-3 py-3 pl-8 flex items-center"
                />
                <EmailOutlined
                  fontSize="small"
                  className="text-gray-400 absolute top-4 left-2 "
                />
              </div>
              <div className="relative  flex flex-col gap-4 mt-10 mx-auto ">
                <label className="absolute left-8 -top-3 bg-white px-3 font-bold text-gray-500">
                  Phone no
                </label>
                <input
                  type="text"
                  placeholder="email@gmail.com"
                  className=" outline-none border focus:border-[#B188E3] focus:border-2 focus:shadow-lg focus:shadow-[#efe7f9]  rounded-full px-3 py-3 pl-8 flex items-center"
                />
                <PhoneAndroidOutlined
                  fontSize="small"
                  className="text-gray-400 absolute top-4 left-2 "
                />
              </div>
              <div className="relative  flex flex-col gap-4 mt-10 mx-auto ">
                <label className="absolute left-8 -top-3 bg-white px-3  font-bold text-gray-500 ">
                  Password
                </label>
                <LockOutlined
                  fontSize="small"
                  className="text-gray-400 absolute top-4 left-2 "
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className=" outline-none border focus:border-[#B188E3] focus:border-2 focus:shadow-lg focus:shadow-[#efe7f9]  rounded-full px-3 py-3 pl-8 flex items-center"
                />
                <BsEyeSlash size={20} className="absolute right-6 top-4" />
              </div>
            </div>
            <div className="flex justify-center px-10  pt-14">
              <button className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-bold py-3 px-10 rounded-full w-full">
                Create Account
              </button>
            </div>
          </form>
          <div className="flex gap-2 items-center justify-center  text-gray-500">
            <span className="font-semibold text-xl">-</span>
            <span>or</span>
            <span className="font-semibold text-xl">-</span>
          </div>
          {/* <div className="flex gap-6 items-center justify-center pt-5 text-gray-500">
            <Google />
            <Facebook />
            <Apple />
          </div> */}
          <div>
            <p className="text-center text-gray-500 py-8">
              Already have an account?{" "}
              <Link href={"/login"} className="text-[#B188E3] font-bold hover:underline">
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
