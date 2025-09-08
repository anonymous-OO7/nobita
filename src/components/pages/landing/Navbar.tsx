"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import LogoWorkist from "../../../assets/workistlogo.svg";
import Image from "next/image";
import { options } from "../../../../src/assets/data/index";

interface NavbarProps {
  onOpenTrialModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenTrialModal }) => {
  const router = useRouter();

  // Add "workMode" to the dropdown possible states
  const [openDropdown, setOpenDropdown] = useState<
    "" | "location" | "department" | "workMode"
  >("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navButtonClass =
    "text-[#000] hover:text-[#0071e3] font-medium text-base";

  const baseButton =
    "text-sm font-medium rounded-md transition duration-200 ease-in-out px-4 py-1.5";

  const recruiterButton = `${baseButton} border border-gray-300 text-gray-900 hover:bg-gray-100`;
  const jobSeekerButton = `${baseButton} bg-black text-white hover:bg-gray-900`;

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("authToken") &&
      localStorage.getItem("uuid") &&
      localStorage.getItem("email")
    ) {
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = () => setOpenDropdown("");
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const buildQuery = (params: Record<string, any>) =>
    Object.entries(params)
      .flatMap(([k, v]) =>
        Array.isArray(v)
          ? v.map((x) => `${k}=${encodeURIComponent(x)}`)
          : v || v === 0
          ? [`${k}=${encodeURIComponent(v)}`]
          : []
      )
      .join("&");

  // Open URL in new tab with query string
  const handleDropdownSelect = (key: string, value: number) => {
    const queryString = buildQuery({ [key]: value, src: "filters" });
    const url = `/dashboard?${queryString}`;
    window.open(url, "_blank");
    setOpenDropdown("");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[8vh] ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-10 md:h-20">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <button onClick={() => router.push("/")}>
            <Image
              src={LogoWorkist}
              alt="logo"
              className="w-20 sm:w-24 h-auto"
              priority
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Location Dropdown */}
            <div
              className="relative z-50 max-h-64"
              onMouseEnter={() => setOpenDropdown("location")}
              onMouseLeave={() => setOpenDropdown("")}
            >
              <button
                className="flex items-center text-gray-800 hover:text-[#0071e3] transition-colors font-medium text-base px-3 py-1 rounded-md"
                style={{ background: "#f7f7f7" }}
                type="button"
              >
                Top Job Locations <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {openDropdown === "location" && (
                <div className="absolute left-0  max-h-64 overflow-y-auto w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  {options.location.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => handleDropdownSelect("location", value)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Department Dropdown */}
            <div
              className="relative z-50 max-h-64"
              onMouseEnter={() => setOpenDropdown("department")}
              onMouseLeave={() => setOpenDropdown("")}
            >
              <button
                className="flex items-center text-gray-800 hover:text-[#0071e3] transition-colors font-medium text-base px-3 py-1 rounded-md"
                style={{ background: "#f7f7f7" }}
                type="button"
              >
                Top Departments <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {openDropdown === "department" && (
                <div className="absolute left-0  max-h-64 overflow-y-auto w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  {options.department.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => handleDropdownSelect("department", value)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Work Mode Dropdown */}
            <div
              className="relative z-50 max-h-64"
              onMouseEnter={() => setOpenDropdown("workMode")}
              onMouseLeave={() => setOpenDropdown("")}
            >
              <button
                className="flex items-center text-gray-800 hover:text-[#0071e3] transition-colors font-medium text-base px-3 py-1 rounded-md"
                style={{ background: "#f7f7f7" }}
                type="button"
              >
                Work Mode <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {openDropdown === "workMode" && (
                <div className="absolute left-0 max-h-64 overflow-y-auto w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  {options.workMode.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => handleDropdownSelect("workMode", value)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => router.push("/blogs")}
              className={navButtonClass}
            >
              Blogs
            </button>
            {/* Auth / Dashboard Buttons */}
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-4 ml-2">
              {isLoggedIn ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-[#0071e3] text-white px-4 py-1.5 rounded-md hover:bg-[#005bb5] transition"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => router.push("/login")}
                    className={jobSeekerButton}
                  >
                    Job Seeker Login
                  </button>
                  <button
                    onClick={() => router.push("/login?is_recruiter=true")}
                    className={recruiterButton}
                  >
                    Recruiter Login
                  </button>
                </>
              )}

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

              <button
                onClick={() => router.push("/pricing")}
                className={navButtonClass}
              >
                Pricing
              </button>

              {/* Quick Links Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                  className="flex items-center text-gray-800 hover:text-blue-600 transition-colors"
                >
                  Quick Links <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {isQuickLinksOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <button
                      onClick={() => {
                        router.push("/about");
                        setIsQuickLinksOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => {
                        router.push("/contact");
                        setIsQuickLinksOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Contact Us
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
          type="button"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-b-2xl border-t border-gray-100">
            <div className="lg:hidden px-4 pb-4 space-y-2 bg-white border-t">
              {[{ text: "Pricing", link: "/pricing" }].map((item) => (
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

              {/* Quick Links in Mobile */}
              <div className="border-t pt-2">
                <p className="text-sm font-semibold text-gray-700">
                  Quick Links
                </p>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/about");
                  }}
                  className="block w-full text-left text-black text-sm font-medium py-1"
                >
                  About Us
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/contact");
                  }}
                  className="block w-full text-left text-black text-sm font-medium py-1"
                >
                  Contact Us
                </button>
              </div>

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

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/dashboard");
                  }}
                  className="w-full bg-[#0071e3] text-white text-center py-1.5 rounded-md hover:bg-[#005bb5] transition"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/login");
                    }}
                    className={`${jobSeekerButton} w-full text-center`}
                  >
                    Job Seeker Login
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
                </>
              )}
            </div>

            <div className="px-4 pt-2">
              <button
                onClick={() => {
                  onOpenTrialModal();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
              >
                Book Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
