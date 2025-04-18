import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsCompass } from "react-icons/bs";

function HeroSection() {
  return (
    <div id="hero" className="flex gap-10 py-30 px-20 items-center bg-[#efeeff] h-screen ">
      <div className="flex items-start flex-col gap-8 px-20 lg:w-1/2">
        <h1 className="text-4xl">
          <span className=" font-bold">
            Discover Your Child’s Ideal School in Ethiopia—
          </span>
          <span className=" font-bold underline text-[#5A3B82]"> Smart</span>,
          <span className=" font-bold underline text-[#5A3B82]"> Simple</span>,
          <span className=" font-bold underline text-[#5A3B82]"> Verified</span>.
        </h1>
        <p className="text-gray-500 font-2xl ">Verified school profiles, real parent reviews, and direct connections—all in one place.</p>
        <Link href="/" className="flex items-center gap-3 bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-bold py-3 px-10 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
        <BsCompass/>
        <span>Explore</span>
        </Link>
      </div>
      <div>
        <Image src={"/image.svg"} alt="image" width={600} height={600} />
      </div>
    </div>
  );
}

export default HeroSection;
