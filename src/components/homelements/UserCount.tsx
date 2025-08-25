"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const UserCount = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div ref={ref} className="mt-20">
      <div className="flex items-center justify-center bg-gradient-to-r">
        <div className="flex-col items-center justify-center text-black w-full">
          <div className="w-[90%] md:w-2/3 mx-auto text-center font-poppins text-3xl lg:text-5xl font-semibold mb-8">
            The best way you can grab opportunities and grow.
          </div>

          <div className="flex flex-wrap justify-center gap-6 px-4">
            {/* Visitors */}
            <div className="w-full md:w-1/4 h-40 flex items-center justify-center">
              <div className="flex flex-col space-y-2 px-4 text-center">
                <div className="text-sm font-medium font-poppins">Visitors</div>
                <div className="text-5xl font-bold font-poppins text-[#0071e3]">
                  {inView && <CountUp end={100} duration={2} suffix="+" />}
                </div>
                <div className="text-sm font-medium font-poppins">
                  Workist has over 100+ daily visitors.
                </div>
              </div>
            </div>

            {/* Total Referrals */}
            <div className="w-full md:w-1/4 h-40 flex items-center justify-center">
              <div className="flex flex-col space-y-2 px-4 text-center">
                <div className="text-sm font-medium font-poppins">
                  Total Jobs
                </div>
                <div className="text-5xl font-bold font-poppins text-[#0071e3]">
                  {inView && (
                    <CountUp end={5} decimals={1} duration={2.5} suffix="K+" />
                  )}
                </div>
                <div className="text-sm font-medium font-poppins">
                  Goal is to grow the biggest referral community.
                </div>
              </div>
            </div>

            {/* Engagement */}
            <div className="w-full md:w-1/4 h-40 flex items-center justify-center">
              <div className="flex flex-col space-y-2 px-4 text-center">
                <div className="text-sm font-medium font-poppins">
                  Engagement
                </div>
                <div className="text-5xl font-bold font-poppins text-[#0071e3]">
                  {inView && <CountUp end={1000} duration={3} separator="," />}
                </div>
                <div className="text-sm font-medium font-poppins">
                  Workist gained 100+ users last month.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCount;
