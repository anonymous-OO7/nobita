// components/Header.js
"use client";
import React, { useState, useEffect } from "react";
import { Logo } from "@/assets/images/Logo";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoWorkist from "../assets/workistlogo.svg";
const Header = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsHeaderFixed(false);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateToLogin = React.useCallback(() => {
    router.push(`/login`);
  }, [router]);
  const navigateToSignup = React.useCallback(() => {
    router.push(`/signup`);
  }, [router]);

  const navigateToPricing = React.useCallback(() => {
    router.push(`/pricing`);
  }, [router]);
  return (
    <header
      className={`px-4 py-2 sm:py-4 flex justify-center transition-all duration-300 ease-in-out ${
        isHeaderFixed
          ? "fixed top-0 left-0 right-0 bg-white shadow-md z-20 "
          : ""
      }`}
    >
      <div className="flex justify-between items-center w-full sm:w-[90%] mx-auto">
        <div className="flex items-center">
          {/* Adjust the width and height classes as needed */}
          {/* <Logo className={`w-20 sm:w-32 ${isHeaderFixed ? "w-12" : ""}`} /> */}
          <Image
            src={LogoWorkist}
            alt="logo"
            className={`w-14 sm:w-24 ${isHeaderFixed ? "w-12" : ""}`}
          />
        </div>
        <div>
          <div className="flex flex-row justify-center items-center">
            <h1 className="text-black text-base font-light font-poppins">
              What is inside
            </h1>
            {/* <h1
              onClick={navigateToPricing}
              className="text-black text-base font-semibold font-poppins ml-4 hover:underline hover:cursor-pointer"
            >
              Pricing
            </h1> */}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={navigateToLogin}
            className="bg-white text-black border border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white font-poppins"
          >
            Login
          </button>
          <button
            onClick={navigateToSignup}
            className="bg-white  sm:block text-black border border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white font-poppins"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
