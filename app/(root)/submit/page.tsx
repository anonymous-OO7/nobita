"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import useApi from "@/hooks/useApi";
import { CreateJobApi } from "@/apis";
import useToast from "@/hooks/useToast";

const INITIAL_VALUES = {
  status: "",
  companyName: "",
  position: "",
  location: "",
  jobType: "",
  description: "",
  field: "",
  owner: "",
  minPay: 0,
  maxPay: 0,
  price: 0,
  totalEmp: 0,
  logoUrl: "",
};

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  companyName: Yup.string().required("Company Name is required"),
  position: Yup.string().required("Job Title is required"),
  location: Yup.string().required("Location is required"),
  jobType: Yup.string().required("Job Type is required"),
  description: Yup.string().required("Description is required"),
  field: Yup.string().required("Field is required"),
  minPay: Yup.number().required("Minimum pay is required"),
  maxPay: Yup.number().required("Maximum pay is required"),
  price: Yup.number().required("Price is required"),
  totalEmp: Yup.number().required("Total Employees is required"),
  logoUrl: Yup.string().required("Logo URL is required"),
});

export default function SubmitJob() {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const handleSubmit = React.useCallback(
    async (values: typeof INITIAL_VALUES) => {
      const {
        status,
        companyName,
        position,
        location,
        jobType,
        description,
        field,
        minPay,
        maxPay,
        price,
        totalEmp,
        logoUrl,
      } = values;

      console.log(
        "sending the job data",
        status,
        companyName,
        position,
        location,
        jobType,
        description,
        field,
        minPay,
        maxPay,
        price,
        totalEmp,
        logoUrl
      );

      setLoading(true);

      return makeApiCall(
        CreateJobApi(
          status,
          companyName,
          position,
          location,
          jobType,
          description,
          field,
          minPay,
          maxPay,
          price,
          totalEmp,
          logoUrl
        )
      )
        .then((response) => {
          console.log(response, "RESPONSE OF Create job");
          showToast("Job created successfully!!", { type: "success" });
        })
        .catch((error) => {
          console.error("Job creation Error:- ", error);
          showToast("Some error occurred!!", { type: "error" });
        })
        .finally(() => setLoading(false));
    },
    [showToast, makeApiCall]
  );

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Create a Job
        </h2>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
          validationSchema={validationSchema}
          enableReinitialize
        >
          {() => (
            <Form>
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Status"
                name="status"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Company Name"
                name="companyName"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Job Title"
                name="position"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Location"
                name="location"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Job Type"
                name="jobType"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Description"
                name="description"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Field"
                name="field"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Minimum Pay"
                name="minPay"
                type="number"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Maximum Pay"
                name="maxPay"
                type="number"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Price"
                name="price"
                type="number"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Total Employees"
                name="totalEmp"
                type="number"
              />
              <Spacer size="xs" />
              <Input
                className="bg-white shadow-lg p-2 border text-black font-poppins font-light text-lg"
                label="Logo URL"
                name="logoUrl"
              />
              <Spacer size="xs" />
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
