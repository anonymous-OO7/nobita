import { Form, Formik } from "formik";
import Image from "next/image";
import * as React from "react";
import * as Yup from "yup";
import Send from "../../../assets/send.svg";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Applications } from "@/types";

interface Props {
  application: Applications;
  onSubmitRemark: (remark: string, currentOrder: Applications) => void;
}

export default function UpdateRemarks({ application, onSubmitRemark }: Props) {
  const handleSubmit = React.useCallback(
    ({ remark }: { remark: string }) => {
      return onSubmitRemark(remark, application);
    },
    [onSubmitRemark, application?.applicant_id]
  );

  const validationSchema = Yup.object().shape({
    remark: Yup.string().required("Remark is required"),
  });

  return (
    <Formik
      initialValues={{ remark: application?.remark ?? "" }}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
      validationSchema={validationSchema}
      enableReinitialize
      key={`remark-${application?.applicant_id}`}
    >
      <Form>
        <Input
          name="remark"
          size="sm"
          endContent={
            <Button variant="solid">
              <Image src={Send} alt="send" />
            </Button>
          }
        />
      </Form>
    </Formik>
  );
}
