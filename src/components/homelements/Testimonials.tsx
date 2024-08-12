"use client";
import React from "react";
import "./testimonials.css";
import TestimonialCard from "./TestimonialCard";
const Testimonials = () => (
  <div className="flex justify-center items-center">
    <div className=" w-[90%] ">
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
              People love using compass
            </h1>
            <div className="flex flex-wrap -m-4">
              <TestimonialCard
                text="Joining this platform was a game-changer for my career. I received a referral to a top tech company and landed my dream job within a month. The network here is incredibly supportive and connected."
                authorName="Jane Smith"
                authorTitle="Software Engineer"
                authorImage="https://dummyimage.com/107x107"
              />

              <TestimonialCard
                text="As a designer, finding the right fit can be challenging. This platform not only connected me with potential employers but also provided valuable industry insights. The referral I received was exactly what I needed to advance my career."
                authorName="Michael Lee"
                authorTitle="Graphic Designer"
                authorImage="https://dummyimage.com/107x107"
              />

              <TestimonialCard
                text="I was skeptical at first, but the quality of referrals I received was outstanding. It's reassuring to know that I'm connecting with trusted professionals in the industry. This platform made my job search so much easier."
                authorName="Samantha Green"
                authorTitle="Marketing Specialist"
                authorImage="https://dummyimage.com/107x107"
              />

              <TestimonialCard
                text="The referral system here is exceptional. I felt confident going into interviews knowing that I had a strong recommendation backing me. I highly recommend this platform to anyone looking to advance their career."
                authorName="David Patel"
                authorTitle="Financial Analyst"
                authorImage="https://dummyimage.com/107x107"
              />
            </div>
          </div>
        </section>
      </div>
      {/* eslint-disable  */}

      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://use.fontawesome.com/03f8a0ebd4.js"></script>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </div>
  </div>
);

export default Testimonials;
