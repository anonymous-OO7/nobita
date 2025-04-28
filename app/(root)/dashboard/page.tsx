"use client";

import { dummyJobResponses } from "@/assets/data/index"; // Likely unused, remove
import React, { useEffect, useState, useCallback } from "react";
import useApi from "@/hooks/useApi";
import useTokenCheck from "@/hooks/useTokenCheck";
import JobCard from "@/components/cards/JobCard";
import { GetAllJobsList, GetAllUserAppliedJobsList, SaveJobApi } from "@/apis";
import { Job } from "@/types";
import useToast from "@/hooks/useToast";
import JobApplicationModal from "@/components/pages/home/JobApply";
import { useDisclosure } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroller";
import PageLoader from "@/components/common/PageLoader";

const Home: React.FC = () => {
  useTokenCheck();
  const { makeApiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const itemsPerPage = 10; // Set a reasonable default limit
  const [hasMore, setHasMore] = useState(true);
  // const [records, setrecords] = useState(itemsPerPage); // Remove unused state

  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(1); // Initialize to 1
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(itemsPerPage); // Use a consistent limit
  const [search, setSearchValue] = React.useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = React.useState<string>(search);
  const [jobsInfo, setJobsInfo] = React.useState<Job[]>([]);
  const [applyingJob, setApplyingJobInfo] = React.useState<Job>();
  const [allAppliedJobs, setAllAppliedJobs] = React.useState<string[]>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const loadMore = () => {
    if (page < totalPages && !loading) {
      fetchJobsNextPageInfo(page, limit, debouncedSearch);
    }
  };

  const fetchJobsNextPageInfo = React.useCallback(
    (pageToFetch: number, limit: number, debouncedSearch: string) => {
      setLoading(true);
      return makeApiCall(
        GetAllJobsList(pageToFetch + 1, limit, debouncedSearch)
      ) // Increment page for API call
        .then((response) => {
          console.log(response, "next page jobs");
          if (response?.data != null) {
            setJobsInfo((prevJobs) => [...prevJobs, ...response?.data]);
            setTotalPages(response?.total_pages || 1); // Handle potential undefined
            setTotalItems(response?.total_items || 0);
            setPage((prevPage) => prevPage + 1);
            setHasMore(response?.total_pages > pageToFetch + 1); // Update hasMore based on total pages
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    },
    [makeApiCall, limit, debouncedSearch]
  );

  React.useEffect(() => {
    makeApiCall(GetAllUserAppliedJobsList())
      .then((response) => {
        console.log(response, "all applied jobs");
        setAllAppliedJobs(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [makeApiCall, debouncedSearch]);

  React.useEffect(() => {
    setLoading(true);
    setPage(0);
    setJobsInfo([]);
    setHasMore(true); // Reset hasMore
    makeApiCall(GetAllJobsList(1, limit, debouncedSearch)) // Fetch the first page
      .then((response) => {
        console.log(response, "response from all jobs");
        setJobsInfo(response?.data);
        setTotalPages(response?.total_pages || 1);
        setTotalItems(response?.total_items || 0);
        setHasMore(response?.total_pages > 1); // Check if there are more pages
        setPage(1); // Set page to 1 after fetching the first page
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [makeApiCall]); // Add dependencies for re-fetching on changes

  const saveJob = React.useCallback(
    (jobUuid: string) => {
      console.log("saving job", jobUuid);
      setLoading(true); // Indicate saving in progress
      return makeApiCall(SaveJobApi(jobUuid))
        .then((response) => {
          console.log(response, "saving job response!!");
          if (response !== undefined && response?.status === true) {
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
      if (allAppliedJobs?.includes(job?.Uuid)) {
        showToast("Already applied!!", { type: "info" });
      } else {
        setApplyingJobInfo(job);
        onOpen();
      }
    },
    [onOpen, allAppliedJobs]
  );

  return (
    <div>
      <JobApplicationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        applyingJob={applyingJob}
      />

      <div className="container  mx-auto pb-5">
        <p className="font-poppins font-semibold text-black text-2xl my-4">
          {/* Adjusted text size slightly for variety */}
          {/* Grouping "Get referred to over" and applying one color */}
          <span className="text-blue-600">Get referred to over</span>
          {/* Example color */}
          {/* Grouping "1000+ companies" and applying another color */}
          <span className="text-green-600"> 1000+ companies</span>
          {/* Example color */}
        </p>
        <p className="font-poppins font-normal text-black text-base my-4">
          Select a company you want a referral for, enter the URL for the job
          posting that you want, and send your profile off to our referrers!
        </p>

        <div className="grid grid-cols-1 gap-4">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore && !loading}
            loader={
              <div key={0} className="text-center">
                <PageLoader />
              </div>
            }
            useWindow={true} // Enable window scrolling
          >
            {jobsInfo?.map((job, index) => (
              <JobCard
                key={job.Uuid || index} // Use a unique identifier if available
                job={job}
                onSave={saveJob}
                onApply={onApplyJob}
                isApplied={allAppliedJobs?.includes(job?.Uuid) ? true : false}
              />
            ))}
          </InfiniteScroll>
          {jobsInfo?.length === 0 && !loading && (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
