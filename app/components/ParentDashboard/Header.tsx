"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search, Menu, Bell, User, Settings, Filter } from "lucide-react";
import Link from "next/link";
import { BsFilter } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import { Equalizer, FilterList } from "@mui/icons-material";
import { IoFilter } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/slices/schoolSlice";
import { useCallback, useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { AppDispatch } from "@/redux/store";

interface HeaderProps {
  onMenuClick?: () => void;
  schoolName?: string;
}

export default function Header({ onMenuClick, schoolName }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState("");
  const isSchoolDetailsPage = pathname.includes("/school-details/");

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      console.log("Dispatching search query:", value);
      dispatch(setSearchQuery(value));
    }, 300),
    [dispatch]
  ) as unknown as ((value: string) => void) & { cancel: () => void };

  // Update search when value changes
  useEffect(() => {
    if (searchValue !== undefined) {
      debouncedSearch(searchValue);
    }
    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Search input changed:", value);
    setSearchValue(value);
  };

  if (isSchoolDetailsPage) {
    return (
      <header className="bg-white shadow-sm rounded-t-2xl border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Centered navigation */}
          <nav className="flex-1 flex justify-center space-x-16">
            <Link
              href="#academics"
              className="font-semibold text-gray-900 hover:text-purple-700"
            >
              Academics
            </Link>
            <Link
              href="#admissions"
              className="font-semibold text-gray-900 hover:text-purple-700"
            >
              Admissions
            </Link>
            <Link
              href="#fees"
              className="font-semibold text-gray-900 hover:text-purple-700"
            >
              Fees
            </Link>
            <Link
              href="#staff"
              className="font-semibold text-gray-900 hover:text-purple-700"
            >
              Staff
            </Link>
            <Link
              href="#analytics"
              className="font-semibold text-gray-900 hover:text-purple-700"
            >
              Analytics
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          {/* Left section - Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search schools, locations, or categories..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:border-purple-500 focus:ring-purple-500"
                value={searchValue}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-4 ml-4">
            <Link
              href="/dashboard/filter"
              className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              aria-label="Open filter"
            >
              <IoFilter className="h-5 w-5" />
            </Link>

            <button
              className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>

            <Link
              href="/dashboard/profile"
              className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
