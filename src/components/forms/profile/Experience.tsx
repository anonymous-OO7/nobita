import * as React from "react";
import { useFormikContext, FieldArray } from "formik";
import Spacer from "@/components/common/Spacer";
import { Input as InputText } from "@nextui-org/input";
import { EducationType, ProfileDetailsType, WorkExperienceType } from "@/types";
import Row from "@/components/common/Row";
import Button from "@/components/Button";

interface Props {
  profileData: ProfileDetailsType;
}

export default function Experience({ profileData }: Props) {
  const formikContext = useFormikContext<{
    expertise: string;
    senioritylevel: string;
    workExperience: WorkExperienceType[];
    education: EducationType[];
  }>();

  const { getFieldProps, setValues } = formikContext ?? {};

  React.useEffect(() => {
    if (profileData) {
      setValues({
        expertise: profileData.expertise || "",
        senioritylevel: profileData.seniority || "",
        workExperience: profileData.work_experience || [],
        education: profileData.education || [],
      });
    }
  }, [profileData, setValues]);

  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] =
    React.useState(false);
  const [newWorkExperience, setNewWorkExperience] =
    React.useState<WorkExperienceType>({
      role: "",
      company: "",
      employmentType: "",
      duration: { start: "", end: "", years: 0 },
      location: "",
      skills: [],
    });

  const [isEducationModalOpen, setIsEducationModalOpen] = React.useState(false);
  const [newEducation, setNewEducation] = React.useState<EducationType>({
    universityName: "",
    degree: "",
    duration: { start: "", end: "", years: 0 },
    skills: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleWorkExperienceChange = (field: string, value: any) => {
    // eslint-disable-next-line no-param-reassign
    const fieldParts = field.split(".");

    setNewWorkExperience((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let updatedWorkExperience = { ...prev };

      fieldParts.reduce((obj, part, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (index === fieldParts.length - 1) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          obj[part] = value;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          obj[part] = obj[part] || {};
        }
        return obj[part];
      }, updatedWorkExperience as any); // eslint-disable-line @typescript-eslint/no-explicit-any

      return updatedWorkExperience;
    });
  };

  const handleSaveWorkExperience = () => {
    formikContext.setFieldValue("workExperience", [
      ...formikContext.values.workExperience,
      newWorkExperience,
    ]);
    setNewWorkExperience({
      role: "",
      company: "",
      employmentType: "",
      duration: { start: "", end: "", years: 0 },
      location: "",
      skills: [],
    });
    setIsWorkExperienceModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEducationChange = (field: string, value: any) => {
    // eslint-disable-next-line no-param-reassign
    const fieldParts = field.split(".");

    setNewEducation((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let updatedEducation = { ...prev };

      fieldParts.reduce((obj, part, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (index === fieldParts.length - 1) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          obj[part] = value;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          obj[part] = obj[part] || {};
        }
        return obj[part];
      }, updatedEducation as any); // eslint-disable-line @typescript-eslint/no-explicit-any

      return updatedEducation;
    });
  };

  const handleSaveEducation = () => {
    formikContext.setFieldValue("education", [
      ...formikContext.values.education,
      newEducation,
    ]);
    setNewEducation({
      universityName: "",
      degree: "",
      duration: { start: "", end: "", years: 0 },
      skills: [],
    });
    setIsEducationModalOpen(false);
  };

  if (!formikContext) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col">
        {/* Expertise & Seniority Inputs */}
        <div className="flex flex-row space-x-4">
          <div className="flex-1">
            <InputText
              label="Expertise"
              placeholder="Enter expertise"
              {...getFieldProps?.("expertise")}
            />
            <Spacer size="xs" />
          </div>
          <div className="flex-1">
            <InputText
              label="Seniority Level"
              placeholder="Enter your seniority level"
              {...getFieldProps?.("senioritylevel")}
            />
            <Spacer size="xs" />
          </div>
        </div>

        {/* Work Experience Section */}
        <div>
          <div>
            <p className="block mb-2 text-sm font-normal font-poppins mt-5 text-gray-900">
              Work Experience
            </p>
          </div>

          <FieldArray name="workExperience">
            {({ insert, remove, push }) => (
              <div>
                {formikContext.values.workExperience?.map(
                  (experience, index) => (
                    <div key={index} className="mb-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {experience.role} at {experience.company}
                        </p>
                        <p className="text-gray-700">
                          {experience.employmentType}
                        </p>
                        <p className="text-gray-700">{experience.location}</p>
                        <p className="text-gray-700">
                          {experience.duration.start} -{" "}
                          {experience.duration.end || "Present"}
                        </p>
                        <p className="text-gray-700">
                          Years: {experience.duration.years}
                        </p>
                        <p className="text-gray-700">
                          Skills: {experience.skills.join(", ")}
                        </p>
                      </div>
                      <Spacer size="xs" />
                    </div>
                  )
                )}
                <button
                  type="button"
                  onClick={() => setIsWorkExperienceModalOpen(true)}
                  className="text-blue-500 hover:underline"
                >
                  Add New Work Experience
                </button>
              </div>
            )}
          </FieldArray>

          {isWorkExperienceModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Add Work Experience</h2>
                <div className="space-y-4">
                  <InputText
                    label="Company Name"
                    placeholder="Enter company name"
                    value={newWorkExperience.company}
                    onChange={(e) =>
                      handleWorkExperienceChange("company", e.target.value)
                    }
                  />
                  <InputText
                    label="Role"
                    placeholder="Enter role"
                    value={newWorkExperience.role}
                    onChange={(e) =>
                      handleWorkExperienceChange("role", e.target.value)
                    }
                  />
                  <InputText
                    label="Employment Type"
                    placeholder="Enter employment type"
                    value={newWorkExperience.employmentType}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        "employmentType",
                        e.target.value
                      )
                    }
                  />
                  <InputText
                    label="Location"
                    placeholder="Enter location"
                    value={newWorkExperience.location}
                    onChange={(e) =>
                      handleWorkExperienceChange("location", e.target.value)
                    }
                  />
                  <InputText
                    label="Start Date"
                    placeholder="Enter start date"
                    value={newWorkExperience.duration.start}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        "duration.start",
                        e.target.value
                      )
                    }
                  />
                  <InputText
                    label="End Date"
                    placeholder="Enter end date"
                    value={newWorkExperience.duration.end}
                    onChange={(e) =>
                      handleWorkExperienceChange("duration.end", e.target.value)
                    }
                  />
                  <InputText
                    label="Skills"
                    placeholder="Enter skills (comma separated)"
                    value={newWorkExperience.skills.join(", ")}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        "skills",
                        e.target.value.split(",")
                      )
                    }
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsWorkExperienceModalOpen(false)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveWorkExperience}
                    className="text-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div>
          <p className="block mb-2 text-sm font-normal font-poppins mt-5 text-gray-900">
            Education
          </p>
          <FieldArray name="education">
            {({ insert, remove, push }) => (
              <div>
                {formikContext.values.education?.map((education, index) => (
                  <div key={index} className="mb-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {education.degree} from {education.universityName}
                      </p>
                      <p className="text-gray-700">
                        Duration: {education.duration.start} -{" "}
                        {education.duration.end || "Present"}
                      </p>
                      <p className="text-gray-700">
                        Years: {education.duration.years}
                      </p>
                      <p className="text-gray-700">
                        Skills: {education.skills.join(", ")}
                      </p>
                    </div>
                    <Spacer size="xs" />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setIsEducationModalOpen(true)}
                  className="text-blue-500 hover:underline"
                >
                  Add New Education
                </button>
              </div>
            )}
          </FieldArray>
          <Row justifyContent="center">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Row>

          {/* Modal for adding new Education */}
          {isEducationModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Add Education</h2>
                <div className="space-y-4">
                  <InputText
                    label="University Name"
                    placeholder="Enter university name"
                    value={newEducation.universityName}
                    onChange={(e) =>
                      handleEducationChange("universityName", e.target.value)
                    }
                  />
                  <InputText
                    label="Degree"
                    placeholder="Enter degree"
                    value={newEducation.degree}
                    onChange={(e) =>
                      handleEducationChange("degree", e.target.value)
                    }
                  />
                  <InputText
                    label="Start Date"
                    placeholder="Enter start date"
                    value={newEducation.duration.start}
                    onChange={(e) =>
                      handleEducationChange("duration.start", e.target.value)
                    }
                  />
                  <InputText
                    label="End Date"
                    placeholder="Enter end date"
                    value={newEducation.duration.end}
                    onChange={(e) =>
                      handleEducationChange("duration.end", e.target.value)
                    }
                  />
                  <InputText
                    label="Skills"
                    placeholder="Enter skills (comma separated)"
                    value={newEducation.skills.join(", ")}
                    onChange={(e) =>
                      handleEducationChange("skills", e.target.value.split(","))
                    }
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsEducationModalOpen(false)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEducation}
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
