"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  loadFavorites,
  setSortBy,
  toggleFavorite,
} from "@/redux/slices/schoolSlice";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { schoolImages } from "@/redux/mockData/images";

// Helper function to get school image
const getSchoolImage = (schoolId: string) => {
  const index = parseInt(schoolId) % schoolImages.length;
  return schoolImages[index];
};

export default function MyListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { schools, favoriteIds, sortBy } = useSelector(
    (state: RootState) => state.schools
  );

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const favoriteSchools = schools.filter((school) =>
    favoriteIds.includes(school._id)
  );

  const handleSort = (
    field: "name" | "subCity" | "schoolTags" | "budgetMin" | "budgetMax"
  ) => {
    const newDirection =
      sortBy.field === field && sortBy.direction === "asc" ? "desc" : "asc";
    dispatch(setSortBy({ field, direction: newDirection }));
  };

  if (favoriteSchools.length === 0) {
    return (
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Image src={"/my-list.png"} alt="my list" width={60} height={60} />
          My Favorites
        </h1>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorite schools yet
          </h3>
          <p className="text-gray-600">
            Add schools to your favorites to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Image src={"/my-list.png"} alt="my list" width={60} height={60} />
        My Favorites
      </h1>

      {/* Sorting Controls */}
      <div className="flex items-center mb-6  gap-4">
        <p className="text-center text-gray-500">Sort By: </p>
        <div className=" flex gap-2">
          <Button
            variant={sortBy.field === "name" ? "default" : "outline"}
            onClick={() => handleSort("name")}
          >
            Name{" "}
            {sortBy.field === "name" &&
              (sortBy.direction === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant={sortBy.field === "subCity" ? "default" : "outline"}
            onClick={() => handleSort("subCity")}
          >
            Location{" "}
            {sortBy.field === "subCity" &&
              (sortBy.direction === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant={sortBy.field === "schoolTags" ? "default" : "outline"}
            onClick={() => handleSort("schoolTags")}
          >
            Tags{" "}
            {sortBy.field === "schoolTags" &&
              (sortBy.direction === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant={sortBy.field === "budgetMin" ? "default" : "outline"}
            onClick={() => handleSort("budgetMin")}
          >
            Budget{" "}
            {sortBy.field === "budgetMin" &&
              (sortBy.direction === "asc" ? "↑" : "↓")}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 mx-auto">
        {favoriteSchools.map((school) => (
          <div
            key={school._id}
            className="flex items-center bg-white rounded-xl shadow-md px-4 py-3 gap-4 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={getSchoolImage(school._id)}
                alt={school.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                unoptimized={true}
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
                {school.address?.[0]?.subCity}, {school.address?.[0]?.city}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                  {school.schoolType}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 flex items-center gap-1">
                  {school.studentCount}
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
                {school.schoolTags?.[0] && (
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                    {school.schoolTags[0]}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleFavorite(school._id))}
              className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className="h-6 w-6 fill-[#5a3b82] text-[#5a3b82]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
