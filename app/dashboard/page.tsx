
import ParentDashboard from "../components/ParentDashboard/ParentDashboard";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <div className="flex-1 flex h-screen">
        <div className="flex-1 overflow-y-auto h-full scrollbar-hidden">
          <ParentDashboard/>
        </div>
      </div>
    </div>
  );
}
