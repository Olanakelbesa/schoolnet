"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step3Props {
  selectedPriceRange: string;
  setSelectedPriceRange: (value: string) => void;
  requiresAfterSchool: string | null;
  setRequiresAfterSchool: (value: string) => void;
  ratingsImportance: string | null;
  setRatingsImportance: (value: string) => void;
}

export default function Step3Component({
  selectedPriceRange,
  setSelectedPriceRange,
  requiresAfterSchool,
  setRequiresAfterSchool,
  ratingsImportance,
  setRatingsImportance,
}: Step3Props) {
  return (
    <div className="space-y-8 max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8">
      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4 text-lg sm:text-xl">
          Tuition budget range
        </h2>
        <div className="flex justify-center">
          <Select
            onValueChange={(value) => setSelectedPriceRange(value)}
            value={selectedPriceRange}
          >
            <SelectTrigger className="w-full sm:w-1/2 md:w-2/3 rounded-full border-2 border-[#b188e3] shadow-sm">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-50k">Under 1,000 ETB</SelectItem>
              <SelectItem value="50k-100k">1,000 - 5,000 ETB</SelectItem>
              <SelectItem value="100k-150k">5,000 - 10,000 ETB</SelectItem>
              <SelectItem value="150k-200k">10,000 - 20,000 ETB</SelectItem>
              <SelectItem value="above-200k">Above 20,000 ETB</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4 text-lg sm:text-xl">
          Do you require after-school care or extended programs
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {["Yes", "No"].map((option) => (
            <button
              key={option}
              onClick={() => setRequiresAfterSchool(option)}
              className={`py-2 px-4 rounded-full border text-sm sm:text-base ${
                requiresAfterSchool === option
                  ? "border-[#8a70d6] bg-[#B188E3] shadow-sm text-white"
                  : "border-purple-200 shadow-sm"
              } hover:border-[#8a70d6] transition-colors`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4 text-lg sm:text-xl">
          How important are school ratings and parent reviews to you
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Not Important", "Important", "Neutral", "Very Important"].map(
            (option) => (
              <button
                key={option}
                onClick={() => setRatingsImportance(option)}
                className={`py-2 px-4 rounded-full border text-sm sm:text-base ${
                  ratingsImportance === option
                    ? "border-[#8a70d6] bg-[#B188E3] shadow-sm text-white"
                    : "border-purple-200 shadow-sm"
                } hover:border-[#8a70d6] transition-colors`}
              >
                {option}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
