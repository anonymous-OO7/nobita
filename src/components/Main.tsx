"use client";
import React, { useState, useEffect } from "react";
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
  MessagesSVG,
  ProductSVG,
  RentalScheduleSVG,
  ResDeskSVG,
  Transaction,
} from "../assets/images/Images";
import useApi from "@/hooks/useApi";
import { GetProfileApi } from "@/apis";
import { ProfileDetailsType } from "@/types";
import { LoadingIcon } from "@/assets/images/Loading";

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
  username: "",
  resume: null,
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
        onOpenChange={onOpenChange}
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
        <div className="px-2 py-[14%] sm:px-4 sm:py-6 bg-light">
          <div
            className={`mt-0 ml-0 transition-all ${
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

function SidebarNew({
  setExpandedMain,
  profileDetails,
}: {
  setExpandedMain: (expanded: boolean) => void;
  profileDetails: ProfileDetailsType;
}) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for window to be available and get role
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("role"));
      setLoading(false);
    }
  }, []);

  const getSidebarItems = () => {
    if (loading || !pathname || !role) {
      return []; // Return empty array while loading
    }

    if (
      (role === "recruiter" || role === "super_recruiter") &&
      pathname.includes("/recruiter")
    ) {
      return [
        {
          icon: <Home color={pathname === "/recruiter" ? "#fff" : "#683FDB"} />,
          text: "Home",
          alert: pathname === "/recruiter",
          active: pathname === "/recruiter",
          href: "/recruiter",
        },
        {
          icon: (
            <ResDeskSVG
              color={pathname === "/recruiter/resdex" ? "#fff" : "#683FDB"}
            />
          ),
          text: "Resdex",
          alert: pathname === "/recruiter/resdex",
          active: pathname === "/recruiter/resdex",
          href: "/recruiter/resdex",
        },
        {
          icon: (
            <ProductSVG
              color={
                pathname === "/recruiter/myjobs" ||
                pathname.includes("/myjobs/applications")
                  ? "#fff"
                  : "#683FDB"
              }
            />
          ),
          text: "My Jobs",
          alert:
            pathname === "/recruiter/myjobs" ||
            pathname.includes("/myjobs/applications"),
          active:
            pathname === "/recruiter/myjobs" ||
            pathname.includes("/myjobs/applications"),
          href: "/recruiter/myjobs",
        },
        {
          icon: (
            <MessagesSVG
              color={pathname === "/recruiter/messages" ? "#fff" : "#683FDB"}
            />
          ),
          text: "Messages",
          alert: pathname === "/recruiter/messages",
          active: pathname === "/recruiter/messages",
          href: "/recruiter/messages",
        },
        {
          icon: (
            <FeedBack
              color={pathname === "/recruiter/feedback" ? "#fff" : "#683FDB"}
            />
          ),
          text: "Feedback",
          alert: pathname === "/recruiter/feedback",
          active: pathname === "/recruiter/feedback",
          href: "/recruiter/feedback",
        },
        {
          icon: (
            <FeedBack
              color={pathname === "/recruiter/admin" ? "#fff" : "#683FDB"}
            />
          ),
          text: "Admin",
          alert: pathname === "/recruiter/admin",
          active: pathname === "/recruiter/admin",
          href: "/recruiter/admin",
        },
      ];
    }

    // Default candidate items
    return [
      {
        icon: <Home color={pathname === "/dashboard" ? "#fff" : "#683FDB"} />,
        text: "Home",
        alert: pathname === "/dashboard",
        active: pathname === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: (
          <Transaction
            color={
              pathname === "/dashboard/referral-community" ? "#fff" : "#683FDB"
            }
          />
        ),
        text: "Referral",
        alert: pathname === "/dashboard/referral-community",
        active: pathname === "/dashboard/referral-community",
        href: "/dashboard/referral-community",
      },
      {
        icon: (
          <InvoicesSVG
            color={pathname === "/dashboard/applied" ? "#fff" : "#683FDB"}
          />
        ),
        text: "Applied",
        alert: pathname === "/dashboard/applied",
        active: pathname === "/dashboard/applied",
        href: "/dashboard/applied",
      },
      {
        icon: (
          <RentalScheduleSVG
            color={pathname === "/dashboard/saved" ? "#fff" : "#683FDB"}
          />
        ),
        text: "Saved",
        alert: pathname === "/dashboard/saved",
        active: pathname === "/dashboard/saved",
        href: "/dashboard/saved",
      },
      // {
      //   icon: (
      //     <ProductSVG
      //       color={
      //         pathname === "/dashboard/myjobs" ||
      //         pathname.includes("/myjobs/applications")
      //           ? "#fff"
      //           : "#683FDB"
      //       }
      //     />
      //   ),
      //   text: "My Jobs",
      //   alert:
      //     pathname === "/dashboard/myjobs" ||
      //     pathname.includes("/myjobs/applications"),
      //   active:
      //     pathname === "/dashboard/myjobs" ||
      //     pathname.includes("/myjobs/applications"),
      //   href: "/dashboard/myjobs",
      // },
      {
        icon: (
          <FeedBack
            color={pathname === "/dashboard/feedback" ? "#fff" : "#683FDB"}
          />
        ),
        text: "Feedback",
        alert: pathname === "/dashboard/feedback",
        active: pathname === "/dashboard/feedback",
        href: "/dashboard/feedback",
      },
    ];
  };

  const sidebarItems = getSidebarItems();

  return (
    <Sidebar setExpandedMain={setExpandedMain} profileDetails={profileDetails}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingIcon className="w-8 h-8" />
        </div>
      ) : (
        <>
          {!role && (
            <div className="p-4 mb-4 bg-yellow-50 border border-yellow-300 rounded-md text-sm text-yellow-700">
              <p>
                You are not logged in.{" "}
                <button
                  className="underline font-semibold text-yellow-800"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </button>{" "}
                to unlock full premium access, advanced features, resume
                builder, and more.
              </p>
            </div>
          )}
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              alert={item.alert}
              active={item.active}
              href={item.href}
            />
          ))}
        </>
      )}
    </Sidebar>
  );
}
