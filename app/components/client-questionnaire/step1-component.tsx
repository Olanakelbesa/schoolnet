"use client"

interface Step1Props {
  selectedGradeLevel: string | null
  setSelectedGradeLevel: (value: string) => void
  selectedCurriculum: string | null
  setSelectedCurriculum: (value: string) => void
  selectedSchoolType: string | null
  setSelectedSchoolType: (value: string) => void
}

export default function Step1Component({
  selectedGradeLevel,
  setSelectedGradeLevel,
  selectedCurriculum,
  setSelectedCurriculum,
  selectedSchoolType,
  setSelectedSchoolType,
}: Step1Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4">What grade level are you seeking...</h2>
        <div className="grid grid-cols-2 gap-4 px-28">
          {["KG", "Middle school", "primary", "High school"].map((option) => (
            <button
              key={option}
              onClick={() => setSelectedGradeLevel(option)}
              className={`py-2 px-4 rounded-full border-2  ${
                selectedGradeLevel === option ? "border-[#8a70d6] bg-[#B188E3] shadow-sm text-white" : "border-purple-200 shadow-sm"
              } hover:border-[#8a70d6] transition-colors`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4">What curriculum do you prefer</h2>
        <div className="grid grid-cols-2 gap-4 px-28">
          {["Ethiopian National", "IB", "Cambridge", "Montessori"].map((option) => (
            <button
              key={option}
              onClick={() => setSelectedCurriculum(option)}
              className={`py-2 px-4 rounded-full border-2 ${
                selectedCurriculum === option ? "border-[#8a70d6] bg-[#B188E3] shadow-sm text-white" : "border-purple-200 shadow-sm"
              } hover:border-[#8a70d6] transition-colors`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4">Preferred school type</h2>
        <div className="grid grid-cols-2 gap-4 px-28">
          {["Private", "Faith-Based", "Public", "International"].map((option) => (
            <button
              key={option}
              onClick={() => setSelectedSchoolType(option)}
              className={`py-2 px-4 rounded-full border-2 ${
                selectedSchoolType === option ? "border-[#8a70d6] bg-[#B188E3] shadow-sm text-white" : "border-purple-200 shadow-sm"
              } hover:border-[#8a70d6] transition-colors`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
