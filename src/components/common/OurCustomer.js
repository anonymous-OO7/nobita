import React, { useState, useEffect } from "react";
import ClientsAnimation from "../cards/ClientsAnimation.js";

const OurCustomer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShow(window.innerWidth >= 768); // Show on medium+ screens
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!show) return null;

  return (
    <div className="w-full flex justify-center items-center mb-2 md:mt-20 md:mb-10 bg-white">
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex-1 w-full ">
          <ClientsAnimation />
        </div>
      </div>
    </div>
  );
};

export default OurCustomer;
