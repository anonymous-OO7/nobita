"use client";
import React, { useEffect, useState } from "react";
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

  return (
    <header
      className={`fixed w-full top-0 inset-x-0 z-30 bg-white transition-transform duration-300 ease-out ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center px-4 sm:px-8 py-1 ">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => router.push("/")}>
            <Image
              src={LogoWorkist}
              alt="logo"
              className="w-20 sm:w-24 lg:w-24 h-auto"
              priority
            />
          </button>
        </div>

        {/* MOBILE ONLY: Buttons in middle */}
        <div className="flex-1 flex justify-center items-center space-x-2 lg:hidden">
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSeFT0yElRSlgMQ45MtftSV4DNEXItEmu_a_vTimkPdo4HKu9A/viewform",
                "_blank"
              )
            }
            className="text-sm border border-[#0071e3] text-[#0071e3] px-3 py-1.5 rounded-md hover:bg-[#0071e3] hover:text-white transition"
          >
            Become a Referrer
          </button>
          <button
            onClick={() => router.push("/login")}
            className="text-sm bg-[#0071e3] text-white px-3 py-1.5 rounded-md hover:bg-[#005bb5] transition"
          >
            Login
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

          {/* Recruiter Buttons */}
          <div className="flex items-center space-x-2 border-l border-gray-200 pl-4 ml-2">
            <button
              onClick={() => router.push("/signup?is_recruiter=true")}
              className="bg-purple-600 text-white px-4 py-1.5 rounded-md hover:bg-purple-700 transition"
            >
              Recruiter Sign Up
            </button>
            <button
              onClick={() => router.push("/login?is_recruiter=true")}
              className="bg-purple-600 text-white px-4 py-1.5 rounded-md hover:bg-purple-700 transition"
            >
              Recruiter Login
            </button>
          </div>

          {/* Regular Buttons */}
          <div className="flex items-center space-x-2 border-l border-gray-200 pl-4 ml-2">
            <button
              onClick={() => router.push("/signup")}
              className="bg-[#0071e3] text-white px-4 py-1.5 rounded-md hover:bg-[#005bb5] transition"
            >
              Job Seeker Sign Up
            </button>
            <button
              onClick={() => router.push("/login")}
              className="bg-[#0071e3] text-white px-4 py-1.5 rounded-md hover:bg-[#005bb5] transition"
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

          {/* Recruiter Buttons - Mobile */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              router.push("/signup?is_recruiter=true");
            }}
            className="text-sm bg-purple-600 text-white w-full text-center py-1.5 rounded-md hover:bg-purple-700 transition"
          >
            Recruiter Sign Up
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              router.push("/login?is_recruiter=true");
            }}
            className="text-sm bg-purple-600 text-white w-full text-center py-1.5 rounded-md hover:bg-purple-700 transition"
          >
            Recruiter Login
          </button>

          {/* Regular Buttons - Mobile */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              router.push("/signup");
            }}
            className="text-sm bg-[#0071e3] text-white w-full text-center py-1.5 rounded-md hover:bg-[#005bb5] transition"
          >
            Job Seeker Sign Up
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              router.push("/login");
            }}
            className="text-sm bg-[#0071e3] text-white w-full text-center py-1.5 rounded-md hover:bg-[#005bb5] transition"
          >
            Job Seeker Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
