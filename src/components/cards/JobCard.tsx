"use client";
import { Job } from "@/types";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Building2Icon } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { Bookmark } from "lucide-react"; // ✅ bookmark icon

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
    <div
      onClick={() => onViewDetails(job)} // ✅ whole card clickable
      className="p-4 rounded-2xl border shadow-sm bg-white hover:shadow-md transition cursor-pointer"
    >
      {/* Job Title & Company */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {job.Position}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{job.Company?.name}</span>
          </div>
        </div>

        {/* Logo */}
        {job.Company?.logo_url ? (
          <Image
            src={job.Company.logo_url}
            width={40}
            height={40}
            alt="Company Logo"
            className="rounded-md"
          />
        ) : (
          <Building2Icon className="text-gray-400" size={28} />
        )}
      </div>

      {/* Info Row: Experience, Location, Work Mode */}
      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <span>⏳</span>
          <span>
            {job.MinExperience}-{job.MaxExperience} Yrs
          </span>
        </div>
        <div className="flex items-center gap-1">
          <CiLocationOn className="text-gray-600" />
          <span>{job.Location?.split(",")[0] || "N/A"}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🏢</span>
          <span>
            {job.Remote ? "Remote" : job.Hybrid ? "Hybrid" : "On-site"}
          </span>
        </div>
      </div>

      {/* Skill Section */}
      {parsedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-700">
          {parsedSkills.map((skill, i) => (
            <span
              key={i}
              className="after:content-['·'] last:after:content-none"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <span>Posted {postedDate}</span>
        <div className="flex gap-4 items-center">
          {onSave && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // ✅ prevent card click
                onSave(job?.Uuid);
              }}
              className="flex items-center gap-1 text-gray-500 hover:text-blue-500"
            >
              <Bookmark size={14} /> {/* ✅ bookmark icon */}
              <span>Save</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
