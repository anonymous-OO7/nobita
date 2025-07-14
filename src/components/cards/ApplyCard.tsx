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
}

const Card: React.FC<CardProps> = ({ job }) => {
  // const postedDate = formatDistanceToNow(new Date(job.CreatedAt), {
  //   addSuffix: true,
  // });
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

  return (
    <div className="p-4  shadow-md rounded-md mb-4 border">
      <div className=" flex flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-start sm:items-center">
          <div className="flex flex-row items-center gap-2">
            {job?.Company.logo_url && job?.Company?.logo_url != "" ? (
              <Image
                src={job?.Company?.logo_url}
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
          <Chip variant="bordered" color="success" size="md" className="px-2">
            <p className="text-sm font-poppins ">Application Sent</p>
          </Chip>
        </div>
      </div>
      <div className=" flex flex-row gap-1 items-center mt-3">
        <p className="text-sm font-poppins text-black">{job.Company.name}</p>
        <div className=" flex flex-row gap-1 items-center">
          <CiLocationOn className="h-4 w-4 text-black" />
          <p className="text-xs font-poppins text-black">{job.Location}</p>
        </div>
      </div>

      <p className="text-gray-700">
        {FormatToLakhs(job.MinPay)} - {FormatToLakhs(job.MaxPay)} INR/pa
      </p>
      <p className="text-xs mt-3 font-poppins text-black">Posted</p>
    </div>
  );
};

export default Card;
