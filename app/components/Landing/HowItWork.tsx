import Image from "next/image"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Choose your role: Parent, School, Teacher, or Student",
      image: "/images/image1.png",
    },
    {
      number: 2,
      title: "Complete Profile",
      description: "Answer onboarding questions or set up school information",
      image: "/images/image3.png",
    },
    {
      number: 3,
      title: "Explore Schools",
      description: "Search for schools, recommendations based on your needs",
      image: "/images/image2.png",
    },
    {
      number: 4,
      title: "Connect",
      description: "Message schools or access learning materials directly",
      image: "/images/image4.png",
    },
  ]

  return (
    <div id="howitwork" className="bg-[#efeeff] px-4 py-16">
      <div className="container mx-auto">
        <h2 className="mb-10 text-center text-xl md:text-4xl font-bold">How It Works</h2>

        <div className="relative">
          {/* Dotted line connector */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 border-l-2 border-dashed border-purple-300 md:block"></div>

          <div className="space-y-16 md:space-y-32">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col gap-8 md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 md:flex md:items-center md:justify-center">
                  <div className="max-w-md">
                    <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white">
                      <span className="font-bold">#{step.number}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                <div className="relative flex-1 md:flex md:items-center md:justify-center">
                  {/* Circle connector for desktop */}
                  <div className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-purple-300 md:block"></div>

                  {/* Illustration */}
                  <div className="relative h-64 w-full max-w-sm mx-auto">
                    <Image
                      src={step.image || "/placeholder.svg"}
                      alt={`Step ${step.number}: ${step.title}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
