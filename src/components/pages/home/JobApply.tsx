"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
} from "@nextui-org/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ApplyJobAPI } from "@/apis";
import useToast from "@/hooks/useToast";
import useApi from "@/hooks/useApi";
import { Job } from "@/types";
import { Chip } from "@heroui/react";

// Define the interface for form values
interface FormValues {
  interest: string;
  resume: File | null; // Resume field for file input
}

// Define the interface for the JobApplicationModal props
interface JobApplicationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  applyingJob?: Job;
}

// Initial values for the form
const INITIAL_VALUES: FormValues = {
  interest: "",
  resume: null,
};

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  interest: Yup.string().required("This field is required"),
  resume: Yup.mixed().required("Resume is required"),
});

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onOpenChange,
  applyingJob,
}) => {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const formSuccessToast = React.useCallback(() => {
    showToast("Job application submitted successfully", { type: "success" });
  }, [showToast]);

  const formErrorToast = React.useCallback(() => {
    showToast("Job application submission failed", { type: "error" });
  }, [showToast]);

  const handleSubmit = React.useCallback(
    (values: FormValues) => {
      setLoading(true);
      const { interest, resume } = values;
      console.log(
        applyingJob,
        interest,
        resume,
        "SEnding data for application"
      );
      return makeApiCall(
        ApplyJobAPI(
          applyingJob?.Owner || "",
          interest,
          resume!,
          applyingJob?.Uuid || ""
        )
      )
        .then((response) => {
          console.log(response, "Response of apliyinf");
          if (response?.status == true) {
            formSuccessToast();
            onOpenChange(false);
            return true;
          } else {
            formErrorToast();
            return false;
          }
        })
        .catch((e) => {
          console.log(e, "error response of apliyinf");

          formErrorToast();
          return false;
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, formSuccessToast, formErrorToast, onOpenChange, applyingJob]
  );

  return (
    <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <ModalHeader className="flex flex-col gap-1 text-black font-poppins">
                  Apply to {applyingJob?.company.name}
                </ModalHeader>
                <ModalBody>
                  {/* Company Logo + Job Summary */}
                  {applyingJob && (
                    <div className="flex items-start justify-between mb-4 gap-4">
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          <strong className="text-gray-800">Position:</strong>{" "}
                          {applyingJob.Position}
                        </p>
                        <p>
                          <strong className="text-gray-800">Location:</strong>{" "}
                          {applyingJob.Location}
                        </p>
                        <p>
                          <strong className="text-gray-800">Experience:</strong>{" "}
                          {applyingJob.MinExperience} -{" "}
                          {applyingJob.MaxExperience} yrs
                        </p>
                        <p>
                          <strong className="text-gray-800">Type:</strong>{" "}
                          {applyingJob.Type.charAt(0).toUpperCase() +
                            applyingJob.Type.slice(1)}
                        </p>
                      </div>
                      {applyingJob.company?.logo_url && (
                        <img
                          src={applyingJob.company.logo_url}
                          alt="Company Logo"
                          className="w-14 h-14 rounded-md object-contain"
                        />
                      )}
                    </div>
                  )}

                  {/* Skills */}
                  {applyingJob?.skills && (
                    <div className="mb-3">
                      <p className="font-semibold text-sm text-gray-800 mb-1">
                        Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(applyingJob.skills)
                          ? applyingJob.skills
                          : (() => {
                              try {
                                return JSON.parse(applyingJob.skills as string);
                              } catch {
                                return [];
                              }
                            })()
                        ).map((skill: string, idx: number) => (
                          <Chip
                            key={idx}
                            color="primary"
                            variant="bordered"
                            size="sm"
                          >
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {applyingJob?.Description && (
                    <div className="mb-4">
                      <p className="font-semibold text-sm text-gray-800 mb-1">
                        Job Description:
                      </p>
                      <div
                        className="max-h-40 overflow-y-auto text-sm text-gray-700 bg-gray-50 p-2 rounded-md prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: applyingJob.Description,
                        }}
                      />
                    </div>
                  )}

                  {/* Interest Field */}
                  <p className="text-black font-poppins font-light text-base">
                    What interests you about this company?
                  </p>
                  <Field
                    as={Textarea}
                    name="interest"
                    placeholder="Write your cover letter here..."
                    className="mt-2"
                  />

                  {/* Resume Upload */}
                  <p className="mt-4 text-black font-poppins font-light text-base">
                    Upload your resume (PDF only):
                  </p>
                  <Field name="resume">
                    {({ form }: { form: any }) => (
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] || null;
                          setFieldValue("resume", file);
                        }}
                        className="mt-2"
                      />
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    className="bg-buttonPrimary font-poppins text-white"
                    type="submit"
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? "Applying..." : "Apply"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        )}
      </ModalContent>
    </Modal>
  );
};

export default JobApplicationModal;
