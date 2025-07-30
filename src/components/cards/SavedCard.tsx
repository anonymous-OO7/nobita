import { Job } from "@/types";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Button, Chip } from "@nextui-org/react";
import {
  CircleCheck,
  Pin,
  Save,
  CircleX,
  TagIcon,
  GemIcon,
  AwardIcon,
  ChartNoAxesCombined,
  Check,
  UsersRound,
  IndianRupee,
  Building2Icon,
} from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";

interface CardProps {
  job: Job;
  onSave: (uuid: string) => void;
  onApply: (job: Job) => void;
}

const Card: React.FC<CardProps> = ({ job, onSave, onApply }) => {
  const postedDate = formatDistanceToNow(new Date(job.CreatedAt), {
    addSuffix: true,
  });

  const renderJobType = React.useCallback((value: string) => {
    switch (value) {
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
        return (
          <Chip
            startContent={<CircleX size={18} />}
            color="danger"
            variant="flat"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">Closed</p>
          </Chip>
        );
      default:
        return (
          <Chip variant="flat" color="success" size="sm">
            <span className="font-extrabold">&#8226;</span> Active
          </Chip>
        );
    }
  }, []);

  const growinfFast = React.useCallback((value: boolean) => {
    return value ? (
      <Chip
        startContent={<ChartNoAxesCombined size={18} />}
        variant="flat"
        color="warning"
        size="sm"
      >
        <p className="text-sm font-poppins text-black">Growing Fast</p>
      </Chip>
    ) : (
      <Chip variant="flat" color="success" size="sm">
        <span className="font-extrabold">&#8226;</span> Established
      </Chip>
    );
  }, []);

  const renderType = React.useCallback((value: string) => {
    switch (value) {
      case "fulltime":
        return (
          <Chip
            startContent={<Check size={18} />}
            variant="flat"
            color="primary"
            size="sm"
            className="bg-slate-100"
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
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </p>
          </Chip>
        );
      default:
        return (
          <Chip variant="flat" color="success" size="sm">
            <span className="font-extrabold">&#8226;</span> Active
          </Chip>
        );
    }
  }, []);

  const renderPriceTag = React.useCallback((value: string) => {
    switch (value) {
      case "low_cost":
        return (
          <Chip
            startContent={<TagIcon size={18} />}
            variant="flat"
            color="secondary"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">Affordable</p>
          </Chip>
        );
      case "medium_cost":
        return (
          <Chip
            startContent={<AwardIcon size={18} />}
            color="secondary"
            variant="flat"
            size="sm"
          >
            <p className="text-sm font-poppins text-black">
              Competitive Pricing
            </p>
          </Chip>
        );
      case "premium":
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
      case "luxirious":
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
      default:
        return (
          <Chip variant="flat" color="success" size="sm">
            <span className="font-extrabold">&#8226;</span> Active
          </Chip>
        );
    }
  }, []);

  return (
    <div className="p-4 shadow-md rounded-md mb-4 border">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-start sm:items-center">
          <div className="flex flex-row items-center gap-2">
            {job.Company.logo_url && job.Company.logo_url !== "" ? (
              <Image
                src={job.Company.logo_url}
                width={50}
                height={50}
                alt="Company Logo"
              />
            ) : (
              <Building2Icon color="black" size={30} />
            )}
            <h2 className="font-semibold text-xl font-poppins text-black">
              {job.Position}
            </h2>
          </div>
          {renderType(job.Type)}
        </div>

        {/* <div className="flex flex-row justify-center items-center gap-2">
          <p className="text-lg font-poppins text-green-400">At</p>
          <Chip
            startContent={<IndianRupee color="black" size={22} />}
            variant="bordered"
            color="success"
            size="lg"
            className="p-2"
          >
            <p className="text-2xl font-semibold font-poppins text-black">
              {job.Price}
            </p>
          </Chip>
        </div> */}
      </div>
      {/* Company Info */}
      <div className="flex flex-row gap-1 items-center mt-3">
        <p className="text-sm font-poppins text-black">{job.Company.name}</p>
        <div className="flex flex-row gap-1 items-center">
          <CiLocationOn className="h-4 w-4 text-black" />
          <p className="text-xs font-poppins text-black">{job.Location}</p>
        </div>
      </div>
      <div className="my-3">
        <Chip
          startContent={<UsersRound size={18} />}
          variant="flat"
          color="default"
          size="sm"
          className="px-2"
        >
          <p className="text-sm font-poppins text-black">
            {job.Company.company_size}+ Employees
          </p>
        </Chip>
      </div>
      {/* Tags and Actions */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          {renderJobType(job.Status)}
          {growinfFast(parseInt(job.Company.company_size) < 500)}
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <Button
            color="danger"
            variant="bordered"
            onClick={() => onSave(job.Uuid)}
          >
            <p className="text-sm font-poppins text-red-700">Remove</p>
          </Button>
        </div>
      </div>
      {/* Description */}

      <div
        className="prose max-w-none rounded-md p-2 text-gray-800"
        dangerouslySetInnerHTML={{ __html: job.Description }}
      />
      {/* Pay + Posted */}
      <p className="text-gray-700">
        Pay - {job.MinPay} - {job.MaxPay} INR
      </p>
      <p className="text-xs mt-3 font-poppins text-black">
        Posted {postedDate}
      </p>
    </div>
  );
};

export default Card;
