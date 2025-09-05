"use client";

import React, { useState, useEffect, useCallback } from "react";
import Logo2 from "../../../assets/workistheadline.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { nextLocalStorage } from "@/utils/nextLocalStorage";
import { Search } from "lucide-react";
import JobSearchNumericCodeComponent from "@/components/common/FilterComponent";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Avatar } from "@heroui/react";
import { ProfileDetailsType } from "@/types";
import { Menu, X, ChevronDown } from "lucide-react";

interface UserData {
  college: string;
  // other fields omitted for brevity
}

interface DashHeaderProps {
  onOpen: () => void;
  profileDetails: ProfileDetailsType;
}

export default function DashHeader({
  onOpen,
  profileDetails,
}: DashHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<UserData | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

  useEffect(() => {
    const stored = nextLocalStorage()?.getItem("user_data");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {}
    }

    // ✅ Get role from localStorage and deduce login status
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      if (storedRole) setRole(storedRole);

      const token = localStorage.getItem("authToken");
      const uuid = localStorage.getItem("uuid");
      const email = localStorage.getItem("email");
      setIsLoggedIn(!!(token && uuid && email));
    }
  }, []);

  const name = nextLocalStorage()?.getItem("name") ?? "";

  const handleLogout = useCallback(() => {
    localStorage.clear();
    router.replace("/");
  }, [router]);

  const navigate = useCallback(
    (path: string) => {
      router.replace(path);
    },
    [router]
  );

  const isDashboardPath = pathname.includes("dashboard");

  return (
    <div className="w-full h-[7vh] border-b border-gray-200 flex items-center justify-between px-4 bg-white">
      {/* Left Section: Logo + College */}
      <div className="flex items-center gap-4">
        <Image src={Logo2} alt="Logo" width={120} height={32} />
      </div>

      {/* Center Section: Search + Filters */}
      <div className="flex-1 px-4 flex items-center gap-4">
        <div className="hidden sm:flex items-center w-2/4 max-w-lg bg-gray-100 rounded-md px-3 py-2">
          <Search className="text-gray-500" size={18} />
          <input
            type="search"
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-sm px-2 text-gray-700"
          />
        </div>

        {/* Only show JobSearchNumericCodeComponent if path includes "dashboard" */}
        {isDashboardPath && (
          <JobSearchNumericCodeComponent onSearch={(url) => router.push(url)} />
        )}
      </div>

      {/* Right Section: Auth Buttons or Avatar & Popover */}
      <div className="flex items-center gap-4 relative">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => router.push("/login")}
              className="text-sm px-4 py-1.5 rounded-md bg-black text-white hover:bg-gray-900 transition"
            >
              Job Seeker Login
            </button>
            <button
              onClick={() => router.push("/login?is_recruiter=true")}
              className="text-sm px-4 py-1.5 rounded-md border border-gray-300 text-gray-900 hover:bg-gray-100 transition"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => router.push("/pricing")}
              className="text-sm px-4 py-1.5 rounded-md border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3] hover:text-white transition"
            >
              Pricing
            </button>
            {/* Quick Links Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                className="flex items-center text-gray-800 hover:text-blue-600 transition-colors"
              >
                Quick Links <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {isQuickLinksOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <button
                    onClick={() => {
                      router.push("/about");
                      setIsQuickLinksOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => {
                      router.push("/contact");
                      setIsQuickLinksOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Contact Us
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Popover placement="bottom-end" showArrow>
            <PopoverTrigger>
              <Avatar
                as="button"
                isBordered
                size="sm"
                color="secondary"
                src="https://cdn1.vectorstock.com/i/1000x1000/77/10/men-faceless-profile-vector-13567710.jpg"
                className="cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 bg-white shadow-md rounded-lg">
              <div className="space-y-1">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-gray-600 text-xs">Signed in as</p>
                  <p className="text-gray-800 font-medium">{name || "---"}</p>
                </div>
                <button
                  onClick={() => navigate("/dashboard/saved")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  Saved
                </button>
                <button
                  onClick={() => navigate("/dashboard/myjobs")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  My Jobs
                </button>
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => alert("Coming soon!")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  Help & Feedback
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 text-sm text-red-600"
                >
                  Log Out
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
