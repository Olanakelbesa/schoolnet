"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { useDispatch } from "react-redux";
import { setFilteredSchools } from "@/redux/slices/schoolSlice";

const priceRanges = {
  "<5,000 ETB": { min: 0, max: 5000 },
  "5,000-10,000 ETB": { min: 5000, max: 10000 },
  "10,000-20,000 ETB": { min: 10000, max: 20000 },
  ">20,000 ETB": { min: 20000, max: 1000000 },
};

const filterOptions: Record<string, string[]> = {
  Price: ["<5,000 ETB", "5,000-10,000 ETB", "10,000-20,000 ETB", ">20,000 ETB"],
  "Grade Level": ["KG", "Middle school", "Primary", "High school"],
  Review: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
  Language: ["Amharic", "French", "English", "Mixed"],
  "School type": ["Public", "Private", "International"],
  Gender: ["Male", "Female", "Co-Ed"],
  "School Format": ["Day School", "Night School", "Boarding School", "Either"],
  Location: [
    "Arada",
    "Addis Ketema",
    "Gulele",
    "Lideta",
    "Kirkos",
    "Yeka",
    "Bole",
    "Nifas Silk-Lafto",
    "Kolfe Keranio",
    "Akaki Kality",
    "Lemi Kura",
  ],
};

const filterRows = [
  "Price",
  "Grade Level",
  "Review",
  "Language",
  "School type",
  "Gender",
  "School Format",
  "Location",
];

export default function FilterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | null>
  >({});
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleOptionSelect = (filter: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [filter]: option }));
    if (filter === "Location") setSelectedLocation(option);
  };

  const handleShowResults = async () => {
    try {
      // Map UI filters to API parameters
      const filterParams: any = {
        address: {
          city: "Addis Ababa",
          subCity: selectedOptions["Location"] || "",
        },
      };

      // Handle price range
      if (selectedOptions["Price"]) {
        const range =
          priceRanges[selectedOptions["Price"] as keyof typeof priceRanges];
        filterParams.budgetMin = range.min;
        filterParams.budgetMax = range.max;
      }

      // Handle school type
      if (selectedOptions["School type"]) {
        filterParams.schoolType = [selectedOptions["School type"]];
      }

      // Handle review/rating
      if (selectedOptions["Review"]) {
        const rating = parseInt(selectedOptions["Review"].split(" ")[0]);
        filterParams.googleRatings = rating;
      }

      // Handle gender
      if (selectedOptions["Gender"]) {
        filterParams.gender = selectedOptions["Gender"];
      }

      console.log("Sending filter params:", filterParams);

      const response = await fetch("/api/schools/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterParams),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch filtered schools");
      }

      dispatch(setFilteredSchools(data.data));
      router.push("/dashboard/filter-result");
    } catch (error) {
      console.error("Error applying filters:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <>
      <div className="pb-10 flex items-center justify-center">
        <div className="bg-white rounded-xl w-full max-w-xl mx-4 p-6 relative">
          <h2 className="text-4xl font-bold text-center mb-6">Filter</h2>
          <div className="space-y-4">
            {filterRows.map((row) => (
              <div
                key={row}
                className="flex justify-between items-center border-b pb-4 cursor-pointer"
                onClick={() => setActiveFilter(row)}
              >
                <span>{row}</span>
                <span className="text-gray-400">&gt;</span>
              </div>
            ))}
          </div>
          <button
            className="mt-8 w-full bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:to-[#3F3D56] text-white py-2 rounded-full transition"
            onClick={handleShowResults}
          >
            Show Results
          </button>
        </div>

        {/* Dynamic Popup for All Filters */}
        {activeFilter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-14 relative flex flex-col items-center">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={() => setActiveFilter(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-semibold mb-8 text-gray-700 w-full text-center">
                {activeFilter}
              </h3>
              <div className="flex flex-col gap-6 w-full max-w-md">
                {activeFilter === "Location" ? (
                  <div className="flex justify-center">
                    <Select
                      onValueChange={(value) =>
                        handleOptionSelect("Location", value)
                      }
                      value={selectedLocation}
                    >
                      <SelectTrigger className="w-full rounded-full border-2 border-[#b188e3] text-[#2e2e7b]">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions["Location"].map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  filterOptions[activeFilter].map((option) => (
                    <button
                      key={option}
                      className={`w-full py-2 rounded-full border transition-all duration-200 focus:outline-none ${
                        selectedOptions[activeFilter] === option
                          ? "border-purple-400 bg-[#856cad] text-white shadow-md"
                          : "border-purple-300 bg-white text-black hover:shadow-lg"
                      }`}
                      onClick={() => handleOptionSelect(activeFilter, option)}
                    >
                      {option}
                    </button>
                  ))
                )}
              </div>
              <button
                className="mt-10 w-full bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] text-white py-2 rounded-lg font-semibold hover:to-gray-600 transition"
                onClick={() => setActiveFilter(null)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Header() {
  const router = useRouter();
  return (
    <div>
      <nav className="flex justify-between items-center px-10 py-5 w-full h-20 bg-opacity-10 backdrop-blur-lg backdrop-filter ">
        <div className="flex justify-between w-full">
          <Link href={"/"}>
            <Image
              src={"/schoolnet-logo.svg"}
              alt="logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </Link>
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer "
            onClick={() => router.push("/dashboard")}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}
