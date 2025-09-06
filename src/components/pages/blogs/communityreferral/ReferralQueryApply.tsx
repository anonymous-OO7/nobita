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
import { SendReferralQueryAPI } from "@/apis";
import useToast from "@/hooks/useToast";
import useApi from "@/hooks/useApi";
import { CommunityReferral } from "@/types";

// Define the interface for form values
interface FormValues {
  message: string;
}

// Props for the modal
interface JobApplicationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  applyingReferral?: CommunityReferral;
}

// Initial form values
const INITIAL_VALUES: FormValues = {
  message: "",
};

// Validation schema
const validationSchema = Yup.object().shape({
  message: Yup.string().required("This field is required"),
});

const ReferralQueryModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onOpenChange,
  applyingReferral,
}) => {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const formSuccessToast = React.useCallback(() => {
    showToast("Referral query submitted successfully", { type: "success" });
  }, [showToast]);

  const formErrorToast = React.useCallback(() => {
    showToast("Referral query submission failed", { type: "error" });
  }, [showToast]);

  const handleSubmit = React.useCallback(
    (values: FormValues) => {
      if (!applyingReferral) return;

      setLoading(true);
      const { message } = values;

      return makeApiCall(
        SendReferralQueryAPI(message, applyingReferral.Profile.email)
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
        .catch((e) => {
          console.error("Error response while applying:", e);
          formErrorToast();
          return false;
        })
        .finally(() => setLoading(false));
    },
    [
      makeApiCall,
      formSuccessToast,
      formErrorToast,
      onOpenChange,
      applyingReferral,
    ]
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
            {({ isSubmitting }) => (
              <Form>
                <ModalHeader className="flex flex-col gap-1 text-black font-poppins">
                  Send a message to {applyingReferral?.Profile.name}
                </ModalHeader>

                <ModalBody>
                  <p className="text-black font-poppins font-light text-base">
                    What would you like to ask or share?
                  </p>
                  <Field
                    as={Textarea}
                    name="message"
                    placeholder="Write your message here..."
                    className="mt-2"
                  />
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
                    {loading || isSubmitting ? "Sending..." : "Send"}
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

export default ReferralQueryModal;
