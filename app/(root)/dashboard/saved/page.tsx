"use client";

import { GetAllSavedJobsList, RemoveSaveJobApi } from "@/apis";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { Job } from "@/types";
import React, { useEffect, useState, useCallback } from "react";
import SaveCard from "@/components/cards/SavedCard";

const Saved = () => {
  const { makeApiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { showToast } = useToast();

  const [jobsInfo, setJobsInfo] = React.useState<Job[]>([]);

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllSavedJobsList())
      .then((response) => {
        console.log(response, "response from saved jobs");
        setJobsInfo(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  const saveJob = React.useCallback(
    (jobUuid: string) => {
      console.log("saving job", jobUuid);
      return makeApiCall(RemoveSaveJobApi(jobUuid))
        .then((response) => {
          console.log(response, "saving job response!!");
          if (response !== undefined && response?.status == true) {
            showToast("Job unsaved successfully!!", { type: "success" });
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );
  return (
    <div>
      <div className="container  mx-auto py-10">
        <p className="font-poppins font-light text-black text-2xl my-8">
          Saved referrals..
        </p>
        <div className="grid grid-cols-1 gap-4">
          {jobsInfo?.map((job, index) => (
            <SaveCard
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

export default Saved;
