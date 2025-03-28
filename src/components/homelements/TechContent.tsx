"use client";
import React from "react";
import InfoCard from "./Card";
import { Spacer } from "@nextui-org/react";
import { techList, teamMembers } from "@/constants";
import ProfileCard from "./DiscoverPeople";
const TechContent = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className=" w-[80%] ">
          <div className=" text-lg text-black py-2">
            <span className="text-xl font-normal font-poppins">Make a</span>{" "}
            <span className="text-xl font-bold font-poppins">
              meaningful impact in
            </span>
          </div>

          <div className="flex flex-wrap justify-between my-4 ">
            <button className="w-auto sm:min-w-28 px-4 py-3 rounded-full bg-white hover:bg-[#333] text-black hover:text-white text-center font-poppins text-base mb-2 sm:mb-0">
              <p className="font-poppins font-normal text-base sm:text-xl">
                Data
              </p>
            </button>
            <button className="w-auto px-8 py-3 rounded-full bg-white hover:bg-[#333] text-black hover:text-white text-center font-poppins text-base mb-2 sm:mb-0">
              <p className="font-poppins font-normal text-xl">Network</p>
            </button>
            <button className="w-auto px-8 py-3 rounded-full bg-white hover:bg-[#333] text-black hover:text-white text-center font-poppins text-base mb-2 sm:mb-0">
              <p className="font-poppins font-normal text-xl">Deep Learning</p>
            </button>

            <button className="w-auto px-8 py-3 rounded-full bg-white hover:bg-[#333] text-black hover:text-white text-center font-poppins text-base mb-2 sm:mb-0">
              <p className="font-poppins font-normal text-xl">Web</p>
            </button>
            <button className="w-auto px-8 py-3 rounded-full bg-white hover:bg-[#333] text-black hover:text-white text-center font-poppins text-base mb-2 sm:mb-0">
              <p className="font-poppins font-normal text-xl">Algorithm</p>
            </button>
            <button className="w-auto px-8 py-3 rounded-full bg-white hover:bg-[#333] text-black hover:text-white text-center font-poppins text-base mb-2 sm:mb-0">
              <p className="font-poppins font-normal text-xl">Cybersecurity</p>
            </button>
          </div>

          <div className=" text-lg text-black py-2">
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
            <div className="text-left text-xl font-normal font-poppins text-black py-4">
              It’s a win-win situation: you get rewarded for your efforts, and
              others benefit from the opportunities you offer. Join today and
              start turning your network into a source of income!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechContent;
