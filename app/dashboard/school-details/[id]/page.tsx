"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  ChevronRight,
  Users,
  Building,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { School, schools } from "@/data/schools";

// This would normally come from an API or database
const getSchoolData = (id: string): Promise<School | null> => {
  return Promise.resolve(schools.find((school) => school.id === id) || null);
};

export default function SchoolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchSchool = async () => {
      if (params.id) {
        const schoolData = await getSchoolData(params.id as string);
        setSchool(schoolData);
        setLoading(false);
      }
    };

    fetchSchool();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">School not found</h1>
        <Button
          onClick={() => router.push("/")}
          className="bg-purple-700 hover:bg-purple-800 text-white"
        >
          Go back to home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ scrollBehavior: "smooth" }}>
      <div className="relative w-full mx-auto">
        {/* Cover Image */}
        <div className="relative h-96 w-full">
          <Image
            src={school.coverImageUrl || "/school.png"}
            alt={school.name}
            fill
            className="object-cover"
          />
        </div>

        {/* School Name and Info */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-2/3 px-4 sm:px-6 lg:px-8 py-6 bg-white z-20 ">
          <h1 className="text-4xl font-bold">{school.name}</h1>
          <div className="flex items-center mt-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-lg font-medium">{school.rating}</span>
            <span className="ml-2 text-gray-500">{school.reviews} reviews</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-purple-700 mr-2" />
              <span className="text-sm font-medium text-gray-800">
                {school.type}
              </span>
            </div>
            <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-purple-700 mr-2" />
              <span className="text-sm font-medium text-gray-800">
                {school.students} students
              </span>
            </div>
            <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
              <GraduationCap className="h-4 w-4 text-purple-700 mr-2" />
              <span className="text-sm font-medium text-gray-800">
                {school.gradeLevel}
              </span>
            </div>
            <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
              <Building className="h-4 w-4 text-purple-700 mr-2" />
              <span className="text-sm font-medium text-gray-800">Private</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Similar Schools */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Similar Schools</h2>
            <button className="text-sm text-gray-600 flex items-center">
              See all <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="flex overflow-x-auto space-x-4 pb-4">
            {school.similarSchools.map((similarSchool) => (
              <Link
                href={`/school/${similarSchool.id}`}
                key={similarSchool.id}
                className="flex-shrink-0 w-64"
              >
                <div className="border rounded-md overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-36">
                    <Image
                      src={
                        similarSchool.imageUrl ||
                        "/placeholder.svg?height=100&width=150"
                      }
                      alt={similarSchool.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-medium">{similarSchool.name}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {similarSchool.location}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          similarSchool.type === "Private"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {similarSchool.type}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        {similarSchool.gradeLevel}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="ml-1 text-xs">
                          {similarSchool.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="border rounded-md p-6 mb-12">
          <h2 className="text-xl font-semibold text-purple-800 mb-6">
            Contact Details
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
              <span>{school.contactDetails.address}</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-3" />
              <span>{school.contactDetails.phone}</span>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <span>{school.contactDetails.email}</span>
            </li>
            <li className="flex items-center">
              <Globe className="h-5 w-5 text-gray-500 mr-3" />
              <span>{school.contactDetails.website}</span>
            </li>
          </ul>
        </div>

        {/* Academics */}
        <div id="academics" className="mb-12">
          <h2 className="text-xl font-semibold text-purple-800 mb-6">
            Academics
          </h2>
          <p className="text-gray-700 mb-6">{school.academics}</p>

          {/* Average Marks Results */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-center mb-3">
              Average Marks Results
            </h3>
            <div className="flex justify-center">
              <div className="bg-purple-100 text-purple-800 rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold">
                {school.averageMarks}%
              </div>
            </div>
          </div>

          {/* Extra Curriculum */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Extra Curriculum</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {school.extraCurriculum.map((activity, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-md p-2">
                    <span className="text-sm font-medium">{activity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admissions Criteria */}
        <div id="admissions" className="mb-12">
          <h2 className="text-xl font-semibold text-purple-800 mb-6">
            Admissions Criteria
          </h2>
          <p className="text-gray-700 mb-4">
            Applicants to Davidson School must meet the requirements, submit
            previous academic records, and may need to take an entrance
            assessment.
          </p>
          <ol className="list-decimal pl-5 space-y-4">
            {school.admissionsCriteria.map((criteria, index) => (
              <li key={index} className="text-gray-700">
                {criteria}
              </li>
            ))}
          </ol>
        </div>

        {/* Fees */}
        <div id="fees" className="mb-12">
          <h2 className="text-xl font-semibold text-purple-800 mb-6">Fees</h2>
          <div className="space-y-3">
            {school.fees.map((fee, index) => (
              <div
                key={index}
                className="bg-[#efeeff] rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{fee.level}</h3>
                </div>
                <div className="text-right">
                  <p className="font-medium">{fee.fee}</p>
                  <p className="text-sm text-gray-500">
                    Available spots: {fee.spots}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff */}
        <div id="staff" className="mb-12">
          <h2 className="text-xl font-semibold text-purple-800 mb-6">Staff</h2>
          <div className="space-y-4">
            {school.staff.map((member, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={
                        member.imageUrl || "/placeholder.svg?height=40&width=40"
                      }
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{member.name}</h3>
                      <div className="flex items-center ml-2">
                        <span className="text-sm mr-1">{member.rating}</span>
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div id="reviews" className="mb-12">
          <h2 className="text-xl font-semibold text-purple-800 mb-6">
            Reviews
          </h2>
          <div className="space-y-4">
            {school.reviewsList.map((review, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <Image
                        src={
                          review.imageUrl ||
                          "/placeholder.svg?height=32&width=32"
                        }
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{review.name}</h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        {review.text}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-purple-700">{review.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
