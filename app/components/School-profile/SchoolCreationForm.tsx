"use client";

import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createSchool } from "@/redux/slices/schoolSlice";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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

export default function SchoolCreationForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [facilityImages, setFacilityImages] = useState<Record<string, File[]>>(
    {}
  );

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

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

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
                  resolve(base64.split(",")[1]); // Remove data:image/jpeg;base64, prefix
                };
                reader.readAsDataURL(file);
              });
            })
          );

          return {
            name: facility,
            img_path: base64Images,
            _id: crypto.randomUUID(),
          };
        })
      );

      const formData = {
        ...data,
        schoolFacilites,
        address: [
          {
            ...data.address,
            _id: crypto.randomUUID(),
          },
        ],
      };

      const result = await dispatch(createSchool(formData)).unwrap();

      if (result.status === "success") {
        toast.success("School created successfully!");
        router.push("/school-profile"); // Redirect to school profile
      } else {
        throw new Error("Failed to create school");
      }
    } catch (error: any) {
      console.error("Error creating school:", error);
      toast.error(error.message || "Failed to create school");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Create New School
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                      {["kg", "primary", "middle", "highschool"].map((div) => (
                        <div key={div} className="flex items-center space-x-2">
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
                      ))}
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                  Creating School...
                </>
              ) : (
                "Create School"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
