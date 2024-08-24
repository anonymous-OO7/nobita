"use client";

import { dummyJobResponses } from "@/assets/data/index";
import React, { useEffect, useState, useCallback } from "react";
import useApi from "@/hooks/useApi";
import useTokenCheck from "@/hooks/useTokenCheck";
import JobCard from "@/components/cards/JobCard";
import { GetAllJobsList, SaveJobApi } from "@/apis";
import { Job } from "@/types";
import useToast from "@/hooks/useToast";
import JobApplicationModal from "@/components/pages/home/JobApply";
import { useDisclosure } from "@nextui-org/react";

const Home: React.FC = () => {
  useTokenCheck();
  const { makeApiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(dummyJobResponses);
  const [page, setPage] = useState(0);
  const { showToast } = useToast();

  const [jobsInfo, setJobsInfo] = React.useState<Job[]>([]);
  const [applyingJob, setApplyingJobInfo] = React.useState<Job>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllJobsList())
      .then((response) => {
        console.log(response, "response from all jobs");
        setJobsInfo(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  const saveJob = React.useCallback(
    (jobUuid: string) => {
      console.log("saving job", jobUuid);
      return makeApiCall(SaveJobApi(jobUuid))
        .then((response) => {
          console.log(response, "saving job response!!");
          if (response !== undefined && response?.status == true) {
            showToast("Job saved successfully!!", { type: "success" });
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const onApplyJob = React.useCallback(
    (job: Job) => {
      console.log("applying job", job);
      setApplyingJobInfo(job);
      onOpen();
    },
    [onOpen]
  );

  return (
    <div>
      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        applyingJob={applyingJob}
      />

      <div className="container  mx-auto py-10">
        <p className="font-poppins font-light text-black text-2xl my-8">
          Find your referrals..
        </p>

        <div className="grid grid-cols-1 gap-4">
          {jobsInfo.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              onSave={saveJob}
              onApply={onApplyJob}
            />
          ))}
        </div>
        {loading && <p className="text-center">Loading more jobs...</p>}
      </div>
    </div>
  );
};

export default Home;
