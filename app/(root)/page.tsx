"use client";
import React, { useState } from "react";
import { Colors, gradients } from "@/assets/colors";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Clients from "@/components/homelements/Clients";
import Contact from "@/components/homelements/ContactUs";
import Founders from "@/components/homelements/Founders";
import FrontContent from "@/components/homelements/FrontContent";
import TechContent from "@/components/homelements/TechContent";
import Testimonials from "@/components/homelements/Testimonials";
import UserCount from "@/components/homelements/UserCount";
import Accordian from "@/components/homelements/Accordian";
import Navbar from "@/components/pages/landing/Navbar";
import LatestJobs from "@/components/homelements/LatestJobsShowcase";

export default function About() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);

  return (
    <div>
      <div
        className="flex flex-col min-h-screen "
        style={{ background: Colors.light }}
      >
        {/* <Header /> */}
        <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        <div className="flex-grow">
          <section id="home">
            <FrontContent onOpenTrialModal={() => setIsTrialModalOpen(true)} />
          </section>

          {/* <TechContent /> */}
          <LatestJobs />
          <Clients />
          <Testimonials />
          {/* <Founders /> */}
          <UserCount />
          <Accordian />
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
}
