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
        .then(() => {
          formSuccessToast();
          onOpenChange(false); // Close the modal on success
          return true;
        })
        .catch(() => {
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
                  <p className="flex flex-col gap-1 text-black font-poppins font-light text-base">
                    What interests you about this company?
                  </p>
                  <Field
                    as={Textarea}
                    name="interest"
                    placeholder="Write your cover letter here..."
                    className="mt-2"
                  />

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
