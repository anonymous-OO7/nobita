"use client";
import { Job } from "@/types";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Chip } from "@nextui-org/react";
import {
  CircleCheck,
  CircleCheckBig,
  CircleX,
  Check,
  ChartNoAxesCombined,
  UsersRound,
  Building2Icon,
} from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import Button from "../Button";

interface CardProps {
  job: Job;
  onSave?: (uuid: string) => void;
  onApply?: (job: Job) => void;
  onViewDetails: (job: Job) => void;
  isApplied?: boolean;
}

const Card: React.FC<CardProps> = ({
  job,
  onSave,
  onApply,
  onViewDetails,
  isApplied = false,
}) => {
  const postedDate = formatDistanceToNow(new Date(job.CreatedAt), {
    addSuffix: true,
  });

  const isJobClosed = ["inactive", "hired", "closed"].includes(job.Status);
  const isGrowing = parseInt(job.Company?.company_size || "0") < 500;
  const showExternalApply =
    job.BrandedJd === "true" && job.ApplyRedirectUrl?.trim();

  const parsedSkills: string[] = React.useMemo(() => {
    if (!job.Skills) return [];

    let skills: string[] = [];

    if (Array.isArray(job.Skills)) {
      skills = job.Skills.flatMap((skill) =>
        skill
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      );
    } else if (typeof job.Skills === "string") {
      try {
        const parsed = JSON.parse(job.Skills);
        if (Array.isArray(parsed)) {
          skills = parsed.flatMap((skill) =>
            typeof skill === "string"
              ? skill
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : []
          );
        } else {
          skills = job.Skills.split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      } catch {
        skills = job.Skills.split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    return skills.slice(0, 2); // ✅ Limit to 2
  }, [job.Skills]);

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl border shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          {job.Company?.logo_url ? (
            <Image
              src={job.Company.logo_url}
              width={48}
              height={48}
              alt="Company Logo"
              className="rounded-md"
            />
          ) : (
            <Building2Icon className="text-gray-500" size={30} />
          )}
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold text-gray-900">
              {job.Position}
            </h3>
            <p className="text-sm text-gray-600">{job.Company?.name}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip
            startContent={<Check size={16} />}
            size="sm"
            color="primary"
            variant="flat"
          >
            <span className="text-xs">
              {job.Type.charAt(0).toUpperCase() + job.Type.slice(1)}
            </span>
          </Chip>
          <Chip
            startContent={
              isJobClosed ? <CircleX size={16} /> : <CircleCheck size={16} />
            }
            size="sm"
            color={isJobClosed ? "danger" : "success"}
            variant="flat"
          >
            <span className="text-xs">
              {isJobClosed
                ? job.Status.charAt(0).toUpperCase() + job.Status.slice(1)
                : "Actively Hiring"}
            </span>
          </Chip>
          <Chip
            startContent={<ChartNoAxesCombined size={16} />}
            size="sm"
            color={isGrowing ? "warning" : "success"}
            variant="flat"
          >
            <span className="text-xs">
              {isGrowing ? "Growing Fast" : "Well Established"}
            </span>
          </Chip>
        </div>
      </div>

      {/* Location, Company Size, Price */}
      <div className="flex flex-wrap justify-between gap-3 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <CiLocationOn className="text-gray-700" />
          <span>{job.Location?.split(",")[0].trim() || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          {isApplied && (
            <Chip
              startContent={<CircleCheckBig size={14} />}
              color="success"
              size="sm"
            >
              <span className="text-xs">Applied</span>
            </Chip>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-600">
        <p>
          {job.MinExperience} - {job.MaxExperience} yrs •{" "}
          {job.MinPay === 0 && job.MaxPay === 0
            ? "Not Specified"
            : `₹${job.MinPay}L - ₹${job.MaxPay}L`}{" "}
          • {job.Remote ? "Remote" : job.Hybrid ? "Hybrid" : "On-site"}
        </p>
      </div>
      {parsedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {parsedSkills.map((skill, i) => (
            <Chip key={i} variant="bordered" color="secondary" size="sm">
              <span className="text-xs">{skill}</span>
            </Chip>
          ))}
        </div>
      )}

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="text-xs text-gray-500 space-y-1">
          <p className="text-gray-400">Posted {postedDate}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {onSave && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSave(job?.Uuid)}
            >
              <span className="text-xs font-medium text-blue-500">Save</span>
            </Button>
          )}

          <Button
            className={`rounded-md ${"bg-buttonPrimary"} `}
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(job)}
          >
            <span className="text-xs text-white hover:text-black font-medium">
              View Details
            </span>
          </Button>
        </div>
      </div>

      {job.JobUrl && (
        <p className="text-xs mt-1 text-blue-600 font-medium underline">
          <a href={job.JobUrl} target="_blank" rel="noopener noreferrer">
            View Job Posting
          </a>
        </p>
      )}
    </div>
  );
};

export default Card;
