"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Search, MapPin, Users, Star, Tag } from "lucide-react";
import { RootState } from "@/redux/store";
import { School } from "@/redux/slices/schoolSlice";
import { Button } from "@/components/ui/button";

export default function FilterResultPage() {
  const router = useRouter();
  const { filteredSchools, loading, error } = useSelector(
    (state: RootState) => state.schools
  );
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 6;

  const mockImages = [
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800", // School building
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800", // Classroom
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", // Library
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800", // Science lab
    "https://images.unsplash.com/photo-1562774053-701939374585?w=800", // Sports field
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800", // Modern school
    "https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=800", // School hallway
    "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800", // School entrance
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800", // School garden
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", // School playground
  ];

  // Ensure we have an array of schools
  const schools = filteredSchools?.data?.school || [];

  // Calculate pagination
  const totalPages = Math.ceil(schools.length / schoolsPerPage);
  const paginatedSchools = schools.slice(
    (currentPage - 1) * schoolsPerPage,
    currentPage * schoolsPerPage
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {schools.length} Schools Found
          </h1>
          <Button
            onClick={() => router.push("/dashboard/filter")}
            className="mt-4"
          >
            Modify Filters
          </Button>
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSchools.map((school: School) => (
                <div
                  key={school._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        mockImages[school._id.charCodeAt(0) % mockImages.length]
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
                          {school.address[0]?.subCity},{" "}
                          {school.address[0]?.city}
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
                    <Button
                      onClick={() =>
                        router.push(`/dashboard/school-details/${school._id}`)
                      }
                      className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
