import * as React from "react";
import Spacer from "@/components/Spacer";
import { UserProfile } from "@/types";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import Button from "@/components/Button";

interface Props {
  user: UserProfile | undefined;
  onSubmit: () => void;
  onUpdateInfo: <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) => void;
}
// eslint-disable-next-line
export default function Social({ user, onSubmit, onUpdateInfo }: Props) {
  const INTIAL_VALUES = {
    linkedin: user?.linkedin,
    twitter: user?.twitter,
    website: user?.website,
  };

  const [loading, setLoading] = React.useState(false); // eslint-disable-line

  const validationSchema = Yup.object().shape({
    linkedin: Yup.string().required("linkdin is required"),
    twitter: Yup.string().required("twitter is required"),
    website: Yup.string().required("website is required"),
  });
  // eslint-disable-next-line
  const handleInputChange = React.useCallback((name: any, text: string) => {
    console.log("UPDATING THE FIELD with--", name, "---", text);
  }, []);

  return (
    <div className="py-8 px-4 mx-auto w-[80%] lg:py-8">
      <Formik
        initialValues={INTIAL_VALUES}
        onSubmit={onSubmit}
        validateOnBlur
        validateOnChange
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form>
          <Input
            label="LinkedIn URL"
            placeholder="linkedIn"
            name="linkedin"
            onChange={handleInputChange}
          />
          <Spacer size="xs" />

          <Input
            label="Twitter URL"
            placeholder="twitter"
            name="twitter"
            onChange={handleInputChange}
          />
          <Spacer size="xs" />

          <Input
            label="Website URL"
            placeholder="website"
            name="website"
            onChange={handleInputChange}
          />
          <Spacer size="xs" />

          <div className="flex justify-center items-center">
            <Button
              isLoading={loading}
              disabled={loading ? true : false}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
