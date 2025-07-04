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
    remote,
    hybrid,
    skills,
    JobUrl,
    CreatedAt,
    company,
  } = job;

  const parsedSkills: string[] = React.useMemo(() => {
    if (Array.isArray(skills)) return skills;
    try {
      return JSON.parse(skills as string);
    } catch {
      return [];
    }
  }, [skills]);

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      {/* Header */}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-4">
          {company.logo_url ? (
            <Image
              src={company.logo_url}
              alt="Company Logo"
              width={60}
              height={60}
              className="rounded-md"
            />
          ) : (
            <Building2 size={40} />
          )}
          <div>
            <h1 className="text-2xl font-semibold text-black">{Position}</h1>
            <p className="text-gray-600 text-sm">{company.name}</p>
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

          {JobUrl && (
            <a
              href={JobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition"
            >
              Apply Now
            </a>
          )}
        </div>
      </div>

      {/* About the Job */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-black mb-4">About the Job</h2>
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
              {remote ? "Remote" : hybrid ? "Hybrid" : "On-site"}
            </p>
          </div>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Field:</strong> {job.Field}
            </p>
            <p>
              <strong>Category:</strong> {job?.Category?.replace("_", " ")}
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
            <h3 className="text-lg font-semibold text-black mb-2">
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
          <h3 className="text-lg font-semibold text-black mb-2">
            Job Description
          </h3>
          <div
            className="prose max-w-none rounded-md p-2 text-black"
            dangerouslySetInnerHTML={{ __html: Description }}
          />
        </div>
      </div>

      {/* About the Company */}
      <div>
        <h2 className="text-xl font-semibold text-black mb-4">
          About the Company
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Industry:</strong> {company.industry}
          </p>
          <p>
            <strong>Size:</strong> {company.company_size}+ employees
          </p>
          <p>
            <strong>Founded:</strong>{" "}
            {company.founded_date
              ? format(new Date(company.founded_date), "yyyy")
              : "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {company.location}
          </p>
          <p>
            <strong>Headquarters:</strong> {company.headquarters_address}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            <span className="whitespace-pre-line">{company.description}</span>
          </p>
          <p>
            <strong>Culture:</strong>{" "}
            <span className="whitespace-pre-line">
              {company.company_culture}
            </span>
          </p>
          <p>
            <strong>Benefits:</strong>{" "}
            <span className="whitespace-pre-line">{company.benefits}</span>
          </p>
        </div>

        {/* Contact & Social */}
        <div className="mt-6 space-y-2 text-gray-700">
          {company.website_url && (
            <p className="inline-flex items-center gap-1">
              <Globe size={16} />
              <a
                href={company.website_url}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website_url}
              </a>
            </p>
          )}
          {company.glassdoor_url && (
            <p className="inline-flex items-center gap-1">
              <Globe size={16} />
              <a
                href={company.glassdoor_url}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Glassdoor
              </a>
            </p>
          )}
          {company.contact_email && (
            <p className="inline-flex items-center gap-1">
              <Mail size={16} /> {company.contact_email}
            </p>
          )}
          {company.contact_phone && (
            <p className="inline-flex items-center gap-1">
              <Phone size={16} /> {company.contact_phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobInfoPage;
