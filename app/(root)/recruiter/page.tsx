"use client";

import React from "react";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    date: "Jul 10, 2025",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Codewave",
    date: "Jul 08, 2025",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Innovent",
    date: "Jul 06, 2025",
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen px-4 py-6 mt-10 sm:px-10 bg-background text-foreground">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your recent activity and recruitment status
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Recent Job Postings */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">Recent Job Postings</h2>
            <ul className="space-y-3">
              {dummyJobs.map((job) => (
                <li key={job.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.company} • Posted on {job.date}
                    </p>
                  </div>
                  <button className="text-sm text-textLink underline">
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RMS Overview */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">RMS Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Applications</p>
                <h3 className="text-2xl font-bold">154</h3>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Shortlisted</p>
                <h3 className="text-2xl font-bold">34</h3>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">
                  Interviews Scheduled
                </p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quota Used */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">Credits & Quota</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credits Remaining</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Job Limit</span>
                <span className="font-bold">20 / 50 used</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div className="bg-primary h-full w-[40%]" />
              </div>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-card p-5 rounded-xl shadow border">
            <h2 className="text-xl font-semibold mb-4">Reports</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Weekly Performance</span>
                <button className="text-textLink  underline">Download</button>
              </li>
              <li className="flex items-center justify-between">
                <span>Candidate Funnel</span>
                <button className="text-textLink  underline">View</button>
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
