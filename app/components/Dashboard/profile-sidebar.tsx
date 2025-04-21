import Image from "next/image";
import { Bell, MessageCircle, MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Displays a circular progress ring around the profile avatar
interface ProfilePictureProps {
  /** Percentage from 0 to 100 */
  progress: number;
}

function ProfilePicture({ progress }: ProfilePictureProps) {
  return (
    <div className="relative mb-2 mt-5 group">
      {/* Progress ring starting at bottom, filling clockwise */}
      <svg
        className="absolute -inset-2 transform rotate-180"
        viewBox="0 0 36 36"
      >
        {/* Background circle */}
        <path
          className="text-gray-200"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        {/* Progress indicator with rounded cap */}
        <path
          className="text-purple-500"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={`${progress} ${100 - progress}`}
          strokeLinecap="round"
        />
      </svg>

      {/* Avatar */}
      <div className="relative z-10 flex items-center justify-center h-24 w-24 rounded-full overflow-hidden bg-white border-4 border-white">
        <Image
          src="/images/profilepic.jpg"
          alt="Profile picture"
          width={80}
          height={80}
          className="object-cover"
        />
      </div>

      {/* Hover overlay showing percentage */}
      <div className="absolute -top-10 inset-0 flex items-start justify-center z-20">
        <div className="flex gap-2 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold text-purple-600 bg-white px-2 py-1 rounded-full shadow-md">
          <span className="">{progress}%</span>{" "}
          <span> Complete</span>
        </div>
      </div>
    </div>
  );
}

interface SchoolListItemProps {
  name: string;
  description: string;
  initials: string;
}

function SchoolListItem({ name, description, initials }: SchoolListItemProps) {
  return (
    <div className="flex items-center justify-between p-2 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-xs">{initials}</span>
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
      <Button
        size="sm"
        className="bg-purple-600 hover:bg-purple-700 text-white text-xs h-7"
      >
        Follow
      </Button>
    </div>
  );
}

export function ProfileSidebar() {
  // Set profile completion percentage (0–100)
  const progress = 70;

  return (
    <div className="w-80 p-4 border-l hidden lg:block">
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <div className="hidden md:block w-full mb-2">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-medium">Your Profile</span>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Profile picture + progress ring */}
          <ProfilePicture progress={progress} />

          <div className="text-center">
            <h3 className="font-medium">Good Morning Semeriya</h3>
            <p className="text-xs text-gray-500 mt-1">
              Check Notifications And Write Reviews For Your Favorite Schools
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="h-10 w-10 rounded-full border flex items-center justify-center">
              <Bell className="h-5 w-5" />
            </button>
            
          </div>
        </div>
        <div className="h-32 flex items-end justify-center gap-2">
          {[40, 60, 80, 90, 100].map((height, i) => (
            <div
              key={i}
              className="w-8 bg-gradient-to-t from-purple-600 to-purple-300 rounded-t-md"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Your List</h3>
            <button className="h-6 w-6 rounded-full border flex items-center justify-center">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <SchoolListItem
              name="Bole School"
              description="Public Institution"
              initials="BS"
            />
            <SchoolListItem
              name="International School"
              description="Old Bole Airport"
              initials="IS"
            />
          </div>

          <div className="mt-4 text-center bg-gray-100 hover:bg-gray-200 py-2 rounded-full ">
            <a href="#" className="text-sm text-purple-600 font-medium">
              See All
            </a>
          </div>
        </div>

        
      </div>
    </div>
  );
}
