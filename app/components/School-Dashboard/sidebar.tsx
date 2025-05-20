"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  SidebarIcon,
  ChevronLeft,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout, clearAuth } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

export function Sidebar({
  activeTab = "dashboard",
  onTabChange,
  isCollapsed,
  onToggle,
  isMobileMenuOpen,
  onMobileMenuClose,
}: SidebarProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    // Close mobile menu when a tab is clicked
    onMobileMenuClose();
  };

  const handleLogout = async () => {
    try {
      await logout(); // Backend logout
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearAuth());
      router.push("/login");
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Sidebar - Hidden on mobile, visible on lg screens */}
      <div
        className={`fixed h-screen flex-col border-r border-dashed border-[#B188E3] bg-[#f7f3fc] p-4 transition-all duration-300 hidden lg:flex ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
            />
          )}
          <button
            onClick={onToggle}
            className="rounded-md p-1 hover:bg-purple-100"
          >
            <SidebarIcon
              className={`h-5 w-5 text-[#B188E3] transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <nav className="mt-8 flex flex-1 flex-col overflow-y-auto">
          <div className="space-y-2">
            <NavItem
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => handleTabClick("dashboard")}
              href="/school-dashboard"
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<Users className="h-5 w-5" />}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => handleTabClick("profile")}
              href="/school-dashboard/profile"
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<BarChart3 className="h-5 w-5" />}
              label="Inbox"
              active={activeTab === "inbox"}
              onClick={() => handleTabClick("inbox")}
              href="/school-dashboard/inbox"
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<FileText className="h-5 w-5" />}
              label="Report"
              active={activeTab === "report"}
              onClick={() => handleTabClick("report")}
              href="/school-dashboard/reports"
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => handleTabClick("settings")}
              href="/school-dashboard/settings"
              isCollapsed={isCollapsed}
            />
          </div>
          <div className="mt-auto space-y-2">
            <NavItem
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help/Support"
              active={activeTab === "help"}
              onClick={() => handleTabClick("help")}
              href="/help"
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<LogOut className="h-5 w-5" />}
              label="Logout"
              active={activeTab === "logout"}
              onClick={handleLogout}
              href="#"
              isCollapsed={isCollapsed}
            />
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Only visible on mobile when opened */}
      <div
        className={`fixed h-screen flex-col border-r border-dashed border-[#B188E3] bg-[#f7f3fc] p-4 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "left-0 flex z-50 w-64" : "-left-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
          />
          <button
            onClick={onMobileMenuClose}
            className="rounded-md p-1 hover:bg-purple-100"
          >
            <X className="h-5 w-5 text-[#B188E3]" />
          </button>
        </div>
        <nav className="mt-8 flex flex-1 flex-col overflow-y-auto">
          <div className="space-y-2">
            <NavItem
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => handleTabClick("dashboard")}
              href="/school-dashboard"
              isCollapsed={false}
            />
            <NavItem
              icon={<Users className="h-5 w-5" />}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => handleTabClick("profile")}
              href="/school-dashboard/profile"
              isCollapsed={false}
            />
            <NavItem
              icon={<FileText className="h-5 w-5" />}
              label="Inbox"
              active={activeTab === "inbox"}
              onClick={() => handleTabClick("inbox")}
              href="/school-dashboard/inbox"
              isCollapsed={false}
            />
            <NavItem
              icon={<BarChart3 className="h-5 w-5" />}
              label="Reports"
              active={activeTab === "reports"}
              onClick={() => handleTabClick("reports")}
              href="/school-dashboard/reports"
              isCollapsed={false}
            />
            <NavItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => handleTabClick("settings")}
              href="/settings"
              isCollapsed={false}
            />
          </div>
          <div className="mt-auto space-y-2">
            <NavItem
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help/Support"
              active={activeTab === "help"}
              onClick={() => handleTabClick("help")}
              href="/help"
              isCollapsed={false}
            />
            <NavItem
              icon={<LogOut className="h-5 w-5" />}
              label="Logout"
              active={activeTab === "logout"}
              onClick={handleLogout}
              href="#"
              isCollapsed={false}
            />
          </div>
        </nav>
      </div>
    </>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  href: string;
  isCollapsed: boolean;
}

function NavItem({
  icon,
  label,
  active,
  onClick,
  href,
  isCollapsed,
}: NavItemProps) {
  const isLogout = label === "Logout";

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm ${
        isLogout
          ? active
            ? "bg-red-100 text-red-700 font-medium"
            : "text-red-500 hover:bg-red-50"
          : active
          ? "bg-purple-200 text-purple-700 font-medium"
          : "text-gray-500 hover:bg-purple-100"
      } ${isCollapsed ? "justify-center" : ""}`}
      onClick={(e) => {
        if (href === "#") {
          e.preventDefault();
        }
        onClick();
      }}
      title={isCollapsed ? label : undefined}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}
