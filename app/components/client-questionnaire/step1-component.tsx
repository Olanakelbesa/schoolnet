"use client";

import { Select } from "@mui/material";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import Image from "next/image";

interface Step1Props {
  selectedChildCount: string | null;
  setSelectedChildCount: (value: string) => void;
  selectedSchoolType: string | null;
  setSelectedSchoolType: (value: string) => void;
  selectedGradeLevel: string | null;
  setSelectedGradeLevel: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  otherLocation: string;
  setOtherLocation: (value: string) => void;
  currentQuestion: number;
  questionsLength: number;
  sameSchool: string | null;
  setSameSchool: (value: string) => void;
  selectedGradeLevels: string[];
  setSelectedGradeLevels: (value: string[]) => void;
  selectedSchoolTypes: string[];
  setSelectedSchoolTypes: (value: string[]) => void;
  questions: Array<{
    key: string;
    question: string;
    options?: string[];
    type: string;
  }>;
  error?: string;
}

export default function Step1Component({
  selectedChildCount,
  setSelectedChildCount,
  selectedSchoolType,
  setSelectedSchoolType,
  selectedGradeLevel,
  setSelectedGradeLevel,
  selectedLocation,
  setSelectedLocation,
  otherLocation,
  setOtherLocation,
  currentQuestion,
  questionsLength,
  sameSchool,
  setSameSchool,
  selectedGradeLevels,
  setSelectedGradeLevels,
  selectedSchoolTypes,
  setSelectedSchoolTypes,
  questions,
  error,
}: Step1Props) {
  const handleOptionSelect = (option: string) => {
    if (questions[currentQuestion].key === "childCount") {
      setSelectedChildCount(option);
    } else if (questions[currentQuestion].key === "schoolType") {
      setSelectedSchoolType(option);
    } else if (questions[currentQuestion].key === "gradeLevel") {
      setSelectedGradeLevel(option);
    }
  };

  const getSelected = () => {
    const currentKey = questions[currentQuestion].key;
    if (currentKey === "childCount") return selectedChildCount;
    if (currentKey === "schoolType") {
      if (showSchoolTypeMulti) return selectedSchoolTypes;
      return selectedSchoolType;
    }
    if (currentKey === "gradeLevel") {
      if (showGradeLevelMulti) return selectedGradeLevels;
      return selectedGradeLevel;
    }
    return null;
  };

  // Helper for multi-select
  const toggleMultiSelect = (
    value: string,
    selected: string[],
    setSelected: (v: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      // Check if we're at the grade level question
      if (questions[currentQuestion].key === "gradeLevel") {
        // If user has two children, limit to 2 selections
        if (selectedChildCount === "Two" && selected.length >= 2) {
          return; // Don't allow more selections
        }
      }
      setSelected([...selected, value]);
    }
  };

  // Determine which question to show
  let effectiveQuestionIndex = currentQuestion;
  // If child count is 2 or more, insert the 'same school' question after child count
  const isMultiChild =
    selectedChildCount === "Two" || selectedChildCount === "More than two";
  const showSameSchool = isMultiChild && currentQuestion === 1;
  const showGradeLevelMulti =
    isMultiChild &&
    sameSchool === "Yes" &&
    questions[currentQuestion].key === "gradeLevel";
  const showSchoolTypeMulti = false; // Always single select for school type

  return (
    <div className="space-y-8 max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8">
      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4 text-lg sm:text-xl py-4">
          {showSameSchool
            ? "Do you want the same school for your children?"
            : showGradeLevelMulti
            ? "What grade level are your children? (Select all that apply)"
            : questions[currentQuestion].question}
        </h2>
        {/* Same School Question */}
        {showSameSchool ? (
          <div className="grid grid-cols-1 gap-4 justify-center ">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                onClick={() => setSameSchool(option)}
                className={`w-2/3 mx-auto py-2 px-4 rounded-full border-2 text-sm sm:text-base ${
                  sameSchool === option
                    ? "border-[#8a70d6] bg-[#856cad] shadow-sm text-white"
                    : "border-purple-200 shadow-sm"
                } hover:border-[#8a70d6] transition-colors`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : showGradeLevelMulti ? (
          <div className="grid grid-cols-1 gap-4 justify-center ">
            {questions
              .find((q) => q.key === "gradeLevel")
              ?.options?.map((option: string) => (
                <button
                  key={option}
                  onClick={() =>
                    toggleMultiSelect(
                      option,
                      selectedGradeLevels,
                      setSelectedGradeLevels
                    )
                  }
                  className={`w-2/3 mx-auto py-2 px-4 rounded-full border-2 text-sm sm:text-base ${
                    selectedGradeLevels.includes(option)
                      ? "border-[#8a70d6] bg-[#856cad] shadow-sm text-white"
                      : "border-purple-200 shadow-sm"
                  } hover:border-[#8a70d6] transition-colors`}
                >
                  {option}
                </button>
              ))}
          </div>
        ) : questions[currentQuestion].type === "location" ? (
          <div className="">
            <div className="flex justify-center">
              <select
                className="w-full sm:w-1/2 md:w-2/3 rounded-full border-2 border-[#b188e3] shadow-sm text-[#2e2e7b] px-4 py-2"
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  if (e.target.value !== "other") setOtherLocation("");
                }}
              >
                <option value="">Location</option>
                <option value="arada">Arada</option>
                <option value="kirkos">Kirkos</option>
                <option value="addis_ketema">Addis Ketema</option>
                <option value="gulele">Gulele</option>
                <option value="lideta">Lideta</option>
                <option value="yeka">Yeka</option>
                <option value="bole">Bole</option>
                <option value="nifas_silk">Nifas Silk-Lafto</option>
                <option value="kolfe">Kolfe Keranio</option>
                <option value="akaki">Akaki Kality</option>
                <option value="lemi_kura">Lemi Kura</option>
                <option value="other">Other</option>
              </select>
            </div>
            {selectedLocation === "other" && (
              <div className="mt-4">
                <input
                  type="text"
                  value={otherLocation}
                  onChange={(e) => setOtherLocation(e.target.value)}
                  placeholder="Please specify your location"
                  className="w-full sm:w-1/2 md:w-2/3 mx-auto block rounded-full border-2 border-[#b188e3] shadow-sm text-[#2e2e7b] px-4 py-2"
                />
              </div>
            )}
            <div className="flex justify-center pt-8">
              <Image
                src={"/location.svg"}
                alt="location"
                width={200}
                height={200}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 justify-center  ">
            {questions[currentQuestion].options &&
              questions[currentQuestion].options.map((option: string) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-2/3 mx-auto py-2 px-4 rounded-full border-2 text-sm sm:text-base ${
                    getSelected() === option
                      ? "border-[#8a70d6] bg-[#856cad] shadow-sm text-white"
                      : "border-purple-200 shadow-sm"
                  } hover:border-[#8a70d6] transition-colors`}
                >
                  {option}
                </button>
              ))}
          </div>
        )}
        {error && (
          <div className="text-red-600 text-sm text-center mt-2">{error}</div>
        )}
      </div>
    </div>
  );
}
