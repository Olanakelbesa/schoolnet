"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";


const authLinks = [
  {
    href: "/login",
    label: "Login",
    className:
      "bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-semibold py-1.5 px-6 rounded-lg w-full transition-all duration-700 ease-in-out",
  },
  {
    href: "/signup",
    label: "SignUp",
    className:
      "border border-[#B188E3] hover:border-[#3F3D56] text-[#B188E3] hover:text-[#3F3D56] font-semibold py-1.5 px-4 rounded-lg w-full transition-all duration-500 ease-in-out",
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-10 py-5 w-full h-20 bg-[#efeeff] bg-opacity-10 backdrop-blur-lg backdrop-filter top-0 z-50">
        <div className="flex justify-between w-full">
          <Link href={"/"}>
            <Image
              src={"/schoolnet-logo.svg"}
              alt="logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </Link>

         

          <div className="gap-10 items-center hidden md:flex lg:gap-4">
            {authLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={link.className}
              >
                {link.label}
              </Link>
            ))}
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
           
            {authLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={link.className}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
