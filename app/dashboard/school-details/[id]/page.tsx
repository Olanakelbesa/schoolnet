"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  fetchSchoolById,
  clearSelectedSchool,
  School,
  toggleFavorite,
  loadFavorites,
} from "@/redux/slices/schoolSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Building,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { schoolImages } from "@/redux/mockData/images";

// Helper function to get all school images
const getAllSchoolImages = (school: School) => {
  // Use a placeholder image based on school ID
  const index = parseInt(school._id) % schoolImages.length;
  return [schoolImages[index]];
};

export default function SchoolDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    selectedSchool: school,
    loading,
    error,
    favoriteIds,
  } = useSelector((state: RootState) => state.schools);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        await dispatch(fetchSchoolById(params.id as string)).unwrap();
      } catch (error) {
        console.error("Failed to fetch school:", error);
      }
    };

    if (params.id) {
      fetchSchool();
    }
    dispatch(loadFavorites());
  }, [dispatch, params.id]);

  useEffect(() => {
    if (school) {
      setAllImages(getAllSchoolImages(school));
    }
  }, [school]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

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
            Error loading school details
          </h3>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            School not found
          </h3>
          <Button onClick={() => router.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button and favorite */}
      <div className="mb-8 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
        >
          ← Back to Schools
        </Button>
        {school && (
          <button
            onClick={() => dispatch(toggleFavorite(school._id))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Heart
              className={`h-6 w-6 ${
                favoriteIds.includes(school._id)
                  ? "fill-[#5a3b82] text-[#5a3b82]"
                  : "text-gray-600"
              }`}
            />
          </button>
        )}
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {/* Main Image with Navigation */}
        <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
          <Image
            src={allImages[currentImageIndex]}
            alt={`${school.name} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            unoptimized={true}
          />
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={previousImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {allImages.map((image, index) => (
              <div
                key={index}
                className={`relative h-24 cursor-pointer rounded-lg overflow-hidden ${
                  currentImageIndex === index ? "ring-2 ring-purple-700" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${school.name} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* School Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-600">{school.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-purple-700" />
                <span>
                  {school.address?.[0]?.subCity}, {school.address?.[0]?.city}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2 text-purple-700" />
                <span>{school.phoneNumber}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-purple-700" />
                <span>{school.email}</span>
              </div>
              {school.schoolWebsite && (
                <div className="flex items-center text-gray-600">
                  <Globe className="h-5 w-5 mr-2 text-purple-700" />
                  <a
                    href={school.schoolWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:underline"
                  >
                    {school.schoolWebsite}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">School Information</h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Building className="h-5 w-5 mr-2 text-purple-700" />
                <span>Type: {school.schoolType}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2 text-purple-700" />
                <span>Students: {school.studentCount}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <GraduationCap className="h-5 w-5 mr-2 text-purple-700" />
                <span>Established: {school.yearEstablished}</span>
              </div>
            </div>
          </div>

          {school.schoolFacilites && school.schoolFacilites.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
              <div className="grid grid-cols-2 gap-4">
                {school.schoolFacilites.map((facility: any) => (
                  <div
                    key={facility._id}
                    className="bg-purple-50 p-4 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900">
                      {facility.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {school.schoolTags && school.schoolTags.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {school.schoolTags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
