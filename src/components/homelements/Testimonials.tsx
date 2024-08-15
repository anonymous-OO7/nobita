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
                authorName="Gaurav Yadav"
                authorTitle="Software Engineer"
                authorImage="https://media.licdn.com/dms/image/v2/C4D03AQGLbwd9j1oSRQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1650774597752?e=1729123200&v=beta&t=7AYWHlo-42qiQCrqTqC_6PiKGY2Tp5AiqrfEIHpu12A"
              />

              <TestimonialCard
                text="As a designer, finding the right fit can be challenging. This platform not only connected me with potential employers but also provided valuable industry insights. The referral I received was exactly what I needed to advance my career."
                authorName="Akshay Kumar"
                authorTitle="Software Developer Graphic Designer"
                authorImage="https://media.licdn.com/dms/image/D4D03AQGuC68CADReRA/profile-displayphoto-shrink_200_200/0/1641484568624?e=2147483647&v=beta&t=iygzL1_2nJGGfd2RaG7YrCSHjW1VQpCSZuqyAuoDRco"
              />

              <TestimonialCard
                text="I was skeptical at first, but the quality of referrals I received was outstanding. It's reassuring to know that I'm connecting with trusted professionals in the industry. This platform made my job search so much easier."
                authorName="Shubham Singh"
                authorTitle="Full Stack  Specialist"
                authorImage="https://media.licdn.com/dms/image/v2/D5603AQEsmesP-gp4FQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723100699541?e=1729123200&v=beta&t=EmR0-4E_e_DUGaJgyNGp7Qpi0PnTFvQRYLU2G8YjUJU"
              />

              <TestimonialCard
                text="The referral system here is exceptional. I felt confident going into interviews knowing that I had a strong recommendation backing me. I highly recommend this platform to anyone looking to advance their career."
                authorName="Shivam Yadav"
                authorTitle="Financial Analyst"
                authorImage="https://media.licdn.com/dms/image/D5603AQGyJ2SkQ2yiEQ/profile-displayphoto-shrink_200_200/0/1713978926095?e=1729123200&v=beta&t=G_SejCmT6Oo4i_LwRH9HB3RWpRWsnb9n9NqjP5fLh5U"
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
