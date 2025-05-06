"use client";
import React from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import Link from "next/link";
import { nextLocalStorage } from "@/utils/nextLocalStorage";
import Logo2 from "../../src/assets/workisticon.svg";
import Image from "next/image";
import { gradients } from "../../src/assets/colors";
import useApi from "@/hooks/useApi";
import { GetProfileApi } from "@/apis";
import { Tooltip } from "@heroui/react";

const SidebarContext = createContext();

export default function Sidebar({ children, setExpandedMain, profileDetails }) {
  const [expanded, setExpanded] = useState(true);
  const { makeApiCall } = useApi();

  // const name = nextLocalStorage()?.getItem("name") ?? "name";
  const email = nextLocalStorage()?.getItem("email") ?? "";
  const name = nextLocalStorage()?.getItem("name") ?? "";

  const [data, setData] = React.useState();

  React.useEffect(() => {
    makeApiCall(GetProfileApi())
      // eslint-disable-next-line
      .then((response) => {
        console.log(response, "Response  of get profile paege");
        setProfileDetails(response?.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("finally");
      });
  }, [makeApiCall]);

  return (
    <div>
      {/* Sidebar for large devices */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0   hidden sm:block left-0 z-40 w-[17%] pt-0 h-screen sm:translate-x-0 transition-all ${
          expanded ? "hidden sm:block" : "w-[5%] hidden sm:block"
        }`}
      >
        <nav className="h-full flex flex-col   shadow-lg">
          <div className="p-4 pb-4 flex justify-between items-center mb-8">
            <Image
              src={Logo2}
              alt="logo"
              className={`overflow-hidden transition-all ${
                expanded ? "w-16" : "w-0"
              }`}
            />
            <button
              onClick={() => {
                setExpandedMain((curr) => !curr);
                setExpanded((curr) => !curr);
              }}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? (
                <ChevronFirst color="#000" />
              ) : (
                <ChevronLast color="#000" />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>
          <div
            className={`
                flex justify-between items-center 
                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
          >
            <div className="flex flex-row justify-between leading-4 text-black gap-6 items-center">
              <p className="text-black font-poppins font-semibold text-xl">
                Credits
              </p>
              <Tooltip
                content={"*credits are used to apply for a referral"}
                size="md"
                color="foreground"
              >
                <p className="text-black font-poppins font-light text-2xl">
                  {profileDetails?.applies}
                </p>
              </Tooltip>
            </div>
          </div>

          <p className="text-black font-poppins font-light text-xs px-3 my-4">
            *Credits let you apply to referrals. Want more? Share your referral
            code with friends using the code below to earn extra credits!
          </p>
          <p className="text-black font-poppins font-light text-xs px-3 my-4 ">
            Your Referral Code:
            <span className="text-xs text-gray-600">
              <p className="text-red-600 font-poppins font-semibold text-3xl">
                {profileDetails?.referal_code}
              </p>
            </span>
          </p>
          <div className="border-t flex p-3">
            <img // eslint-disable-line
              src="https://cdn1.vectorstock.com/i/1000x1000/77/10/men-faceless-profile-vector-13567710.jpg"
              alt=""
              className="w-6 h-6 rounded-md "
            />
            <div
              className={`
                flex justify-between items-center 
                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
            >
              <div className="leading-4 text-black">
                <p> {name != "" ? name : ""}</p>
                <span className="text-xs text-gray-600">
                  <p className="text-black font-poppins font-light text-xs">
                    {email != "" ? email : ""}
                  </p>
                </span>
              </div>
              <MoreVertical size={14} color="#000" />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
}

export function SidebarItem({ icon, text, active, alert, href }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={href}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 mx-3 font-normal rounded-md cursor-pointer transition-colors group ${
          active
            ? "text-black" // Only the text color
            : "hover:bg-stone-200 text-gray-600"
        }`}
        style={{
          background: active ? gradients.sidebarActive : undefined,
        }}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all font-rubik font-light ${
            expanded ? "w-52 ml-3" : "w-0"
          }  ${
            active
              ? "text-white" // Only the text color
              : "text-black"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-violet-300 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
