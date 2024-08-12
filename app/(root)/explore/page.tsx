"use client";

import { GetAllAppliedJobsList } from "@/apis";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { Job } from "@/types";
import React, { useEffect, useState, useCallback } from "react";
import JobCard from "@/components/cards/JobCard";

const Explore = () => {
  const { makeApiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { showToast } = useToast();

  const [jobsInfo, setJobsInfo] = React.useState<Job[]>([]);

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllAppliedJobsList())
      .then((response) => {
        console.log(response, "response from applied jobs");
        setJobsInfo(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  const saveJob = React.useCallback((jobUuid: string) => {
    console.log("saving job", jobUuid);
  }, []);

  return (
    <div>
      <div className="container  mx-auto py-10">
        <p className="font-poppins font-light text-black text-2xl my-8">
          Applied referrals..
        </p>
        <div className="grid grid-cols-1 gap-4">
          {jobsInfo.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              onSave={saveJob}
              onApply={() => {}}
            />
          ))}
        </div>
        {loading && <p className="text-center">Loading more jobs...</p>}
      </div>
    </div>
  );
};

export default Explore;
