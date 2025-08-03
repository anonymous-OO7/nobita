"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { CiLocationOn } from "react-icons/ci";
import { Globe, Mail, Phone, Building2, ExternalLink } from "lucide-react";
import { Chip } from "@nextui-org/react";
import { GetJobInfo } from "@/apis";
import useApi from "@/hooks/useApi";
import { Job } from "@/types";

export default function JobDetail() {
  const searchParams = useSearchParams();
  const uuid = searchParams?.get("id") ?? "";
  const { makeApiCall } = useApi();
  const [job, setJob] = React.useState<Job | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!uuid) return;
    setLoading(true);
    makeApiCall(GetJobInfo(uuid))
      .then((response) => {
        setJob(response?.data || null);
      })
      .catch((err) => console.error("Error fetching job:", err))
      .finally(() => setLoading(false));
  }, [uuid, makeApiCall]);

  if (loading || !job) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-gray-600">
        Loading job details...
      </div>
    );
  }

  // Job and company fields
  const {
    Company,
    Position,
    CreatedAt,
    Location,
    Type,
    MinExperience,
    MaxExperience,
    MinPay,
    MaxPay,
    Currency,
    Remote,
    Hybrid,
    BrandedJd,
    ApplyRedirectUrl,
    JobUrl,
    Description,
    Category,
    Field,
    Skills,
    ShowRecruiterDetail,
    Vacancy,
    ExperienceText,
  } = job;

  // helpers
  // helpers
  const parsedSkills = Array.isArray(Skills)
    ? Skills
    : typeof Skills === "string" && Skills.length > 0
    ? Skills.split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const isBranded = Boolean(BrandedJd);
  const hasApplyRedirect = !!ApplyRedirectUrl;
  const hasJobUrl = !!JobUrl;

  return (
    <section className="bg-white px-6 py-8 max-w-5xl mx-auto text-sm text-gray-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
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
            <h1 className="text-xl font-semibold text-black">{Position}</h1>
            <p className="text-gray-600 text-sm">{Company.name}</p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2 mt-4 sm:mt-0">
          <Chip
            variant="flat"
            color="primary"
            size="sm"
            className="text-xs font-medium"
          >
            Posted on {format(new Date(CreatedAt), "dd MMM yyyy")}
          </Chip>
          {/* Apply/Show Full Details (customize as needed) */}
          {hasApplyRedirect ? (
            <a
              href={ApplyRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded transition"
            >
              Apply on company site
            </a>
          ) : null}
        </div>
      </div>

      {/* About the Job */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-black mb-4">About the Job</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Location:</strong>{" "}
              <span className="inline-flex items-center gap-1">
                <CiLocationOn className="text-black" />
                {Location || "N/A"}
              </span>
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {Type ? Type.charAt(0).toUpperCase() + Type.slice(1) : "N/A"}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {ExperienceText
                ? ExperienceText
                : `${MinExperience || 0} - ${MaxExperience || 0} yrs`}
            </p>
            <p>
              <strong>Compensation:</strong>{" "}
              {MinPay === 0 && MaxPay === 0
                ? "Not Disclosed"
                : `${
                    Currency === "INR" ? "₹" : Currency
                  }${MinPay}L - ${MaxPay}L`}
            </p>
            <p>
              <strong>Work Mode:</strong>{" "}
              {Remote ? "Remote" : Hybrid ? "Hybrid" : "On-site"}
            </p>
          </div>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Field:</strong> {Field || "N/A"}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {Category ? Category.replace("_", " ") : "N/A"}
            </p>
            {JobUrl && (
              <p className="text-blue-600 font-medium inline-flex items-center gap-1">
                <ExternalLink size={16} />
                <a href={JobUrl} target="_blank" rel="noopener noreferrer">
                  Job Posting
                </a>
              </p>
            )}
            <p>
              <strong>Vacancy:</strong> {Vacancy || 1}
            </p>
          </div>
        </div>

        {/* Skills */}
        {parsedSkills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black mb-2">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {parsedSkills.map((skill: any, idx: any) => (
                <Chip key={idx} color="secondary" variant="bordered" size="sm">
                  {skill}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {/* Job Description */}
        <div>
          <h3 className="text-base font-semibold text-black mb-2">
            Job Description
          </h3>
          <div
            className="prose max-w-none rounded-md p-2 text-gray-800"
            dangerouslySetInnerHTML={{ __html: Description }}
          />
        </div>
      </div>

      {/* Apply Button Section - repeated for accessibility and clarity */}
      <div className="mb-9">
        {hasApplyRedirect ? (
          <a
            href={ApplyRedirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Apply on company site
          </a>
        ) : hasJobUrl ? (
          <a
            href={JobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Job Posting
          </a>
        ) : (
          <p className="text-gray-500 text-sm">No application link provided.</p>
        )}
      </div>

      {/* About the Company */}
      <div>
        <h2 className="text-lg font-semibold text-black mb-4">
          About the Company
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Industry:</strong> {Company.industry || "N/A"}
          </p>
          <p>
            <strong>Size:</strong> {Company.company_size || "N/A"} employees
          </p>
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
          <p>
            <strong>Description:</strong>
            <div
              className="prose max-w-none rounded-md p-2 text-gray-800"
              dangerouslySetInnerHTML={{ __html: Company.description }}
            />
          </p>
          {Company.company_culture && (
            <p>
              <strong>Culture:</strong>
              <div
                className="prose max-w-none rounded-md p-2 text-gray-800"
                dangerouslySetInnerHTML={{ __html: Company.company_culture }}
              />
            </p>
          )}
          {Company.benefits && (
            <p>
              <strong>Benefits:</strong>
              <div
                className="prose max-w-none rounded-md p-2 text-gray-800"
                dangerouslySetInnerHTML={{ __html: Company.benefits }}
              />
            </p>
          )}
        </div>

        {/* Contact & Social */}
        <div className="mt-6 flex flex-col space-y-3 text-gray-700">
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
          {Company.glassdoor_url && (
            <p className="inline-flex items-center gap-2">
              <Globe size={16} />
              <a
                href={Company.glassdoor_url}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Glassdoor
              </a>
            </p>
          )}
          {Company.contact_email && (
            <p className="inline-flex items-center gap-2 break-words">
              <Mail size={16} />
              <a
                href={`mailto:${Company.contact_email}`}
                className="hover:underline"
              >
                {Company.contact_email}
              </a>
            </p>
          )}
          {Company.contact_phone && (
            <p className="inline-flex items-center gap-2">
              <Phone size={16} />
              <a
                href={`tel:${Company.contact_phone}`}
                className="hover:underline"
              >
                {Company.contact_phone}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
