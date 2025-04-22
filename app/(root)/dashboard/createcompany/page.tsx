"use client";

import * as React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik"; // Import Field and ErrorMessage for easier binding
import * as Yup from "yup";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import useApi from "@/hooks/useApi";
import { AddCompanyApi } from "@/apis"; // Only AddCompanyApi is used in the submit
import useToast from "@/hooks/useToast";
import Select from "@/components/common/Select";
import { Option, SelectType } from "@/types";
import Textarea from "@/components/common/TextArea";
import Row from "@/components/common/Row";
// SearchSelect and other unused imports removed
import { useRouter } from "next/navigation";

// Define the validation schema based on the fields we intend to submit
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Company Name is required"),
  logoUrl: Yup.string().url("Invalid URL format").nullable(), // Allow null/empty for optional
  description: Yup.string().required("Company Description is required"),
  websiteUrl: Yup.string().url("Invalid URL format").nullable(), // Allow null/empty for optional
  industry: Yup.string().required("Industry is required"), // Added industry field
});

// Define initial values matching the validation schema
const initialValues = {
  logoUrl: "",
  name: "",
  description: "",
  websiteUrl: "",
  industry: "", // Initial value for industry
};

// Options for industry
const industryOptions: SelectType[] = [
  { value: "engineering", label: "Engineering" },
  { value: "it", label: "Information Technology" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "finance", label: "Finance" },
  { value: "human_resources", label: "Human Resources" },
  { value: "customer_service", label: "Customer Service" },
  { value: "operations", label: "Operations" },
  { value: "design", label: "Design" },
  { value: "product_management", label: "Product Management" },
  { value: "business_development", label: "Business Development" },
  { value: "data_science", label: "Data Science" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "consulting", label: "Consulting" },
  { value: "supply_chain", label: "Supply Chain & Logistics" },
  { value: "media", label: "Media & Communications" },
  { value: "real_estate", label: "Real Estate" },
  { value: "government", label: "Government & Public Sector" },
  { value: "hospitality", label: "Hospitality & Tourism" },
  { value: "construction", label: "Construction & Architecture" },
  { value: "pharmaceutical", label: "Pharmaceutical & Biotechnology" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "others", label: "Others" },
];

// dropdownCategory was not used in the form or submit, keeping it commented out
// const dropdownCategory: SelectType[] = [
//   { label: "Job post", value: "job_post" },
//   { label: "Referral", value: "referral_post" },
// ];

export default function SubmitJob() {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  // jobtype and jobCategory state were not used in the form or submit, removed
  const router = useRouter();

  // companyData state and related handlers are now redundant with Formik, removed
  // industryValue state is also managed by Formik now, removed

  const handleSuccessPosting = React.useCallback(() => {
    // Redirecting to /dashboard/myjobs after adding a company? This seems
    // inconsistent if the goal was *only* to add a company. Adjust as needed.
    router.push(`/dashboard/submit`);
  }, [router]);

  // Use the 'values' argument from Formik which contains the form state
  const handleSubmit = React.useCallback(
    async (values: any) => {
      setLoading(true);
      try {
        const response = await makeApiCall(
          AddCompanyApi(
            values.logoUrl,
            values.name,
            values.description,
            values.websiteUrl,
            values.industry
          )
        );

        console.log(response, "RESPONSE OF Add Company");
        showToast("Company created successfully!!", { type: "success" }); // Changed toast message
        handleSuccessPosting();
      } catch (error: any) {
        console.error("Company creation Error:- ", error);
        showToast(error.message || "Some error occurred!!", { type: "error" }); // Display error message if available
      } finally {
        setLoading(false);
      }
    },
    [showToast, makeApiCall, handleSuccessPosting] // Removed unused dependencies
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 lg:py-16">
        {/* Added padding */}
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          {/* Increased heading size */}
          Create a Company Profile {/* Adjusted title based on form content */}
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          // enableReinitialize is not needed if initialValues don't change dynamically
          // validateOnBlur and validateOnChange are default Formik behavior
        >
          {(
            { values, errors, touched, handleChange, handleBlur, setFieldValue } // Destructure Formik props
          ) => (
            <Form className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Use grid for layout */}
              {/* Company Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Company Name
                </label>
                <Input // Assuming Input component correctly uses htmlFor and handles props
                  name="name" // Must match schema and initialValues key
                  placeholder="Enter company name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={values.name} // Bind to Formik state
                  onChange={handleChange} // Use Formik handler
                  onBlur={handleBlur} // Use Formik handler
                />
              </div>
              {/* Logo URL */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="logoUrl"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Company Logo URL (Optional)
                </label>
                <input // Using standard input as custom Input might not handle type="url" easily
                  type="url"
                  name="logoUrl"
                  id="logoUrl" // Add id for label
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="https://company.com/logo.png"
                  value={values.logoUrl || ""} // Bind to Formik state (use || '' for controlled input)
                  onChange={handleChange} // Use Formik handler
                  onBlur={handleBlur} // Use Formik handler
                />
                {/* Display Formik error message */}
                {touched.logoUrl && errors.logoUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.logoUrl}</p>
                )}
              </div>
              {/* Website URL */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="websiteUrl"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Company Website URL (Optional)
                </label>
                <input // Using standard input
                  type="url"
                  name="websiteUrl"
                  id="websiteUrl" // Add id for label
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="https://company.com"
                  value={values.websiteUrl || ""} // Bind to Formik state
                  onChange={handleChange} // Use Formik handler
                  onBlur={handleBlur} // Use Formik handler
                />
                {/* Display Formik error message */}
                {touched.websiteUrl && errors.websiteUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.websiteUrl}
                  </p>
                )}
              </div>
              {/* Description */}
              <div className="sm:col-span-2">
                <Textarea // Assuming Textarea component handles props correctly
                  label="Company Description"
                  name="description" // Must match schema and initialValues key
                  placeholder="Provide a brief description of the company"
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={handleChange} // Use Formik handler
                />
              </div>
              {/* Select Industry */}
              <div className="w-full">
                {/* Use w-full or grid column span if needed */}
                <Select // Assuming Select component handles props correctly
                  label="Select Industry"
                  item={industryOptions}
                  name="industry" // Must match schema and initialValues key
                  placeholder="Select industry"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={values.industry} // Bind value to Formik state
                  onSelect={(value) => setFieldValue("industry", value)} // Use setFieldValue to update Formik state
                />
              </div>
              <Spacer size="lg" />
              {/* Add space before button, spanning columns */}
              {/* Submit Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800" // Styled button
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit Company"}
                  {/* Adjusted button text */}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
