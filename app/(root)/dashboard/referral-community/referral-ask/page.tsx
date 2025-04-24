"use client";

import * as React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import useApi from "@/hooks/useApi";
import { AddReferralRequestApi, SearchGetCompaniesApi } from "@/apis";
import useToast from "@/hooks/useToast";
import Textarea from "@/components/common/TextArea";
import { useRouter } from "next/navigation";
import SearchSelect from "@/components/common/SearchSelect";
import { Option } from "@/types";

const validationSchema = Yup.object().shape({
  code: Yup.string().optional(),
  description: Yup.string().required("Description is required"),
  job_link: Yup.string()
    .url("Invalid URL format")
    .required("Job Link is required"),
  cover_letter: Yup.string().required("Cover Letter is required"),
  job_role: Yup.string().required("Job Role is required"),
  status: Yup.string().optional(),
  amount: Yup.string().required("Amount willing to  pay is required"),
});

const initialValues = {
  code: "",
  description: "",
  job_link: "",
  cover_letter: "",
  job_role: "",
  status: "active",
  amount: "",
};

export default function SubmitReferralForm() {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const router = useRouter();
  const [companyData, setCompanyData] = React.useState<Option[]>([]);

  const handleSuccessPosting = React.useCallback(() => {
    router.push(`/dashboard/referral-community`);
  }, [router]);

  const navigateToCreateCompany = React.useCallback(() => {
    router.replace("/dashboard/createcompany");
  }, [router]);

  const handleSubmit = React.useCallback(
    async (values: any) => {
      setLoading(true);
      try {
        console.log(
          values.code,
          values.description,
          values.job_link,
          values.cover_letter,
          values.job_role,
          values.status,
          "Parameters sending for request referaal"
        );
        const response = await makeApiCall(
          AddReferralRequestApi(
            values.code,
            values.description,
            values.job_link,
            values.cover_letter,
            values.job_role,
            values.status
          )
        );

        console.log(response, "RESPONSE OF Add Company");
        showToast("Community referral created successfully!!", {
          type: "success",
        });
        handleSuccessPosting();
      } catch (error: any) {
        console.error("Company creation Error:- ", error);
        showToast(error.message || "Some error occurred!!", { type: "error" });
      } finally {
        setLoading(false);
      }
    },
    [showToast, makeApiCall, handleSuccessPosting]
  );

  React.useEffect(() => {
    makeApiCall(SearchGetCompaniesApi(""))
      // eslint-disable-next-line
      .then((response: any) => {
        console.log(response, "Response  of all companies");
        var count = Object.keys(response?.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].code,
            label: response.data[i].name,
          });
        }
        setCompanyData(cityArray);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("finally");
      });
  }, [makeApiCall]);

  const searchCompanies = React.useCallback((text: String) => {
    makeApiCall(SearchGetCompaniesApi(text))
      // eslint-disable-next-line
      .then((response: any) => {
        console.log(response, "Response  of all companies");
        var count = Object.keys(response?.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].code,
            label: response.data[i].name,
          });
        }
        setCompanyData(cityArray);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("finally");
      });
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 lg:py-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Submit Community Referral Request
        </h2>

        <p className="font-poppins font-light text-black text-lg my-8">
          Ensure you fill in all the details below Ensure you match the job
          experience and requirements.
        </p>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <SearchSelect
                placeholder="Enter company name (e.g., Microsoft)"
                label="Company Name"
                item={companyData}
                name="code"
                className="bg-white p-1 text-black font-poppins font-light text-lg"
                size="sm"
                onChange={(e) => {
                  console.log(e, "Texttt");
                  searchCompanies(e.target.value);
                }}
              />
              <p
                className="mt-4 text-xs leading-6 text-blue-500 flex justify-end cursor-pointer"
                onClick={navigateToCreateCompany}
              >
                Can't find your company? create here
              </p>
              <div className="sm:col-span-2">
                <label
                  htmlFor="job_role"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Job Role
                </label>
                <Input
                  name="job_role"
                  placeholder="e.g., Software Engineer, Data Scientist"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={values.job_role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="job_role"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Amount willing to pay for referral help
                </label>
                <Input
                  name="amount"
                  placeholder="In INR"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="job_link"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Job Posting Link
                </label>
                <Input
                  type="url"
                  name="job_link"
                  placeholder="https://company.com/careers/job-title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={values.job_link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Description"
                  name="description"
                  placeholder="Provide a brief description of the referral request or your background"
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Cover Letter"
                  name="cover_letter"
                  placeholder="Include a brief cover letter or message"
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Referral Request"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
