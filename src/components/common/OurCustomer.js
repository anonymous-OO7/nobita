import React from "react";
import ClientsAnimation from "../cards/ClientsAnimation.js";

const OurCustomer = () => {
  return (
    <div className="w-full flex justify-center items-center mb-2 md:mt-20 md:mb-10 bg-white">
      <div className="flex flex-col md:flex-row w-[100%]">
        <div className=" flex-1 w-full ">
          <ClientsAnimation />
        </div>
      </div>
    </div>
  );
};

export default OurCustomer;
