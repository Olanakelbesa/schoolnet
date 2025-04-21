import type React from "react";
import { Bell, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementCardProps {
  icon: React.ReactNode;
  label: string;
  count: string;
  title: string;
}

function AnnouncementCard({
  icon,
  label,
  count,
  title,
}: AnnouncementCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-100 w-90 md:full">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-full">{icon}</div>
          <div>
            <div className="text-sm text-gray-500 mb-1">
              {count} {label}
            </div>
            <div className="font-medium">{title}</div>
          </div>
        </div>
        <button className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition duration-200">
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export function AnnouncementCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <AnnouncementCard
        icon={<Bell className="h-5 w-5 text-purple-600" />}
        label="announcements"
        count="2/8"
        title="open registrations"
      />
      <AnnouncementCard
        icon={<Bell className="h-5 w-5 text-purple-600" />}
        label="Watched"
        count="2/8"
        title="Upcoming events"
      />
      <AnnouncementCard
        icon={<Bell className="h-5 w-5 text-purple-600" />}
        label="Watched"
        count="2/8"
        title="new schools"
      />
    </div>
  );
}
