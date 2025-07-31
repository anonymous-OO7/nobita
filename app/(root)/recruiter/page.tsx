"use client";

import { GetRecruiterDashboardApi } from "@/apis";
import Button from "@/components/Button";
import useApi from "@/hooks/useApi";
import { Job, Company } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

const dummyJobs: Job[] = [
  {
    ID: 1,
    CreatedAt: "2025-07-10T00:00:00Z",
    UpdatedAt: "2025-07-10T00:00:00Z",
    DeletedAt: null,
    UserID: 0,
    Status: "Active",
    Uuid: "uuid-1",
    CompanyCode: "TN001",
    Position: "Frontend Developer",
    Location: "Remote",
    Type: "Full-Time",
    Description: "",
    Field: "",
    Owner: "owner-uuid",
    MinPay: 0,
    MaxPay: 0,
    Price: 0,
    Currency: "USD",
    HideSalary: false,
    MinExperience: 0,
    MaxExperience: 0,
    ExperienceText: "",
    Remote: true,
    Hybrid: false,
    WalkIn: false,
    EducationDoesNotMatter: false,
    EducationUG: "",
    EducationPG: "",
    EducationPPG: "",
    EducationDegreeCombo: "",
    EducationBTechPremium: false,
    EducationMbaPremium: false,
    EducationPremiumProcessed: false,
    EducationLabel: "",
    EducationIsSchool: false,
    Category: "",
    Skills: "",
    Tags: "",
    GroupID: 0,
    Vacancy: 0,
    Mode: "",
    Board: "",
    SourceCreatedDate: 0,
    ViewCount: 0,
    ApplyCount: 0,
    HideApplyButton: false,
    ShowRecruiterDetail: false,
    FooterLabel: "",
    FooterColor: "",
    ShowMultipleApply: false,
    JobUrl: "",
    ApplyRedirectUrl: "",
    BrandedJd: "",
    Company: {
      ID: 1,
      CreatedAt: "2020-01-01T00:00:00Z",
      UpdatedAt: "2025-07-10T00:00:00Z",
      DeletedAt: null,
      uuid: "comp-uuid-1",
      code: "TN001",
      name: "TechNova",
      description: "",
      industry: "",
      company_size: "",
      logo_url: "",
      website_url: "",
      social_media_links: "",
      location: "New York",
      headquarters_address: "",
      contact_email: "",
      contact_phone: "",
      founded_date: "",
      company_culture: "",
      benefits: "",
      reviews_count: 0,
      aggregate_rating: 0,
      reviews_url: "",
      glassdoor_url: "",
      subscription_plan: "",
      status: "",
      uploaded_by: "",
      tech_stack: "",
      hiring_status: "",
      last_funding_round: "",
      employee_growth_rate: 0,
    },
  },
];

const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-6 flex items-start space-x-4 border border-primary/30 shadow-sm">
    <div className="text-primary text-4xl flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
);

const Home: React.FC = () => {
  const router = useRouter();
  const { makeApiCall } = useApi();

  // Assuming the user is a recruiter; replace with your app's logic for auth/role
  const isRecruiter = true;

  const navigateToPostJob = React.useCallback(() => {
    router.push("/recruiter/submit");
  }, [router]);

  const [loading, setLoading] = React.useState(false);
  const [recentJobs, setRecentJobs] = React.useState<Job[]>([]);
  const [companies, setCompanies] = React.useState<Company[]>([]);
  const [totalJobs, setTotalJobs] = React.useState<number>(0);

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetRecruiterDashboardApi())
      .then((response: any) => {
        if (response) {
          setRecentJobs(response.recent_jobs || []);
          setCompanies(response.companies || []);
          setTotalJobs(response.total_jobs ?? 0);
        }
      })
      .catch((error: Error) => {
        console.error("Error loading recruiter dashboard data:", error);
      })
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  return (
    <div className="min-h-screen px-4 py-6 mt-10 sm:px-10 bg-background text-foreground">
      {/* Header with Post Job button */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your recent activity and recruitment status
          </p>
        </div>

        {isRecruiter && (
          <Button
            className="bg-blue-900 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-md font-poppins font-normal"
            onClick={navigateToPostJob}
          >
            Post Job
          </Button>
        )}
      </div>

      {/* Highlight Banner */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-center space-x-6">
            {/* Gift Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8M12 12V6m0 0a3 3 0 013-3 3 3 0 00-3 3zm0 0a3 3 0 00-3-3 3 3 0 013 3z"
              />
            </svg>
            <div>
              <h2 className="text-3xl font-bold">
                Free Unlimited Job Postings
              </h2>
              <p className="text-lg max-w-lg mt-2">
                Post as many jobs as you want with zero limits — find the right
                candidates quickly and grow your team.
              </p>
            </div>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1484/1484886.png"
            alt="Hiring illustration"
            className="w-40 h-40 hidden md:block object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Recent Job Postings */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">Recent Job Postings</h2>
            {loading ? (
              <ul className="space-y-3 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <li
                    key={i}
                    className="h-12 bg-muted rounded flex flex-col justify-center px-4 w-full"
                  >
                    <div className="h-4 bg-muted-foreground rounded w-1/2 mb-1" />
                    <div className="h-3 bg-muted-foreground rounded w-1/3" />
                  </li>
                ))}
              </ul>
            ) : recentJobs.length > 0 ? (
              <ul className="space-y-3">
                {recentJobs.map((job) => (
                  <li
                    key={job.ID}
                    className="flex justify-between items-center border-b border-border py-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{job.Position}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.Company?.name || job.CompanyCode} • Posted on{" "}
                        {job.CreatedAt
                          ? new Date(job.CreatedAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </p>
                    </div>
                    <a
                      href={job.ApplyRedirectUrl || job.JobUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-textLink underline"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                {dummyJobs.map((job) => (
                  <li
                    key={job.ID}
                    className="flex justify-between items-center border-b border-border py-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{job.Position}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.Company?.name || job.CompanyCode} • Posted on{" "}
                        {new Date(job.CreatedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <button className="text-sm text-textLink underline">
                      View
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RMS Overview with Icons and Info Cards */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-6">Recruitment Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InfoCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
                    />
                  </svg>
                }
                title="Applications"
                description="154"
              />
              <InfoCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m1 5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
                title="Shortlisted"
                description="34"
              />
              <InfoCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 9v6m2-6v6m4-10H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2z"
                    />
                  </svg>
                }
                title="Interviews Scheduled"
                description="12"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Credits & Quota (Unlimited) */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">Credits & Quota</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credits Remaining</span>
                <span className="font-bold">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Monthly Job Postings
                </span>
                <span className="font-bold">Unlimited</span>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span className="text-green-600 font-semibold">
                  Unlimited job postings available
                </span>
              </div>
            </div>
          </div>

          {/* Companies List */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">Companies</h2>
            {loading ? (
              <ul className="space-y-3 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <li
                    key={i}
                    className="h-12 bg-muted rounded flex items-center px-4 w-full"
                  >
                    <div className="h-8 w-8 rounded bg-muted-foreground mr-4" />
                    <div className="h-4 bg-muted-foreground rounded w-1/2" />
                  </li>
                ))}
              </ul>
            ) : companies.length > 0 ? (
              <ul className="space-y-3">
                {companies.map((company) => (
                  <li
                    key={company.ID}
                    className="flex items-center space-x-4 border-b border-border py-3 last:border-0"
                  >
                    {company.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={`${company.name} logo`}
                        className="h-8 w-8 object-contain rounded"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground select-none">
                        {company.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {company.industry}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No companies found.
              </p>
            )}
          </div>

          {/* Reports */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">Reports</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Weekly Performance</span>
                <button className="text-textLink underline">Download</button>
              </li>
              <li className="flex items-center justify-between">
                <span>Candidate Funnel</span>
                <button className="text-textLink underline">View</button>
              </li>
              <li className="flex items-center justify-between">
                <span>Activity Summary</span>
                <button className="text-textLink underline">Export</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
