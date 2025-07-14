import { Job } from "@/types";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Chip } from "@nextui-org/react";
import {
  CircleCheck,
  CircleCheckBig,
  CircleX,
  Check,
  TagIcon,
  GemIcon,
  AwardIcon,
  ChartNoAxesCombined,
  UsersRound,
  Building2Icon,
} from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import Button from "../Button";

interface CardProps {
  job: Job;
  onSave: (uuid: string) => void;
  onApply: (job: Job) => void;
  onViewDetails: (job: Job) => void;
  isApplied: boolean;
}

const Card: React.FC<CardProps> = ({
  job,
  onSave,
  onApply,
  onViewDetails,
  isApplied = false,
}) => {
  const backgroundColorClass = ["inactive", "hired", "closed"].includes(
    job.Status
  )
    ? "bg-red-400"
    : "bg-buttonPrimary";

  const postedDate = formatDistanceToNow(new Date(job.CreatedAt), {
    addSuffix: true,
  });

  const renderJobStatus = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Chip
            startContent={<CircleCheck size={18} />}
            variant="flat"
            color="success"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">Actively Hiring</p>
          </Chip>
        );
      case "closed":
      case "inactive":
        return (
          <Chip
            startContent={<CircleX size={18} />}
            variant="flat"
            color="danger"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
          </Chip>
        );
      case "hired":
        return (
          <Chip
            startContent={<CircleCheckBig size={18} />}
            variant="bordered"
            color="success"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">Hired</p>
          </Chip>
        );
      default:
        return (
          <Chip variant="flat" color="default" size="sm">
            Active
          </Chip>
        );
    }
  };

  const isGrowing = parseInt(job.Company.company_size || "0") < 500;

  const renderGrowth = () => (
    <Chip
      startContent={<ChartNoAxesCombined size={18} />}
      variant="bordered"
      color={isGrowing ? "warning" : "success"}
      size="sm"
    >
      <p className="text-sm font-poppins text-black">
        {isGrowing ? "Growing Fast" : "Well Established"}
      </p>
    </Chip>
  );

  const renderType = () => {
    switch (job.Type) {
      case "fulltime":
        return (
          <Chip
            startContent={<Check size={18} />}
            variant="flat"
            color="primary"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">Full-Time</p>
          </Chip>
        );
      case "contract":
      case "internship":
      case "freelance":
        return (
          <Chip
            startContent={<ChartNoAxesCombined size={18} />}
            variant="flat"
            color="warning"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">
              {job.Type.charAt(0).toUpperCase() + job.Type.slice(1)}
            </p>
          </Chip>
        );
      default:
        return (
          <Chip
            startContent={<Check size={18} />}
            variant="flat"
            color="primary"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">Full-Time</p>
          </Chip>
        );
    }
  };

  const renderPriceTag = () => {
    const price = job.Price;
    if (price < 1000) {
      return (
        <Chip
          startContent={<TagIcon size={18} />}
          color="secondary"
          variant="flat"
          size="sm"
        >
          <p className="text-sm font-poppins text-black">Affordable</p>
        </Chip>
      );
    } else if (price < 2000) {
      return (
        <Chip
          startContent={<AwardIcon size={18} />}
          color="secondary"
          variant="flat"
          size="sm"
        >
          <p className="text-sm font-poppins text-black">Competitive</p>
        </Chip>
      );
    } else if (price < 5000) {
      return (
        <Chip
          startContent={<GemIcon size={18} />}
          color="primary"
          variant="flat"
          size="sm"
        >
          <p className="text-sm font-poppins text-black">Premium</p>
        </Chip>
      );
    } else {
      return (
        <Chip
          startContent={<GemIcon size={18} />}
          color="danger"
          variant="flat"
          size="sm"
        >
          <p className="text-sm font-poppins text-black">Rare</p>
        </Chip>
      );
    }
  };

  const parsedSkills: string[] = React.useMemo(() => {
    if (Array.isArray(job.Skills)) return job.Skills;
    try {
      return JSON.parse(job.Skills as string);
    } catch {
      return [];
    }
  }, [job.Skills]);

  return (
    <div className="p-5 shadow-md rounded-md mb-6 border bg-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-center gap-3">
          {job?.Company?.logo_url ? (
            <Image
              src={job.Company.logo_url}
              width={50}
              height={50}
              alt="Company Logo"
              className="rounded-md"
            />
          ) : (
            <Building2Icon color="black" size={30} />
          )}
          <div>
            <h2 className="text-lg font-medium text-black">{job.Position}</h2>
            <p className="text-sm text-gray-600">{job.Company.name}</p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {renderType()}
          {renderJobStatus(job.Status)}
          {renderGrowth()}
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CiLocationOn className="text-black" />
          <span>{job.Location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Chip
            startContent={<UsersRound size={16} />}
            variant="flat"
            color="default"
            size="sm"
          >
            <span className="text-sm text-black">
              {job.Company.company_size || "N/A"}+ Employees
            </span>
          </Chip>
          {renderPriceTag()}
          {isApplied && (
            <Chip
              startContent={<CircleCheckBig size={16} />}
              color="success"
              variant="flat"
              size="sm"
              className="bg-green-500 text-white"
            >
              Applied
            </Chip>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
        <div className="text-sm text-gray-700">
          <p>
            {job.MinExperience} - {job.MaxExperience} yrs • ₹{job.MinPay}L - ₹
            {job.MaxPay}L •{" "}
            {job.Remote ? "Remote" : job.Hybrid ? "Hybrid" : "On-site"}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            color="primary"
            variant="outline"
            onClick={() => onSave(job.Uuid)}
            size="sm"
          >
            <span className="text-sm font-normal text-blue-500">Save</span>
          </Button>
          <Button
            color="secondary"
            variant="outline"
            onClick={() => onViewDetails(job)}
            size="sm"
          >
            <span className="text-sm font-medium text-secondary">
              View Details
            </span>
          </Button>
          <Button
            className={`rounded-md ${backgroundColorClass}`}
            color={
              ["inactive", "hired", "closed"].includes(job.Status)
                ? "danger"
                : "primary"
            }
            variant={
              ["inactive", "hired", "closed"].includes(job.Status)
                ? "solid"
                : "ghost"
            }
            size="sm"
            onClick={() => onApply(job)}
            disabled={["inactive", "hired", "closed"].includes(job.Status)}
          >
            <span className="text-sm text-white font-medium">
              {["inactive", "hired", "closed"].includes(job.Status)
                ? job.Status
                : "Apply"}
            </span>
          </Button>
        </div>
      </div>

      {parsedSkills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {parsedSkills.map((skill, index) => (
            <Chip
              key={index}
              color="primary"
              variant="bordered"
              size="sm"
              className="px-2 py-1"
            >
              <span className="text-xs text-black">{skill}</span>
            </Chip>
          ))}
        </div>
      )}

      {job.JobUrl && (
        <p className="mt-3 text-sm text-blue-600 font-medium">
          <a href={job.JobUrl} target="_blank" rel="noopener noreferrer">
            View Job Posting
          </a>
        </p>
      )}

      <div className="mt-2 text-xs text-gray-500">
        <p>
          <span className="font-medium text-black">Category:</span>{" "}
          {job.Category?.replace("_", " ")}
        </p>
        <p>Posted {postedDate}</p>
      </div>
    </div>
  );
};

export default Card;
