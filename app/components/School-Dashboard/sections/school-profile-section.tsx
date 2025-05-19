"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  updateSchool,
  fetchSchoolProfile,
} from "@/redux/slices/schoolSlice";
import {
  createSchool,
  setFormData,
  resetForm,
  clearError
} from "@/redux/slices/schoolCreateSlice";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Upload,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

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

const FACILITIES = [
  "library",
  "cafeteria",
  "computerLab",
  "scienceLab",
  "sportsGround",
  "swimmingPool",
  "gymnasiu",
  "auditoriu",
  "wifi",
  "musicRoom",
  "artStudio",
  "infirmary",
  "parking",
  "microscopyLab",
  "other",
];

const BUDGET_RANGES = [
  { label: "<5,000 ETB", min: 0, max: 5000 },
  { label: "5,000-10,000 ETB", min: 5000, max: 10000 },
  { label: "10,000-20,000 ETB", min: 10000, max: 20000 },
  { label: ">20,000 ETB", min: 20000, max: 1000000 },
];

const formSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  yearEstablished: z.number().min(1800).max(new Date().getFullYear()),
  schoolType: z.enum(["Private", "Public"]),
  division: z.array(z.enum(["kg", "primary", "middle", "highschool"])).min(1),
  studentCount: z.number().min(1),
  budgetMin: z.number(),
  budgetMax: z.number(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+251\d{9}$/, "Invalid phone number format"),
  address: z.object({
    city: z.literal("Addis Ababa"),
    subCity: z.enum(SUB_CITIES as [string, ...string[]]),
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  schoolFacilites: z.array(
    z.object({
      name: z.enum(FACILITIES as [string, ...string[]]),
      img_path: z.array(z.string()),
    })
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function SchoolProfileSection() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [facilityImages, setFacilityImages] = useState<Record<string, File[]>>(
    {}
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const {
    selectedSchool: schoolProfile,
    loading: schoolLoading,
    error: schoolError,
  } = useSelector((state: RootState) => state.schools);

  const {
    loading: createLoading,
    error: createError,
    success: createSuccess
  } = useSelector((state: RootState) => state.schoolCreate);

  const loading = schoolLoading || createLoading;
  const error = schoolError || createError;
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        city: "Addis Ababa",
      },
      division: [],
      schoolFacilites: [],
    },
  });

  // Calculate profile completion percentage
  const calculateProfileCompletion = (data: Partial<FormData>) => {
    const requiredFields = [
      "name",
      "yearEstablished",
      "schoolType",
      "division",
      "studentCount",
      "email",
      "phoneNumber",
      "address.subCity",
      "description",
    ];

    const completedFields = requiredFields.filter((field) => {
      const value = field.includes(".")
        ? (data as Record<string, any>)[field.split(".")[0]]?.[
            field.split(".")[1]
          ]
        : data[field as keyof FormData];
      return value !== undefined && value !== null && value !== "";
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await dispatch(fetchSchoolProfile()).unwrap();
        if (result.status === "success" && result.data) {
          form.reset({
            ...result.data,
            schoolFacilites: result.data.schoolFacilites || [],
          });
          setSelectedFacilities(
            result.data.schoolFacilites?.map((f: { name: string }) => f.name) ||
              []
          );
          setIsEditing(true);
          setProfileCompletion(calculateProfileCompletion(result.data));
        }
      } catch (error) {
        console.error("Error fetching school profile:", error);
        toast.error("Failed to fetch school profile");
      }
    };

    fetchProfile();
  }, [dispatch, form]);

  // Update profile completion when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      const typedValue = value as Partial<FormData>;
      setProfileCompletion(calculateProfileCompletion(typedValue));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setSelectedFacilities((prev) =>
      checked ? [...prev, facility] : prev.filter((f) => f !== facility)
    );
  };

  const handleImageUpload = (facility: string, files: FileList) => {
    setFacilityImages((prev) => ({
      ...prev,
      [facility]: Array.from(files),
    }));
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      console.log("Starting form submission with data:", data);

      // Validate profile image
      if (!isEditing && !profileImage) {
        toast.error("Please upload a profile image");
        return;
      }

      // Convert facility images to base64
      const schoolFacilites = await Promise.all(
        selectedFacilities.map(async (facility) => {
          const images = facilityImages[facility] || [];
          const base64Images = await Promise.all(
            images.map((file) => {
              return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result as string;
                  resolve(base64.split(",")[1]);
                };
                reader.readAsDataURL(file);
              });
            })
          );

          return {
            name: facility,
            img_path: base64Images,
          };
        })
      );

      // Convert profile image to base64 if exists
      let profileImageBase64 = "";
      if (profileImage) {
        profileImageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            resolve(base64.split(",")[1]);
          };
          reader.readAsDataURL(profileImage);
        });
      }

      // Structure the request body according to API expectations
      const formData = {
        school: {
          name: data.name,
          email: data.email,
          address: [
            {
              city: data.address.city,
              subCity: data.address.subCity,
            },
          ],
          phoneNumber: data.phoneNumber,
          schoolWebsite: "", // Add this field to your form if needed
          schoolType: data.schoolType,
          division: data.division,
          studentCount: data.studentCount,
          yearEstablished: data.yearEstablished,
          schoolFacilites: schoolFacilites,
          description: data.description,
          budgetMin: data.budgetMin,
          budgetMax: data.budgetMax,
          profileImage: profileImageBase64 || schoolProfile?.profile_image,
        },
      };

      console.log("Submitting form data:", formData);

      let result;
      if (isEditing) {
        result = dispatch(setFormData(formData.school));
  
        console.log("Update school result:", result);
      } else {
        dispatch(setFormData(formData.school));
        result = await dispatch(createSchool(formData.school)).unwrap();
     
      }

      console.log("API Response:", result);

      if (result.status === "success") {
        toast.success(
          isEditing
            ? "School profile updated successfully!"
            : "School profile created successfully!"
        );
        router.push("/school-dashboard");
      } else {
        throw new Error(result.message || "Operation failed");
      }
    } catch (error: any) {
      console.error("Error with school profile:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(
        error.response?.data?.message ||
          error.message ||
          (isEditing
            ? "Failed to update school profile"
            : "Failed to create school profile")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/school-dashboard"
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      {/* Profile Completion Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
          <CardDescription>
            Complete your profile to increase visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={profileCompletion} className="h-2" />
            <p className="text-sm text-gray-600">
              {profileCompletion}% Complete
            </p>
            {profileCompletion < 100 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Profile Incomplete</AlertTitle>
                <AlertDescription>
                  Complete all required fields to improve your school's
                  visibility
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit School Profile" : "Create School Profile"}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? "Update your school's information and facilities"
              : "Create your school profile to start managing your school"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : schoolProfile?.profile_image ? (
                    <img
                      src={schoolProfile.profile_image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                    id="profile-image"
                  />
                  <label
                    htmlFor="profile-image"
                    className="cursor-pointer text-sm text-purple-600 hover:text-purple-700"
                  >
                    {isEditing
                      ? "Change Profile Image"
                      : "Upload Profile Image"}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 400x400 pixels
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter school name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearEstablished"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Established</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter year"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select school type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="division"
                  render={() => (
                    <FormItem>
                      <FormLabel>School Divisions</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {["kg", "primary", "middle", "highschool"].map(
                          (div) => (
                            <div
                              key={div}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={div}
                                checked={form
                                  .watch("division")
                                  .includes(div as any)}
                                onCheckedChange={(checked) => {
                                  const current = form.getValues("division");
                                  form.setValue(
                                    "division",
                                    checked
                                      ? [
                                          ...current,
                                          div as
                                            | "kg"
                                            | "primary"
                                            | "middle"
                                            | "highschool",
                                        ]
                                      : current.filter((d) => d !== div)
                                  );
                                }}
                              />
                              <label
                                htmlFor={div}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {div.charAt(0).toUpperCase() + div.slice(1)}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Count</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter student count"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budgetMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Range</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const range = BUDGET_RANGES.find(
                            (r) => r.label === value
                          );
                          if (range) {
                            field.onChange(range.min);
                            form.setValue("budgetMax", range.max);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BUDGET_RANGES.map((range) => (
                            <SelectItem key={range.label} value={range.label}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+251XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.subCity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub City</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sub city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUB_CITIES.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter school description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <FormLabel className="text-lg font-semibold">
                  School Facilities
                </FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {FACILITIES.map((facility) => (
                    <div
                      key={facility}
                      className="space-y-2 bg-white p-3 rounded-md shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={facility}
                          checked={selectedFacilities.includes(facility)}
                          onCheckedChange={(checked) =>
                            handleFacilityChange(facility, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={facility}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {facility.charAt(0).toUpperCase() + facility.slice(1)}
                        </label>
                      </div>
                      {selectedFacilities.includes(facility) && (
                        <div className="mt-2">
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                              handleImageUpload(facility, e.target.files!)
                            }
                            className="text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Upload images for this facility
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Updating Profile..." : "Creating Profile..."}
                  </>
                ) : isEditing ? (
                  "Update School Profile"
                ) : (
                  "Create School Profile"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
