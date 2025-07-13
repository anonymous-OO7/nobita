"use client";

import {
  GetAllCommunityReferralsJobsList,
  GetAllSavedJobsList,
  GetAllUserAppliedJobsList,
  GetAllUserCredits,
  SaveJobApi,
} from "@/apis";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { CommunityReferral, Job } from "@/types"; // Ensure CommunityReferral type is correctly imported from "@/types"
import React, { useEffect, useState, useCallback } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ReferralCard from "@/components/cards/ReferralCard"; // Import the updated ReferralCard
import PageLoader from "@/components/common/PageLoader";
import ReferralQueryModal from "@/components/pages/communityreferral/ReferralQueryApply";
import { useDisclosure } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import JobApplicationModal from "@/components/pages/home/JobApply";
import JobCard from "@/components/cards/JobCard";
import Pagination from "@/components/pages/home/Pagination";
import JobInfoPage from "@/components/cards/JobInfoPage";
import ActiveRentals from "../myjobs/page";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isDesktop;
};

const ReferralCommunity = () => {
  const { makeApiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [applyingReferral, setApplyingReferralInfo] =
    React.useState<CommunityReferral>();
  const [selected, setSelected] = React.useState<React.Key>("referrals-tab");

  const { showToast } = useToast();
  const router = useRouter();

  const [referralsList, setReferralsList] = React.useState<CommunityReferral[]>(
    []
  );

  const isDesktop = useIsDesktop(); // same as in Home.tsx

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  const [allAppliedJobs, setAllAppliedJobs] = useState<string[]>([]);
  const [remainingCredits, setRemainingCredits] = useState<number>(0);
  const [applyingJob, setApplyingJobInfo] = useState<Job | undefined>();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    makeApiCall(GetAllUserAppliedJobsList())
      .then((res) => setAllAppliedJobs(res?.data || []))
      .catch(console.error);
  }, [makeApiCall]);

  useEffect(() => {
    makeApiCall(GetAllUserCredits())
      .then((res) => setRemainingCredits(res?.credits_remaining || 0))
      .catch(console.error);
  }, [makeApiCall]);

  useEffect(() => {
    if (selected === "referrals-tab") {
      setLoading(true);
      makeApiCall(GetAllSavedJobsList())
        .then((res) => {
          setSavedJobs(res?.data || []);
          setTotalItems(res?.total_items || 0);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [selected, currentPage, postsPerPage, makeApiCall]);

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

  const saveJob = useCallback(
    (uuid: string) => {
      setLoading(true);
      makeApiCall(SaveJobApi(uuid))
        .then((res) => {
          if (res?.status) showToast("Job saved!", { type: "success" });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const onApplyJob = useCallback(
    (job: Job) => {
      if (remainingCredits <= 0) {
        showToast("No credits left!", { type: "error" });
      } else if (allAppliedJobs.includes(job.Uuid)) {
        showToast("Already applied!", { type: "info" });
      } else {
        setApplyingJobInfo(job);
        onOpen();
      }
    },
    [remainingCredits, allAppliedJobs, onOpen, showToast]
  );

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    if (!isDesktop) {
      onOpen();
    }
  };

  return (
    <div>
      <div className="container mx-auto py-10 px-4">
        <ReferralQueryModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          applyingReferral={applyingReferral}
        />

        <Tabs
          aria-label="Options"
          selectedKey={selected.toString()}
          onSelectionChange={setSelected}
          // className="bg-slate-400"
          variant={"underlined"}
          color="success"
        >
          <Tab key="referrals-tab" title="Referrals">
            <JobApplicationModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              applyingJob={applyingJob}
            />

            {isDesktop ? (
              <div className="flex gap-4 mt-[6vh] h-[calc(100vh-150px)]">
                {/* Job list */}
                <div className="w-2/5 overflow-y-auto pr-2">
                  <div className="space-y-4">
                    {savedJobs.map((job) => (
                      <JobCard
                        key={job.Uuid}
                        job={job}
                        onSave={saveJob}
                        onApply={onApplyJob}
                        isApplied={allAppliedJobs.includes(job.Uuid)}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                    {savedJobs.length === 0 && !loading && (
                      <p className="text-center text-gray-500 text-sm sm:text-base">
                        No saved jobs to refer.
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <Pagination
                      totalPosts={totalItems}
                      postsPerPage={postsPerPage}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>

                {/* Job detail */}
                <div className="w-3/5 pl-4 overflow-y-auto">
                  {selectedJob ? (
                    <JobInfoPage job={selectedJob} />
                  ) : (
                    <p className="text-center text-gray-500 mt-10">
                      Select a job to view details
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <>
                {loading ? (
                  <div className="text-center">
                    <PageLoader />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      {savedJobs.map((job) => (
                        <JobCard
                          key={job.Uuid}
                          job={job}
                          onSave={saveJob}
                          onApply={onApplyJob}
                          isApplied={allAppliedJobs.includes(job.Uuid)}
                          onViewDetails={handleViewDetails}
                        />
                      ))}
                      {savedJobs.length === 0 && (
                        <p className="text-center text-gray-500 text-sm sm:text-base">
                          No saved jobs to refer.
                        </p>
                      )}
                    </div>
                    <Pagination
                      totalPosts={totalItems}
                      postsPerPage={postsPerPage}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </>
                )}
              </>
            )}
          </Tab>

          <Tab key="community-tab" title="Community">
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
          </Tab>

          <Tab key="myreferral-tab" title="My Listings">
            <ActiveRentals />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ReferralCommunity;
