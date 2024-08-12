import * as React from "react";
import Spacer from "@/components/Spacer";
import { SelectType, UserProfile } from "@/types";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/TextArea";
import { IoCloseSharp } from "react-icons/io5";
import Button from "@/components/Button";

const Gender: SelectType[] = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

interface Props {
  user: UserProfile | undefined;
  onSubmit: () => void;
  onUpdateInfo: <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) => void;
}

export default function BasicInfo({ user, onSubmit, onUpdateInfo }: Props) {
  const INTIAL_VALUES = {
    name: user?.name,
    gender: user?.gender,
    country: user?.country,
    bio: user?.bio,
  };

  const [loading, setLoading] = React.useState(false); // eslint-disable-line

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    gender: Yup.string().required("Gender is required"),
    bio: Yup.mixed().required("Bio is required"),
  });
  const handleGenderType = React.useCallback(
    // eslint-disable-next-line
    (value: any) => {
      console.log("UPDATING THE gender with--", "gender", "---", value);

      onUpdateInfo("gender", value);
    },
    [onUpdateInfo],
  );
  // eslint-disable-next-line
  const handleInputChange = React.useCallback((name: any, text: string) => {
    console.log("UPDATING THE FIELD with--", name, "---", text);
    onUpdateInfo(name, text);
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
          {user?.image && (
            <div className="flex flex-row items-center relative w-[10] mx-auto  mb-5">
              <IoCloseSharp className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer" />
              <img
                src={
                  typeof user?.image === "string" && user.image !== null
                    ? user.image
                    : "https://cdn1.vectorstock.com/i/1000x1000/77/10/men-faceless-profile-vector-13567710.jpg"
                }
                className="h-20 object-contain rounded-2xl"
              />
              <div className="ml-5">
                <p className="text-sm  font-medium font-poppins text-green-800">
                  Update Profile Picture
                </p>
                <p className="text-xs  font-normal font-poppins">
                  Make sure that file is less than 2 MB
                </p>
              </div>
            </div>
          )}
          <Input
            label="Your Full Name"
            placeholder="Enter full name"
            name="name"
            onChange={handleInputChange}
          />
          <Spacer size="xs" />
          <Select
            name="gender"
            item={Gender}
            label="Select Gender"
            placeholder="Gender"
            onSelect={handleGenderType}
          />
          <Spacer size="xs" />
          <Input
            label="Which country do you live in?*"
            placeholder="Country"
            name="country"
            onChange={handleInputChange}
          />
          <Spacer size="xs" />
          <Textarea
            label="Bio"
            placeholder="write something about yourself!!"
            name="bio"
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
