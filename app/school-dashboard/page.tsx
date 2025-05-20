"use client";
import { MessageSquare } from "lucide-react";

import { ParentConnectionsCard } from "@/app/components/School-Dashboard/cards/parent-connections-card";
import { UnreadMessagesCard } from "@/app/components/School-Dashboard/cards/unread-messages-card";
import { ProfileCompletionCard } from "@/app/components/School-Dashboard/cards/profile-completion-card";
import { RecentActivitySection } from "@/app/components/School-Dashboard/sections/recent-activity-section";
import { NotificationCenterSection } from "@/app/components/School-Dashboard/sections/notification-center-section";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter()
  // Sample data
  const parentConnections = {
    count: 16,
    avatars: [
      { profilepic: "/images/parent.jpg", alt: "Parent 1", fallback: "P1" },
      { profilepic: "/images/parent1.jpg", alt: "Parent 2", fallback: "P2" },
      { profilepic: "/images/parent2.jpg", alt: "Parent 3", fallback: "P3" },
    ],
  };

  const unreadMessages = {
    count: 3,
  };

  const profileCompletion = {
    percentage: 80,
  };

  const notifications = [
    {
      id: "1",
      title: "Platform Update: New parent messaging feature",
      time: "2 hours ago",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      onClick: () => console.log("Notification 1 clicked"),
    },
    {
      id: "2",
      title: "Platform Update: New parent messaging feature",
      time: "2 hours ago",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      onClick: () => console.log("Notification 2 clicked"),
    },
    {
      id: "3",
      title: "Platform Update: New parent messaging feature",
      time: "2 hours ago",
      icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
      onClick: () => console.log("Notification 3 clicked"),
    },
  ];

  // Event handlers
  const handleViewInbox = () => {
    router.push("/school-dashboard/inbox")
  };

  const handleCompleteProfile = () => {
    router.push("/school-dashboard/profile")
  };

  const handleCreatePost = () => {
    console.log("Create post clicked");
  };

  const handleLearnHow = () => {
    console.log("Learn how clicked");
  };

  return (
    <div className=" w-full">
      {/* Card Components */}
      <div className="grid gap-6 md:grid-cols-3">
        <ParentConnectionsCard {...parentConnections} />
        <UnreadMessagesCard
          count={unreadMessages.count}
          onViewInbox={handleViewInbox}
        />
        <ProfileCompletionCard
          percentage={profileCompletion.percentage}
          onCompleteProfile={handleCompleteProfile}
        />
      </div>

      {/* Section Components */}
      <div className="flex flex-col gap-6 w-full h-full">
        <RecentActivitySection
          hasActivity={false}
          onCreatePost={handleCreatePost}
          onLearnHow={handleLearnHow}
        />

        <NotificationCenterSection notifications={notifications} />
      </div>
    </div>
  );
}
