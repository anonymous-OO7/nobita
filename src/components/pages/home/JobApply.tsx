"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
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
import { useRouter } from "next/navigation";

interface FormValues {
  interest: string;
  resume: File | null;
}

interface JobApplicationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  applyingJob?: Job;
}

const INITIAL_VALUES: FormValues = {
  interest: "",
  resume: null,
};

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
  const router = useRouter();

  if (!applyingJob) return null;

  // Direct skills parsing without useMemo
  let parsedSkills: string[] = [];
  const skillsRaw = applyingJob.Skills;
  if (skillsRaw) {
    if (Array.isArray(skillsRaw)) {
      parsedSkills = skillsRaw
        .flatMap((s) => s.split(","))
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (typeof skillsRaw === "string") {
      try {
        const parsed = JSON.parse(skillsRaw);
        if (Array.isArray(parsed)) {
          parsedSkills = parsed
            .flatMap((s) =>
              typeof s === "string" ? s.split(",").map((i) => i.trim()) : []
            )
            .filter(Boolean);
        } else {
          parsedSkills = skillsRaw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      } catch {
        parsedSkills = skillsRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
    parsedSkills = parsedSkills.slice(0, 10);
  }

  const formSuccessToast = () => {
    showToast("Job application submitted successfully", { type: "success" });
  };

  const formErrorToast = () => {
    showToast("Job application submission failed", { type: "error" });
  };

  const handleSubmit = (values: FormValues) => {
    setLoading(true);
    const { interest, resume } = values;
    return makeApiCall(
      ApplyJobAPI(
        applyingJob?.Owner || "",
        interest,
        resume!,
        applyingJob?.Uuid || ""
      )
    )
      .then((response) => {
        if (response?.status === true) {
          formSuccessToast();
          onOpenChange(false);
          return true;
        } else {
          formErrorToast();
          return false;
        }
      })
      .catch(() => {
        formErrorToast();
        return false;
      })
      .finally(() => setLoading(false));
  };

  const { ApplyRedirectUrl, Company } = applyingJob;
  const isRedirect = !!ApplyRedirectUrl?.trim();

  const navigateToFullDetails = () => {
    if (!applyingJob?.Uuid) return;
    router.push(`/job?id=${applyingJob.Uuid}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="auto"
      onOpenChange={onOpenChange}
      size="full"
    >
      <ModalContent>
        {(onClose) => (
          <div className="relative h-[100vh] flex flex-col">
            <ModalHeader className="flex flex-col gap-1 text-black font-poppins">
              Apply to {Company?.name}
            </ModalHeader>

            {isRedirect ? (
              <>
                <ModalBody className="space-y-6 flex-1 overflow-y-auto pb-28">
                  {/* Job Summary */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>
                        <strong className="text-gray-800">Position:</strong>{" "}
                        {applyingJob.Position}
                      </p>
                      <p>
                        <strong className="text-gray-800">Location:</strong>{" "}
                        {applyingJob.Location || "N/A"}
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
                      <p>
                        <strong className="text-gray-800">Work Mode:</strong>{" "}
                        {applyingJob.Remote
                          ? "Remote"
                          : applyingJob.Hybrid
                          ? "Hybrid"
                          : "On-site"}
                      </p>
                    </div>
                    {Company?.logo_url && (
                      <img
                        src={Company.logo_url}
                        alt="Company Logo"
                        className="w-14 h-14 rounded-md object-contain"
                      />
                    )}
                  </div>

                  {/* Skills */}
                  {parsedSkills.length > 0 && (
                    <div>
                      <p className="font-semibold text-sm text-gray-800 mb-1">
                        Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {parsedSkills.map((skill, idx) => (
                          <Chip
                            key={idx}
                            color="secondary"
                            variant="bordered"
                            size="sm"
                            className="font-poppins"
                          >
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Job Description */}
                  {applyingJob?.Description && (
                    <div>
                      <p className="font-semibold text-sm text-gray-800 mb-1">
                        Job Description:
                      </p>
                      <div
                        className="max-h-96 overflow-y-auto text-sm text-gray-700 bg-gray-50 p-3 rounded-md prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: applyingJob.Description,
                        }}
                      />
                    </div>
                  )}

                  {/* About Company */}
                  <div>
                    <p className="font-semibold text-base text-black mb-2">
                      About the Company
                    </p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>Industry:</strong> {Company?.industry || "N/A"}
                      </p>
                      {Company?.company_size &&
                        Company.company_size.toLowerCase() !== "unknown" && (
                          <p>
                            <strong>Size:</strong> {Company.company_size}{" "}
                            employees
                          </p>
                        )}
                      <p>
                        <strong>Founded:</strong>{" "}
                        {Company?.founded_date
                          ? new Date(Company.founded_date).getFullYear()
                          : "N/A"}
                      </p>
                      <p>
                        <strong>Location:</strong> {Company?.location || "N/A"}
                      </p>
                      <p>
                        <strong>Headquarters:</strong>{" "}
                        {Company?.headquarters_address || "N/A"}
                      </p>
                    </div>
                  </div>
                </ModalBody>
              </>
            ) : (
              <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur
                validateOnChange
              >
                {({ setFieldValue, isSubmitting }) => (
                  <>
                    <ModalBody className="space-y-6 flex-1 overflow-y-auto pb-28">
                      {/* Job Summary */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            <strong className="text-gray-800">Position:</strong>{" "}
                            {applyingJob.Position}
                          </p>
                          <p>
                            <strong className="text-gray-800">Location:</strong>{" "}
                            {applyingJob.Location || "N/A"}
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Experience:
                            </strong>{" "}
                            {applyingJob.MinExperience} -{" "}
                            {applyingJob.MaxExperience} yrs
                          </p>
                          <p>
                            <strong className="text-gray-800">Type:</strong>{" "}
                            {applyingJob.Type.charAt(0).toUpperCase() +
                              applyingJob.Type.slice(1)}
                          </p>
                          <p>
                            <strong className="text-gray-800">
                              Work Mode:
                            </strong>{" "}
                            {applyingJob.Remote
                              ? "Remote"
                              : applyingJob.Hybrid
                              ? "Hybrid"
                              : "On-site"}
                          </p>
                        </div>
                        {Company?.logo_url && (
                          <img
                            src={Company.logo_url}
                            alt="Company Logo"
                            className="w-14 h-14 rounded-md object-contain"
                          />
                        )}
                      </div>

                      {/* Skills */}
                      {parsedSkills.length > 0 && (
                        <div>
                          <p className="font-semibold text-sm text-gray-800 mb-1">
                            Skills:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {parsedSkills.map((skill, idx) => (
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

                      {/* Job Description */}
                      {applyingJob?.Description && (
                        <div>
                          <p className="font-semibold text-sm text-gray-800 mb-1">
                            Job Description:
                          </p>
                          <div
                            className="max-h-72 overflow-y-auto text-sm text-gray-700 bg-gray-50 p-3 rounded-md prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: applyingJob.Description,
                            }}
                          />
                        </div>
                      )}

                      {/* About Company */}
                      <div>
                        <p className="font-semibold text-base text-black mb-2">
                          About the Company
                        </p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            <strong>Industry:</strong>{" "}
                            {Company?.industry || "N/A"}
                          </p>
                          {Company?.company_size &&
                            Company.company_size.toLowerCase() !==
                              "unknown" && (
                              <p>
                                <strong>Size:</strong> {Company.company_size}{" "}
                                employees
                              </p>
                            )}
                          <p>
                            <strong>Founded:</strong>{" "}
                            {Company?.founded_date
                              ? new Date(Company.founded_date).getFullYear()
                              : "N/A"}
                          </p>
                          <p>
                            <strong>Location:</strong>{" "}
                            {Company?.location || "N/A"}
                          </p>
                          <p>
                            <strong>Headquarters:</strong>{" "}
                            {Company?.headquarters_address || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Form */}
                      <Form id="job-apply-form" className="space-y-4">
                        <div>
                          <p className="text-black font-poppins text-sm mb-1">
                            What interests you about this company?
                          </p>
                          <Field
                            as={Textarea}
                            name="interest"
                            placeholder="Write your cover letter here..."
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <p className="text-black font-poppins text-sm mb-1">
                            Upload your resume (PDF only):
                          </p>
                          <Field name="resume">
                            {({ form }: { form: any }) => (
                              <Input
                                type="file"
                                accept=".pdf"
                                onChange={(event) => {
                                  const file =
                                    event.currentTarget.files?.[0] || null;
                                  setFieldValue("resume", file);
                                }}
                                className="mt-1"
                              />
                            )}
                          </Field>
                        </div>
                      </Form>
                    </ModalBody>
                  </>
                )}
              </Formik>
            )}

            {/* Sticky Buttons */}
            <div className="sticky bottom-0 left-0 w-full z-50 shadow-xl border-t px-4 py-3 flex gap-3 justify-end items-center whitespace-nowrap bg-white">
              {isRedirect ? (
                <a
                  href={ApplyRedirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-poppins flex items-center justify-center shadow-md"
                >
                  Apply on Company Site
                </a>
              ) : (
                <Button
                  form="job-apply-form"
                  type="submit"
                  className="bg-buttonPrimary font-poppins text-white shadow-md"
                  disabled={loading}
                >
                  {loading ? "Applying..." : "Apply"}
                </Button>
              )}

              <Button
                className="text-xs bg-blue-600 text-white font-poppins shadow-md rounded-sm px-4 py-2"
                onPress={navigateToFullDetails}
              >
                Full Details
              </Button>

              <Button
                className="text-xs font-poppins shadow-md"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default JobApplicationModal;
