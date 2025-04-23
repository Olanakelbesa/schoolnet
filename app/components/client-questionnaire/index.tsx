"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Step1Component from "./step1-component";
import Step2Component from "./step2-component";
import Step3Component from "./step3-component";
import { useRouter } from "next/navigation";

export default function ClientQuestionnaire() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Step 1 state
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string | null>(null);
  const [selectedCurriculum, setSelectedCurriculum] = useState<string | null>(null);
  const [selectedSchoolType, setSelectedSchoolType] = useState<string | null>(null);

  // Step 2 state
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);

  // Step 3 state
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [requiresAfterSchool, setRequiresAfterSchool] = useState<string | null>(null);
  const [ratingsImportance, setRatingsImportance] = useState<string | null>(null);

  const totalSteps = 3;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    console.log("Form submitted with data:", {
      gradeLevel: selectedGradeLevel,
      curriculum: selectedCurriculum,
      schoolType: selectedSchoolType,
      location: selectedLocation,
      format: selectedFormat,
      languages: selectedLanguages,
      programs: selectedPrograms,
      priceRange: selectedPriceRange,
      afterSchool: requiresAfterSchool,
      ratingsImportance: ratingsImportance,
    });
    setShowModal(true);
  };

  const toggleLanguageSelection = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const toggleProgramSelection = (program: string) => {
    if (selectedPrograms.includes(program)) {
      setSelectedPrograms(selectedPrograms.filter((prog) => prog !== program));
    } else {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 py-6">
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-[#2e2e7b] mb-4">
          Please Answer The Following Questions
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-1">
          To customize the best school recommendations for you, we need to get to know you better.
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          Your responses will help us understand your preferences and needs.
        </p>
      </div>

      <div className="border w-full md:w-2/3 mx-auto border-[#614B7D] rounded-xl p-4 sm:p-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {Array.from({ length: totalSteps }).map((_, index) => {
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
                {stepNumber !== totalSteps && (
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

        {/* Step Components */}
        {currentStep === 1 && (
          <Step1Component
            selectedGradeLevel={selectedGradeLevel}
            setSelectedGradeLevel={setSelectedGradeLevel}
            selectedCurriculum={selectedCurriculum}
            setSelectedCurriculum={setSelectedCurriculum}
            selectedSchoolType={selectedSchoolType}
            setSelectedSchoolType={setSelectedSchoolType}
          />
        )}
        {currentStep === 2 && (
          <Step2Component
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedFormat={selectedFormat}
            setSelectedFormat={setSelectedFormat}
            selectedLanguages={selectedLanguages}
            toggleLanguageSelection={toggleLanguageSelection}
            selectedPrograms={selectedPrograms}
            toggleProgramSelection={toggleProgramSelection}
          />
        )}
        {currentStep === 3 && (
          <Step3Component
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            requiresAfterSchool={requiresAfterSchool}
            setRequiresAfterSchool={setRequiresAfterSchool}
            ratingsImportance={ratingsImportance}
            setRatingsImportance={setRatingsImportance}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between mt-8 gap-4">
          {currentStep > 1 ? (
            <Button
              onClick={handlePreviousStep}
              variant="outline"
              className="w-full sm:w-auto text-[#8a70d6] border-[#8a70d6] hover:bg-[#f8f5ff] hover:text-[#8a70d6] rounded-full px-6"
            >
              Go Back
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep === 3 ? (
            <Button
              onClick={handleFinish}
              className="w-full sm:w-auto bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#b188e3] hover:to-[#3F3D56] text-white rounded-full px-6"
            >
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              className="w-full sm:w-auto bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#b188e3] hover:to-[#3F3D56] text-white rounded-full px-6"
            >
              Next Step
            </Button>
          )}
        </div>
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50  bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl border border-[#b188e3] shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md mx-4 text-center">
            <h2 className="text-lg sm:text-2xl font-bold text-[#2e2e7b] mb-4">
              🎉 Thank You!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Your responses have been recorded. We'll customize the best school recommendations for you.
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