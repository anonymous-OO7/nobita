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
          setJobsInfo((prevJobs) => [...prevJobs, ...response.data]);
          setTotalPages(response?.total_pages || 1); // Handle potential undefined
          setTotalItems(response?.total_items || 0);
          setPage((prevPage) => prevPage + 1);
          setHasMore(response?.total_pages > pageToFetch + 1); // Update hasMore based on total pages
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
  // Remove unused showItems function
  // const showItems = (posts) => {
  //   var items = [];
  //   for (var i = 0; i < records; i++) {
  //     items.push(
  //       <div className="post" key={posts[i].id}>
  //         <h3>{`${posts[i].name} - ${posts[i].id}`}</h3>
  //         <p>{posts[i].body}</p>
  //       </div>
  //     );
  //   }
  //   return items;
  // };

  const fetchAndUpdateBaseURL = async () => {
    try {
      console.log("calling  hosted url file ");

      const response = await fetch(
        "https://raw.githubusercontent.com/anonymous-OO7/assets/refs/heads/master/workisturl.txt"
      );
      console.log(response, "Response from hosted url file ");

      if (response.ok) {
        const url = await response.text();
        console.log(url, "Response from hosted url file ");

        localStorage.setItem("baseOnePieceURL", url.trim());
        return url.trim();
      } else {
        console.error("Failed to fetch base URL from text file.");
        return "https://f302-180-151-24-73.ngrok-free.app/"; // Provide a default URL in case of failure
      }
    } catch (error) {
      console.error("Error fetching base URL:", error);
      return "https://f302-180-151-24-73.ngrok-free.app/"; // Provide a default URL in case of error
    }
  };

  React.useEffect(() => {
    const updateBaseURL = async () => {
      await fetchAndUpdateBaseURL(); // Fetch URL on initial load
    };

    updateBaseURL();
  }, []);

  // Remove the manual scroll listener as InfiniteScroll handles it
  // const handleScroll = useCallback(() => {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [handleScroll]);

  // Fetch initial jobs on component mount
  React.useEffect(() => {
    setLoading(true);
    setPage(0); // Reset page on initial load
    setJobsInfo([]); // Clear existing jobs
    setHasMore(true); // Reset hasMore
    makeApiCall(GetAllJobsList(1, limit, debouncedSearch)) // Fetch the first page
      .then((response) => {
        console.log(response, "response from all jobs");
        setJobsInfo(response.data);
        setTotalPages(response?.total_pages || 1);
        setTotalItems(response?.total_items || 0);
        setHasMore(response?.total_pages > 1); // Check if there are more pages
        setPage(1); // Set page to 1 after fetching the first page
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [makeApiCall, limit, debouncedSearch]); // Add dependencies for re-fetching on changes

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

      <div className="container  mx-auto pb-5">
        <p className="font-poppins font-normal text-black text-2xl my-8">
          Find your referrals..
        </p>

        <div className="grid grid-cols-1 gap-4">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore && !loading} // Disable loadMore while loading
            loader={
              <div key={0} className="text-center">
                {loading ? "Loading more jobs..." : "Loading initial jobs..."}
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
        {/* Remove redundant loading message */}
        {/* {loading && (
          <p className="text-center text-black font-poppins font-normal">
            Loading more jobs...
          </p>
        )} */}
      </div>
    </div>
  );
};

export default Home;
