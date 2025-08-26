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
import { useRouter, useSearchParams } from "next/navigation";
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

  const searchParams = useSearchParams(); // for reading URL params

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
  const jobListRef = useRef<HTMLDivElement>(null);

  // State for filters (example - update as per your filter keys & defaults)
  const [filters, setFilters] = useState<Record<string, any>>({
    workMode: [] as number[],
    department: [] as number[],
    location: [] as number[],
    salary: [] as number[],
    companyType: [] as number[],
    roleCategory: [] as number[],
    education: [] as number[],
    postedBy: [] as number[],
    industry: [] as number[],
    experienceMin: 0,
    experienceMax: 30,
    search: "",
  });

  // Sync filters & page from URL params on mount or URL change
  useEffect(() => {
    if (!searchParams) return;

    // Utility to parse array params as numbers
    const getNumbers = (key: string): number[] =>
      searchParams
        .getAll(key)
        .map((v) => Number(v))
        .filter((n) => !isNaN(n));

    setFilters({
      workMode: getNumbers("workMode"),
      department: getNumbers("department"),
      location: getNumbers("location"),
      salary: getNumbers("salary"),
      companyType: getNumbers("companyType"),
      roleCategory: getNumbers("roleCategory"),
      education: getNumbers("education"),
      postedBy: getNumbers("postedBy"),
      industry: getNumbers("industry"),
      experienceMin: Number(searchParams.get("experienceMin")) || 0,
      experienceMax: Number(searchParams.get("experienceMax")) || 30,
      search: searchParams.get("search") || "",
    });

    const pageFromUrl = Number(searchParams.get("page"));
    if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
      setCurrentPage(pageFromUrl);
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Load user applied jobs and credits once
  useEffect(() => {
    makeApiCall(GetAllUserAppliedJobsList())
      .then((res) => setAllAppliedJobs(res?.data || []))
      .catch(console.error);

    makeApiCall(GetAllUserCredits())
      .then((res) => setRemainingCredits(res?.credits_remaining || 0))
      .catch(console.error);
  }, [makeApiCall]);

  // Trigger API call when filters or pagination change
  useEffect(() => {
    setLoading(true);

    // Destructure needed filter keys and pass to API call
    const {
      workMode,
      department,
      location,
      salary,
      companyType,
      roleCategory,
      education,
      postedBy,
      industry,
      experienceMin,
      experienceMax,
      search,
    } = filters;

    makeApiCall(
      GetAllJobsList(currentPage, postsPerPage, search || "", {
        workMode,
        department,
        location,
        salary,
        companyType,
        roleCategory,
        education,
        postedBy,
        industry,
        experienceMin,
        experienceMax,
      })
    )
      .then((res) => {
        setJobsInfo(res?.data || []);
        setTotalItems(res?.total_items || 0);
        if ((res?.data || []).length > 0) {
          setSelectedJob(res!.data[0]);
        } else {
          setSelectedJob(null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [makeApiCall, currentPage, postsPerPage, filters]);

  // Update URL query params when currentPage or filters change
  useEffect(() => {
    // Convert filters object to URLSearchParams
    const searchParams = new URLSearchParams();

    searchParams.set("page", currentPage.toString());
    searchParams.set("limit", postsPerPage.toString());

    // Add search param if exists
    if (filters.search) {
      searchParams.set("search", filters.search);
    }

    // Add filter params - multi value params added repeatedly
    Object.entries(filters).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        key === "search" ||
        key === "page" ||
        key === "limit"
      )
        return;

      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.set(key, String(value));
      }
    });

    // Avoid redundant updates by checking current URL (optional)

    router.replace(`/dashboard?${searchParams.toString()}`, undefined);
  }, [filters, currentPage, postsPerPage, router]);

  // Handlers for updating filters; this depends on your UI implementation.
  // You should have filter components update `filters` state here.

  // Example: update single filter item
  const updateFilter = (key: string, values: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
    setCurrentPage(1); // reset to first page on filter change
  };

  // Other handlers: saveJob, onApplyJob, handleViewDetails remain unchanged

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
        console.log(job, "Applying job");
        setApplyingJobInfo(job);
        onOpen();
      }
    },
    [remainingCredits, allAppliedJobs, onOpen, router, showToast]
  );

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    console.log(job, "Selected job");
    setApplyingJobInfo(job);
    if (!isDesktop) {
      onOpen();
    }
  };

  // Your existing JSX rendering jobs, pagination, etc remains unchanged

  return (
    <div className="container mx-auto pb-5 px-4 sm:px-0">
      <JobApplicationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        applyingJob={applyingJob}
      />

      {isDesktop ? (
        <div className="flex  gap-4 mt-[6vh] h-[calc(100vh-150px)] bg-light">
          {/* Scrollable job list with ref */}

          <div ref={jobListRef} className="w-2/5 overflow-y-auto pr-2 ">
            <div className="space-y-4">
              <p className="text-sm font-poppins text-gray-600 mb-1">
                {`Total Recommended Jobs: ${totalItems * 250}`}
              </p>
              <p className="text-sm font-poppins text-gray-600 mb-3">
                {totalItems === 0 ? 0 : (currentPage - 1) * postsPerPage + 1} -{" "}
                {Math.min(currentPage * postsPerPage, totalItems)} of{" "}
                {totalItems * 250}
              </p>
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
          <div className="w-3/5 pl-4 overflow-y-auto">
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
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="flex flex-row justify-between">
                  <p className="text-xs font-poppins text-gray-600 mb-1">
                    {`Recommended Jobs: ${totalItems}`}
                  </p>
                  <p className="text-xs font-poppins text-gray-600 mb-1">
                    {totalItems === 0
                      ? 0
                      : (currentPage - 1) * postsPerPage + 1}{" "}
                    - {Math.min(currentPage * postsPerPage, totalItems)} of{" "}
                    {totalItems}
                  </p>
                </div>

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
