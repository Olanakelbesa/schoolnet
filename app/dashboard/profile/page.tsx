"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2,
  Mail,
  Phone,
  MapPin,
  Users,
  GraduationCap,
  School,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { fetchParentProfile } from "@/redux/slices/parentSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

// Helper function to check if a value is empty
const isEmpty = (value: any) => {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object" && value !== null)
    return Object.keys(value).length === 0;
  return value === undefined || value === null || value === "";
};

// Default value component with tooltip
const DefaultValue = ({
  value,
  defaultText,
}: {
  value: any;
  defaultText: string;
}) => {
  const isDefault = isEmpty(value);
  return (
    <div className="flex items-center gap-1">
      <span className={isDefault ? "text-gray-400" : "text-gray-600"}>
        {isDefault ? defaultText : value}
      </span>
      {isDefault && (
        <Tooltip>
          <TooltipTrigger>
            <AlertCircle className="h-4 w-4 text-gray-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Not provided yet</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [localUser, setLocalUser] = useState<string | null>(null);
  const {
    loading: authLoading,
    token,
    user,
  } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<any>(user);
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useSelector((state: RootState) => state.parentProfile);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user && typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      setUserData(stored ? JSON.parse(stored) : null);
    } else if (user) {
      setUserData(user);
    }
  }, [user]);

  useEffect(() => {
    // This runs only on the client
    const storedUser = localStorage.getItem("user");
    setLocalUser(storedUser);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Don't run on server-side

    const storedToken = localStorage.getItem("token");
    if (!token && !storedToken) {
      console.log(
        "No token found in auth state or localStorage, redirecting to login..."
      );
      router.push("/login");
      return;
    }

    console.log("Fetching parent profile...");
    dispatch(fetchParentProfile())
      .unwrap()
      .then((result) => {
        console.log("Profile fetch successful:", result);
      })
      .catch((error) => {
        console.error("Profile fetch failed:", error);
        if (error === "No authentication token found") {
          router.push("/login");
        }
      });
  }, [dispatch, token, router, isClient]);

  // Debug logs
  console.log("Current state:", {
    profile,
    profileLoading,
    profileError,
    user,
    authLoading,
    token,
  });

  if (profileLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">
          <p className="text-lg font-semibold mb-2">Error loading profile</p>
          <p>{profileError}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/login")}
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    console.log("No profile found:", { profile, user });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No profile found</p>
          <p className="text-sm text-gray-400 mb-4">
            Please complete your profile setup to view your information.
          </p>
          <Link href="/parentquestionnaire">
            <Button
              variant="outline"
              className="text-purple-600 border-purple-600 hover:bg-purple-50"
            >
              Complete Profile Setup
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with Edit Button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            <Link href="/dashboard/settings">
              <Button
                variant="outline"
                className="text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                Edit Profile
              </Button>
            </Link>
          </div>

          {/* Profile Photo and Basic Info */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-200">
                  {profile?.photo ? (
                    <Image
                      src={profile.photo}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                      <Users className="h-8 w-8 text-purple-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    <DefaultValue
                      value={
                        profile?.firstName && profile?.lastName
                          ? `${profile.firstName} ${profile.lastName}`
                          : null
                      }
                      defaultText="Not provided"
                    />
                  </h2>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{user?.email || "Not provided"}</span>
                      {user?.isVerifiedEmail ? (
                        <CheckCircle2 className="h-4 w-4 ml-2 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 ml-2 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{user?.phoneNumber || "Not provided"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Children Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Children Information</CardTitle>
              <CardDescription>
                Details about your children and their education
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <DefaultValue
                  value={profile?.numberOfChildren}
                  defaultText="0"
                />
              </div>
              <div className="flex items-center text-gray-600">
                <GraduationCap className="h-5 w-5 mr-2" />
                <DefaultValue
                  value={
                    profile?.childrenDetails?.gradeLevels?.length
                      ? profile.childrenDetails.gradeLevels.join(", ")
                      : null
                  }
                  defaultText="Not specified"
                />
              </div>
              <div className="flex items-center text-gray-600">
                <School className="h-5 w-5 mr-2" />
                <DefaultValue
                  value={
                    profile?.childrenDetails?.schoolType?.length
                      ? profile.childrenDetails.schoolType.join(", ")
                      : null
                  }
                  defaultText="Not specified"
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Your current location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <DefaultValue
                  value={
                    profile?.address?.subCity && profile?.address?.city
                      ? `${profile.address.subCity}, ${profile.address.city}`
                      : null
                  }
                  defaultText="Not specified"
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget Range */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Range</CardTitle>
              <CardDescription>
                Your preferred school budget range
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2" />
                <DefaultValue
                  value={
                    profile?.budgetMin !== undefined &&
                    profile?.budgetMax !== undefined
                      ? `${profile.budgetMin.toLocaleString()} - ${profile.budgetMax.toLocaleString()} ETB`
                      : null
                  }
                  defaultText="Not specified"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
