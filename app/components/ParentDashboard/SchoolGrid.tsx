import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";

interface SchoolInfo {
  id: string;
  name: string;
  location: string;
  type: string;
  students: number;
  rating: number;
  imageUrl?: string;
}

interface SchoolGridProps {
  schools: SchoolInfo[];
}

export default function SchoolGrid({ schools }: SchoolGridProps) {
  if (!schools || !Array.isArray(schools)) {
    return <div>No schools available</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {schools.map((school, index) => (
        <Link
          href={`/dashboard/school-details/${school.id}`}
          key={index}
          className="bg-white rounded-lg border p-3 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Image
                src={school.imageUrl || "/placeholder.svg?height=60&width=60"}
                alt={school.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{school.name}</h3>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {school.location}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {school.type}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {school.students}{" "}
                  <svg
                    className="h-3 w-3 ml-1 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800">
                  {school.rating}{" "}
                  <Star className="h-3 w-3 ml-1 text-yellow-400 fill-current" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
