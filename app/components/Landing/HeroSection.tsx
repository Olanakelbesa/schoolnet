
import Image from "next/image"


export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden bg-white py-8 md:py-16 lg:py-20">

      <div className="container mx-auto px-10">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
          {/* Left content */}
          <div className="mb-10 pt-16 max-w-lg lg:mb-0 lg:max-w-xl">
            <h1 className="mb-4 text-3xl font-bold  tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Discover Your Child's Ideal School in Ethiopia—
              <span className="text-[#5a3b82] underline">Smart</span>, <span className="text-[#5a3b82] underline">Simple</span>,{" "}
              <span className="text-[#5a3b82] underline">Verified</span>.
            </h1>
            <p className="mb-8 text-lg text-gray-600">
              Verified school profiles, real parent reviews, and direct connections—all in one place.
            </p>
            <button className="flex items-center bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white font-bold py-3 px-10 rounded-lg">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m10 8 6 4-6 4V8z" />
                </svg>
              </span>
              Explore Now
            </button>
          </div>

          {/* Right content with image and floating badges */}
          <div className="relative py-5">
              <Image
                src="/image.svg"
                alt="Family looking for schools in Ethiopia"
                width={400}
                height={400}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            
          </div>
        </div>
      </div>
  )
}
