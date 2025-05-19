"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Step1Component from "./step1-component";
import { useRouter } from "next/navigation";
import { createParentProfile, ParentProfile } from "@/redux/slices/parentSlice";

export default function ClientQuestionnaire() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] =
    useState(false);

  // Step 1 state
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string | null>(
    null
  );
  const [selectedCurriculum, setSelectedCurriculum] = useState<string | null>(
    null
  );
  const [selectedSchoolType, setSelectedSchoolType] = useState<string | null>(
    null
  );
  const [selectedChildCount, setSelectedChildCount] = useState<string | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [otherLocation, setOtherLocation] = useState<string>("");
  const [sameSchool, setSameSchool] = useState<string | null>(null);
  const [selectedGradeLevels, setSelectedGradeLevels] = useState<string[]>([]);
  const [selectedSchoolTypes, setSelectedSchoolTypes] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  // Questions logic
  let questions = [
    {
      key: "childCount",
      question: "How many children do you have?",
      options: ["One", "Two", "More than two"],
      type: "single",
    },
  ];
  const isMultiChild =
    selectedChildCount === "Two" || selectedChildCount === "More than two";
  if (isMultiChild) {
    questions.push({
      key: "sameSchool",
      question: "Do you want the same school for your children?",
      options: ["Yes", "No"],
      type: "single",
    });
    questions.push({
      key: "schoolType",
      question: "What type of school do you want?",
      options: ["Private", "Public", "Faith-based", "International"],
      type: "single",
    });
    questions.push({
      key: "gradeLevel",
      question:
        sameSchool === "Yes"
          ? "What grade level are your children? (Select all that apply)"
          : "What grade level are they?",
      options: ["KG", "Primary", "Middle School", "High School"],
      type: sameSchool === "Yes" ? "multi" : "single",
    });
  } else if (selectedChildCount === "One") {
    questions.push({
      key: "schoolType",
      question: "What type of school do you want?",
      options: ["Private", "Public", "Faith-based", "International"],
      type: "single",
    });
    questions.push({
      key: "gradeLevel",
      question: "What grade level are they?",
      options: ["KG", "Primary", "Middle School", "High School"],
      type: "single",
    });
  }
  questions.push({
    key: "location",
    question: "Preferred location or neighborhood",
    type: "location",
    options: [],
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Validate all required fields
      if (!selectedChildCount)
        throw new Error("Please select the number of children");
      if (!selectedLocation) throw new Error("Please select a location");
      if (selectedLocation === "other" && !otherLocation)
        throw new Error("Please specify your location");
      if (!selectedGradeLevel && !selectedGradeLevels.length)
        throw new Error("Please select at least one grade level");
      if (!selectedSchoolType && !selectedSchoolTypes.length)
        throw new Error("Please select at least one school type");

      // Format the data according to the API requirements
      const profileData: ParentProfile = {
        firstName: "", // These will be filled in the settings page
        lastName: "",
        email: "",
        phoneNumber: "",
        numberOfChildren:
          selectedChildCount === "More than two"
            ? "2+"
            : selectedChildCount === "Two"
            ? "2"
            : "1",
        childrenDetails: {
          gradeLevels:
            selectedGradeLevels.length > 0
              ? selectedGradeLevels.map((level) => level.toLowerCase())
              : [selectedGradeLevel?.toLowerCase() || ""],
          schoolType:
            selectedSchoolTypes.length > 0
              ? selectedSchoolTypes.map((type) => type.toLowerCase())
              : [selectedSchoolType?.toLowerCase() || ""],
        },
        address: {
          city: "Addis Ababa",
          subCity:
            selectedLocation === "other" ? otherLocation : selectedLocation,
        },
        budgetMin: 500,
        budgetMax: 1500,
      };

      // Call the API directly
      const response = await createParentProfile(profileData);
      console.log("Parent profile created:", response);

      setHasCompletedQuestionnaire(true);
      setShowModal(true);
    } catch (error: any) {
      setError(error.message || "Failed to submit questionnaire");
    } finally {
      setIsLoading(false);
    }
  };

  const validateCurrent = () => {
    const q = questions[currentStep - 1];
    const currentKey = q.key;

    if (currentKey === "childCount") {
      if (!selectedChildCount) return "Please select the number of children.";
    } else if (currentKey === "sameSchool") {
      if (!sameSchool) return "Please indicate if you want the same school.";
    } else if (currentKey === "schoolType") {
      if (!selectedSchoolType) return "Please select a school type.";
    } else if (currentKey === "gradeLevel") {
      if (
        sameSchool === "Yes" &&
        (selectedChildCount === "Two" || selectedChildCount === "More than two")
      ) {
        if (!selectedGradeLevels.length) {
          return "Please select at least one grade level for your children.";
        }
        if (selectedChildCount === "Two" && selectedGradeLevels.length > 2) {
          return "You can select a maximum of 2 grade levels for two children.";
        }
      } else {
        if (!selectedGradeLevel) return "Please select a grade level.";
      }
    } else if (currentKey === "location") {
      if (!selectedLocation) return "Please select a location.";
      if (selectedLocation === "other" && !otherLocation)
        return "Please specify your location.";
    }
    return "";
  };

  const handleNext = () => {
    const err = validateCurrent();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setCurrentStep((prev) => Math.min(prev + 1, questions.length));
  };

  const handleBack = () => {
    setError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinish = () => {
    handleSubmit();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 py-6">
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-[#2e2e7b] mb-4">
          Please Answer The Following Questions
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-1">
          To customize the best school recommendations for you, we need to get
          to know you better.
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          Your responses will help us understand your preferences and needs.
        </p>
      </div>

      <div className="border w-full md:w-2/3 mx-auto border-[#614B7D] rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {Array.from({ length: questions.length }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;
            return (
              <div key={index} className="flex items-center">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-medium text-xs sm:text-sm ${
                    isCompleted || isCurrent
                      ? "bg-gradient-to-r from-[#3F3D56] to-[#B188E3] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber !== questions.length && (
                  <div
                    className={`h-1 w-12 sm:w-16 mx-2 rounded-full ${
                      currentStep > stepNumber ? "bg-purple-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <Step1Component
          selectedGradeLevel={selectedGradeLevel}
          setSelectedGradeLevel={setSelectedGradeLevel}
          selectedSchoolType={selectedSchoolType}
          setSelectedSchoolType={setSelectedSchoolType}
          selectedChildCount={selectedChildCount}
          setSelectedChildCount={setSelectedChildCount}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          otherLocation={otherLocation}
          setOtherLocation={setOtherLocation}
          currentQuestion={currentStep - 1}
          questionsLength={questions.length}
          sameSchool={sameSchool}
          setSameSchool={setSameSchool}
          selectedGradeLevels={selectedGradeLevels}
          setSelectedGradeLevels={setSelectedGradeLevels}
          selectedSchoolTypes={selectedSchoolTypes}
          setSelectedSchoolTypes={setSelectedSchoolTypes}
          questions={questions}
          error={error}
        />

        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-auto text-[#8a70d6] border-[#8a70d6] hover:bg-[#f8f5ff] hover:text-[#8a70d6] rounded-full px-6"
            disabled={currentStep === 1}
          >
            Go Back
          </Button>
          {currentStep === questions.length ? (
            <Button
              onClick={handleFinish}
              className="w-auto bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#b188e3] hover:to-[#3F3D56] text-white rounded-full px-6"
            >
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-auto bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#b188e3] hover:to-[#3F3D56] text-white rounded-full px-6"
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl border border-[#b188e3] shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-4 text-center">
            <h2 className="text-lg sm:text-2xl font-bold text-[#2e2e7b] mb-4">
              🎉 Thank You!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Your responses have been recorded. We'll customize the best school
              recommendations for you.
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full sm:w-auto bg-gradient-to-r from-[#3F3D56] to-[#B188E3] text-white px-6 py-2 rounded-full hover:from-[#B188E3] hover:to-[#3F3D56]"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
