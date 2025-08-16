import { Illustration } from "@/assets/images/Illustration";
import { Star } from "@/assets/images/Star";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { Play, Search } from "lucide-react";

import React from "react";

interface HeroSectionProps {
  onOpenTrialModal: () => void;
}

const FrontContent: React.FC<HeroSectionProps> = ({ onOpenTrialModal }) => {
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center overflow-hidden pt-10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="flex items-center bg-orange-100 rounded-full px-4 py-2">
                  <Star className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-orange-700 text-sm font-medium">
                    Rated #1 Job Platform
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                We connect you{" "}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  1-on-1 to the right job
                </span>{" "}
                every step of the way
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                From tech to finance, healthcare to marketing, our platform
                connects you with professionals in over 50 industries. Did you
                know that referred candidates are 5 times more likely to be
                hired? Leverage the network of industry experts to get your foot
                in the door. Find the perfect referral to match your career
                goals.
              </p>

              <button className="flex m-4 justify-center items-center px-3 py-5 w-[30%] rounded-full border border-[#0071e3] bg-transparent text-[#0071e3] hover:bg-[#0071e3] hover:text-white transition font-poppins font-medium leading-[1.125rem]">
                Get started
              </button>

              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105  shadow-lg hover:shadow-xl px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                  <Search className="w-5 h-5" />
                  Search Manually
                </button> 

                <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 shadow-lg hover:shadow-xl px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                  <Search className="w-5 h-5" />
                  Search with AI
                </button>
              </div> */}
              <div className="flex  justify-start items-center px-4 my-6">
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

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1K+</div>
                  <div className="text-sm text-gray-600">Users Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5000+</div>
                  <div className="text-sm text-gray-600">
                    Recent Job Listing
                  </div>
                </div>
              </div>
            </div>

            {/* Right content - Hero illustration */}
            <div className="relative">
              <img
                src="https://dl.dropbox.com/scl/fi/969flx92bpjrg6sc9rznz/3892670.jpg?rlkey=sexydkb5htb9i15yxx3rtqwt4&st=33fei4bi&dl=0"
                alt="Hero Illustration"
                className="w-full h-auto max-w-lg mx-auto lg:mx-0"
                loading="lazy"
              />

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FrontContent;
