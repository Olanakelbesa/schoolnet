"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Camera, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { updateParentProfile } from "@/redux/slices/parentSlice";
import NotificationContainer from "../../components/Notification";

// Constants
const GRADE_LEVELS = ["primary", "middle", "high"];
const SCHOOL_TYPES = ["private", "public", "international"];
const BUDGET_RANGES = [
  { label: "<5,000 ETB", min: 0, max: 5000 },
  { label: "5,000-10,000 ETB", min: 5000, max: 10000 },
  { label: "10,000-20,000 ETB", min: 10000, max: 20000 },
  { label: ">20,000 ETB", min: 20000, max: 1000000 },
];
const SUB_CITIES = [
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
];

// Add validation constants
const ETHIOPIAN_PHONE_REGEX = /^(\+251|0)?[97]\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.parentProfile
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    numberOfChildren: "",
    childrenDetails: {
      gradeLevels: [] as string[],
      schoolType: [] as string[],
    },
    address: {
      city: "Addis Ababa",
      subCity: "",
    },
    budgetMin: 0,
    budgetMax: 0,
    photo: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    email: "",
    phoneNumber: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    phoneNumber: "",
  });
  const [notifications, setNotifications] = useState<
    {
      id: number;
      message: string;
      type: "success" | "error" | "warning" | "info";
    }[]
  >([]);

  // Generate unique ID for notifications
  const generateId = () => Math.floor(Math.random() * 1000000);

  // Add notification with optional auto-dismiss
  const addNotification = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    const id = generateId();
    setNotifications((prev) => [...prev, { id, message, type }]);
    if (type !== "error") {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);
    }
  };

  // Remove notification
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Load profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        numberOfChildren: profile.numberOfChildren || "",
        childrenDetails: {
          gradeLevels: profile.childrenDetails?.gradeLevels || [],
          schoolType: profile.childrenDetails?.schoolType || [],
        },
        address: {
          city: profile.address?.city || "Addis Ababa",
          subCity: profile.address?.subCity || "",
        },
        budgetMin: profile.budgetMin || 0,
        budgetMax: profile.budgetMax || 0,
        photo: null,
      });
      if (profile.photo) {
        setPreviewUrl(profile.photo);
      }
    }
  }, [profile]);

  // Load contact data
  useEffect(() => {
    if (profile) {
      setContactForm({
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
      });
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      // Check file type
      if (!["image/jpeg", "image/png", "image/svg+xml"].includes(file.type)) {
        toast.error("Only PNG, JPG, and SVG files are allowed");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const validatePhoneNumber = (phone: string) => {
    if (!phone) return "Phone number is required";
    if (!ETHIOPIAN_PHONE_REGEX.test(phone)) {
      return "Please enter a valid Ethiopian phone number (e.g., +251912345678 or 0912345678)";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!EMAIL_REGEX.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change
    if (name === "phoneNumber") {
      setFormErrors((prev) => ({
        ...prev,
        phoneNumber: validatePhoneNumber(value),
      }));
    } else if (name === "email") {
      setFormErrors((prev) => ({
        ...prev,
        email: validateEmail(value),
      }));
    }
  };

  const handleSendVerification = async () => {
    const emailError = validateEmail(contactForm.email);
    if (emailError) {
      setFormErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch("/api/v1/sendVerification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: contactForm.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification code");
      }

      setShowVerificationInput(true);
      setVerificationSent(true);
      toast.success("Verification code sent to your email");
    } catch (error) {
      toast.error("Failed to send verification code");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(contactForm.email);
    const phoneError = validatePhoneNumber(contactForm.phoneNumber);

    setFormErrors({
      email: emailError,
      phoneNumber: phoneError,
    });

    if (emailError || phoneError) {
      return;
    }

    // If email changed, require verification
    if (contactForm.email !== profile?.email && !verificationSent) {
      toast.error("Please verify your new email address first");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch("/api/v1/updateMe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactForm,
          verificationCode: showVerificationInput
            ? verificationCode
            : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact information");
      }

      toast.success("Contact information updated successfully");
      setShowVerificationInput(false);
      setVerificationSent(false);
      setVerificationCode("");
    } catch (error) {
      toast.error("Failed to update contact information");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photo" && value) {
          formDataToSend.append("photo", value as File);
        } else if (key === "childrenDetails" || key === "address") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value !== null) {
          formDataToSend.append(key, String(value));
        }
      });

      // Update profile using Redux thunk
      const resultAction = await dispatch(updateParentProfile(formDataToSend));
      console.log("Update profile result:", resultAction);

      if (updateParentProfile.fulfilled.match(resultAction)) {
        console.log("Profile update successful:", resultAction.payload);
        addNotification("Profile updated successfully", "success");
        setIsEditing(false);
      } else {
        console.error("Profile update failed:", resultAction.payload);
        throw new Error(resultAction.payload as string);
      }
    } catch (error: any) {
      addNotification(error.message || "Failed to update profile", "error");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Notifications */}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />

      <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-purple-200">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-purple-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor="photo"
                      className="cursor-pointer bg-purple-100 text-purple-700 px-4 py-2 rounded-md hover:bg-purple-200"
                    >
                      Change Photo
                    </Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Number of Children */}
                <div className="space-y-2">
                  <Label htmlFor="numberOfChildren">Number of Children</Label>
                  <Select
                    value={formData.numberOfChildren}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        numberOfChildren: value,
                      }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of children" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Grade Levels */}
                <div className="space-y-2">
                  <Label>Grade Levels</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {GRADE_LEVELS.map((level) => (
                      <Button
                        key={level}
                        type="button"
                        variant={
                          formData.childrenDetails.gradeLevels.includes(level)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          if (!isEditing) return;
                          setFormData((prev) => ({
                            ...prev,
                            childrenDetails: {
                              ...prev.childrenDetails,
                              gradeLevels:
                                prev.childrenDetails.gradeLevels.includes(level)
                                  ? prev.childrenDetails.gradeLevels.filter(
                                      (l) => l !== level
                                    )
                                  : [
                                      ...prev.childrenDetails.gradeLevels,
                                      level,
                                    ],
                            },
                          }));
                        }}
                        disabled={!isEditing}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* School Types */}
                <div className="space-y-2">
                  <Label>School Types</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {SCHOOL_TYPES.map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={
                          formData.childrenDetails.schoolType.includes(type)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => {
                          if (!isEditing) return;
                          setFormData((prev) => ({
                            ...prev,
                            childrenDetails: {
                              ...prev.childrenDetails,
                              schoolType:
                                prev.childrenDetails.schoolType.includes(type)
                                  ? prev.childrenDetails.schoolType.filter(
                                      (t) => t !== type
                                    )
                                  : [...prev.childrenDetails.schoolType, type],
                            },
                          }));
                        }}
                        disabled={!isEditing}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label>Sub City</Label>
                  <Select
                    value={formData.address.subCity}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, subCity: value },
                      }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub city" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUB_CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <Select
                    value={`${formData.budgetMin}-${formData.budgetMax}`}
                    onValueChange={(value) => {
                      const range = BUDGET_RANGES.find(
                        (r) => `${r.min}-${r.max}` === value
                      );
                      if (range) {
                        setFormData((prev) => ({
                          ...prev,
                          budgetMin: range.min,
                          budgetMax: range.max,
                        }));
                      }
                    }}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_RANGES.map((range) => (
                        <SelectItem
                          key={range.label}
                          value={`${range.min}-${range.max}`}
                        >
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  {isEditing ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isUpdating}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button type="button" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update your email and phone number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="inline-block mr-2 h-4 w-4" />
                    Email
                  </Label>
                  <div className="space-y-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      disabled={isUpdating || showVerificationInput}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>
                  {showVerificationInput && (
                    <div className="space-y-2">
                      <Label htmlFor="verificationCode">
                        Verification Code
                      </Label>
                      <Input
                        id="verificationCode"
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        disabled={isUpdating}
                      />
                    </div>
                  )}
                  {contactForm.email !== profile?.email &&
                    !showVerificationInput && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSendVerification}
                        disabled={isUpdating || !!formErrors.email}
                      >
                        Send Verification Code
                      </Button>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">
                    <Phone className="inline-block mr-2 h-4 w-4" />
                    Phone Number
                  </Label>
                  <div className="space-y-2">
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number (e.g., +251912345678)"
                      value={contactForm.phoneNumber}
                      onChange={handleContactChange}
                      disabled={isUpdating}
                      className={formErrors.phoneNumber ? "border-red-500" : ""}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-sm text-red-500">
                        {formErrors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Contact Info"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
