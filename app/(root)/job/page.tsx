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
  const hasJobUrl = !!JobUrl;

  return (
    <main className="bg-gray-100 py-10 min-h-screen font-poppins px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Card */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
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
                <h1 className="text-xl font-semibold text-black">{Position}</h1>
                <p className="text-gray-600 text-sm">{Company.name}</p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <Chip
                variant="flat"
                color="primary"
                size="sm"
                className="text-xs font-medium"
              >
                Posted on {format(new Date(CreatedAt), "dd MMM yyyy")}
              </Chip>
              {hasApplyRedirect && (
                <a
                  href={ApplyRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded transition"
                >
                  Apply on company site
                </a>
              )}
            </div>
          </div>
        </section>

        {/* About the Job */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-black">About the Job</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Location:</strong>{" "}
                <span className="inline-flex items-center gap-2">
                  <CiLocationOn className="text-black" />
                  <span className="flex flex-wrap gap-2">
                    {parsedLocations.length > 0 ? (
                      parsedLocations.map((loc, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 border border-gray-300 rounded-full text-gray-700 bg-gray-50"
                        >
                          {loc}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500">N/A</span>
                    )}
                  </span>
                </span>
              </p>
              <p>
                <strong>Type:</strong> {Type || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {ExperienceText || `${MinExperience} - ${MaxExperience} yrs`}
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
                {Category?.replace("_", " ") || "N/A"}
              </p>
              <p>
                <strong>Vacancy:</strong> {Vacancy || 1}
              </p>
              {hasJobUrl && (
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

          {/* Job Description */}
          <div>
            <h3 className="text-base font-semibold text-black mb-2">
              Job Description
            </h3>
            <div
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: Description }}
            />
          </div>
        </section>

        {/* Company Info */}
        <section className="bg-white p-6 rounded-lg shadow-sm space-y-4">
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

            {Company.company_culture && (
              <div>
                <strong>Culture:</strong>
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: Company.company_culture }}
                />
              </div>
            )}

            {Company.benefits && (
              <div>
                <strong>Benefits:</strong>
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: Company.benefits }}
                />
              </div>
            )}
          </div>

          {/* Contact & Social Links */}
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
              <p className="inline-flex items-center gap-2">
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
        </section>
      </div>
    </main>
  );
}
