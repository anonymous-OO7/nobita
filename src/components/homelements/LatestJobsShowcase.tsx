import React from "react";
import { Job } from "@/types.js";
import useApi from "@/hooks/useApi";
import { GetDashboardJobsdApi } from "@/apis";
import JobCard from "@/components/cards/JobCard";

const LatestJobs = () => {
  const { makeApiCall } = useApi();

  const [latestJobsByField, setLatestJobsByField] = React.useState<
    Record<string, Job[]>
  >({});
  const [selectedField, setSelectedField] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [topCompanies, setTopCompanies] = React.useState<
    { name: string; logo: string }[]
  >([]);

  const navigateToJobInfo = (job: Job) => {
    if (!job?.Uuid) return;
    window.open(`/job?id=${job.Uuid}`, "_blank");
  };

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetDashboardJobsdApi())
      .then((response) => {
        console.log(response, "response of dashboard jobs api");
        if (response?.data) {
          setLatestJobsByField(response.data);
          const firstField = Object.keys(response.data)[0];
          setSelectedField(firstField || null);

          // ✅ Explicitly cast so TS knows the type
          const allJobs = Object.values(response.data).flat() as Job[];

          const companyMap = new Map<string, string>();
          allJobs.forEach((job) => {
            if (job.Company?.name && !companyMap.has(job.Company.name)) {
              companyMap.set(job.Company.name, job.Company.logo_url || "");
            }
          });

          const companies = Array.from(companyMap.entries())
            .slice(0, 10)
            .map(([name, logo]) => ({ name, logo }));

          setTopCompanies(companies);
        }
      })
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  }, [makeApiCall]);

  return (
    <div>
      <section>
        <div className="py-12">
          <div className="flex items-center justify-center text-center mt-8 mb-2 lg:mt-28">
            <div className="flex flex-col items-center justify-center rounded-tr-full rounded-bl-full w-full bg-white py-6">
              <div className="flex flex-col m-2 max-w-7xl">
                <p className="text-2xl md:text-3xl text-black font-semibold font-poppins mb-4">
                  Latest Jobs Added
                </p>

                {/* Titles List */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {Object.keys(latestJobsByField).map((field) => (
                    <button
                      key={field}
                      onClick={() => setSelectedField(field)}
                      className={`px-4 py-2 rounded-full border transition-all ${
                        selectedField === field
                          ? "bg-yellow-200 text-yellow-800 border-yellow-300 font-semibold"
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-yellow-50"
                      }`}
                    >
                      {field}
                    </button>
                  ))}
                </div>

                {/* Jobs Grid */}
                {selectedField && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestJobsByField[selectedField]
                      ?.slice(0, 9)
                      .map((job) => (
                        <JobCard
                          key={job.Uuid}
                          job={job}
                          onViewDetails={navigateToJobInfo}
                          isApplied={false}
                        />
                      ))}
                  </div>
                )}

                {loading && <p className="text-gray-500 mt-4">Loading...</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 10 Companies Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
            Latest Companies Added
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6 items-center justify-items-center">
            {topCompanies.map((company, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all w-full"
              >
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-16 w-16 object-contain mb-2"
                  />
                ) : (
                  <div className="h-16 w-16 flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
                    {company.name.charAt(0)}
                  </div>
                )}
                <p className="text-sm font-medium text-gray-700 text-center">
                  {company.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestJobs;
