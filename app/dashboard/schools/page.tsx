"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Users, Building, GraduationCap } from "lucide-react";
import { schools } from "@/data/schools";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SchoolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "all" ||
      school.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schools</h1>
        <p className="text-gray-600">Find and explore schools in your area</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search schools by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            onClick={() => setSelectedType("all")}
          >
            All
          </Button>
          <Button
            variant={selectedType === "private" ? "default" : "outline"}
            onClick={() => setSelectedType("private")}
          >
            Private
          </Button>
          <Button
            variant={selectedType === "public" ? "default" : "outline"}
            onClick={() => setSelectedType("public")}
          >
            Public
          </Button>
          <Button
            variant={selectedType === "mixed" ? "default" : "outline"}
            onClick={() => setSelectedType("mixed")}
          >
            Mixed
          </Button>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <Link
            href={`/dashboard/school/${school.id}`}
            key={school.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={school.coverImageUrl || "/school.png"}
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
                  <span className="text-sm">{school.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                    <Users className="h-4 w-4 text-purple-700 mr-1" />
                    <span className="text-sm font-medium text-gray-800">
                      {school.type}
                    </span>
                  </div>
                  <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                    <GraduationCap className="h-4 w-4 text-purple-700 mr-1" />
                    <span className="text-sm font-medium text-gray-800">
                      {school.gradeLevel}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{school.rating}</span>
                    <span className="ml-2 text-gray-500 text-sm">
                      ({school.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                    <Building className="h-4 w-4 text-purple-700 mr-1" />
                    <span className="text-sm font-medium text-gray-800">
                      {school.students} students
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
        </div>
      )}
    </div>
  );
}
