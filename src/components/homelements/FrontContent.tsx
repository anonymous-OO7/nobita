import { Illustration } from "@/assets/images/Illustration";
import { Star } from "@/assets/images/Star";
import { Avatar, AvatarGroup } from "@nextui-org/react";

import React from "react";

const FrontContent = () => {
  return (
    <div className="w-full mt-[8vh] flex justify-center items-center ">
      <div className="  sm:w-[80%]">
        <div className="w-full md:flex  sm:justify-around ">
          <div className="md:w-[40%]  md:order-last flex justify-center items-center">
            <div className=" w-[60%] ">
              <Illustration className="w-[100%] h-[100%]" />
            </div>
          </div>

          <div className="md:w-1/2 ">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-black">
              <span className="text-4xl  md:text-5xl lg:text-7xl font-normal font-poppins">
                Unlock Your Career Potential
              </span>{" "}
              <span className="text-4xl  md:text-5xl lg:text-7xl font-bold font-poppins">
                with the Power of
              </span>
              <br />
              <span className="text-4xl  md:text-5xl lg:text-7xl font-bold font-poppins">
                Referrals
              </span>
            </div>
          </div>
        </div>
        <div className="text-left text-lg font-normal font-poppins text-black p-4">
          Did you know that referred candidates are 5 times more likely to be
          hired? Leverage the network of industry experts to get your foot in
          the door.
        </div>
        <div className="text-left text-lg font-normal font-poppins text-black px-4">
          From tech to finance, healthcare to marketing, our platform connects
          you with professionals in over 50 industries.
        </div>
        <div className="text-left text-lg font-normal font-poppins text-black px-4 hidden sm:block">
          Find the perfect referral to match your career goals.
        </div>
        <button className="flex m-4 justify-center items-center px-3 py-5 w-[30%] rounded-full border border-[#0071e3] bg-transparent text-[#0071e3] hover:bg-[#0071e3] hover:text-white transition font-poppins font-medium leading-[1.125rem]">
          Get started
        </button>

        <div className="flex  justify-start items-center px-4 mb-6">
          <AvatarGroup className="mr-2" isBordered max={3} total={10}>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          </AvatarGroup>

          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
      </div>
    </div>
  );
};

export default FrontContent;
