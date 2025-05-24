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
              <div className="hidden sm:flex flex-wrap justify-center gap-3">
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
              </div>
            </div>

            {/* Testimonials */}
            <div className="flex flex-wrap -m-4 justify-center">
              <TestimonialCard
                text="Joining this platform was a game-changer for my career. I received a referral to a top tech company and landed my dream job within a month."
                authorName="Gaurav Yadav"
                authorTitle="Software Engineer"
                authorImage="https://media.licdn.com/dms/image/v2/C4D03AQGLbwd9j1oSRQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1650774597752?e=1735171200&v=beta&t=pXUEE0VsGImntkghwReTmnYcPE5Cgiso7t43Rynpkik"
              />
              <TestimonialCard
                text="As a designer, finding the right fit can be challenging. This platform connected me with great opportunities and valuable insights."
                authorName="Sean S. Ellis"
                authorTitle="Graphic Designer"
                authorImage="https://ogletree.com/app/uploads/people/alexandre-abitbol.jpg"
              />
              <TestimonialCard
                text="I was skeptical at first, but the quality of referrals I received was outstanding. It's reassuring to know I'm connecting with trusted professionals."
                authorName="Shubham Singh"
                authorTitle="Full Stack Specialist"
                authorImage="https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg"
              />
              <TestimonialCard
                text="The referral system here is exceptional. I felt confident going into interviews with strong recommendations. Highly recommended."
                authorName="Henry"
                authorTitle="Financial Analyst"
                authorImage="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Testimonials;
