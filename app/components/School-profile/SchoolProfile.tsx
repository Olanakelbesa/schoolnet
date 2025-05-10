"use client"

import type React from "react"

import { useState, useCallback } from "react"
import {
  Building,
  Calendar,
  Upload,
  Mail,
  Phone,
  Link,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  BookOpen,
  FlaskRoundIcon as Flask,
  Trophy,
  Wifi,
  MonitorIcon,
  Music,
  Utensils,
  Bus,
  Dumbbell,
  ShowerHeadIcon as SwimmingPool,
  Theater,
  Microscope,
  ParkingSquare,
  Stethoscope,
  PencilRuler,
  Plus,
} from "lucide-react"

import { DashboardLayout } from "@/app/components/School-Dashboard/layout/dashbaord-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Import our components
import { ProfileSection } from "@/app/components/School-profile/profile-section"
import { FormField } from "@/app/components/School-profile/form-field"
import { ProfileCompletion } from "@/app/components/School-profile/profile-completion"
import { InputWithIcon } from "@/app/components/School-profile/input-with-icon"
import { FacilityCheckboxList } from "@/app/components/School-profile/facility-checkbox-list"
import { PhotoUpload } from "@/app/components/School-profile/photo-upload"

// Define facility options
const facilityOptions = [
  { id: "library", label: "Library", icon: <BookOpen className="h-4 w-4" /> },
  { id: "cafeteria", label: "Cafeteria", icon: <Utensils className="h-4 w-4" /> },
  { id: "computerLab", label: "Computer Lab", icon: <MonitorIcon className="h-4 w-4" /> },
  { id: "scienceLab", label: "Science Lab", icon: <Flask className="h-4 w-4" /> },
  { id: "sportsGround", label: "Sports Ground", icon: <Trophy className="h-4 w-4" /> },
  { id: "swimmingPool", label: "Swimming Pool", icon: <SwimmingPool className="h-4 w-4" /> },
  { id: "gymnasium", label: "Gymnasium", icon: <Dumbbell className="h-4 w-4" /> },
  { id: "auditorium", label: "Auditorium", icon: <Theater className="h-4 w-4" /> },
  { id: "wifi", label: "Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
  { id: "transportService", label: "Transport Service", icon: <Bus className="h-4 w-4" /> },
  { id: "musicRoom", label: "Music Room", icon: <Music className="h-4 w-4" /> },
  { id: "artStudio", label: "Art Studio", icon: <PencilRuler className="h-4 w-4" /> },
  { id: "infirmary", label: "Infirmary/Health Center", icon: <Stethoscope className="h-4 w-4" /> },
  { id: "parking", label: "Parking", icon: <ParkingSquare className="h-4 w-4" /> },
  { id: "microscopyLab", label: "Microscopy Lab", icon: <Microscope className="h-4 w-4" /> },
  { id: "other", label: "Other", icon: <Plus className="h-4 w-4" /> },
]

export default function SchoolProfile() {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState({
    // Basic Info
    schoolName: "Dandi Baru Academy",
    yearEstablished: "2004",
    type: "Private",
    numberOfStudents: "10",
    feeRange: "1000 - 5000",
    gradeLevels: "KG",
    schoolLogo: null as File | null,
    schoolLogoUrl: "",

    // Contact Info
    email: "example@gmail.com",
    phone: "+251-90-345-678",
    website: "https://dandibaru.edu",
    streetAddress: "123 school line",
    city: "Addis Ababa",
    state: "Addis Ababa",
    zipCode: "1000",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",

    // Programs & Facilities
    educationalProgram: "",
    facilities: {
      library: true,
      cafeteria: true,
      computerLab: false,
      scienceLab: false,
      sportsGround: true,
      swimmingPool: false,
      gymnasium: false,
      auditorium: false,
      wifi: false,
      transportService: false,
      musicRoom: false,
      artStudio: false,
      infirmary: false,
      parking: false,
      microscopyLab: false,
      other: false,
    },
    otherFacilities: "",
    customFacilities: ["", "", ""], // Array to store multiple custom facilities
  })

  // State for facility photos
  const [facilityPhotos, setFacilityPhotos] = useState<Array<{ url: string; file?: File }>>([
    { url: "" },
    { url: "" },
    { url: "" },
  ])

  const [customFacilityInput, setCustomFacilityInput] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFacilityChange = (facilityId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facilityId]: checked,
      },
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCustomFacility = () => {
    if (customFacilityInput.trim() === "") return

    // Add to the custom facilities array
    const updatedCustomFacilities = [...formData.customFacilities]
    // Find the first empty slot or add to the end
    const emptyIndex = updatedCustomFacilities.findIndex((item) => item === "")

    if (emptyIndex !== -1) {
      updatedCustomFacilities[emptyIndex] = customFacilityInput
    } else {
      updatedCustomFacilities.push(customFacilityInput)
    }

    setFormData((prev) => ({
      ...prev,
      customFacilities: updatedCustomFacilities,
    }))

    // Clear the input
    setCustomFacilityInput("")
  }

  const handleRemoveCustomFacility = (index: number) => {
    const updatedCustomFacilities = [...formData.customFacilities]
    updatedCustomFacilities[index] = ""

    setFormData((prev) => ({
      ...prev,
      customFacilities: updatedCustomFacilities,
    }))
  }

  const handleSaveChanges = () => {
    // Combine all data for submission
    const dataToSubmit = {
      ...formData,
      facilityPhotos: facilityPhotos.map((photo) => ({
        url: photo.url,
        file: photo.file ? photo.file.name : null,
      })),
    }

    console.log("Saving changes:", dataToSubmit)

    // Here you would typically send the data to your API
    // For file uploads, you would use FormData
    const formDataToSubmit = new FormData()

    // Add all text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "facilities" && key !== "customFacilities" && key !== "schoolLogo") {
        formDataToSubmit.append(key, String(value))
      }
    })

    // Add facilities as JSON
    formDataToSubmit.append("facilities", JSON.stringify(formData.facilities))
    formDataToSubmit.append("customFacilities", JSON.stringify(formData.customFacilities))

    // Add school logo if exists
    if (formData.schoolLogo) {
      formDataToSubmit.append("schoolLogo", formData.schoolLogo)
    }

    // Add facility photos
    facilityPhotos.forEach((photo, index) => {
      if (photo.file) {
        formDataToSubmit.append(`facilityPhoto${index}`, photo.file)
      }
    })

    // Example of how you would send this to an API
    // const response = await fetch('/api/profile', {
    //   method: 'POST',
    //   body: formDataToSubmit
    // })

    // Show success message
    alert("Profile saved successfully!")
  }

  const handlePhotoUpload = useCallback((file: File, index: number) => {
    // Create a URL for the file to display as preview
    const url = URL.createObjectURL(file)

    setFacilityPhotos((prev) => {
      const updated = [...prev]
      updated[index] = { url, file }
      return updated
    })
  }, [])

  const handlePhotoRemove = useCallback((index: number) => {
    setFacilityPhotos((prev) => {
      const updated = [...prev]
      // If there's a URL created with URL.createObjectURL, we should revoke it
      if (updated[index].url && !updated[index].url.startsWith("http")) {
        URL.revokeObjectURL(updated[index].url)
      }
      updated[index] = { url: "" }
      return updated
    })
  }, [])

  const handleSchoolLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload JPG or PNG files only.")
      return
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit.")
      return
    }

    // Create a URL for the file to display as preview
    const url = URL.createObjectURL(file)

    setFormData((prev) => ({
      ...prev,
      schoolLogo: file,
      schoolLogoUrl: url,
    }))
  }

  const calculateCompletionPercentage = useCallback(() => {
    // Define required fields for each section
    const requiredFields = {
      basic: ["schoolName"],
      contact: ["email", "phone", "streetAddress", "city", "state"],
      programs: [],
    }

    // Define optional fields that contribute to completion
    const optionalFields = {
      basic: ["yearEstablished", "type", "numberOfStudents", "feeRange", "gradeLevels", "schoolLogo"],
      contact: ["website", "zipCode", "facebookUrl", "instagramUrl", "linkedinUrl", "twitterUrl"],
      programs: ["educationalProgram"],
    }

    // Calculate completion for each section
    const sectionWeights = { basic: 0.4, contact: 0.3, programs: 0.3 }
    let totalCompletion = 0

    // Calculate basic info completion
    let basicCompleted = 0
    const basicTotal = requiredFields.basic.length + optionalFields.basic.length

    // Check required fields
    requiredFields.basic.forEach((field) => {
      if (formData[field as keyof typeof formData]) basicCompleted++
    })

    // Check optional fields
    optionalFields.basic.forEach((field) => {
      if (field === "schoolLogo" && formData.schoolLogoUrl) {
        basicCompleted++
      } else if (formData[field as keyof typeof formData]) {
        basicCompleted++
      }
    })

    // Calculate contact info completion
    let contactCompleted = 0
    const contactTotal = requiredFields.contact.length + optionalFields.contact.length

    // Check required fields
    requiredFields.contact.forEach((field) => {
      if (formData[field as keyof typeof formData]) contactCompleted++
    })

    // Check optional fields
    optionalFields.contact.forEach((field) => {
      if (formData[field as keyof typeof formData]) contactCompleted++
    })

    // Calculate programs & facilities completion
    let programsCompleted = 0
    const programsTotal = requiredFields.programs.length + optionalFields.programs.length + 2 // +2 for facilities and photos

    // Check required fields
    requiredFields.programs.forEach((field) => {
      if (formData[field as keyof typeof formData]) programsCompleted++
    })

    // Check optional fields
    optionalFields.programs.forEach((field) => {
      if (formData[field as keyof typeof formData]) programsCompleted++
    })

    // Check facilities
    const hasFacilities = Object.values(formData.facilities).some((value) => value === true)
    if (hasFacilities) programsCompleted++

    // Check facility photos
    const hasPhotos = facilityPhotos.some((photo) => photo.url !== "")
    if (hasPhotos) programsCompleted++

    // Calculate weighted completion percentage
    const basicPercentage = basicTotal > 0 ? (basicCompleted / basicTotal) * sectionWeights.basic : 0
    const contactPercentage = contactTotal > 0 ? (contactCompleted / contactTotal) * sectionWeights.contact : 0
    const programsPercentage = programsTotal > 0 ? (programsCompleted / programsTotal) * sectionWeights.programs : 0

    totalCompletion = (basicPercentage + contactPercentage + programsPercentage) * 100

    // Round to nearest whole number
    return Math.round(totalCompletion)
  }, [formData, facilityPhotos])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-purple-500">School Profile</h1>
        </div>

        <ProfileCompletion percentage={calculateCompletionPercentage()} onSave={handleSaveChanges} />

        <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-purple-100 ">
            <TabsTrigger value="basic" className="data-[state=active]:bg-[#9274bd] data-[state=active]:text-white text-[#4c4566]">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-[#9274bd] data-[state=active]:text-white text-[#4c4566]">
              Contact Info
            </TabsTrigger>
            <TabsTrigger value="programs" className="data-[state=active]:bg-[#9274bd] data-[state=active]:text-white text-[#4c4566]">
              Programs & Facilities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <ProfileSection title="Basic Information" description="Provide essential information about your school.">
              <FormField label="School Name" htmlFor="schoolName" required>
                <InputWithIcon
                  icon={<Building className="h-5 w-5" />}
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                />
              </FormField>

              <FormField label="Year Established" htmlFor="yearEstablished">
                <InputWithIcon
                  icon={<Calendar className="h-5 w-5" />}
                  id="yearEstablished"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleInputChange}
                />
              </FormField>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Type" htmlFor="type">
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type" className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Charter">Charter</SelectItem>
                      <SelectItem value="International">International</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Number of Students" htmlFor="numberOfStudents">
                  <Input
                    id="numberOfStudents"
                    name="numberOfStudents"
                    value={formData.numberOfStudents}
                    onChange={handleInputChange}
                  />
                </FormField>
              </div>

              <FormField label="Fee Range" htmlFor="feeRange">
                <Select value={formData.feeRange} onValueChange={(value) => handleSelectChange("feeRange", value)}>
                  <SelectTrigger id="feeRange" className="w-full">
                    <SelectValue placeholder="Select fee range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under 1000">Under 1000</SelectItem>
                    <SelectItem value="1000 - 5000">1000 - 5000</SelectItem>
                    <SelectItem value="5001 - 10000">5001 - 10000</SelectItem>
                    <SelectItem value="10001 - 20000">10001 - 20000</SelectItem>
                    <SelectItem value="Above 20000">Above 20000</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Grade Levels Offered" htmlFor="gradeLevels" description="Select all that apply">
                <Select
                  value={formData.gradeLevels}
                  onValueChange={(value) => handleSelectChange("gradeLevels", value)}
                >
                  <SelectTrigger id="gradeLevels" className="w-full">
                    <SelectValue placeholder="Select grade levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KG">Kindergarten</SelectItem>
                    <SelectItem value="Elementary">Elementary School</SelectItem>
                    <SelectItem value="Middle">Middle School</SelectItem>
                    <SelectItem value="High">High School</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="School Logo"
                htmlFor="schoolLogo"
                description="png or jpg format, max size 2MB. Recommended size: 200 x 200px"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-300 bg-gray-50">
                    {formData.schoolLogoUrl ? (
                      <img
                        src={formData.schoolLogoUrl || "/placeholder.svg"}
                        alt="School Logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="flex justify-center">
                          <div className="h-12 w-12 text-gray-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="schoolLogo"
                      className="hidden"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleSchoolLogoUpload}
                    />
                    <label htmlFor="schoolLogo">
                      <Button variant="outline" className="flex items-center gap-2 text-purple-600" asChild>
                        <span>
                          <Upload className="h-4 w-4" />
                          Upload Logo
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              </FormField>
            </ProfileSection>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <ProfileSection title="Contact Information" description="How parents and students reach your school.">
              <FormField label="Email Address" htmlFor="email" required>
                <InputWithIcon
                  icon={<Mail className="h-5 w-5" />}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@gmail.com"
                />
              </FormField>

              <FormField label="Phone Number" htmlFor="phone" required>
                <InputWithIcon
                  icon={<Phone className="h-5 w-5" />}
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+251-90-345-678"
                />
              </FormField>

              <FormField label="Website" htmlFor="website">
                <InputWithIcon
                  icon={<Link className="h-5 w-5" />}
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://dandibaru.edu"
                />
              </FormField>

              <FormField label="Street Address" htmlFor="streetAddress" required>
                <InputWithIcon
                  icon={<MapPin className="h-5 w-5" />}
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  placeholder="123 school line"
                />
              </FormField>

              <div className="grid gap-4 md:grid-cols-3">
                <FormField label="City" htmlFor="city" required>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Addis Ababa"
                  />
                </FormField>

                <FormField label="State" htmlFor="state" required>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Addis Ababa"
                  />
                </FormField>

                <FormField label="ZIP Code" htmlFor="zipCode">
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="1000"
                  />
                </FormField>
              </div>

              <FormField label="Social Media" htmlFor="socialMedia">
                <div className="space-y-3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputWithIcon
                      icon={<Facebook className="h-5 w-5" />}
                      id="facebookUrl"
                      name="facebookUrl"
                      value={formData.facebookUrl}
                      onChange={handleInputChange}
                      placeholder="Facebook URL"
                    />

                    <InputWithIcon
                      icon={<Instagram className="h-5 w-5" />}
                      id="instagramUrl"
                      name="instagramUrl"
                      value={formData.instagramUrl}
                      onChange={handleInputChange}
                      placeholder="Instagram URL"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <InputWithIcon
                      icon={<Linkedin className="h-5 w-5" />}
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      placeholder="LinkedIn URL"
                    />

                    <InputWithIcon
                      icon={<Twitter className="h-5 w-5" />}
                      id="twitterUrl"
                      name="twitterUrl"
                      value={formData.twitterUrl}
                      onChange={handleInputChange}
                      placeholder="Twitter URL"
                    />
                  </div>
                </div>
              </FormField>
            </ProfileSection>
          </TabsContent>

          <TabsContent value="programs" className="mt-6">
            <ProfileSection title="Programs & Facilities" description="Highlight what makes your school special.">
              <FormField label="Educational Program" htmlFor="educationalProgram">
                <Textarea
                  id="educationalProgram"
                  name="educationalProgram"
                  value={formData.educationalProgram}
                  onChange={handleInputChange}
                  placeholder="Describe the educational programs offered by your school..."
                  className="min-h-[120px]"
                />
              </FormField>

              <FormField label="Facilities" htmlFor="facilities" description="Select all that apply">
                <FacilityCheckboxList
                  facilities={facilityOptions.filter((f) => f.id !== "other")}
                  selectedFacilities={formData.facilities}
                  onFacilityChange={handleFacilityChange}
                />

                {/* Other option */}
                <div className="mt-3 flex items-center space-x-2">
                  <Checkbox
                    id="other"
                    checked={formData.facilities.other || false}
                    onCheckedChange={(checked) => handleFacilityChange("other", checked as boolean)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                  />
                  <label
                    htmlFor="other"
                    className="flex cursor-pointer items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <span className="text-gray-500">
                      <Plus className="h-4 w-4" />
                    </span>
                    Other
                  </label>
                </div>

                {/* Custom facility input */}
                {formData.facilities.other && (
                  <div className="mt-3 space-y-3">
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Enter custom facility"
                          value={customFacilityInput}
                          onChange={(e) => setCustomFacilityInput(e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleAddCustomFacility}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Add
                      </Button>
                    </div>

                    {/* Display added custom facilities */}
                    {formData.customFacilities.some((facility) => facility !== "") && (
                      <div className="rounded-md border border-gray-200 p-3">
                        <h4 className="mb-2 text-sm font-medium text-gray-700">Added Custom Facilities:</h4>
                        <div className="space-y-2">
                          {formData.customFacilities.map(
                            (facility, index) =>
                              facility !== "" && (
                                <div
                                  key={index}
                                  className="flex items-center justify-between rounded-md bg-purple-50 px-3 py-2"
                                >
                                  <span className="text-sm">{facility}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveCustomFacility(index)}
                                    className="h-7 w-7 p-0 text-gray-500 hover:bg-purple-100 hover:text-red-600"
                                  >
                                    <span className="sr-only">Remove</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="h-4 w-4"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </Button>
                                </div>
                              ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </FormField>

              <PhotoUpload photos={facilityPhotos} onUpload={handlePhotoUpload} onRemove={handlePhotoRemove} />
            </ProfileSection>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
