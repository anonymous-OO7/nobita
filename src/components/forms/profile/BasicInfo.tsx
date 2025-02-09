import * as React from "react";
import { useFormikContext } from "formik";
import Spacer from "@/components/common/Spacer";
import Input from "@/components/Input";
import { ProfileDetailsType } from "@/types";
import Textarea from "@/components/common/TextArea";
import Row from "@/components/common/Row";
import Button from "../../Button";

interface Props {
  profileData: ProfileDetailsType;
}

export default function BasicInfo({ profileData }: Props) {
  const formikContext = useFormikContext<{
    email: string;
    uuid: string;
    name: string;
    gender: string;
    country: string;
    bio: string;
  }>();

  const { getFieldProps, setValues } = formikContext ?? {};

  React.useEffect(() => {
    if (profileData) {
      setValues({
        email: profileData.email || "",
        uuid: profileData.uuid || "",
        name: profileData.name || "",
        gender: profileData.gender || "",
        country: profileData.country || "",
        bio: profileData.bio || "",
      });
    }
  }, [profileData, setValues]);

  if (!formikContext) {
    return null;
  }

  return (
    <section>
      <div className="flex flex-col justify-between space-x-4 ">
        <div className="flex flex-row  gap-2">
          <Input
            label="Name"
            placeholder="Enter name"
            {...getFieldProps?.("name")}
          />
          <Spacer size="xs" />
          <Input
            label="Email"
            className="text-black font-poppins font-normal text-base"
            placeholder="Enter email"
            {...getFieldProps?.("email")}
          />
        </div>

        <div className="flex flex-row  gap-2">
          <Input
            label="Gender"
            placeholder="Enter gender (e.g., Male, Female, Other)"
            {...getFieldProps?.("gender")}
          />
          <Spacer size="xs" />
          <Input
            label="Country"
            placeholder="Enter country"
            {...getFieldProps?.("country")}
          />
        </div>
        <Textarea
          label="Bio"
          placeholder="Enter your bio"
          {...getFieldProps?.("bio")}
        />
        <Row justifyContent="center">
          <Button color="primary" type="submit">
            Submit
          </Button>
        </Row>
      </div>
    </section>
  );
}
