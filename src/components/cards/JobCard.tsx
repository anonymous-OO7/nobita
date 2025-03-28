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
  CircleCheckBig,
} from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { FormatToLakhs } from "@/utils/utils";
interface CardProps {
  job: Job;
  onSave: (uuid: string) => void;
  onApply: (job: Job) => void;
}

const Card: React.FC<CardProps> = ({ job, onSave, onApply }) => {
  const backgroundColorClass =
    job.Status === "inactive" ||
    job.Status === "hired" ||
    job.Status === "closed"
      ? "bg-red-400"
      : "bg-buttonPrimary";

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
            className="z-0"
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
            className="z-0"
          >
            <p className="text-sm font-poppins text-black">Closed</p>
          </Chip>
        );
      case "inactive":
        return (
          <Chip
            startContent={<CircleX size={18} />}
            color="warning"
            variant="flat"
            size="sm"
            className="z-0"
          >
            <p className="text-sm font-poppins text-black">Inactive</p>
          </Chip>
        );
      case "hired":
        return (
          <Chip
            startContent={<CircleCheckBig size={18} />}
            color="success"
            variant="bordered"
            size="sm"
            className="z-0"
          >
            <p className="text-sm font-poppins text-black">Hired</p>
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
    switch (value) {
      case true:
        return (
          <Chip
            startContent={<ChartNoAxesCombined size={18} />}
            variant="bordered"
            color="warning"
            size="sm"
            className="p-2 -z-0"
          >
            <p className="text-sm font-poppins text-black">Growing Fast</p>
          </Chip>
        );
      case false:
        return (
          <Chip
            startContent={<ChartNoAxesCombined size={18} />}
            variant="bordered"
            color="success"
            size="sm"
            className="p-2 -z-0"
          >
            <p className="text-sm font-poppins text-black">Well Established</p>
          </Chip>
        );

      default:
        return (
          <Chip
            startContent={<ChartNoAxesCombined size={18} />}
            variant="flat"
            color="warning"
            size="sm"
            className="p-2 -z-0"
          >
            <p className="text-sm font-poppins text-black">Growing Fast</p>
          </Chip>
        );
    }
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
            className=" p-1"
          >
            <p className="text-sm font-poppins text-black">Full-Time</p>
          </Chip>
        );
      case "contract":
        return (
          <Chip
            startContent={<ChartNoAxesCombined size={18} />}
            variant="flat"
            color="warning"
            size="sm"
            className=" p-1"
          >
            <p className="text-sm font-poppins text-black">Contract</p>
          </Chip>
        );
      case "internship":
        return (
          <Chip
            startContent={<ChartNoAxesCombined size={18} />}
            variant="flat"
            color="warning"
            size="sm"
            className=" p-1"
          >
            <p className="text-sm font-poppins text-black">Internship</p>
          </Chip>
        );
      case "freelance":
        return (
          <Chip
            startContent={<ChartNoAxesCombined size={18} />}
            variant="flat"
            color="warning"
            size="sm"
            className=" p-1"
          >
            <p className="text-sm font-poppins text-black">Freelance</p>
          </Chip>
        );

      default:
        return (
          <Chip
            startContent={<Check size={18} />}
            variant="flat"
            color="primary"
            size="sm"
            className=" p-1"
          >
            <p className="text-sm font-poppins text-black">Full-Time</p>
          </Chip>
        );
    }
  }, []);

  const renderPriceTag = React.useCallback((price: number) => {
    let chipProps: {
      startContent: React.ReactNode;
      color:
        | "default"
        | "secondary"
        | "primary"
        | "danger"
        | "success"
        | "warning"
        | undefined;
      variant:
        | "flat"
        | "solid"
        | "bordered"
        | "light"
        | "faded"
        | "shadow"
        | "dot"
        | undefined;
      size: "sm" | "md" | "lg" | undefined;
      content: string;
    } = {
      startContent: null,
      color: "default",
      variant: "flat",
      size: "sm",
      content: "Unknown",
    };

    if (price < 2000) {
      chipProps = {
        startContent: <TagIcon size={18} />,
        color: "secondary",
        variant: "flat",
        size: "sm",
        content: "Affordable",
      };
    } else if (price >= 1000 && price < 2000) {
      chipProps = {
        startContent: <AwardIcon size={18} />,
        color: "secondary",
        variant: "flat",
        size: "sm",
        content: "Competitive Pricing",
      };
    } else if (price >= 2000 && price < 5000) {
      chipProps = {
        startContent: <GemIcon size={18} />,
        color: "primary",
        variant: "flat",
        size: "sm",
        content: "Premium",
      };
    } else if (price >= 5000) {
      chipProps = {
        startContent: <GemIcon size={18} />,
        color: "danger",
        variant: "flat",
        size: "sm",
        content: "Rare",
      };
    }

    return (
      <Chip
        startContent={chipProps.startContent}
        color={chipProps.color}
        variant={chipProps.variant}
        size={chipProps.size}
      >
        <p className="text-sm font-poppins text-black">{chipProps.content}</p>
      </Chip>
    );
  }, []);

  // Function to render description with newlines and spaces preserved
  const formatText = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="p-4  shadow-md rounded-md mb-4 border">
      <div className=" flex flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-start sm:items-center">
          <div className="flex flex-row items-center gap-2">
            {job.logourl && job.logourl != "" ? (
              <Image
                src={job.logourl}
                width={50}
                height={50}
                alt="Picture of the author"
              />
            ) : (
              <Building2Icon color="black" size={30} />
            )}
            <h2 className="font-semibold text-xl font-poppins text-black">
              {job.Position}
            </h2>
          </div>

          {renderType(job?.Type)}
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <p className="text-lg font-poppins text-green-400">At</p>
          <Chip
            startContent={<IndianRupee size={18} />}
            variant="bordered"
            color="success"
            size="md"
            className="px-2"
          >
            <p className="text-sm font-poppins ">{job.Price}</p>
          </Chip>
        </div>
      </div>
      <div className=" flex flex-row gap-1 items-center mt-3">
        <p className="text-sm font-poppins text-black">{job.CompanyName}</p>
        <div className=" flex flex-row gap-1 items-center">
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
            {job.total_emp}+ Employees
          </p>
        </Chip>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <div className="w-full md:w-auto">{renderJobType(job.Status)}</div>
          <div className="w-full md:w-auto">{renderPriceTag(job.Price)}</div>
          <div className="w-full md:w-auto">
            {growinfFast(job.total_emp > 500 ? false : true)}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <Button
            color="primary"
            variant="bordered"
            onClick={() => onSave(job.Uuid)}
          >
            <p className="text-sm font-poppins text-blue-400">Save</p>
          </Button>
          <Button
            className={`rounded-lg p-4 ${backgroundColorClass}`}
            color={
              job.Status === "inactive" ||
              job.Status === "hired" ||
              job.Status === "closed"
                ? "danger"
                : "primary"
            }
            variant={
              job.Status === "inactive" ||
              job.Status === "hired" ||
              job.Status === "closed"
                ? "solid"
                : "flat"
            }
            onClick={() => onApply(job)}
            disabled={
              job.Status === "inactive" ||
              job.Status === "hired" ||
              job.Status === "closed"
                ? true
                : false
            }
          >
            <p className="text-sm font-poppins text-white capitalize">
              {job.Status === "inactive" ||
              job.Status === "hired" ||
              job.Status === "closed"
                ? job.Status
                : "Apply"}
            </p>
          </Button>
        </div>
      </div>

      <p className="text-sm font-poppins text-black mt-10 max-h-[20vh] overflow-auto">
        {formatText(job.Description)}
      </p>

      <p className="text-gray-700">
        Annual Salary: ₹{FormatToLakhs(job.MinPay)} - ₹
        {FormatToLakhs(job.MaxPay)}
      </p>
      <p className="text-xs mt-3 font-poppins text-black">
        Posted {postedDate}
      </p>
    </div>
  );
};

export default Card;
