import { Button } from "@/components/ui/button"

export function HeroBanner() {
  return (
    <div className="bg-purple-600 w-90 md:w-full text-white p-6 rounded-lg mb-6 relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-xl md:text-2xl font-semibold mb-4">Find the perfect school for you</h1>
        <Button variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
          Join us Now
        </Button>
      </div>
      <div className="absolute top-0 right-0 w-full h-full opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="white" />
          <circle cx="300" cy="300" r="80" fill="white" />
        </svg>
      </div>
    </div>
  )
}
