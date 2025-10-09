import { Illustration } from "@/assets/images/Illustration";
import { Star } from "@/assets/images/Star";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { Play, Search } from "lucide-react";
import React from "react";

interface HeroSectionProps {
  onOpenTrialModal: () => void;
}

const FrontContent: React.FC<HeroSectionProps> = ({ onOpenTrialModal }) => {
  const handleGetStartedClick = () => {
    window.open("/dashboard", "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <section className="relative  bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4  relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="flex items-center bg-orange-100 rounded-full px-4 py-2">
                  <Star className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-orange-700 text-sm font-medium">
                    All-in-One Blogs & Jobs Platform
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Discover Trending{" "}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Blogs & Job Opportunities
                </span>{" "}
                at One Place
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Dive into a vast collection of insightful blogs across
                technology, lifestyle, finance, travel, health, and more.
                Whether seeking expert advice, learning new skills, or catching
                up on trends, find content that fuels your curiosity and
                inspires growth.
              </p>

              <p className="text-lg text-gray-700 mb-8 max-w-2xl">
                Searching for your next career move? Explore thousands of job
                listings across different industries, from tech startups to
                corporate giants. Connect with employers, build your profile,
                and apply with ease—your dream job is just a click away.
              </p>

              <button
                className="flex m-4 justify-center items-center px-3 py-5 w-[30%] rounded-full border border-[#0071e3] bg-transparent text-[#0071e3] hover:bg-[#0071e3] hover:text-white transition font-poppins font-medium leading-[1.125rem]"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </div>

            {/* Right content - Hero illustration */}
            <div className="relative hidden lg:block ">
              <img
                src="https://dl.dropbox.com/scl/fi/969flx92bpjrg6sc9rznz/3892670.jpg?rlkey=sexydkb5htb9i15yxx3rtqwt4&st=33fei4bi&dl=0"
                alt="Hero Illustration"
                className="w-full h-auto max-w-lg mx-auto lg:mx-0"
                loading="lazy"
              />
              {/* Floating elements - only show on lg+ */}
              <div className="hidden lg:block absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FrontContent;
