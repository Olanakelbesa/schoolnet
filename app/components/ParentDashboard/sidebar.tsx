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
  ChevronLeft,
  X,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout, clearAuth } from "@/redux/slices/authSlice";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

export default function Sidebar({
  isCollapsed,
  onToggle,
  isMobileMenuOpen,
  onMobileMenuClose,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleTabClick = () => {
    if (onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Backend logout
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearAuth()); // Clear Redux state and localStorage
      router.push("/login"); // Redirect to login page
    }
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
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

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r transform transition-all duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isCollapsed ? "lg:w-20" : "w-64"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && (
              <div className="flex items-center">
                <Link href="/dashboard">
                  <Image
                    src="/logo.png"
                    alt="SchoolNet"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
            )}
            <button
              onClick={onToggle}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <ChevronLeft
                className={`h-5 w-5 transition-transform ${
                  isCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
            <button
              onClick={onMobileMenuClose}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <NavItem
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Dashboard"
              active={isActive("/dashboard")}
              onClick={handleTabClick}
              href="/dashboard"
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<Users className="h-5 w-5" />}
              label="Schools"
              active={isActive("/dashboard/schools")}
              onClick={handleTabClick}
              href="/dashboard/schools"
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={<FileText className="h-5 w-5" />}
              label="My List"
              active={isActive("/dashboard/my-list")}
              onClick={handleTabClick}
              href="/dashboard/my-list"
              isCollapsed={isCollapsed}
            />
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="space-y-1">
              <NavItem
                icon={<Settings className="h-5 w-5" />}
                label="Settings"
                active={isActive("/dashboard/settings")}
                onClick={handleTabClick}
                href="/dashboard/settings"
                isCollapsed={isCollapsed}
              />
              <NavItem
                icon={<HelpCircle className="h-5 w-5" />}
                label="Help/Support"
                active={isActive("/dashboard/help")}
                onClick={handleTabClick}
                href="/dashboard/help"
                isCollapsed={isCollapsed}
              />
              <NavItem
                icon={<LogOut className="h-5 w-5" />}
                label="Logout"
                active={false}
                onClick={handleLogout}
                href="#"
                isCollapsed={isCollapsed}
              />
            </div>
          </div>
        </div>
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
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
        isLogout
          ? active
            ? "bg-red-100 text-red-700 font-medium"
            : "text-red-500 hover:bg-red-50"
          : active
          ? "bg-purple-100 text-purple-800 font-medium"
          : "text-gray-500 hover:bg-purple-50"
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