import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

interface SchoolCardProps {
  id?: string;
  name: string;
  location: string;
  type: string;
  students: number;
  rating: number;
  reviewCount: number;
  description: string;
  imageUrl?: string;
}

export default function SchoolCard({
  id,
  name,
  location,
  type,
  students,
  rating,
  reviewCount,
  description,
  imageUrl = "/dandiboru.jpg",
}: SchoolCardProps) {
  const cardContent = (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
            <Image
              src={imageUrl || "/dandiboru.jpg"}
              alt={name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  {location}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {type}
                </span>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{students}</span>
                  <svg
                    className="h-4 w-4 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
              </div>
            </div>

            <p className="mt-2 text-sm lg:w-2/3 text-gray-600">
              {description}
              <button className="text-purple-600 hover:text-purple-800 font-medium ml-1">
                Read all {reviewCount} reviews
              </button>
            </p>

            <div className="mt-4 flex justify-end">
              <Button className="bg-gradient-to-r from-[#B188E3] to-[#3F3D56] hover:from-[#3F3D56] hover:to-[#B188E3] text-white">
                Add To List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (id) {
    return (
      <Link href={`/dashboard/school-details/${id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
