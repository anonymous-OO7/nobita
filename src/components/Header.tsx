"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Hamburger from "hamburger-react";
import LogoWorkist from "../assets/workistlogo.svg";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navButtonClass =
    "text-[#000] hover:text-[#0071e3] font-medium text-base";

  const baseButton =
    "text-sm font-medium rounded-md transition duration-200 ease-in-out px-4 py-1.5";

  const recruiterButton = `${baseButton} border border-gray-300 text-gray-900 hover:bg-gray-100`;

  const jobSeekerButton = `${baseButton} bg-black text-white hover:bg-gray-900`;

  return (
    <header
      className={`fixed w-full top-0 inset-x-0 z-30 bg-white shadow-sm transition-transform duration-300 ease-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => router.push("/")}>
            <Image
              src={LogoWorkist}
              alt="logo"
              className="w-20 sm:w-24 h-auto"
              priority
            />
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6">
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSeFT0yElRSlgMQ45MtftSV4DNEXItEmu_a_vTimkPdo4HKu9A/viewform",
                "_blank"
              )
            }
            className="border border-[#0071e3] text-[#0071e3] px-4 py-1.5 rounded-md hover:bg-[#0071e3] hover:text-white transition"
          >
            Become a Referrer
          </button>

          <button onClick={() => router.push("/")} className={navButtonClass}>
            Home
          </button>

          <button
            onClick={() => router.push("/pricing")}
            className={navButtonClass}
          >
            Pricing
          </button>

          {/* Login Buttons */}
          <div className="flex items-center space-x-2 border-l border-gray-200 pl-4 ml-2">
            <button
              onClick={() => router.push("/login?is_recruiter=true")}
              className={recruiterButton}
            >
              Recruiter Login
            </button>
            <button
              onClick={() => router.push("/login")}
              className={jobSeekerButton}
            >
              Job Seeker Login
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <Hamburger size={20} toggled={isMenuOpen} toggle={setIsMenuOpen} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2 bg-white border-t">
          {[
            { text: "Home", link: "/" },
            { text: "Pricing", link: "/pricing" },
          ].map((item) => (
            <button
              key={item.text}
              onClick={() => {
                setIsMenuOpen(false);
                router.push(item.link);
              }}
              className="block w-full text-left text-black text-sm font-medium py-1"
            >
              {item.text}
            </button>
          ))}

          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSeFT0yElRSlgMQ45MtftSV4DNEXItEmu_a_vTimkPdo4HKu9A/viewform",
                "_blank"
              )
            }
            className="text-sm border border-[#0071e3] text-[#0071e3] w-full text-center py-1.5 rounded-md hover:bg-[#0071e3] hover:text-white transition"
          >
            Become a Referrer
          </button>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              router.push("/login?is_recruiter=true");
            }}
            className={`${recruiterButton} w-full text-center`}
          >
            Recruiter Login
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              router.push("/login");
            }}
            className={`${jobSeekerButton} w-full text-center`}
          >
            Job Seeker Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
