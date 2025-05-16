import React from "react";
import Image from "next/image";

const schools = [
  {
    id: 1,
    name: "John Kennedy School",
    location: "Washington Ave, Manchester",
    type: "Public",
    students: 1800,
    rating: 4.9,
    imageUrl: "/school1.jpg",
  },
  {
    id: 2,
    name: "John Kennedy School",
    location: "Washington Ave, Manchester",
    type: "Public",
    students: 1800,
    rating: 4.9,
    imageUrl: "/school1.jpg",
  },
  {
    id: 3,
    name: "John Kennedy School",
    location: "Washington Ave, Manchester",
    type: "Public",
    students: 1800,
    rating: 4.9,
    imageUrl: "/school1.jpg",
  },
];

export default function MyListPage() {
  return (
    <div className="px-8 py-6">
      <div className="py-4  mb-6">
        <h1 className="text-3xl font-bold py-1">
          My Matches
        </h1>
        <p className="w-2/3 text-black/60">
          We use the information you've provided us and your general activity on
          School Net to show you a personalized list of the best schools for
          you. SchoolNet strives to give you as many options as possible so that
          you can attend the school that's just right for you.
        </p>
      </div>
      <div className="flex flex-col gap-6  mx-auto">
        {schools.map((school) => (
          <div
            key={school.id}
            className="flex items-center bg-white rounded-xl shadow-md px-4 py-3 gap-4 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={school.imageUrl}
                alt={school.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg text-gray-900">
                {school.name}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 21c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8Z"
                    stroke="#614B7D"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                    stroke="#614B7D"
                    strokeWidth="1.5"
                  />
                </svg>
                {school.location}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                  {school.type}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 flex items-center gap-1">
                  {school.students}
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
                      stroke="#614B7D"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="#614B7D"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
                  {school.rating}
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path
                      d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                      stroke="#FFD700"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
