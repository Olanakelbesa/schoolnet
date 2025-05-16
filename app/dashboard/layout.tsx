"use client";

import { ReactNode, useState } from "react";
import Header from "../components/ParentDashboard/Header";
import Sidebar from "../components/ParentDashboard/sidebar";
import Footer from "../components/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={handleToggle}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={handleMobileMenuClose}
        />
        <div className="flex-1 flex flex-col">
          <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="min-h-full">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
