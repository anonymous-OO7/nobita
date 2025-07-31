import { Job } from "@/types";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Chip } from "@nextui-org/react";
import {
  Check,
  ChartNoAxesCombined,
  Building2Icon,
  CircleCheckBig,
} from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { FormatToLakhs } from "@/utils/utils";

interface CardProps {
  job: Job & {
    Status?: string; // e.g., "applied", "rejected", "pending" etc.
    Remark?: string; // additional remarks text to show
  };
}

const Card: React.FC<CardProps> = ({ job }) => {
  const postedDate = formatDistanceToNow(new Date(job.CreatedAt), {
    addSuffix: true,
  });

  const renderType = React.useCallback((value: string) => {
    switch (value) {
      case "fulltime":
        return (
          <Chip
            startContent={<Check size={16} />}
            variant="flat"
            color="primary"
            size="sm"
            className="p-1"
          >
            <p className="text-xs font-poppins text-black">Full-Time</p>
          </Chip>
        );
      case "contract":
      case "internship":
      case "freelance":
        return (
          <Chip
            startContent={<ChartNoAxesCombined size={16} />}
            variant="flat"
            color="warning"
            size="sm"
            className="p-1"
          >
            <p className="text-xs font-poppins text-black">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </p>
          </Chip>
        );
      default:
        return (
          <Chip
            startContent={<Check size={16} />}
            variant="flat"
            color="primary"
            size="sm"
            className="p-1"
          >
            <p className="text-xs font-poppins text-black">Full-Time</p>
          </Chip>
        );
    }
  }, []);

  // Map job.Status to display text and optionally color
  const statusText = job.Status
    ? job.Status.charAt(0).toUpperCase() + job.Status.slice(1)
    : "Unknown";

  // Map status to chip color variants; adjust as needed
  const statusColorMap: Record<
    string,
    // "default" | "success" | "error" | "warning" | "secondary"

    "default" | "success" | "warning" | "secondary" | "primary" | "danger"
  > = {
    applied: "success",
    pending: "warning",
    rejected: "danger",
    unknown: "secondary",
  };

  // Normalize status key for mapping
  const normalizedStatus = job.Status ? job.Status.toLowerCase() : "unknown";

  const statusColor = statusColorMap[normalizedStatus] || "secondary";

  return (
    <div className="p-4 shadow-md rounded-md mb-4 border bg-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            {job.Company.logo_url ? (
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
              <h2 className="font-semibold text-lg text-black font-poppins">
                {job.Position}
              </h2>
              <p className="text-sm text-gray-600 font-poppins">
                {job.Company.name}
              </p>
            </div>
          </div>

          {renderType(job.Type)}
        </div>

        {/* Status Chip */}
        <div className="flex flex-col items-end">
          <Chip
            startContent={<CircleCheckBig size={16} />}
            variant="flat"
            color={statusColor}
            size="sm"
            className={
              statusColor === "success" ? "bg-green-500 text-white" : ""
            }
          >
            <span className="text-xs font-medium">{statusText}</span>
          </Chip>

          {/* Display Remark if exists */}
          {job.Remark && (
            <p className="mt-1 text-xs italic text-gray-600 max-w-xs font-poppins whitespace-pre-wrap">
              {job.Remark}
            </p>
          )}
        </div>
      </div>

      {/* Location and Salary */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-700 font-poppins">
          <CiLocationOn className="text-black" />
          {job.Location}
        </div>
        <div className="text-sm text-black font-poppins">
          {FormatToLakhs(job.MinPay)} - {FormatToLakhs(job.MaxPay)} INR/pa
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 text-xs text-gray-500 font-poppins">
        Posted {postedDate}
      </div>
    </div>
  );
};

export default Card;
