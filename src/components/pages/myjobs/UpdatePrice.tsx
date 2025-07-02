import { Form, Formik } from "formik";
import Image from "next/image";
import * as React from "react";
import * as Yup from "yup";
import Send from "../../../assets/send.svg";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { JobListing } from "@/types";

interface Props {
  job: JobListing;
  onSubmitPrice: (price: number, currentOrder: JobListing) => void;
}

export default function UpdatePrice({ job, onSubmitPrice }: Props) {
  const handleSubmit = React.useCallback(
    ({ price }: { price: number }) => {
      return onSubmitPrice(price, job);
    },
    [onSubmitPrice, job?.Uuid]
  );

  const validationSchema = Yup.object().shape({
    price: Yup.string().required("Price is required"),
  });

  return (
    <Formik
      initialValues={{ price: job?.Price ?? "" }}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
      validationSchema={validationSchema}
      enableReinitialize
      key={`price-${job?.Uuid}`}
    >
      <Form>
        <Input
          name="price"
          size="sm"
          endContent={
            <Button variant="ghost">
              <Image src={Send} alt="send" />
            </Button>
          }
        />
      </Form>
    </Formik>
  );
}
