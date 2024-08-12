import React from "react";

const UserCount = () => {
  return (
    <div>
      <div className="flex items-center justify-center bg-gradient-to-r mt-20">
        <div className="flex-col items-center justify-center text-black">
          <div className="h-40 w-[70%] md:w-1/2 flex items-center justify-center font-poppins  text-3xl lg:text-5xl font-bold mx-14">
            The best way you can connect people and grow
          </div>

          <div className="flex">
            <div className="flex md:flex-row flex-col p-4 space-x-4 space-y-2 max-w-7xl justify-around w-full h-auto lg:h-60 items-center ">
              <div className="h-40 w-[70%] md:w-1/4 flex items-center justify-center ml-4">
                <div className="flex-col space-y-2 items-center px-0 md:px-6">
                  <div className="text-sm font-medium text-black font-poppins">
                    Visitors
                  </div>
                  <div className="text-5xl font-bold font-poppins">15k+</div>
                  <div className="text-sm font-medium text-black font-poppins">
                    Compass has more than 15k+ visitors per month.
                  </div>
                </div>
              </div>
              <div className="h-40 w-[70%] md:w-1/4 flex items-center justify-center">
                <div className="flex-col space-y-2">
                  <div className="text-sm font-medium text-black font-poppins">
                    Total Users
                  </div>
                  <div className="text-5xl font-bold font-poppins">1.2M+</div>
                  <div className="text-sm font-medium text-black font-poppins">
                    Users has more than 1.2M+ total users.
                  </div>
                </div>
              </div>
              <div className="h-40 w-[70%] md:w-1/4 flex items-center justify-center">
                <div className="flex-col space-y-2">
                  <div className="text-sm font-medium text-black font-poppins">
                    Engagement
                  </div>
                  <div className="text-5xl font-bold font-poppins">69k</div>
                  <div className="text-sm font-medium text-black font-poppins">
                    Compass has gained 69k+ users last month.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* eslint-disable  */}
      <script src="https://cdn.tailwindcss.com"></script>
    </div>
  );
};

export default UserCount;
