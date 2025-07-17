"use client";
import { Job } from "@/types";
import React from "react";
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
}

const JobInfoPage: React.FC<JobInfoPageProps> = ({ job }) => {
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
    if (Array.isArray(Skills)) return Skills;
    try {
      return JSON.parse(Skills as string);
    } catch {
      return [];
    }
  }, [Skills]);

  const applyText =
    BrandedJd === "true" && ApplyRedirectUrl?.trim()
      ? "Apply on company site"
      : "Apply Now";

  const applyLink =
    BrandedJd === "true" && ApplyRedirectUrl?.trim()
      ? ApplyRedirectUrl
      : JobUrl;

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto text-sm text-gray-800">
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

          {applyLink && (
            <a
              href={applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded transition"
            >
              {applyText}
            </a>
          )}
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
              <strong>Compensation:</strong> ₹{MinPay}L - ₹{MaxPay}L
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
                <Chip key={idx} color="primary" variant="bordered" size="sm">
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
            <strong>Size:</strong> {Company.company_size || "N/A"}+ employees
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
            <strong>Description:</strong>{" "}
            <span className="whitespace-pre-line">
              {Company.description || "N/A"}
            </span>
          </p>
          {Company.company_culture && (
            <p>
              <strong>Culture:</strong>{" "}
              <span className="whitespace-pre-line">
                {Company.company_culture}
              </span>
            </p>
          )}
          {Company.benefits && (
            <p>
              <strong>Benefits:</strong>{" "}
              <span className="whitespace-pre-line">{Company.benefits}</span>
            </p>
          )}
        </div>

        {/* Contact & Social */}
        <div className="mt-6 space-y-2 text-gray-700">
          {Company.website_url && (
            <p className="inline-flex items-center gap-1">
              <Globe size={16} />
              <a
                href={Company.website_url}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {Company.website_url}
              </a>
            </p>
          )}
          {Company.glassdoor_url && (
            <p className="inline-flex items-center gap-1">
              <Globe size={16} />
              <a
                href={Company.glassdoor_url}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Glassdoor
              </a>
            </p>
          )}
          {Company.contact_email && (
            <p className="inline-flex items-center gap-1">
              <Mail size={16} /> {Company.contact_email}
            </p>
          )}
          {Company.contact_phone && (
            <p className="inline-flex items-center gap-1">
              <Phone size={16} /> {Company.contact_phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobInfoPage;
