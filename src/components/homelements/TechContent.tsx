"use client";
import React from "react";
import InfoCard from "./Card";
import { Spacer } from "@nextui-org/react";
import { techList, teamMembers } from "@/constants";
import ProfileCard from "./DiscoverPeople";
const TechContent = () => {
  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className=" w-[80%] mt-8">
          <div className=" text-lg text-black py-2">
            <span className="text-xl font-normal font-poppins">Make a</span>{" "}
            <span className="text-xl font-bold font-poppins">
              meaningful impact in
            </span>
          </div>
          <div className="flex flex-wrap justify-start gap-3 my-4">
            {/* Mobile: Show only a few */}
            <div className="block sm:hidden gap-2">
              {[
                "Data",
                "Web",
                "AI/ML",
                "Product",
                "Design",
                "Marketing",
                "Sales",
                "Operations",
              ].map((field) => (
                <button
                  key={field}
                  className="px-4 py-2 mb-2 mr-1 rounded-full border border-[#0071e3] bg-white text-[#0071e3] hover:bg-[#0071e3] hover:text-white font-poppins text-sm transition"
                >
                  {field}
                </button>
              ))}
            </div>

            {/* Tablet and up: Show all */}
            <div className="hidden sm:flex flex-wrap gap-3">
              {[
                "Remote",
                "MNC",
                "Marketing",
                "Supply Chain",
                "Banking And Finance",
                "Sales",
                "HR",
                "Fresher",
                "Software And Technology",
                "Data Science",
                "Internship",
              ].map((field) => (
                <button
                  key={field}
                  className="px-4 py-2 rounded-full border border-[#0071e3] bg-white text-[#0071e3] hover:bg-[#0071e3] hover:text-white font-poppins text-sm transition"
                >
                  {field}
                </button>
              ))}
            </div>
          </div>

          {/* <div className=" text-lg text-black py-2">
            <span className="text-xl font-normal font-poppins">Want to</span>{" "}
            <span className="text-xl font-bold font-poppins">
              Earn by providing referals to people
            </span>
            <div className="text-left text-xl font-normal font-poppins text-black py-4 hidden sm:block">
              Looking to earn money while helping others? Sign up now to become
              a referral partner and start making money by connecting people
              with valuable opportunities. By listing the referral options you
              can provide, you can help others find great products, services, or
              programs while earning a commission for every successful referral.
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TechContent;
