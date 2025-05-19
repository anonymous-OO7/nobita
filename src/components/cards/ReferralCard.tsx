import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Button, Chip, Avatar } from "@nextui-org/react";
import {
  CircleCheck,
  CircleX,
  LinkIcon,
  TagIcon,
  User2Icon,
} from "lucide-react";
import { CommunityReferral } from "@/types";

interface CardProps {
  referral: CommunityReferral;
  giveReferral: (referral: CommunityReferral) => void;
}

const MAX_TEXT_LENGTH = 150;

const ReferralCard: React.FC<CardProps> = ({ referral, giveReferral }) => {
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const [showFullCoverLetter, setShowFullCoverLetter] = React.useState(false);

  const postedDate = formatDistanceToNow(new Date(referral.CreatedAt), {
    addSuffix: true,
  });

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

  const openLinkInNewTab = (url: string) => {
    if (url) window.open(url, "_blank");
    else console.error("No URL provided.");
  };

  const getTrimmedText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + "...";

  const sendReferralQueryrequest = React.useCallback(() => {
    console.log("submitting referral request");
    giveReferral(referral);
  }, []);

  return (
    <div className="p-4 shadow-md rounded-md mb-4 border bg-white">
      {/* Top Section */}
      <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-row items-center gap-4">
          <Avatar
            src={referral.company?.logo_url}
            alt={referral.company?.name}
            size="lg"
            radius="sm"
          />
          <div>
            <h2 className="text-xl font-semibold font-poppins text-black">
              {referral.job_role}
            </h2>
            <p className="text-sm text-gray-600">{referral.company?.name}</p>
          </div>
        </div>
        {renderStatusChip(referral.status)}
      </div>

      {/* Middle Section */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Cover Letter */}
        {referral.cover_letter && (
          <div>
            <p className="text-sm font-semibold text-gray-700">Cover Letter:</p>
            <p className="text-sm font-poppins text-black mt-1">
              {showFullCoverLetter
                ? referral.cover_letter
                : getTrimmedText(referral.cover_letter, MAX_TEXT_LENGTH)}
            </p>
            {referral.cover_letter.length > MAX_TEXT_LENGTH && (
              <Button
                variant="light"
                size="sm"
                className="px-1 text-blue-500 mt-1"
                onClick={() => setShowFullCoverLetter(!showFullCoverLetter)}
              >
                {showFullCoverLetter ? "View Less" : "View More"}
              </Button>
            )}
          </div>
        )}

        {/* Description */}
        {referral.description && (
          <div>
            <p className="text-sm font-semibold text-gray-700">Description:</p>
            <p className="text-sm font-poppins text-black mt-1">
              {showFullDescription
                ? referral.description
                : getTrimmedText(referral.description, MAX_TEXT_LENGTH)}
            </p>
            {referral.description.length > MAX_TEXT_LENGTH && (
              <Button
                variant="light"
                size="sm"
                className="px-1 text-blue-500 mt-1"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "View Less" : "View More"}
              </Button>
            )}
          </div>
        )}

        {referral.amount && (
          <div>
            <p className="text-sm font-semibold text-gray-700">
              Offered Amount:
            </p>
            <p className="text-lg font-poppins text-black mt-1">
              <Chip variant="flat" color="success" size="sm">
                ₹{referral.amount}
              </Chip>
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center gap-3 mb-1">
          <User2Icon size={18} color="black" />
          <p className="text-sm font-semibold text-gray-700">
            Requested by{" "}
            <span className="text-black">{referral.profile?.name}</span>
          </p>
        </div>
        <p className="text-xs text-gray-500 font-poppins">
          {/* Email: {referral.Owner?.Email || "N/A"} */}
          {/* {referral.Owner?.Phone || "N/A"} */}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-row justify-start items-center gap-3 flex-wrap">
        {referral?.job_link && (
          <Button
            onClick={() => openLinkInNewTab(referral?.job_link)}
            className="text-blue-500"
            variant="flat"
            size="sm"
          >
            <LinkIcon size={18} />
            <span className="ml-1 text-sm font-poppins text-blue-500">
              View Job
            </span>
          </Button>
        )}

        <Button
          color="success"
          variant="bordered"
          size="sm"
          onClick={sendReferralQueryrequest}
        >
          <span className="text-sm font-poppins text-black">Give Referral</span>
        </Button>

        {referral.profile.uuid == localStorage.getItem("uuid") ? (
          <Button color="danger" variant="bordered" size="sm">
            <span className="text-sm font-poppins text-red-700">Delete</span>
          </Button>
        ) : null}
      </div>

      {/* Footer */}
      <p className="text-xs mt-3 font-poppins text-gray-500">
        Requested {postedDate}
      </p>
    </div>
  );
};

export default ReferralCard;
