"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Users, Building, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSchools,
  setSearchQuery,
  setSchoolType,
  setPage,
  clearFilters,
} from "@/redux/slices/schoolSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { School } from "@/redux/slices/schoolSlice";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const dispatch = useDispatch<AppDispatch>();
  const {
    filteredSchools,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalResults,
    filters,
  } = useSelector((state: RootState) => state.schools);

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  useEffect(() => {
    if (query) {
      dispatch(setSearchQuery(query));
    }
  }, [query, dispatch]);

  const handleTypeChange = (type: string) => {
    dispatch(setSchoolType(type));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const paginatedSchools = filteredSchools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-red-600 mb-2">
            Error loading schools
          </h3>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => dispatch(fetchSchools())} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          Found {filteredSchools.length} schools matching your search
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8">
        <Button
          variant={filters.schoolType === "all" ? "default" : "outline"}
          onClick={() => handleTypeChange("all")}
        >
          All
        </Button>
        <Button
          variant={filters.schoolType === "private" ? "default" : "outline"}
          onClick={() => handleTypeChange("private")}
        >
          Private
        </Button>
        <Button
          variant={filters.schoolType === "public" ? "default" : "outline"}
          onClick={() => handleTypeChange("public")}
        >
          Public
        </Button>
        <Button
          variant={filters.schoolType === "mixed" ? "default" : "outline"}
          onClick={() => handleTypeChange("mixed")}
        >
          Mixed
        </Button>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedSchools.map((school: School) => (
          <Link
            href={`/dashboard/school-details/${school._id}`}
            key={school._id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src="/school.png"
                  alt={school.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-700 transition-colors">
                  {school.name}
                </h2>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {school.address[0]?.subCity}, {school.address[0]?.city}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-purple-700 mr-1" />
                    <span className="text-sm font-medium text-gray-800">
                      {school.schoolType}
                    </span>
                  </div>
                  <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                    <GraduationCap className="h-4 w-4 text-purple-700 mr-1" />
                    <span className="text-sm font-medium text-gray-800">
                      {school.division.join(", ") || "All Divisions"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">
                      {school.schoolTags[0] || "New"}
                    </span>
                  </div>
                  <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                    <Building className="h-4 w-4 text-purple-700 mr-1" />
                    <span className="text-sm font-medium text-gray-800">
                      {school.studentCount} students
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredSchools.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No schools found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => dispatch(clearFilters())} className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
