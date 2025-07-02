"use client";
import React, { useState, useEffect, useCallback } from "react";
import Body from "./Body";
import { ToastContainer } from "react-toastify";
import DashHeader from "./pages/dashboard/DashHeader";
import Sidebar, { SidebarItem } from "./SideBarNew";
import { usePathname } from "next/navigation";
import Bottombar from "./pages/dashboard/Bottombar";
import CommonModal from "./pages/home/CommonModal";
import { useDisclosure } from "@nextui-org/react";
import {
  FeedBack,
  Home,
  InvoicesSVG,
  ProductSVG,
  RentalScheduleSVG,
  Transaction,
} from "../assets/images/Images";
import useApi from "@/hooks/useApi";
import { GetProfileApi } from "@/apis";
import { ProfileDetailsType } from "@/types";

const emptyProfileDetails = {
  email: "",
  uuid: "",
  name: "",
  gender: "",
  country: "",
  bio: "",
  expertise: "",
  seniority: "",
  work_experience: [],
  education: [],
  current_organisation: "",
  tagline: "",
  skill: [],
  social_urls: [],
  referal_code: "",
  applies: 0,
};

interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  const [profileDetails, setProfileDetails] =
    useState<ProfileDetailsType>(emptyProfileDetails);
  const { makeApiCall } = useApi();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [expandedMain, setExpandedMain] = useState(true);

  useEffect(() => {
    makeApiCall(GetProfileApi())
      .then((response) => {
        setProfileDetails(response?.data);
      })
      .catch((error) => console.error(error));
  }, [makeApiCall]);

  return (
    <>
      <ToastContainer />
      <CommonModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={() => {}}
        type=""
        loading={false}
        onClose={onClose}
      />

      <div
        className={`fixed top-0 left-0 right-0 transition-all z-30 ${
          expandedMain ? "sm:ml-[17%]" : "sm:ml-24"
        }`}
      >
        <DashHeader onOpen={onOpen} profileDetails={profileDetails} />
      </div>

      <Body
        sideView={
          <SidebarNew
            setExpandedMain={setExpandedMain}
            profileDetails={profileDetails}
          />
        }
      >
        <div className="px-2 py-[14%] sm:px-4 sm:py-6 bg-white">
          <div
            className={`mt-0 ml-0   transition-all ${
              expandedMain ? "sm:ml-[17%]" : "sm:ml-24"
            }`}
          >
            {children}
          </div>
        </div>
      </Body>

      <Bottombar />
    </>
  );
}

// Embedded SidebarNew
function SidebarNew({
  setExpandedMain,
  profileDetails,
}: {
  setExpandedMain: (expanded: boolean) => void;
  profileDetails: ProfileDetailsType;
}) {
  const pathname = usePathname();

  return (
    <Sidebar setExpandedMain={setExpandedMain} profileDetails={profileDetails}>
      <SidebarItem
        icon={<Home color={pathname === "/dashboard" ? "#fff" : "#683FDB"} />}
        text="Home"
        alert={pathname === "/dashboard"}
        active={pathname === "/dashboard"}
        href="/dashboard"
      />
      <SidebarItem
        icon={
          <Transaction
            color={
              pathname === "/dashboard/referral-community" ? "#fff" : "#683FDB"
            }
          />
        }
        text="Community"
        alert={pathname === "/dashboard/referral-community"}
        active={pathname === "/dashboard/referral-community"}
        href="/dashboard/referral-community"
      />
      <SidebarItem
        icon={
          <InvoicesSVG
            color={pathname === "/dashboard/applied" ? "#fff" : "#683FDB"}
          />
        }
        text="Applied"
        alert={pathname === "/dashboard/applied"}
        active={pathname === "/dashboard/applied"}
        href="/dashboard/applied"
      />
      <SidebarItem
        icon={
          <RentalScheduleSVG
            color={pathname === "/dashboard/saved" ? "#fff" : "#683FDB"}
          />
        }
        text="Saved"
        alert={pathname === "/dashboard/saved"}
        active={pathname === "/dashboard/saved"}
        href="/dashboard/saved"
      />
      <SidebarItem
        icon={
          <ProductSVG
            color={
              pathname === "/dashboard/myjobs" ||
              pathname.includes("/myjobs/applications")
                ? "#fff"
                : "#683FDB"
            }
          />
        }
        text="My Jobs"
        alert={
          pathname === "/dashboard/myjobs" ||
          pathname.includes("/myjobs/applications")
        }
        active={
          pathname === "/dashboard/myjobs" ||
          pathname.includes("/myjobs/applications")
        }
        href="/dashboard/myjobs"
      />
      <SidebarItem
        icon={
          <FeedBack
            color={pathname === "/dashboard/feedback" ? "#fff" : "#683FDB"}
          />
        }
        text="Feedback"
        alert={pathname === "/dashboard/feedback"}
        active={pathname === "/dashboard/feedback"}
        href="/dashboard/feedback"
      />
    </Sidebar>
  );
}
