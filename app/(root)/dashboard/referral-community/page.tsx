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

  // const [page, setPage] = useState(0); // page state seems unused
  const { showToast } = useToast();
  const router = useRouter();

  // State to hold the list of community referrals
  const [referralsList, setReferralsList] = React.useState<CommunityReferral[]>(
    []
  ); // Renamed jobsInfo to referralsList for clarity

  // Fetch community referrals on component mount
  React.useEffect(() => {
    setLoading(true);
    // Assuming GetAllCommunityReferralsJobsList fetches the CommunityReferral data
    makeApiCall(GetAllCommunityReferralsJobsList())
      .then((response: any) => {
        // Use any if response structure is not strictly typed yet
        console.log(response, "response from all community referrals jobs");
        // Assuming the list of referrals is in response.data
        if (response?.data && Array.isArray(response.data)) {
          setReferralsList(response.data);
        } else {
          console.error("API did not return an array of referrals:", response);
          setReferralsList([]); // Set to empty array if data is not as expected
        }
      })
      .catch((error) => {
        console.error("Error fetching community referrals:", error);
        showToast("Failed to load referrals.", { type: "error" }); // Show error toast
      })
      .finally(() => setLoading(false));
  }, [makeApiCall, showToast]); // Added showToast to dependency array

  // Handler for deleting a referral (needs implementation)
  const handleDeleteReferral = React.useCallback(
    (uuid: string) => {
      // Implement the API call to delete the referral with the given uuid
      console.log("Attempting to delete referral with uuid:", uuid);
      // Example placeholder:
      // makeApiCall(DeleteCommunityReferralApi(uuid))
      //   .then(() => {
      //     showToast("Referral deleted successfully.", { type: "success" });
      //     // Update the list by removing the deleted referral
      //     setReferralsList(prevList => prevList.filter(r => r.uuid !== uuid));
      //   })
      //   .catch(error => {
      //     console.error("Error deleting referral:", error);
      //     showToast("Failed to delete referral.", { type: "error" });
      //   });
      showToast("Delete functionality not implemented yet.", { type: "info" });
    },
    [makeApiCall, showToast] // Add DeleteCommunityReferralApi to dependencies when implemented
  );

  const giveReferral = React.useCallback(
    (referral: CommunityReferral) => {
      console.log("community referral:", referral);
      setApplyingReferralInfo(referral);
      onOpen();
    },
    [onOpen]
  );

  // Navigation handler to the "Ask Referral" page
  const navigateToAskReferral = React.useCallback(() => {
    router.push("/dashboard/referral-community/referral-ask"); // Use push instead of replace if you want back navigation
  }, [router]);

  return (
    <div>
      <div className="container mx-auto py-10 px-4">
        <ReferralQueryModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          applyingReferral={applyingReferral}
        />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-poppins  text-2xl my-8">
              <span className="text-blue-600 font-poppins mr-3">
                Get referred.
              </span>
              <span className="text-green-600 font-poppins mr-3">
                Get noticed.
              </span>
              <span className="text-purple-600 font-poppins">Get hired.</span>
            </p>
            <p className="font-poppins font-normal text-black text-base my-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referralsList.map((referral, index) => (
              <ReferralCard referral={referral} giveReferral={giveReferral} />
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
