"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Step2Props {
  selectedLocation: string
  setSelectedLocation: (value: string) => void
  selectedFormat: string | null
  setSelectedFormat: (value: string) => void
  selectedLanguages: string[]
  toggleLanguageSelection: (language: string) => void
  selectedPrograms: string[]
  toggleProgramSelection: (program: string) => void
}

export default function Step2Component({
  selectedLocation,
  setSelectedLocation,
  selectedFormat,
  setSelectedFormat,
  selectedLanguages,
  toggleLanguageSelection,
  selectedPrograms,
  toggleProgramSelection,
}: Step2Props) {
  return (
    <div className="space-y-8 max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8">
      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4 text-lg sm:text-xl">
          Preferred location or neighborhood
        </h2>
        <div className="flex justify-center">
          <Select onValueChange={setSelectedLocation} value={selectedLocation}>
            <SelectTrigger className="w-full sm:w-1/2 md:w-2/3 rounded-full border-2 border-[#b188e3] shadow-sm text-[#2e2e7b]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bole">Bole</SelectItem>
              <SelectItem value="kirkos">Kirkos</SelectItem>
              <SelectItem value="arada">Arada</SelectItem>
              <SelectItem value="yeka">Yeka</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h2 className="text-center text-[#2e2e7b] font-medium mb-4 text-lg sm:text-xl">
          School format preference
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Day School", "Either", "Boarding School"].map((option) => (
            <button
              key={option}
              onClick={() => setSelectedFormat(option)}
              className={`py-2 px-4 rounded-full border text-sm sm:text-base ${
                selectedFormat === option
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
          Preferred language(s) of instruction
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Amharic", "French", "English", "Mixed"].map((option) => (
            <button
              key={option}
              onClick={() => toggleLanguageSelection(option)}
              className={`py-2 px-4 rounded-full border text-sm sm:text-base ${
                selectedLanguages.includes(option)
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
          Desired programs or facilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["STEM", "Sports", "ART", "Special Education"].map((option) => (
            <button
              key={option}
              onClick={() => toggleProgramSelection(option)}
              className={`py-2 px-4 rounded-full border text-sm sm:text-base ${
                selectedPrograms.includes(option)
                  ? "border-[#8a70d6] bg-[#B188E3] shadow-sm text-white"
                  : "border-purple-200 shadow-sm"
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