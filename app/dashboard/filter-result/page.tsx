"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Search, MapPin, Users, Star, Tag } from "lucide-react";
import { RootState } from "@/redux/store";
import { School } from "@/redux/slices/schoolSlice";

interface FilteredSchoolsResponse {
  school: School[];
  results: number;
  status: string;
}

export default function FilterResultPage() {
  const router = useRouter();
  const { filteredSchools, loading, error } = useSelector(
    (state: RootState) => state.schools
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const response = filteredSchools as unknown as FilteredSchoolsResponse;
  const schools = response?.school || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {schools.length} Schools Found
          </h1>
          <button
            onClick={() => router.push("/dashboard/filter")}
            className="text-purple-600 hover:text-purple-700"
          >
            Modify Filters
          </button>
        </div>

        {schools.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No schools found
            </h2>
            <p className="text-gray-600">
              Try adjusting your filters to find more schools
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school: School) => (
              <div
                key={school._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={
                      school.schoolFacilites[0]?.img_path[0] ||
                      "/placeholder-school.jpg"
                    }
                    alt={school.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {school.name}
                  </h2>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>
                        {school.address[0]?.subCity}, {school.address[0]?.city}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2" />
                      <span>{school.schoolType}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{school.studentCount} Students</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {school.schoolTags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      router.push(`/dashboard/schools/${school._id}`)
                    }
                    className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
