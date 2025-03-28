import React from "react";
import Image from "next/image";

const Founders = () => (
  <div className="flex justify-center items-center">
    <div
      style={{ offsetPosition: "normal" }}
      className="text-zinc-800 px-4 m-auto"
    >
      <h1 className="text-black text-4xl font-bold text-center mt-20">
        Management Team
      </h1>

      <div className=" mt-30  flex flex-col lg:flex-row justify-center items-center gap-4 p-4 ">
        <div className="   flex justify-center items-center">
          <div className="  p-5 lg:w-[30vw] rounded-lg shadow-md  ">
            <div className="flex justify-center">
              <Image
                src="https://mohitrai.com/mohit-rai.jpg"
                width={80} // Set the width as needed
                height={80} // Set the height as needed
                className="rounded-full"
                alt="Mohit Rai"
              />
            </div>
            <div className="text-center mt-4 ">
              <h2 className="text-black text-lg font-semibold font-poppins">
                Mohit Rai - Software Developer at Google
              </h2>
              {/* <h3 className="text-black text-base pb-3 font-poppins">
                Founder & Director
              </h3> */}
              <p className="text-black text-sm text-justify font-poppins">
                Mohit Rai brings a robust three-year tenure at Google, where he
                specializes in developing scalable applications that reach
                millions worldwide. His expertise spans sophisticated algorithm
                design and building efficient, user-centric solutions that
                enhance digital interactions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className=" p-5 lg:w-[30vw]  rounded-lg shadow-md">
            <div className="flex justify-center">
              <Image
                src="https://media.licdn.com/dms/image/C4D03AQGLbwd9j1oSRQ/profile-displayphoto-shrink_100_100/0/1650774597752?e=1720656000&v=beta&t=bcci7PYpi5f6_UQg__oAdFlMrpPOwdRxWjJQl_XJTJM"
                width={80} // Set the width as needed
                height={80} // Set the height as needed
                className="rounded-full"
                alt="gaurav"
              />
            </div>
            <div className="text-center mt-4">
              <h2 className="text-black text-lg font-semibold font-poppins">
                Gaurav Yadav - Full Stack Developer at CRPL
              </h2>
              {/* <h3 className="text-black text-base pb-3 font-poppins">
                Founder & Director
              </h3> */}
              <p className="text-black text-sm text-justify font-poppins">
                With three years of experience as a Full Stack Developer at
                CRPL, Gaurav Yadav excels in delivering comprehensive
                development solutions. Gaurav’s skill set covers everything from
                frontend to backend development, ensuring seamless integration
                and functionality that drives business success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Founders;
