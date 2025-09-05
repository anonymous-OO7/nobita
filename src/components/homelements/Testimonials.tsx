"use client";
import React from "react";
import "./testimonials.css";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[80%]">
        <section className="text-gray-600 body-font">
          <div className="container px-5 mx-auto">
            <h1 className="text-3xl font-medium title-font text-gray-900 mb-6 text-center">
              People love using Workist
            </h1>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {/* Mobile filters */}
              <div className="block sm:hidden">
                {["Engineer", "Designer", "Product"].map((role) => (
                  <button
                    key={role}
                    className="px-4 py-2 mb-2 rounded-full border border-[#0071e3] bg-white text-[#0071e3] hover:bg-[#0071e3] hover:text-white font-poppins text-sm transition"
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Full filters on tablet and up */}
              {/* Uncomment if needed later */}
              {/* <div className="hidden sm:flex flex-wrap justify-center gap-3">
                {[
                  "Engineer",
                  "Designer",
                  "Product",
                  "Finance",
                  "Analyst",
                  "Marketing",
                  "Sales",
                  "DevOps",
                ].map((role) => (
                  <button
                    key={role}
                    className="px-4 py-2 rounded-full border border-[#0071e3] bg-white text-[#0071e3] hover:bg-[#0071e3] hover:text-white font-poppins text-sm transition"
                  >
                    {role}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Testimonials */}
            <div className="flex flex-wrap -m-4 justify-center">
              <TestimonialCard
                text="Using Workist helped me secure a referral at a leading tech firm. The interview process was smooth and I got the offer within weeks."
                authorName="Rohit Sharma"
                authorTitle="Software Developer"
                // authorImage="https://some-url.jpg"
              />
              <TestimonialCard
                text="As a backend engineer, finding the right opportunity was tough. Workist connected me with mentors and gave me access to exclusive job listings."
                authorName="Anjali Verma"
                authorTitle="Backend Engineer"
                // authorImage="https://some-url.jpg"
              />
              <TestimonialCard
                text="The platform’s referral network gave me much-needed confidence during interviews. I’m now part of a great product team building cutting-edge software."
                authorName="Karan Mehta"
                authorTitle="Product Engineer"
                // authorImage="https://some-url.jpg"
              />
              <TestimonialCard
                text="Workist’s curated job listings saved me months of searching. I quickly found roles fitting my skills in frontend and full stack development."
                authorName="Priya Singh"
                authorTitle="Full Stack Developer"
                // authorImage="https://some-url.jpg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Testimonials;
