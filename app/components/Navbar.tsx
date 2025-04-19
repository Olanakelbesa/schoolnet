"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-10 py-5 w-full h-20 bg-[#efeeff] bg-opacity-10 backdrop-blur-lg backdrop-filter fixed top-0 z-10">
        <div className="flex justify-between w-full">
          <div>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={100}
              height={50}
              className="mx-auto"
            />
          </div>

          <div className="flex gap-10 items-center hidden md:flex lg:gap-12">
            <Link
              href={"/"}
              className="hover:text-[#B188E3] focus:text-[#b188e3] focus:underline underline-offset-6 font-semibold"
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

          <div className="flex gap-10 items-center hidden md:flex lg:gap-4">
            <Link
              href={"/login"}
              className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-semibold py-1.5 px-6 rounded-lg w-full"
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
        </div>

        <div>
          <MenuIcon className="md:hidden cursor-pointer" onClick={toggleMenu} />
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-20 left-0 w-full bg-[#efeeff] shadow-md md:hidden`}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <Link
                href={"/"}
                className="hover:text-[#B188E3] focus:text-[#b188e3] font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"#about"}
                className="hover:text-[#B188E3] focus:text-[#b188e3] font-semibold"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href={"#howitwork"}
                className="hover:text-[#B188E3] focus:text-[#b188e3] font-semibold"
              >
                How It Work
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-[#B188E3] focus:text-[#b188e3] font-semibold"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href={"/login"}
                className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-semibold py-1.5 px-6 rounded-lg w-full"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href={"/signup"}
                className="border border-gradient-to-r from-[#3F3D56] to-[#B188E3] text-[#B188E3] hover:text-[#3F3D56] font-semibold py-1.5 px-4 rounded-lg w-full"
              >
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
