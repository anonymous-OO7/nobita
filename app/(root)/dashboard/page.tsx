"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import useApi from "@/hooks/useApi";
import useTokenCheck from "@/hooks/useTokenCheck";
import JobCard from "@/components/cards/JobCard";
import {
  GetAllJobsList,
  GetAllUserAppliedJobsList,
  GetAllUserCredits,
  SaveJobApi,
} from "@/apis";
import { Job } from "@/types";
import useToast from "@/hooks/useToast";
import JobApplicationModal from "@/components/pages/home/JobApply";
import { useDisclosure } from "@nextui-org/react";
import PageLoader from "@/components/common/PageLoader";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pages/home/Pagination";
import JobInfoPage from "@/components/cards/JobInfoPage";

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

const Home: React.FC = () => {
  useTokenCheck();
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isDesktop = useIsDesktop();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  const [jobsInfo, setJobsInfo] = useState<Job[]>([]);
  const [allAppliedJobs, setAllAppliedJobs] = useState<string[]>([]);
  const [remainingCredits, setRemainingCredits] = useState<number>(0);
  const [applyingJob, setApplyingJobInfo] = useState<Job>();

  // Ref for scrolling job list container
  const jobListRef = useRef<HTMLDivElement>(null);

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
    setLoading(true);
    makeApiCall(GetAllJobsList(currentPage, postsPerPage, ""))
      .then((res) => {
        setJobsInfo(res?.data || []);
        setTotalItems(res?.total_items || 0);
        // Optionally set first job on initial fetch
        if ((res?.data || []).length > 0) {
          setSelectedJob(res!.data[0]);
        } else {
          setSelectedJob(null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [makeApiCall, currentPage, postsPerPage]);

  // Scroll to top and auto-select first job on page or jobsInfo change
  useEffect(() => {
    if (jobListRef.current) {
      jobListRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (jobsInfo.length > 0) {
      setSelectedJob(jobsInfo[0]);
    } else {
      setSelectedJob(null);
    }
  }, [currentPage, jobsInfo]);

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
        router.replace("/pricing");
        showToast("No credits left!", { type: "error" });
      } else if (allAppliedJobs.includes(job.Uuid)) {
        showToast("Already applied!", { type: "info" });
      } else {
        setApplyingJobInfo(job);
        onOpen();
      }
    },
    [remainingCredits, allAppliedJobs, onOpen, router, showToast]
  );

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    if (!isDesktop) {
      onOpen();
    }
  };

  return (
    <div className="container mx-auto pb-5 px-4 sm:px-0">
      <JobApplicationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        applyingJob={applyingJob}
      />

      {isDesktop ? (
        <div className="flex gap-4 mt-[6vh] h-[calc(100vh-150px)]">
          {/* Scrollable job list with ref */}
          <div ref={jobListRef} className="w-2/5 overflow-y-auto pr-2">
            <div className="space-y-4">
              {jobsInfo.map((job) => (
                <JobCard
                  key={job.Uuid}
                  job={job}
                  onSave={saveJob}
                  onApply={onApplyJob}
                  isApplied={allAppliedJobs.includes(job.Uuid)}
                  onViewDetails={handleViewDetails}
                />
              ))}
              {jobsInfo.length === 0 && (
                <p className="text-center text-gray-500 text-sm sm:text-base">
                  No jobs found.
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

          {/* Static job detail section */}
          <div className="w-3/5 pl-4 overflow-y-auto ">
            {selectedJob ? (
              <JobInfoPage
                job={selectedJob}
                onApply={onApplyJob}
                isApplied={allAppliedJobs.includes(selectedJob.Uuid)}
              />
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
                {jobsInfo.map((job) => (
                  <JobCard
                    key={job.Uuid}
                    job={job}
                    onSave={saveJob}
                    onApply={onApplyJob}
                    isApplied={allAppliedJobs.includes(job.Uuid)}
                    onViewDetails={handleViewDetails}
                  />
                ))}
                {jobsInfo.length === 0 && (
                  <p className="text-center text-gray-500 text-sm sm:text-base">
                    No jobs found.
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
    </div>
  );
};

export default Home;
