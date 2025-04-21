import Image from "next/image";
import React from "react";

function HowItWork() {
  return (
    <div className="mx-auto w-full bg-[#efeeff] px-4 py-10 md:py-20">
      <h1 className="text-center text-xl md:text-4xl font-bold mb-8 md:mb-16">
        How It Works
      </h1>
      <div className="w-full lg:w-[60%] mx-auto flex flex-col gap-14 md:gap-28 pt-10 md:pt-10">
        {/* Step 1 */}
        <div className="relative flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-30 z-30">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="text-xl md:text-2xl font-bold flex gap-2 justify-center lg:justify-start bg-[#efeeff] pt-14 pb-2 ">
                <span className="text-[#b188e3] ">#1</span>
                <span>Sign Up</span>
              </div>
              <div className="mt-2 flex flex-col px-10">
                <span>Choose your role: Parent, School,</span>
                <span>Teacher, or Student</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Image
                src={"/images/image1.png"}
                alt="image"
                width={300}
                height={300}
                className="w-48 md:w-64 lg:w-72"
              />
            </div>
          </div>
          <div className="hidden lg:block border-l-2 border-b-2 border-dashed border-[#b188e3] absolute top-16 left-24 w-[40%] h-72 rounded-bl-xl z-10"></div>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-30 z-30">
            <div className="order-1">
              <Image
                src={"/images/image3.png"}
                alt="image"
                width={400}
                height={400}
                className="w-64 md:w-72 lg:w-80"
              />
            </div>
            <div className="order-2 text-center lg:text-left">
              <div className="text-xl md:text-2xl font-bold flex gap-2 justify-center lg:justify-start bg-[#efeeff] py-2">
                <span className="text-[#b188e3]">#2</span>
                <span>Complete Profile</span>
              </div>
              <div className="lg:ml-10 mt-2 flex flex-col">
                <span>Answer onboarding questions or set</span>
                <span>up school information</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute right-[40%] border-r-2 border-t-2 border-b-2 w-[48%] rounded-r-xl border-dashed border-[#b188e3] h-[154.5%] z-20"></div>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-30 z-20">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="text-xl md:text-2xl font-bold flex gap-2 justify-center lg:justify-start bg-[#efeeff] py-2">
                <span className="text-[#b188e3]  ">#3</span>
                <span>Explore Schools</span>
              </div>
              <div className="px-8 mt-2 flex flex-col">
                <span>Search or receive recommendations</span>
                <span>based on your needs</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Image
                src={"/images/image2.png"}
                alt="image"
                width={300}
                height={300}
                className="w-48 md:w-64 lg:w-72"
              />
            </div>
          </div>
          <div className="hidden lg:block absolute left-24 h-[158%] border-l-2 border-b-2 boredr-t-2 w-[50%] border-dashed border-[#b188e3] rounded-l-lg z-10"></div>
        </div>

        {/* Step 4 */}
        <div className="relative flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-30 z-20">
            <div className="order-1">
              <Image
                src={"/images/image4.png"}
                alt="image"
                width={400}
                height={400}
                className="w-64 md:w-72 lg:w-80"
              />
            </div>
            <div className="order-2 text-center lg:text-left">
              <div className="text-xl md:text-2xl font-bold flex gap-2 justify-center lg:justify-start bg-[#efeeff] py-2">
                <span className="text-[#b188e3]">#4</span>
                <span>Connect</span>
              </div>
              <div className="px-4 mt-2 flex flex-col">
                <span>Message schools or access learning</span>
                <span>materials directly</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute right-[37%] -top-[23.5%] border-r-2 border-t-2 w-6 rounded-tr-xl border-dashed border-[#b188e3] h-32 z-10"></div>
        </div>
      </div>
    </div>
  );
}

export default HowItWork;