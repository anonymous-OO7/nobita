"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import useToast from "@/hooks/useToast";
import useApi from "@/hooks/useApi";
import { LoadingIcon } from "@/assets/images/Loading";
import FileInput from "@/components/FileInput";
import { AddCompaniesCsvClientApi, AddJobsCsvClientApi } from "@/apis";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const INITIAL_VALUES = {
  csv_file: null as File | null,
};

export default function UploadCsvPage() {
  const { showToast } = useToast();
  const { makeApiCall } = useApi();
  const [loading, setLoading] = React.useState(false);
  const [isCompanyMode, setIsCompanyMode] = React.useState(false);
  const router = useRouter();

  const schema = Yup.object().shape({
    csv_file: Yup.mixed().required("CSV file is required"),
  });

  const handleSubmit = async ({ csv_file }: typeof INITIAL_VALUES) => {
    if (!csv_file) {
      showToast("Please upload a CSV file", { type: "error" });
      return;
    }

    setLoading(true);

    const apiCall = isCompanyMode
      ? AddCompaniesCsvClientApi(csv_file)
      : AddJobsCsvClientApi(csv_file);

    const successMessage = isCompanyMode
      ? "Companies CSV uploaded successfully"
      : "Jobs CSV uploaded successfully";

    const errorMessage = isCompanyMode
      ? "Failed to upload Companies CSV"
      : "Failed to upload Jobs CSV";

    return makeApiCall(apiCall)
      .then(() => {
        showToast(successMessage, { type: "success" });
      })
      .catch(() => {
        showToast(errorMessage, { type: "error" });
      })
      .finally(() => setLoading(false));
  };

  const handleAllCompaniesPosting = React.useCallback(() => {
    router.push(`/recruiter/admin/company`);
  }, [router]);

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 mt-7">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Upload CSV File
        </h2>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-6">
          <label className="flex items-center space-x-4 cursor-pointer">
            <span className="text-gray-700 dark:text-white">Job CSV</span>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                className="opacity-0 w-0 h-0"
                checked={isCompanyMode}
                onChange={() => setIsCompanyMode((prev) => !prev)}
              />
              <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-full transition duration-200"></div>
              <div
                className={`absolute left-0 top-0 h-6 w-6 bg-white dark:bg-gray-200 rounded-full shadow transform transition-transform duration-200 ${
                  isCompanyMode ? "translate-x-full" : ""
                }`}
              />
            </div>
            <span className="text-gray-700 dark:text-white">Company CSV</span>
          </label>
        </div>

        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          <Form>
            <FileInput name="csv_file" type="dropzone" accept=".csv" />

            <div className="flex justify-center mt-6">
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                >
                  <LoadingIcon />
                  Uploading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 rounded-lg"
                >
                  {isCompanyMode ? "Submit Company CSV" : "Submit Job CSV"}
                </button>
              )}
            </div>
          </Form>
        </Formik>

        <Button
          type="button"
          onClick={handleAllCompaniesPosting}
          className="w-full"
        >
          Companies
        </Button>
      </div>
    </section>
  );
}
