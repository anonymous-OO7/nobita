"use client";

import * as React from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import useToast from "@/hooks/useToast";
import useApi from "@/hooks/useApi";
import { LoadingIcon } from "@/assets/images/Loading";
import FileInput from "@/components/FileInput";
import { AddJobsCsvClientApi } from "@/apis";

const INITIAL_VALUES = {
  csv_file: null as File | null,
};

export default function UploadJobsCsvPage() {
  const { showToast } = useToast();
  const { makeApiCall } = useApi();
  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object().shape({
    csv_file: Yup.mixed().required("CSV file is required"),
  });

  const handleSubmit = React.useCallback(
    ({ csv_file }: typeof INITIAL_VALUES) => {
      if (!csv_file) {
        showToast("Please upload a CSV file", { type: "error" });
        return;
      }

      setLoading(true);

      return makeApiCall(AddJobsCsvClientApi(csv_file))
        .then(() => {
          showToast("CSV uploaded successfully", { type: "success" });
        })
        .catch(() => {
          showToast("Failed to upload CSV", { type: "error" });
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Upload Job CSV
          </h2>

          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <FileInput name="csv_file" type="dropzone" accept=".csv" />

              <div className="flex justify-center items-center">
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
                    Submit CSV
                  </button>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
}
