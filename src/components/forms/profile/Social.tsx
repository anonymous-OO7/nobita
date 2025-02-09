import * as React from "react";
import { useFormikContext, FieldArray } from "formik";
import Spacer from "@/components/common/Spacer";
import Input from "@/components/Input";
import { ProfileDetailsType, SocialUrlType } from "@/types";
import { Input as InputText } from "@nextui-org/input";
import Row from "@/components/common/Row";
import Button from "@/components/Button";

interface Props {
  profileData: ProfileDetailsType;
}

export default function Social({ profileData }: Props) {
  const formikContext = useFormikContext<{ social_urls: SocialUrlType[] }>();

  const { getFieldProps, setValues } = formikContext ?? {};
  const [isSocialModalOpen, setSocialModalOpen] = React.useState(false);
  const [newSocialUrl, setNewSocialUrl] = React.useState<SocialUrlType>({
    platform: "",
    url: "",
  });

  React.useEffect(() => {
    if (profileData) {
      setValues({
        social_urls: profileData.social_urls || [],
      });
    }
  }, [profileData, setValues]);

  const handlesocial_urlsChange = (
    field: keyof SocialUrlType,
    value: string
  ) => {
    setNewSocialUrl((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveUrl = () => {
    formikContext.setFieldValue("social_urls", [
      ...formikContext.values.social_urls,
      newSocialUrl,
    ]);
    setNewSocialUrl({
      platform: "",
      url: "",
    });
    setSocialModalOpen(false);
  };

  if (!formikContext) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col">
        <div>
          <p className="block mb-2 text-sm font-normal font-poppins mt-5 text-gray-900">
            Social URLs
          </p>
          <FieldArray name="social">
            {({ push }) => (
              <div>
                {formikContext.values.social_urls?.map((social, index) => (
                  <div key={index} className="mb-4">
                    {social.platform && social.url ? (
                      <div>
                        <p className="font-semibold text-gray-900">
                          {social.platform}:{" "}
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500"
                          >
                            {social.url}
                          </a>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-row space-x-4">
                          <Input
                            label={`Platform ${index + 1}`}
                            placeholder="Enter platform (e.g., LinkedIn, GitHub)"
                            {...getFieldProps(`social[${index}].platform`)}
                          />
                          <Spacer size="xs" />
                          <Input
                            label={`URL ${index + 1}`}
                            placeholder="Enter URL"
                            {...getFieldProps(`social[${index}].url`)}
                          />
                        </div>
                      </div>
                    )}
                    <Spacer size="xs" />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setSocialModalOpen(true)}
                  className="text-blue-500"
                >
                  Add Social URL
                </button>
              </div>
            )}
          </FieldArray>
          <Row justifyContent="center">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Row>
          {isSocialModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Add Social URL</h2>
                <div className="space-y-4">
                  <InputText
                    label="Platform"
                    placeholder="Enter platform (e.g., LinkedIn, GitHub)"
                    value={newSocialUrl.platform}
                    onChange={(e) =>
                      handlesocial_urlsChange("platform", e.target.value)
                    }
                  />
                  <InputText
                    label="URL"
                    placeholder="Enter URL"
                    value={newSocialUrl.url}
                    onChange={(e) =>
                      handlesocial_urlsChange("url", e.target.value)
                    }
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setSocialModalOpen(false)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveUrl}
                    className="text-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
