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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
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
  } = job;

  const parsedSkills = React.useMemo(() => {
    if (!Skills) return [];
    let skills: string[] = [];
    if (Array.isArray(Skills)) {
      skills = Skills.flatMap((s) =>
        s
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean)
      );
    } else if (typeof Skills === "string") {
      try {
        const parsed = JSON.parse(Skills);
        if (Array.isArray(parsed)) {
          skills = parsed.flatMap((s) =>
            typeof s === "string" ? s.split(",").map((i) => i.trim()) : []
          );
        } else {
          skills = Skills.split(",").map((i) => i.trim());
        }
      } catch {
        skills = Skills.split(",").map((i) => i.trim());
      }
    }
    return skills.slice(0, 10);
  }, [Skills]);

  const parsedLocations = Location
    ? Location.split(",")
        .map((loc) => loc.trim())
        .filter(Boolean)
    : [];

  const isBranded = BrandedJd === "true";
  const hasApplyRedirect = !!ApplyRedirectUrl?.trim();
  const hasJobUrl = !!JobUrl?.trim();

  const navigateToJobInfo = () => {
    if (!job?.Uuid) return;
    window.open(`/job?id=${job.Uuid}`, "_blank");
  };

  return (
    <div
      className="px-6 py-8 max-w-4xl mx-auto text-sm text-gray-800 space-y-8"
      ref={containerRef}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
            <h1 className="text-xl font-semibold text-black font-poppins">
              {Position}
            </h1>
            <p className="text-gray-600 text-sm font-poppins">{Company.name}</p>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          <Chip
            variant="flat"
            color="primary"
            size="sm"
            className="text-xs font-medium font-poppins"
          >
            Posted on {format(new Date(CreatedAt), "dd MMM yyyy")}
          </Chip>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={navigateToJobInfo}
              disabled={isApplied}
              className={`text-xs font-medium px-4 py-2 rounded transition whitespace-nowrap font-poppins ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Show Full Details
            </button>

            {!isBranded && hasApplyRedirect ? (
              <a
                href={ApplyRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap font-poppins"
              >
                Apply on company site
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onApply(job)}
                disabled={isApplied}
                className={`text-xs font-medium px-4 py-2 rounded transition whitespace-nowrap ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isApplied ? "Applied" : "Apply Now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* About the Job */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-black font-poppins">
          About the Job
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CiLocationOn className="text-black" size={20} />
              <div className="flex flex-wrap gap-2">
                {parsedLocations.length > 0 ? (
                  parsedLocations.map((loc, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 border border-gray-300 rounded-full text-gray-700 bg-gray-50 font-poppins"
                    >
                      {loc}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 font-poppins">
                    N/A
                  </span>
                )}
              </div>
            </div>
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

          <div className="space-y-2">
            <p>
              <strong>Field:</strong> {Field || "N/A"}
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
          <div>
            <h3 className="text-base font-semibold text-black mb-2 font-poppins">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {parsedSkills.map((skill, idx) => (
                <Chip
                  key={idx}
                  color="secondary"
                  variant="bordered"
                  size="sm"
                  className="font-poppins"
                >
                  {skill}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {/* Job Description */}
        <div>
          <h3 className="text-base font-semibold text-black mb-2 font-poppins">
            Job Description
          </h3>
          <div
            className="prose max-w-none rounded-md p-2 text-gray-800 font-poppins"
            dangerouslySetInnerHTML={{ __html: Description }}
          />
        </div>
      </div>

      {/* Apply Button */}
      <div>
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

      {/* Company Info */}
      <div>
        <h2 className="text-lg font-semibold text-black font-poppins mb-4">
          About the Company
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Industry:</strong> {Company.industry || "N/A"}
          </p>
          {Company.company_size &&
            Company.company_size.toLowerCase() !== "unknown" && (
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
        </div>
      </div>
    </div>
  );
};

export default JobInfoPage;
