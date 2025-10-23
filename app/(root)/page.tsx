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
import CategoryList from "@/components/pages/blogs/categoryList/CategoryList";
import CardList from "@/components/pages/blogs/cardList/CardList";
import Menu from "@/components/pages/blogs/Menu/Menu";
import styles from "./blogs/blog/blogPage.module.css";

export default function About() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col  " style={{ background: Colors.light }}>
        {/* <Header /> */}
        <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        <div className="flex-grow">
          <section id="home">
            <FrontContent onOpenTrialModal={() => setIsTrialModalOpen(true)} />
          </section>
          {/* <CategoryList /> */}
          <div className={styles.content}>
            <CardList />
            {/* <Menu /> */}
          </div>
          {/* <TechContent /> */}
          <LatestJobs />
          {/* <Clients /> */}
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
