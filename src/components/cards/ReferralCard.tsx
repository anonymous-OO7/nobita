import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Button, Chip } from "@nextui-org/react";
import {
  CircleCheck,
  CircleX,
  LinkIcon,
  BriefcaseIcon,
  TagIcon,
} from "lucide-react";
import { CommunityReferral } from "@/types";

interface CardProps {
  referral: CommunityReferral;
  // Added the handler for viewing the job link
}

const ReferralCard: React.FC<CardProps> = ({ referral }) => {
  // Format the creation date
  const postedDate = formatDistanceToNow(new Date(referral.CreatedAt), {
    addSuffix: true,
  });

  // Helper function to render status chip
  const renderStatusChip = React.useCallback((status: string) => {
    switch (status) {
      case "active":
        return (
          <Chip
            startContent={<CircleCheck size={18} />}
            variant="flat"
            color="success"
            size="sm"
          >
            Active
          </Chip>
        );
      case "pending":
        return (
          <Chip
            startContent={<TagIcon size={18} />}
            variant="flat"
            color="warning"
            size="sm"
          >
            Pending
          </Chip>
        );
      case "inactive":
      case "closed":
        return (
          <Chip
            startContent={<CircleX size={18} />}
            color="danger"
            variant="flat"
            size="sm"
          >
            Inactive
          </Chip>
        );
      default:
        return (
          <Chip variant="flat" color="default" size="sm">
            Unknown Status
          </Chip>
        );
    }
  }, []);

  function openLinkInNewTab(url: string) {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("No URL provided to open.");
    }
  }
  return (
    <div className="p-4 shadow-md rounded-md mb-4 border">
      <div className=" flex flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-start sm:items-center">
          <div className="flex flex-row items-center gap-2">
            <BriefcaseIcon color="black" size={30} />
            <h2 className="font-semibold text-xl font-poppins text-black">
              {referral.job_role}
            </h2>
          </div>
          {renderStatusChip(referral.status)}
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          {referral?.job_link && (
            <Button
              // Added onClick handler to call the onViewJobLink prop
              onClick={() => openLinkInNewTab(referral?.job_link)}
              className="text-blue-500"
              variant="flat"
              size="sm"
            >
              <LinkIcon size={18} />
              <p className="text-sm text-blue-500 font-poppins">View Job</p>
            </Button>
          )}

          {/* Assuming delete functionality is handled by a prop */}

          <Button color="danger" variant="bordered" size="sm">
            <p className="text-sm font-poppins text-red-700">Delete</p>
          </Button>
        </div>
      </div>

      {referral.cover_letter && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700">Cover Letter:</p>
          <p className="text-sm font-poppins text-black mt-1">
            {referral.cover_letter}
          </p>
        </div>
      )}
      {referral.description && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700">Description:</p>
          <p className="text-sm font-poppins text-black mt-1">
            {referral.description}
          </p>
        </div>
      )}

      <p className="text-xs mt-3 font-poppins text-gray-500">
        Requested {postedDate}
      </p>
    </div>
  );
};

export default ReferralCard;
