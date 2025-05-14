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
          <Link href="/dashboard/submit">
            <Button
              className="hover:bg-stone-300 bg-buttonPrimary p-2 shadow-md text-white rounded-md font-poppins font-normal"
              endContent={<Add />}
            >
              Create Job Referral
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/pricing">
            <Button
              className="hover:bg-stone-300 bg-buttonPrimary p-2 py-4 shadow-md text-white text-xs rounded-md font-poppins font-normal"
              startContent={<Star size={16} />}
            >
              credits {profileDetails.applies}
            </Button>
          </Link>
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

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://cdn1.vectorstock.com/i/1000x1000/77/10/men-faceless-profile-vector-13567710.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-normal text-black font-poppins">
                Signed in as
              </p>
              <p className="font-normal text-black font-poppins">
                {name != "" ? name : ""}
              </p>
            </DropdownItem>

            <DropdownItem key="help_and_feedback">
              <p
                onClick={navigateSavedJobs}
                className="font-normal text-black font-poppins"
              >
                Saved
              </p>
            </DropdownItem>

            <DropdownItem key="help_and_feedback">
              <p
                onClick={navigateMyJobs}
                className="font-normal text-black font-poppins"
              >
                My Jobs
              </p>
            </DropdownItem>

            <DropdownItem key="help_and_feedback">
              <p
                onClick={handleUpdateProfile}
                className="font-normal text-black font-poppins"
              >
                Update Profile
              </p>
            </DropdownItem>

            <DropdownItem key="help_and_feedback">
              <p className="font-normal text-black font-poppins">
                Help & Feedback
              </p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              <p className="font-normal text-danger font-poppins">Log Out</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
