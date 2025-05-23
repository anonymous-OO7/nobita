// components/Header.js
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
  Button,
} from "@nextui-org/react";
import { Logo } from "../../../assets/Logo";
import { Add } from "@/assets/Add";
import Image from "next/image";
import BellIcon from "../../../assets/bell.svg";
import { useRouter } from "next/navigation";
import { nextLocalStorage } from "@/utils/nextLocalStorage";
import { Search } from "lucide-react";
import Logo2 from "../../../assets/workistheadline.svg";
import { ProfileDetailsType } from "@/types";
import { Star } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

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
  createdAt: string; // Assuming createdAt is always a string in ISO 8601 format
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

  // const userData = JSON.parse(nextLocalStorage()?.getItem("user_data") ?? "");

  const handleLogout = React.useCallback(() => {
    localStorage.clear();
    router.replace("/");
  }, [router]);

  const handleUpdateProfile = React.useCallback(() => {
    router.replace("/dashboard/profile");
    // onOpen();
  }, [router, onOpen]);

  const navigateSavedJobs = React.useCallback(() => {
    router.replace("/dashboard/saved");
    // onOpen();
  }, [router, onOpen]);

  const navigateMyJobs = React.useCallback(() => {
    router.replace("/dashboard/myjobs");
    // onOpen();
  }, [router, onOpen]);

  const [data, setData] = React.useState<UserData>();

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
      className="p-0 h-[7vh]  flex flex-row justify-between overflow-hidden"
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <Image src={Logo2} alt="logo" width={120} />
          <p className=" text-black font-normal font-poppins sm:block  ">
            {data?.college != "" ? data?.college : "---"}
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-2">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[32rem] h-8 rounded-2xl",
              input: "text-small border-0	",
              inputWrapper: "font-normal font-rubik text-default-500 ",
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
        className=" flex flex-row justify-center items-center"
        justify="end"
      >
        {/* <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon />}
          type="search"
        /> */}
        <div className="hidden sm:flex">
          {/* <Link href="/dashboard/submit">
            <Button
              className="hover:bg-stone-300 bg-buttonPrimary p-2 shadow-md text-white rounded-md font-poppins font-normal"
              endContent={<Add />}
            >
              Create Job
            </Button>
          </Link> */}
          <button
            onClick={() => (window.location.href = "/dashboard/submit")}
            className="hover:bg-stone-300 bg-buttonPrimary py-1 px-2 shadow-md text-white text-xs rounded-md font-poppins font-normal flex items-center gap-2"
          >
            Create Job
            <Add />
          </button>
        </div>
        <div>
          {/* <Link href="/pricing">
            <Button
              className="hover:bg-stone-300 bg-buttonPrimary p-2 py-4 shadow-md text-white text-xs rounded-md font-poppins font-normal"
              startContent={<Star size={16} />}
            >
              credits {profileDetails.applies}
            </Button>
          </Link> */}

          <button
            onClick={() => (window.location.href = "/pricing")}
            className="hover:bg-stone-300 bg-buttonPrimary p-2 py-2 shadow-md text-white text-xs rounded-md font-poppins font-normal flex items-center gap-2"
          >
            <span className="whitespace-nowrap">
              Credits {profileDetails.applies}
            </span>
            <Star size={18} />
          </button>
        </div>

        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Take a photo"
          className="h-8 "
        >
          <Image height={18} src={BellIcon} alt="File" />
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
