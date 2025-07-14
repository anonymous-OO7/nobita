"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { Logo } from "../../../assets/Logo";
import { Add } from "@/assets/Add";
import Image from "next/image";
import BellIcon from "../../../assets/bell.svg";
import { useRouter, usePathname } from "next/navigation";
import { nextLocalStorage } from "@/utils/nextLocalStorage";
import { Search, Star } from "lucide-react";
import Logo2 from "../../../assets/workistheadline.svg";
import { ProfileDetailsType } from "@/types";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Button from "@/components/Button";

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  college: string;
  company: string;
  phoneNo: string;
  gender: string;
  course: string;
  createdAt: string;
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
  const name = nextLocalStorage()?.getItem("name") ?? "";
  const pathname = usePathname();

  const handleLogout = React.useCallback(() => {
    localStorage.clear();
    router.replace("/");
  }, [router]);

  const handleUpdateProfile = React.useCallback(() => {
    router.replace("/dashboard/profile");
  }, [router]);

  const navigateSavedJobs = React.useCallback(() => {
    router.replace("/dashboard/saved");
  }, [router]);

  const navigateMyJobs = React.useCallback(() => {
    router.replace("/dashboard/myjobs");
  }, [router]);

  const navigateToAskReferral = React.useCallback(() => {
    router.push("/dashboard/referral-community/referral-ask");
  }, [router]);

  const navigateToPostJob = React.useCallback(() => {
    router.push("/recruiter/submit");
  }, [router]);

  const [data, setData] = React.useState<UserData>();

  const isRecruiter = React.useMemo(() => {
    if (typeof window !== "undefined") {
      return (
        pathname.includes("/recruiter") &&
        localStorage.getItem("role") === "recruiter"
      );
    }
    return false;
  }, [pathname]);

  React.useEffect(() => {
    const storedData = nextLocalStorage()?.getItem("user_data");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.log("USER DATA NOT PARSED");
      }
    }
  }, []);

  return (
    <Navbar
      isBordered
      className="p-0 h-[7vh] flex flex-row justify-between overflow-hidden"
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <Image src={Logo2} alt="logo" width={120} />
          <p className="text-black font-normal font-poppins sm:block">
            {data?.college !== "" ? data?.college : "---"}
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-2">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[32rem] h-8 rounded-2xl",
              input: "text-small border-0",
              inputWrapper: "font-normal font-rubik text-default-500",
            }}
            placeholder="Search ..."
            size="sm"
            startContent={<Search />}
            type="search"
          />
        </NavbarContent>
      </NavbarContent>

      <NavbarContent
        as="div"
        className="flex flex-row justify-center items-center"
        justify="end"
      >
        {pathname.includes("/dashboard/referral-community") && (
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => (window.location.href = "/dashboard/submit")}
              className="hover:bg-stone-300 bg-buttonPrimary py-1 px-2 shadow-md text-white text-xs rounded-md font-poppins font-normal flex items-center gap-2"
            >
              Add referral
              <Add />
            </button>
            <Button
              className="flex flex-row justify-center items-center"
              onClick={navigateToAskReferral}
              color="default"
            >
              Ask referral
            </Button>
          </div>
        )}

        {/* ✅ Show Post Job for recruiters */}
        {isRecruiter && (
          <Button
            className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-md font-poppins font-normal"
            onClick={navigateToPostJob}
          >
            Post Job
          </Button>
        )}

        <div>
          <button
            onClick={() => (window.location.href = "/pricing")}
            className="hover:bg-stone-300 bg-buttonPrimary p-2 py-2 shadow-md text-white text-xs rounded-md font-poppins font-normal flex items-center gap-2"
          >
            <span className="whitespace-nowrap">
              Credits {profileDetails?.applies}
            </span>
            <Star size={18} />
          </button>
        </div>

        <Button
          color="warning"
          variant="solid"
          aria-label="Take a photo"
          className="h-8"
        >
          <Image height={18} src={BellIcon} alt="Notifications" />
        </Button>

        <Popover placement="bottom-end" showArrow>
          <PopoverTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="User Avatar"
              size="sm"
              src="https://cdn1.vectorstock.com/i/1000x1000/77/10/men-faceless-profile-vector-13567710.jpg"
            />
          </PopoverTrigger>
          <PopoverContent className="p-2 w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] max-w-xs">
            <div className="space-y-1">
              <div className="px-3 py-2 text-left text-sm">
                <p className="text-black font-poppins">Signed in as</p>
                <p className="text-black font-poppins">{name || "---"}</p>
              </div>
              <hr />
              <button
                onClick={navigateSavedJobs}
                className="w-full text-left px-3 py-2 hover:bg-stone-100 rounded-md text-sm text-black font-poppins"
              >
                Saved
              </button>
              <button
                onClick={navigateMyJobs}
                className="w-full text-left px-3 py-2 hover:bg-stone-100 rounded-md text-sm text-black font-poppins"
              >
                My Jobs
              </button>
              <button
                onClick={handleUpdateProfile}
                className="w-full text-left px-3 py-2 hover:bg-stone-100 rounded-md text-sm text-black font-poppins"
              >
                Update Profile
              </button>
              <button
                onClick={() => alert("Coming soon!")}
                className="w-full text-left px-3 py-2 hover:bg-stone-100 rounded-md text-sm text-black font-poppins"
              >
                Help & Feedback
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 hover:bg-red-100 rounded-md text-sm text-red-600 font-poppins"
              >
                Log Out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </NavbarContent>
    </Navbar>
  );
}
