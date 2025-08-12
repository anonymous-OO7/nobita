"use client";
import React, { useState } from "react";
import { Colors } from "@/assets/colors";
import Footer from "@/components/Footer";
import Navbar from "@/components/pages/landing/Navbar";
import { useRouter } from "next/navigation";

export default function About() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <div
        className="flex flex-col min-h-screen"
        style={{ background: Colors.light }}
      >
        <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />

        <main className="container mx-auto px-4 py-12 mt-20 flex-grow space-y-14">
          {/* Company Story & Mission */}
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                alt="Community Icon"
                className="w-9 h-9 mr-2"
              />
              <h1 className="text-3xl font-bold">About Workist</h1>
            </div>
            <p className="text-lg mb-3">
              <strong>Workist</strong> is India’s fastest-growing{" "}
              <span className="font-semibold text-blue-600">
                job discovery and referral platform
              </span>
              . We connect you directly to top companies through trusted
              referrals, empower you to give and get referrals, and unlock a
              thriving professional community across tech, finance, healthcare,
              marketing, and 50+ other industries.
            </p>
            <p className="mb-2">
              Our mission is simple:{" "}
              <em>to help every job-seeker land their dream opportunity</em> by
              leveraging the power of community, trust, and real connections.
              Whether you’re looking for your next big break, want to help
              others through referrals, or simply seeking advice, Workist is
              built for you.
            </p>
          </section>

          {/* What Makes Us Unique */}
          <section className="mb-10">
            <div className="flex items-center mb-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2910/2910761.png"
                alt="Referral Icon"
                className="w-7 h-7 mr-2"
              />
              <h2 className="text-2xl font-semibold">Why Choose Workist?</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>
                <strong>Referrals Work:</strong>{" "}
                <span className="text-blue-600">
                  Candidates referred by professionals are five times more
                  likely to get hired.
                </span>
              </li>
              <li>
                <strong>Give and Get Referrals:</strong> Sign up to refer others
                and earn, or request referrals to boost your chances at top
                companies.
              </li>
              <li>
                <strong>Find Jobs That Fit:</strong> Discover curated job
                listings with direct connections to referral partners.
              </li>
              <li>
                <strong>Ask the Community:</strong>{" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                  alt="Community Icon"
                  className="w-5 h-5 inline mx-1"
                />
                Tap into forums for advice, discussions, and networking with
                industry experts and peers.
              </li>
              <li>
                <strong>Career Resources:</strong>{" "}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2913/2913464.png"
                  alt="Career Resources Icon"
                  className="w-5 h-5 inline mx-1"
                />
                Get resume feedback, interview tips, and more personalized
                career support.
              </li>
            </ul>
          </section>

          {/* For Recruiters and Job Posters */}
          <section className="mb-10 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center mb-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="Recruiter Icon"
                className="w-8 h-8 mr-3"
              />
              <h2 className="text-2xl font-semibold text-blue-700">
                For Job Posters & Recruiters
              </h2>
            </div>
            <p className="mb-3 text-lg text-blue-800">
              Are you looking to hire talented candidates quickly and reliably?
              Post your jobs on <strong>Workist</strong> today and tap into a
              vast network of qualified professionals actively seeking new
              opportunities.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-blue-800 text-lg">
              <li>
                <strong>Free Job Posting:</strong> Currently, job posting is
                free for all recruiters and companies—maximize your reach with
                zero cost.
              </li>
              <li>
                <strong>Reach Referrals & Communities:</strong> Get your job
                noticed by trusted referrers and active community members to
                find the best-fit candidates faster.
              </li>
              <li>
                <strong>Simple & Effective:</strong> Use our easy-to-navigate
                platform to create job listings, manage applications, and
                collaborate with your hiring team.
              </li>
              <li>
                <strong>Scale Hiring with Confidence:</strong> Access diverse
                talent pools from multiple industries and grow your workforce at
                speed.
              </li>
            </ul>
            <button
              onClick={() => router.push("/login?is_recruiter=true")}
              className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Post Your Job for Free
            </button>
          </section>

          {/* Testimonials */}
          <section className="mb-10">
            <div className="flex items-center mb-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                alt="Testimonials Icon"
                className="w-7 h-7 mr-2"
              />
              <h2 className="text-xl font-semibold">Success Stories</h2>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                  alt="Quote Icon"
                  className="w-5 h-5 mt-1"
                />
                <blockquote className="border-l-4 pl-3 italic text-gray-700">
                  “Joining Workist was a game-changer for my career. I received
                  a referral to a top tech company and landed my dream job
                  within a month.” <br />{" "}
                  <span className="font-semibold text-blue-600">
                    — Gaurav Yadav, Software Engineer
                  </span>
                </blockquote>
              </div>
              <div className="flex items-start gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
                  alt="Quote Icon"
                  className="w-5 h-5 mt-1"
                />
                <blockquote className="border-l-4 pl-3 italic text-gray-700">
                  “I found valuable community support and real opportunities.
                  The referral system gave me confidence going into interviews.”{" "}
                  <br />{" "}
                  <span className="font-semibold text-blue-600">
                    — Henry, Financial Analyst
                  </span>
                </blockquote>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-10">
            <div className="flex items-center mb-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                alt="Process Icon"
                className="w-7 h-7 mr-2"
              />
              <h2 className="text-xl font-semibold">How Workist Works</h2>
            </div>
            <ol className="list-decimal pl-6 space-y-3 text-lg">
              <li>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                  alt="Sign Up Icon"
                  className="w-5 h-5 inline mr-1"
                />
                <strong>Sign Up</strong>: Create your free account and fill out
                your professional details.
              </li>
              <li>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2910/2910761.png"
                  alt="Browse & Apply Icon"
                  className="w-5 h-5 inline mr-1"
                />
                <strong>Browse & Apply</strong>: Search jobs, request referrals,
                or reach out in forums.
              </li>
              <li>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2910/2910761.png"
                  alt="Referral Icon"
                  className="w-5 h-5 inline mr-1"
                />
                <strong>Give Referrals</strong>: Refer candidates and earn
                rewards.
              </li>
              <li>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                  alt="Connect Icon"
                  className="w-5 h-5 inline mr-1"
                />
                <strong>Connect & Grow</strong>: Ask questions, seek advice, and
                expand your career network.
              </li>
            </ol>
          </section>

          {/* Contact Info */}
          <section className="mb-10">
            <div className="flex items-center mb-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                alt="Contact Icon"
                className="w-7 h-7 mr-2"
              />
              <h2 className="text-xl font-semibold">Get in Touch</h2>
            </div>
            <p>Have questions or feedback? Reach out anytime!</p>
            <div className="bg-gray-50 border px-5 py-4 mt-3 rounded-lg shadow-sm max-w-md">
              <p className="font-medium mb-1">
                Email:{" "}
                <span className="text-blue-600">workist.ai@gmail.com</span>
              </p>
              {/* Additional contact lines can be added here if needed */}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
