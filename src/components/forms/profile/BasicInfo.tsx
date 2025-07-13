import * as React from "react";
import { useFormikContext } from "formik";
import Spacer from "@/components/common/Spacer";
import Input from "@/components/Input";
import { ProfileDetailsType } from "@/types";
import Textarea from "@/components/common/TextArea";
import Row from "@/components/common/Row";
import Button from "../../Button";
import RichTextEditor from "@/components/formikui/RichTextEditor";

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
      <div className="flex flex-col justify-between">
        <div className="flex flex-row  gap-2 mb-4">
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
            readOnly={true}
          />
        </div>

        <div className="flex flex-row  gap-2 mb-4 ">
          <Input
            label="Gender"
            placeholder="Enter gender"
            {...getFieldProps?.("gender")}
          />
          <Spacer size="xs" />
          <Input
            label="Country"
            placeholder="Enter country"
            {...getFieldProps?.("country")}
          />
        </div>
        <RichTextEditor
          label="Bio"
          placeholder="Enter your bio"
          size="large"
          helperText="You can use bold, italics, lists, etc."
          {...getFieldProps?.("bio")}
        />
      </div>
    </section>
  );
}
