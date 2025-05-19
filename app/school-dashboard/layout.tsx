"use client";

import type React from "react";
import { useState } from "react";
import { Navbar } from "@/app/components/School-Dashboard/navbar";
import { Sidebar } from "@/app/components/School-Dashboard/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function SchoolDashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area with Fixed Navbar */}
      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Fixed Navbar */}
        <div className="fixed top-0 right-0 z-10 w-full lg:w-[calc(100%-16rem)] transition-all duration-300">
          <Navbar
            userName="Dandi Boru Academy Admin"
            userRole="Admin"
            onMobileMenuClick={handleMobileMenuClick}
          />
        </div>

        {/* Scrollable Main Content */}
        <main className="mt-16 flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
