"use client";

import {
  GetAllCommunityReferralsJobsList,
  GetAllSavedJobsList,
  RemoveSaveJobApi,
  SendReferralQueryAPI,
} from "@/apis";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { CommunityReferral, Job } from "@/types"; // Ensure CommunityReferral type is correctly imported from "@/types"
import React, { useEffect, useState, useCallback } from "react";
import SaveCard from "@/components/cards/SavedCard"; // Assuming this is not needed for this component
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ReferralCard from "@/components/cards/ReferralCard"; // Import the updated ReferralCard
import PageLoader from "@/components/common/PageLoader";
import ReferralQueryModal from "@/components/pages/communityreferral/ReferralQueryApply";
import { useDisclosure } from "@nextui-org/react";

const Saved = () => {
  const { makeApiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [applyingReferral, setApplyingReferralInfo] =
    React.useState<CommunityReferral>();

  const { showToast } = useToast();
  const router = useRouter();

  const [referralsList, setReferralsList] = React.useState<CommunityReferral[]>(
    []
  );

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllCommunityReferralsJobsList())
      .then((response: any) => {
        if (response?.data && Array.isArray(response.data)) {
          setReferralsList(response.data);
        } else {
          setReferralsList([]);
        }
      })
      .catch((error) => {
        showToast("Failed to load referrals.", { type: "error" });
      })
      .finally(() => setLoading(false));
  }, [makeApiCall, showToast]);

  const giveReferral = React.useCallback(
    (referral: CommunityReferral) => {
      setApplyingReferralInfo(referral);
      onOpen();
    },
    [onOpen]
  );

  const navigateToAskReferral = React.useCallback(() => {
    router.push("/dashboard/referral-community/referral-ask");
  }, [router]);

  return (
    <div>
      <div className="container mx-auto py-10 px-4">
        <ReferralQueryModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          applyingReferral={applyingReferral}
        />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <p className="font-poppins text-2xl">
              <span className="text-blue-600">Get referred.</span>
              <span className="text-green-600">Get noticed.</span>
              <span className="text-purple-600">Get hired.</span>
            </p>
            <p className="font-poppins text-base text-black mt-4">
              List your profile on the referral marketplace and allow any of our
              referrers on Workist to refer you to their companies.
            </p>
          </div>

          <Button onClick={navigateToAskReferral} color="secondary">
            Ask referral
          </Button>
        </div>

        {loading ? (
          <>
            <p className="text-center text-gray-600">Loading...</p>
            <PageLoader />
          </>
        ) : referralsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
            {referralsList.map((referral, index) => (
              <ReferralCard
                key={index}
                referral={referral}
                giveReferral={giveReferral}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No community referral requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Saved;
