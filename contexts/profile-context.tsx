"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

// Define the shape of our profile data
interface ProfileData {
  // Basic Info
  schoolName: string
  yearEstablished: string
  type: string
  numberOfStudents: string
  feeRange: string
  gradeLevels: string
  schoolLogo: File | null
  schoolLogoUrl: string
  userName: string
  userRole: string
  userAvatar?: string

  // Contact Info
  email: string
  phone: string
  website: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  facebookUrl: string
  instagramUrl: string
  linkedinUrl: string
  twitterUrl: string

  // Programs & Facilities
  educationalProgram: string
  facilities: {
    [key: string]: boolean
  }
  otherFacilities: string
  customFacilities: string[]
}

// Define the shape of our facility photos
interface FacilityPhoto {
  url: string
  file?: File
}

// Define the shape of our context
interface ProfileContextType {
  profile: ProfileData
  updateProfile: (data: Partial<ProfileData>) => void
  facilityPhotos: FacilityPhoto[]
  updateFacilityPhotos: (photos: FacilityPhoto[]) => void
  calculateCompletionPercentage: () => number
}

// Default profile data
const defaultProfile: ProfileData = {
  // Basic Info
  schoolName: "SchoolNet",
  yearEstablished: "2004",
  type: "Private",
  numberOfStudents: "10",
  feeRange: "1000 - 5000",
  gradeLevels: "KG",
  schoolLogo: null,
  schoolLogoUrl: "",
  userName: "Admin User",
  userRole: "Administrator",
  userAvatar: "",

  // Contact Info
  email: "example@gmail.com",
  phone: "+251-90-345-678",
  website: "https://schoolnet.edu",
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
  customFacilities: ["", "", ""],
}

// Default facility photos
const defaultFacilityPhotos: FacilityPhoto[] = [{ url: "" }, { url: "" }, { url: "" }]

// Create the context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

// Create a provider component
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available
  const [profile, setProfile] = useState<ProfileData>(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("schoolProfile")
      return savedProfile ? JSON.parse(savedProfile) : defaultProfile
    }
    return defaultProfile
  })

  const [facilityPhotos, setFacilityPhotos] = useState<FacilityPhoto[]>(() => {
    if (typeof window !== "undefined") {
      const savedPhotos = localStorage.getItem("facilityPhotos")
      return savedPhotos ? JSON.parse(savedPhotos) : defaultFacilityPhotos
    }
    return defaultFacilityPhotos
  })

  // Update profile data
  const updateProfile = useCallback((data: Partial<ProfileData>) => {
    setProfile((prev) => {
      const updatedProfile = { ...prev, ...data }
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("schoolProfile", JSON.stringify(updatedProfile))
      }
      return updatedProfile
    })
  }, [])

  // Update facility photos
  const updateFacilityPhotos = useCallback((photos: FacilityPhoto[]) => {
    setFacilityPhotos(photos)
    // Save to localStorage (only URLs, not file objects)
    if (typeof window !== "undefined") {
      const photosToSave = photos.map(({ url }) => ({ url }))
      localStorage.setItem("facilityPhotos", JSON.stringify(photosToSave))
    }
  }, [])

  // Calculate profile completion percentage
  const calculateCompletionPercentage = useCallback(() => {
    // Define required fields for each section
    const requiredFields = {
      basic: ["schoolName"],
      contact: ["email", "phone", "streetAddress", "city", "state"],
      programs: [],
    }

    // Define optional fields that contribute to completion
    const optionalFields = {
      basic: ["yearEstablished", "type", "numberOfStudents", "feeRange", "gradeLevels", "schoolLogo", "userName"],
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
      if (profile[field as keyof ProfileData]) basicCompleted++
    })

    // Check optional fields
    optionalFields.basic.forEach((field) => {
      if (field === "schoolLogo" && profile.schoolLogoUrl) {
        basicCompleted++
      } else if (profile[field as keyof ProfileData]) {
        basicCompleted++
      }
    })

    // Calculate contact info completion
    let contactCompleted = 0
    const contactTotal = requiredFields.contact.length + optionalFields.contact.length

    // Check required fields
    requiredFields.contact.forEach((field) => {
      if (profile[field as keyof ProfileData]) contactCompleted++
    })

    // Check optional fields
    optionalFields.contact.forEach((field) => {
      if (profile[field as keyof ProfileData]) contactCompleted++
    })

    // Calculate programs & facilities completion
    let programsCompleted = 0
    const programsTotal = requiredFields.programs.length + optionalFields.programs.length + 2 // +2 for facilities and photos

    // Check required fields
    requiredFields.programs.forEach((field) => {
      if (profile[field as keyof ProfileData]) programsCompleted++
    })

    // Check optional fields
    optionalFields.programs.forEach((field) => {
      if (profile[field as keyof ProfileData]) programsCompleted++
    })

    // Check facilities
    const hasFacilities = Object.values(profile.facilities).some((value) => value === true)
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
  }, [profile, facilityPhotos])

  // Provide the context value
  const contextValue = {
    profile,
    updateProfile,
    facilityPhotos,
    updateFacilityPhotos,
    calculateCompletionPercentage,
  }

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>
}

// Create a hook to use the profile context
export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
