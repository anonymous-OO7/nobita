"use client";

import React from "react";
import { useLottie } from "lottie-react";
import UnderMaintenance from "@/assets/animations/UnderMaintenance.json";

const page = () => {
  const options = {
    animationData: UnderMaintenance,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col items-center">
        {/* Lottie Animation Container */}
        <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden">
          {/* Make sure animation scales and fits */}
          <div className="w-full h-full">{View}</div>
        </div>

        {/* Text Content */}
        <h1 className="mt-12 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white text-center">
          Coming Soon
        </h1>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-xl mx-auto">
          We are working hard to bring you this feature. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default page;
