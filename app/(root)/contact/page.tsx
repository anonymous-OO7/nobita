"use client";
import React, { useState } from "react";
import { Colors } from "@/assets/colors";
import Footer from "@/components/Footer";
import Navbar from "@/components/pages/landing/Navbar";
import Contact from "@/components/homelements/ContactUs";

export default function About() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  return (
    <div>
      <div
        className="flex flex-col min-h-screen"
        style={{ background: Colors.light }}
      >
        <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />

        <main className="container mx-auto px-4 py-12 mt-20 flex-grow space-y-14">
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
