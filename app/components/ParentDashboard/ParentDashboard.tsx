"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { School } from "@/redux/slices/schoolSlice";
import Image from "next/image";
import Header from "@/app/components/ParentDashboard/Header";
import HeroSection from "@/app/components/ParentDashboard/HeroSection";
import SchoolCategoryCard from "@/app/components/ParentDashboard/SchoolCategoryCard";
import SchoolCard from "@/app/components/ParentDashboard/SchoolCard";
import SchoolGrid from "@/app/components/ParentDashboard/SchoolGrid";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchParentProfile } from "@/redux/slices/parentSlice";
import {
  setSelectedType,
  setSelectedLocation,
  clearCategoryFilters,
} from "@/redux/slices/schoolSlice";

interface SubcitySchools {
  name: string;
  schoolCount: number;
  schools: School[];
}

interface SchoolInfo {
  id: string;
  name: string;
  location: string;
  type: string;
  students: number;
  rating: number;
  imageUrl?: string;
}

// Extend the School interface to include images
interface ExtendedSchool extends School {
  images?: string[];
}

export default function ParentDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useSelector((state: RootState) => state.parentProfile);
  const {
    schools,
    loading: schoolsLoading,
    error: schoolsError,
    filteredSchools,
    categories,
  } = useSelector((state: RootState) => state.schools);

  // State for subcity schools pagination
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 4;

  // Fetch parent profile on component mount
  useEffect(() => {
    dispatch(fetchParentProfile());
  }, [dispatch]);

  // Update filters when profile changes
  useEffect(() => {
    if (profile) {
      // Clear existing filters
      dispatch(clearCategoryFilters());

      // Set school type filter for "Schools near you"
      if (profile.childrenDetails?.schoolType?.length > 0) {
        dispatch(setSelectedType(profile.childrenDetails.schoolType[0]));
      }

      // Set location filter for both sections
      if (profile.address?.subCity) {
        dispatch(setSelectedLocation(profile.address.subCity));
      }
    }
  }, [profile, dispatch]);

  // School category data
  const schoolCategories = [
    {
      title: "Primary schools",
      icon: "/primary-school.png",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-700",
    },
    {
      title: "Middle schools",
      icon: "/middle-school.png",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      title: "High schools",
      icon: "/high-school.png",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-700",
    },
    {
      title: "University and colleges",
      icon: "/university.png",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-700",
    },
  ];

  // Transform School type to SchoolInfo type
  const transformToSchoolInfo = (school: ExtendedSchool): SchoolInfo => ({
    id: school._id,
    name: school.name,
    location: `${school.address[0]?.subCity}, ${school.address[0]?.city}`,
    type: school.schoolType,
    students: school.studentCount,
    rating: 4.5,
    imageUrl: school.images?.[0] || "/images/placeholder.svg",
  });

  // Get nearby schools (top 3) - using filtered schools which already has both type and location filters
  const getNearbySchools = () => {
    return Array.isArray(filteredSchools) ? filteredSchools.slice(0, 3) : [];
  };

  // Get schools by subcity - using only location filter
  const getSchoolsBySubcity = () => {
    if (!profile?.address?.subCity) return [];

    // Filter schools by subcity only
    const schoolsInSubcity = schools.filter(
      (school) =>
        school.address[0]?.subCity.toLowerCase() ===
        profile.address.subCity.toLowerCase()
    );

    if (schoolsInSubcity.length === 0) return [];

    return [
      {
        name: profile.address.subCity,
        schoolCount: schoolsInSubcity.length,
        schools: schoolsInSubcity,
      },
    ];
  };

  const nearbySchools = getNearbySchools();
  const schoolsBySubcity = getSchoolsBySubcity();

  // Calculate pagination for subcity schools
  const getPaginatedSchools = (schools: School[]) => {
    const startIndex = (currentPage - 1) * schoolsPerPage;
    return schools.slice(startIndex, startIndex + schoolsPerPage);
  };

  const totalPages = schoolsBySubcity[0]?.schools
    ? Math.ceil(schoolsBySubcity[0].schools.length / schoolsPerPage)
    : 0;

  if (profileLoading || schoolsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (profileError || schoolsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          Error: {profileError || schoolsError}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Hero section */}
          <HeroSection />

          {/* School categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {schoolCategories.map((category, index) => (
              <SchoolCategoryCard
                key={index}
                title={category.title}
                icon={category.icon}
                bgColor={category.bgColor}
                iconColor={category.iconColor}
              />
            ))}
          </div>

          {/* Schools near you */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Schools near you</h2>
              <Link
                href="/dashboard/schools"
                className="text-sm text-purple-700 hover:text-purple-800 flex items-center"
              >
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {nearbySchools.length > 0 ? (
                nearbySchools.map((school) => (
                  <SchoolCard
                    key={school._id}
                    id={school._id}
                    name={school.name}
                    location={`${school.address[0]?.subCity}, ${school.address[0]?.city}`}
                    type={school.schoolType}
                    students={school.studentCount}
                    rating={4.5}
                    reviewCount={0}
                    description={school.description}
                  />
                ))
              ) : (
                <div className="text-gray-500 text-center py-4">
                  {!profile
                    ? "Please complete your profile to see schools near you"
                    : `No schools found in ${profile.address?.subCity} matching your school type preferences`}
                </div>
              )}
            </div>
          </div>

          {/* Schools by Subcity */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Schools by Subcity</h2>
              <Link
                href="/dashboard/schools"
                className="text-sm text-purple-700 hover:text-purple-800 flex items-center"
              >
                See all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            {schoolsBySubcity.length > 0 ? (
              schoolsBySubcity.map((subcity, index: number) => (
                <div key={index} className="mb-6">
                  <div className="flex items-center mb-3">
                    <Link
                      href={`/dashboard/schools/${subcity.name}`}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-md p-2 mr-2 cursor-pointer"
                    >
                      <span className="text-sm font-medium">
                        {subcity.name}
                      </span>
                    </Link>
                    <div className="text-sm text-gray-500">
                      {subcity.schoolCount} schools
                    </div>
                  </div>

                  <SchoolGrid
                    schools={getPaginatedSchools(subcity.schools).map(
                      transformToSchoolInfo
                    )}
                  />

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
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
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">
                {!profile
                  ? "Please complete your profile to see schools in your area"
                  : `No schools found in ${profile.address?.subCity}`}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
