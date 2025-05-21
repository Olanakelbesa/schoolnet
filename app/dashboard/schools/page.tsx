"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Users,
  Building,
  GraduationCap,
  Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSchools,
  setSearchQuery,
  setSchoolType,
  setPage,
  clearFilters,
  toggleFavorite,
  loadFavorites,
  setLocation,
  setSelectedType,
  setSelectedLocation,
  clearCategoryFilters,
} from "@/redux/slices/schoolSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { School } from "@/redux/slices/schoolSlice";
import { useRouter } from "next/navigation";
import { schoolImages } from "@/redux/mockData/images";

// Helper function to get the first valid image URL
const getSchoolImage = (school: School) => {
  // Use a placeholder image based on school ID
  const index = parseInt(school._id) % schoolImages.length;
  return schoolImages[index];
};

export default function SchoolsPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    schools,
    filteredSchools,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalResults,
    filters,
    favoriteIds,
    categories,
  } = useSelector((state: RootState) => state.schools);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        console.log("Fetching schools...");
        const result = await dispatch(fetchAllSchools()).unwrap();
        console.log("Schools fetched successfully:", result);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    // Always fetch schools when the page loads
    fetchSchools();
    dispatch(loadFavorites());
  }, [dispatch]);

  console.log("Current state:", {
    loading,
    hasFilteredSchools: !!filteredSchools?.data?.school,
    filteredSchoolsLength: filteredSchools?.data?.school?.length,
    schoolsLength: schools?.length,
  });

  const handleTypeChange = (type: string) => {
    console.log("Setting school type:", type);
    dispatch(setSelectedType(type));
  };

  const handleLocationChange = (location: string) => {
    console.log("Setting location:", location);
    dispatch(setSelectedLocation(location));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  // Show loading state only while actively fetching
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
          <Button onClick={() => dispatch(fetchAllSchools())} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(
    (filteredSchools?.data?.school?.length || 0) / itemsPerPage
  );
  const paginatedSchools =
    filteredSchools?.data?.school?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schools</h1>
        <p className="text-gray-600">Find and explore schools in your area</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Categories */}
        <div className="space-y-4">
          {/* School Types */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              School Types
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={
                  categories.selectedType === "all" ? "default" : "outline"
                }
                onClick={() => handleTypeChange("all")}
                size="sm"
              >
                All
              </Button>
              {categories.types.map((type) => (
                <Button
                  key={type}
                  variant={
                    categories.selectedType === type ? "default" : "outline"
                  }
                  onClick={() => handleTypeChange(type)}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Locations
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={
                  categories.selectedLocation === "all" ? "default" : "outline"
                }
                onClick={() => handleLocationChange("all")}
                size="sm"
              >
                All Locations
              </Button>
              {categories.locations.map((location) => (
                <Button
                  key={location}
                  variant={
                    categories.selectedLocation === location
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handleLocationChange(location)}
                  size="sm"
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedSchools?.map((school: School) => (
          <div key={school._id} className="group relative">
            <Link href={`/dashboard/school-details/${school._id}`}>
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={getSchoolImage(school)}
                    alt={school.name}
                    fill
                    className="object-cover rounded-t-lg"
                    unoptimized={true}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch(toggleFavorite(school._id));
                    }}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favoriteIds.includes(school._id)
                          ? "fill-[#5a3b82] text-[#5a3b82]"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-700 transition-colors">
                    {school.name}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {school.address?.[0]?.subCity},{" "}
                      {school.address?.[0]?.city}
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
                        {school.division?.join(", ") || "All Grades"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">
                        {school.schoolTags?.[0] || "New"}
                      </span>
                    </div>
                    <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                      <Building className="h-4 w-4 text-purple-700 mr-1" />
                      <span className="text-sm font-medium text-gray-800">
                        {school.studentCount || 0} students
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

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
