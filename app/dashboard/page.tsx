import { MainDashboard } from "../components/Dashboard/main-dashboard";
import { Sidebar } from "../components/Dashboard/sidebar";
import { ProfileSidebar } from "../components/Dashboard/profile-sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex h-screen">
        <div className="flex-1 overflow-y-auto h-full scrollbar-hidden">
          <MainDashboard />
        </div>

        <div className="border-l h-full overflow-y-auto scrollbar-hidden w-[320px]">
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
}
