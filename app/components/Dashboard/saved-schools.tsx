import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SchoolCardProps {
  image: string
  category: string
  name: string
  rating: number
}

function SchoolCard({ image, category, name, rating }: SchoolCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="aspect-video relative">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="text-xs text-purple-600 uppercase mb-1">{category}</div>
        <div className="font-medium mb-2">{name}</div>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={i < rating ? "currentColor" : "none"}
              stroke={i < rating ? "none" : "currentColor"}
              strokeWidth="1.5"
              className={`h-4 w-4 ${i < rating ? "text-purple-600" : "text-gray-300"}`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        <div className="bg-purple-600 h-1 w-full rounded-full"></div>
      </div>
    </div>
  )
}

export function SavedSchools() {
  const schools = [
    {
      id: 1,
      image: "/images/school.png",
      category: "School Event",
      name: "Addis International School",
      rating: 4,
    },
    {
      id: 2,
      image: "/images/school.png",
      category: "School Event",
      name: "Addis International School",
      rating: 4,
    },
    {
      id: 3,
      image: "/images/school.png",
      category: "School Event",
      name: "Addis International School",
      rating: 4,
    },
  ]

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Saved Schools</h2>
        <div className="flex gap-2">
          <button className="h-6 w-6 rounded-full border flex items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="h-6 w-6 rounded-full border flex items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {schools.map((school) => (
          <SchoolCard
            key={school.id}
            image={school.image}
            category={school.category}
            name={school.name}
            rating={school.rating}
          />
        ))}
      </div>
    </div>
  )
}
