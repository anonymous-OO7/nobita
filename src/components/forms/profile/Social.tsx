import * as React from "react";
import { useFormikContext, FieldArray } from "formik";
import Spacer from "@/components/common/Spacer";
import Input from "@/components/Input";
import { ProfileDetailsType, SocialUrlType } from "@/types";
import Row from "@/components/common/Row";
import Button from "@/components/Button";

interface Props {
  profileData: ProfileDetailsType;
}

export default function Social({ profileData }: Props) {
  const formikContext = useFormikContext<{ social_urls: SocialUrlType[] }>();
  const { getFieldProps, setValues } = formikContext ?? {};

  React.useEffect(() => {
    if (profileData) {
      setValues({
        social_urls: profileData.social_urls || [],
      });
    }
  }, [profileData, setValues]);

  if (!formikContext) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col">
        <p className="block mb-2 text-sm font-normal font-poppins mt-5 text-gray-900">
          Social URLs
        </p>

        <FieldArray name="social_urls">
          {({ push, remove }) => (
            <div className="space-y-4">
              {formikContext.values.social_urls?.map((_, index) => (
                <div
                  key={index}
                  className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                >
                  <Row className="gap-4">
                    <Input
                      label="Platform"
                      placeholder="e.g. LinkedIn, GitHub"
                      {...getFieldProps(`social_urls[${index}].platform`)}
                      className="w-1/2"
                    />
                    <Input
                      label="URL"
                      placeholder="e.g. https://linkedin.com/in/username"
                      {...getFieldProps(`social_urls[${index}].url`)}
                      className="w-1/2"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      ✖
                    </button>
                  </Row>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => push({ platform: "", url: "" })}
                className="w-full"
              >
                + Add Social URL
              </Button>
            </div>
          )}
        </FieldArray>
      </div>
    </section>
  );
}
