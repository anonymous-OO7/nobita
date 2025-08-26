"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { Globe, Mail, Phone, Building2 } from "lucide-react";
import { Chip, Button } from "@nextui-org/react";
import { GetJobInfo } from "@/apis";
import useApi from "@/hooks/useApi";
import { Job } from "@/types";
import Navbar from "@/components/pages/landing/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("authToken") &&
      localStorage.getItem("uuid") &&
      localStorage.getItem("email")
    ) {
      setIsLoggedIn(true);
    }
  }, []);

  return { isLoggedIn, jobsCount: "1 Lakh" };
};

export default function JobDetail() {
  const searchParams = useSearchParams();
  const uuid = searchParams?.get("id") ?? "";
  const { makeApiCall } = useApi();
  const { isLoggedIn, jobsCount } = useAuth();
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uuid) return;
    setLoading(true);
    makeApiCall(GetJobInfo(uuid))
      .then((response) => setJob(response?.data || null))
      .catch((err) => console.error("Error fetching job:", err))
      .finally(() => setLoading(false));
  }, [uuid, makeApiCall]);

  if (loading || !job) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-gray-600 font-poppins">
        Loading job details...
      </div>
    );
  }

  const {
    Company,
    Position,
    CreatedAt,
    Location,
    MinExperience,
    MaxExperience,
    MinPay,
    MaxPay,
    Currency,
    ApplyRedirectUrl,
    Description,
    Skills,
    ExperienceText,
  } = job;

  const parsedSkills = Array.isArray(Skills)
    ? Skills
    : typeof Skills === "string" && Skills.length > 0
    ? Skills.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const parsedLocations = Location
    ? Location.split(",")
        .map((loc) => loc.trim())
        .filter(Boolean)
    : [];

  const hasApplyRedirect = !!ApplyRedirectUrl;

  return (
    <>
      <Head>
        <title>
          {Position
            ? `${Position} - ${Company.name} | Job Opportunity`
            : "Job Detail"}
        </title>

        <meta
          name="description"
          content={`Apply for the position of ${Position} at ${
            Company.name
          } in ${parsedLocations.join(
            ", "
          )}. Required skills include ${parsedSkills.join(
            ", "
          )}. Experience needed: ${
            ExperienceText || `${MinExperience} to ${MaxExperience} years`
          }.`}
        />

        <meta
          name="keywords"
          content={`${Position}, ${
            Company.name
          }, job opening, ${parsedLocations.join(
            ", "
          )}, skills: ${parsedSkills.join(", ")}, experience: ${
            ExperienceText || `${MinExperience}-${MaxExperience} years`
          }`}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <main className="bg-gray-100 pt-10 min-h-screen font-poppins">
        {/* ✅ Only show Navbar if NOT logged in */}
        {!isLoggedIn && (
          <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />
        )}

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 my-20">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6 order-1 lg:order-none">
            {/* Overview Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-black">Job Overview</h2>
              <div className="text-gray-700 text-sm space-y-2">
                <p>
                  <strong>Location:</strong>{" "}
                  {parsedLocations.length > 0
                    ? parsedLocations.join(", ")
                    : "N/A"}
                </p>
                <p>
                  <strong>Experience:</strong>{" "}
                  {ExperienceText || `${MinExperience} - ${MaxExperience} yrs`}
                </p>
                <p>
                  <strong>Education:</strong> Graduation
                </p>
                <p>
                  <strong>Salary:</strong>{" "}
                  {MinPay === 0 && MaxPay === 0
                    ? "Not Disclosed"
                    : `${
                        Currency === "INR" ? "₹" : Currency
                      }${MinPay} - ${MaxPay}`}
                </p>
                <p>
                  <strong>Posted:</strong>{" "}
                  {CreatedAt
                    ? format(new Date(CreatedAt), "dd MMM yyyy")
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {isLoggedIn ? (
                hasApplyRedirect && (
                  <a
                    href={ApplyRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-medium px-4 py-2 rounded transition"
                  >
                    Apply on company site
                  </a>
                )
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/login")}
                    fullWidth
                    className="bg-blue-600 text-white"
                    size="sm"
                  >
                    Login to Apply
                  </Button>
                  <p className="text-xs text-gray-600 text-center">
                    Explore more {jobsCount}+ latest jobs on Workist
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-2 space-y-8 order-2 lg:order-none">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                {Company.logo_url ? (
                  <Image
                    src={Company.logo_url}
                    alt="Company Logo"
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                ) : (
                  <Building2 size={40} />
                )}
                <div>
                  <h1 className="text-xl font-semibold text-black">
                    {Position}
                  </h1>
                  <p className="text-gray-600 text-sm">{Company.name}</p>
                </div>
              </div>
            </div>

            {/* About the Job */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-black">
                About the Job
              </h2>

              {parsedSkills.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-black mb-2">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {parsedSkills.map((skill, idx) => (
                      <Chip
                        key={idx}
                        color="secondary"
                        variant="bordered"
                        size="sm"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-base font-semibold text-black mb-2">
                  Job Description
                </h3>
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: Description }}
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg font-semibold text-black">
                About the Company
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Industry:</strong> {Company.industry || "N/A"}
                </p>
                {Company.company_size?.toLowerCase() !== "unknown" && (
                  <p>
                    <strong>Size:</strong> {Company.company_size} employees
                  </p>
                )}
                <p>
                  <strong>Founded:</strong>{" "}
                  {Company.founded_date
                    ? format(new Date(Company.founded_date), "yyyy")
                    : "N/A"}
                </p>
                <p>
                  <strong>Location:</strong> {Company.location || "N/A"}
                </p>
                <p>
                  <strong>Headquarters:</strong>{" "}
                  {Company.headquarters_address || "N/A"}
                </p>

                {Company.description && (
                  <div>
                    <strong>Description:</strong>
                    <div
                      className="prose max-w-none text-gray-800"
                      dangerouslySetInnerHTML={{ __html: Company.description }}
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-2 text-gray-700">
                {Company.website_url && (
                  <p className="inline-flex items-center gap-2">
                    <Globe size={16} />
                    <a
                      href={Company.website_url}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Company.website_url}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
