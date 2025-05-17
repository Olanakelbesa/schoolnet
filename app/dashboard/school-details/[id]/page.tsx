"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Building,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface School {
  _id: string;
  name: string;
  email: string;
  address: Array<{
    city: string;
    subCity: string;
    _id: string;
  }>;
  phoneNumber: string;
  schoolWebsite: string;
  schoolType: string;
  division: string[];
  studentCount: number;
  yearEstablished: number;
  schoolFacilites: Array<{
    name: string;
    img_path: string[];
    _id: string;
  }>;
  description: string;
  schoolTags: string[];
  socialMedia: any[];
  budgetMin: number;
  budgetMax: number;
  gender?: string;
}

export default function SchoolDetailsPage() {
  const params = useParams();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        const response = await fetch(`/api/schools/${params.id}`);
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to login page if unauthorized
            window.location.href = "/login";
            return;
          }
          throw new Error("Failed to fetch school details");
        }
        const data = await response.json();
        setSchool(data.data.school);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSchoolDetails();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </div>
    );
  }

  if (error || !school) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-red-600 mb-2">
            {error || "School not found"}
          </h3>
          <Button onClick={() => window.history.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{school.name}</h1>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {school.address[0]?.subCity}, {school.address[0]?.city}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - School Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About the School</h2>
            <p className="text-gray-600 mb-6">{school.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-700 mr-2" />
                <span className="text-gray-600">Type: {school.schoolType}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-5 w-5 text-purple-700 mr-2" />
                <span className="text-gray-600">
                  Students: {school.studentCount}
                </span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 text-purple-700 mr-2" />
                <span className="text-gray-600">
                  Est. {school.yearEstablished}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600">
                  Gender: {school.gender || "Not specified"}
                </span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-purple-700 mr-2" />
                  <span className="text-gray-600">{school.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-purple-700 mr-2" />
                  <span className="text-gray-600">{school.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-purple-700 mr-2" />
                  <a
                    href={school.schoolWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 hover:underline"
                  >
                    {school.schoolWebsite}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          {school.schoolFacilites.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {school.schoolFacilites.map((facility) => (
                  <div key={facility._id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{facility.name}</h3>
                    {facility.img_path[0] && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={`/school.png`}
                          alt={facility.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Additional Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">School Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">
                  Annual Budget Range
                </h3>
                <p className="text-gray-600">
                  ${school.budgetMin.toLocaleString()} - $
                  {school.budgetMax.toLocaleString()}
                </p>
              </div>
              {school.division.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900">Divisions</h3>
                  <p className="text-gray-600">{school.division.join(", ")}</p>
                </div>
              )}
              {school.schoolTags.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900">Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {school.schoolTags.map((tag, index) => (
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
      </div>
    </div>
  );
}
