"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Step1Component from "./step1-component";
import Step2Component from "./step2-component";
import Step3Component from "./step3-component";

export default function ClientQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(1);
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

  // Step 2 state
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);

  // Step 3 state
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [requiresAfterSchool, setRequiresAfterSchool] = useState<string | null>(
    null
  );
  const [ratingsImportance, setRatingsImportance] = useState<string | null>(
    null
  );

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
    // Here you would typically submit the form data
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
    // You could redirect or show a success message here
    alert("Thank you for completing the questionnaire!");
  };

  const toggleLanguageSelection = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
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
    <div className="max-w-1/2 mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#2e2e7b] mb-4">
          Please Answer The Following question
        </h1>
        <p className="text-gray-600 mb-1">
          To customize the best school recommendations for you We need to get to
          know you better
        </p>
        <p className="text-gray-600">
          Your responses will help us understand your preferences and needs
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isCurrent = currentStep === stepNumber;

            return (
              <div key={index} className="flex items-center">
                {/* Step Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                    isCompleted || isCurrent
                      ? "bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {stepNumber}
                </div>

                {/* Connector Line */}
                {stepNumber !== totalSteps && (
                  <div
                    className={`h-1 w-16 mx-2 rounded-full ${
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
        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <Button
              onClick={handlePreviousStep}
              variant="outline"
              className="text-[#8a70d6] border-[#8a70d6] hover:bg-[#f8f5ff]"
            >
              Go Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}

          {currentStep === 3 ? (
            <Button
              onClick={handleFinish}
              className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:bg-[#7a60c6] text-white rounded-full px-6"
            >
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              className="bg-gradient-to-r from-[#3F3D56] to-[#B188E3] hover:from-[#B188E3] hover:bg-[#7a60c6] text-white rounded-full px-6"
            >
              Next Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
