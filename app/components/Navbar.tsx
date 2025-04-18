import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center  px-10 py-5  w-full h-20 bg-[#efeeff] bg-opacity-10 backdrop-blur-lg backdrop-filter fixed top-0 z-10">
        <div>
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={50}
            className="mx-auto "
          />
        </div>
        <div className="flex gap-10 items-center">
          <Link
            href={"/"}
            className="hover:text-[#B188E3]  focus:text-[#b188e3] focus:underline underline-offset-6 font-semibold"
          >
            Home
          </Link>
          <Link
            href={"#about"}
            className="hover:text-[#B188E3] focus:text-[#b188e3] focus:underline underline-offset-6 font-semibold"
          >
            About Us
          </Link>
          <Link
            href={"#howitwork"}
            className="hover:text-[#B188E3] focus:text-[#b188e3] focus:underline underline-offset-6 font-semibold"
          >
            How It Work
          </Link>
          <Link
            href={"/"}
            className="hover:text-[#B188E3] focus:text-[#b188e3] focus:underline underline-offset-6 font-semibold"
          >
            Contact
          </Link>
        </div>
        <div className="flex gap-2 items-center  ">
          <Link
            href={"/login"}
            className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-semibold py-1.5 px-6 rounded-lg w-full  "
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className="border border-gradient-to-r from-[#3F3D56] to-[#B188E3] text-[#B188E3] hover:text-[#3F3D56] font-semibold py-1.5 px-4 rounded-lg w-full"
          >
            SignUp
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
