
import Image from "next/image"
import Link from "next/link"
import { PiCompass, PiCompassRose } from "react-icons/pi"


export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden bg-[#efeeff] py-8 md:py-16 lg:py-20 lg:pl-10">

      <div className="container mx-auto px-10">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
          {/* Left content */}
          <div className="mb-10 pt-16 max-w-lg lg:mb-0 lg:max-w-xl font-poppins">
            <h1 className="mb-4 text-3xl font-bold leading-14 tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Discover Your Child's Ideal School in Ethiopia—
              <span className="text-[#5a3b82] underline">Smart</span>, <span className="text-[#5a3b82] underline">Simple</span>,{" "}
              <span className="text-[#5a3b82] underline">Verified</span>.
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Verified school profiles, real parent reviews, and direct connections—all in one place.
            </p>
            
            <Link href={"/login"} className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-bold py-3  rounded-lg w-40">
              <span className="">
                <PiCompass size={20}/>
              </span>
              Explore Now
            </Link >
          </div>

          <div className="relative py-5">
              <Image
                src="/image.png"
                alt="Family looking for schools in Ethiopia"
                width={8000}
                height={8000}
                className="h-full w-full object-cover pr-10"
                priority
              />
            </div>

            
          </div>
        </div>
      </div>
  )
}
