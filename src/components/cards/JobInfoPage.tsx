"use client";
import React, { useEffect, useRef } from "react";
import { Job } from "@/types";
import { format } from "date-fns";
import { Chip } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import {
  ExternalLink,
  Users,
  Mail,
  Phone,
  Globe,
  Building2,
} from "lucide-react";
import Image from "next/image";

interface JobInfoPageProps {
  job: Job;
  onApply: (job: Job) => void;
  isApplied: boolean;
}

const JobInfoPage: React.FC<JobInfoPageProps> = ({
  job,
  onApply,
  isApplied = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [job]);

  const {
    Position,
    Description,
    Location,
    Type,
    MinExperience,
    MaxExperience,
    MinPay,
    MaxPay,
    Remote,
    Hybrid,
    Skills,
    JobUrl,
    ApplyRedirectUrl,
    BrandedJd,
    CreatedAt,
    Company,
    Field,
    Category,
  } = job;

  const parsedSkills: string[] = React.useMemo(() => {
    if (!Skills) return [];

    let skills: string[] = [];

    if (Array.isArray(Skills)) {
      skills = Skills.flatMap((s) =>
        s
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      );
    } else if (typeof Skills === "string") {
      try {
        const parsed = JSON.parse(Skills);
        if (Array.isArray(parsed)) {
          skills = parsed.flatMap((s) =>
            typeof s === "string"
              ? s
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              : []
          );
        } else {
          skills = Skills.split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        }
      } catch {
        skills = Skills.split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    return skills.slice(0, 10); // Limit to 10
  }, [Skills]);

  // Determine Apply Button Text and Link
  const isBranded = BrandedJd === "true";
  const hasApplyRedirect = !!ApplyRedirectUrl?.trim();
  const hasJobUrl = !!JobUrl?.trim();

  return (
    <div
      className="px-6 py-8 max-w-5xl mx-auto text-sm text-gray-800"
      ref={containerRef}
    >
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

          {/* Conditionally render Apply Button here as well for quick access */}
          {isBranded && hasApplyRedirect ? (
            <a
              href={ApplyRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded transition"
            >
              Apply on company site
            </a>
          ) : !isBranded && hasJobUrl ? (
            <button
              type="button"
              onClick={() => onApply(job)}
              disabled={isApplied}
              className={`inline-block mt-1 text-xs font-medium px-4 py-2 rounded transition ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </button>
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
                {Location}
              </span>
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {Type.charAt(0).toUpperCase() + Type.slice(1)}
            </p>
            <p>
              <strong>Experience:</strong> {MinExperience} - {MaxExperience} yrs
            </p>
            <p>
              <strong>Compensation:</strong>{" "}
              {MinPay === 0 && MaxPay === 0
                ? "Not Disclosed"
                : `₹${MinPay}L - ₹${MaxPay}L`}
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
              <strong>Category:</strong> {Category?.replace("_", " ") || "N/A"}
            </p>
            {JobUrl && (
              <p className="text-blue-600 font-medium inline-flex items-center gap-1">
                <ExternalLink size={16} />
                <a href={JobUrl} target="_blank" rel="noopener noreferrer">
                  Job Posting
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        {parsedSkills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base font-semibold text-black mb-2">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {parsedSkills.map((skill, idx) => (
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
        {isBranded && hasApplyRedirect ? (
          <a
            href={ApplyRedirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Apply on company site
          </a>
        ) : !isBranded && hasJobUrl ? (
          <button
            type="button"
            onClick={() => onApply(job)}
            disabled={isApplied}
            className={`inline-block px-4 py-2 rounded transition w-full sm:w-auto ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
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
    </div>
  );
};

export default JobInfoPage;
