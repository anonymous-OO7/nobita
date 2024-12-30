"use client";

import { GetAllAppliedJobsList } from "@/apis";
import useApi from "@/hooks/useApi";
import { Job } from "@/types";
import React, { useEffect, useState, useCallback } from "react";
import Card from "@/components/cards/ApplyCard";

const Applied = () => {
  const { makeApiCall } = useApi();
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <div className="container  mx-auto py-10">
        <p className="font-poppins font-light text-black text-2xl my-8">
          Applied referrals..
        </p>
        <div className="grid grid-cols-1 gap-4">
          {jobsInfo.map((job, index) => (
            <Card key={index} job={job} />
          ))}
        </div>
        {loading && <p className="text-center">Loading more jobs...</p>}
      </div>
    </div>
  );
};

export default Applied;
