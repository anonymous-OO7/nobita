import * as React from "react";
import Spacer from "@/components/Spacer";
import { SelectType, UserProfile } from "@/types";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import Select from "@/components/common/Select";
import Button from "@/components/Button";
import { MdOutlineWorkOutline } from "react-icons/md";
import { extractFromDate } from "@/utils/utils";

const Expertise: SelectType[] = [
  {
    label: "Data Science",
    value: "data_science",
  },
  {
    label: "Design",
    value: "design",
  },
  {
    label: "Engineering",
    value: "engineering",
  },
  {
    label: "Marketing",
    value: "marketing",
  },
  {
    label: "Product",
    value: "product",
  },
  {
    label: "Sales",
    value: "sales",
  },
];

const SeniorityLevel: SelectType[] = [
  {
    label: "Entry Level",
    value: "entry_level",
  },
  {
    label: "Intermediate",
    value: "intermediate",
  },
  {
    label: "Senior",
    value: "senior",
  },
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Director",
    value: "director",
  },
  {
    label: "Lead",
    value: "lead",
  },
  {
    label: "Executive",
    value: "executive",
  },
  {
    label: "Founder",
    value: "founder",
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

export default function Experience({ user, onSubmit }: Props) {
  const INTIAL_VALUES = {
    expertise: user?.expertise,
    senioritylevel: user?.seniority_level,
    workExperience: user?.work_experience || [],
  };

  const [loading, setLoading] = React.useState(false); // eslint-disable-line

  const validationSchema = Yup.object().shape({
    expertise: Yup.string().required("Expertise is required"),
    senioritylevel: Yup.string().required("Senoority level is required"),
    workExperience: Yup.array().of(
      Yup.object().shape({
        role: Yup.string().required("Role is required"),
        company: Yup.string().required("Company is required"),
        industry: Yup.array().of(Yup.string()).required("Industry is required"),
        startDate: Yup.date().required("Start date is required"),
        endDate: Yup.date(),
        brief: Yup.string().required("Brief description is required"),
      }),
    ),
  });
  // eslint-disable-next-line
  const handleExpertiseType = React.useCallback((value: any) => {
    console.log("UPDATING THE gender with--", "expertise", "---", value);
  }, []);
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
          <Select
            name="expertise"
            item={Expertise}
            label="What’s your expertise?"
            placeholder="Expertise"
            onSelect={handleExpertiseType}
            className="text-black font-poppins"
            selectionMode="multiple"
          />
          <Spacer size="xs" />
          <Select
            name="senioritylevel"
            item={SeniorityLevel}
            label="Seniority Level"
            placeholder="Expertise"
            onSelect={handleExpertiseType}
            className="text-black font-poppins"
          />
          <p className="block mb-2 text-sm font-normal font-poppins mt-5 text-gray-900 dark:text-white">
            Work Experience
          </p>
          <FieldArray name="workExperience">
            {/* eslint-disable-next-line */}
            {({ insert, remove, push }) => (
              <div>
                {user?.work_experience &&
                  user?.work_experience?.length > 0 &&
                  user?.work_experience.map((experience, index) => (
                    <div key={index}>
                      <div className="">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row justify-center items-center">
                            <MdOutlineWorkOutline />
                            <p className="ml-2 text-sm font-normal font-poppins text-black">
                              {experience.role}
                            </p>
                          </div>

                          <div className="flex flex-row justify-center items-center">
                            <p className="text-sm font-normal font-poppins text-black">
                              {extractFromDate(experience.start_date, "year")}
                              --
                            </p>
                            <p className="ml-2 text-sm font-normal font-poppins text-black">
                              {experience.end_date
                                ? extractFromDate(experience.end_date, "year")
                                : " Present"}
                            </p>
                          </div>
                        </div>
                        <p className="ml-6 text-sm font-normal font-poppins text-black">
                          {experience.company}
                        </p>
                      </div>

                      <Spacer size="xs" />
                    </div>
                  ))}
                <Button
                  onClick={() =>
                    push({
                      role: "",
                      company: "",
                      industry: [],
                      startDate: "",
                      endDate: "",
                      brief: "",
                    })
                  }
                >
                  Add Work Experience
                </Button>
              </div>
            )}
          </FieldArray>

          {/* education */}

          <p className="block mb-2 text-sm font-normal font-poppins mt-5 text-gray-900 dark:text-white">
            Education
          </p>
          <FieldArray name="education">
            {/* eslint-disable-next-line */}
            {({ insert, remove, push }) => (
              <div>
                {user?.education &&
                  user?.education?.length > 0 &&
                  user?.education.map((education, index) => (
                    <div key={index}>
                      <div className="">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row justify-center items-center">
                            <MdOutlineWorkOutline />
                            <p className="ml-2 text-sm font-normal font-poppins text-black">
                              {education.university_or_college}
                            </p>
                          </div>
                          <p className="ml-6 text-sm font-normal font-poppins text-black">
                            {education.timeline}
                          </p>
                        </div>
                        <p className="ml-6 text-sm font-normal font-poppins text-black">
                          {education.field_of_study}
                        </p>
                      </div>

                      <Spacer size="xs" />
                    </div>
                  ))}
                <Button
                  onClick={() =>
                    push({
                      role: "",
                      company: "",
                      industry: [],
                      startDate: "",
                      endDate: "",
                      brief: "",
                    })
                  }
                >
                  Add Education
                </Button>
              </div>
            )}
          </FieldArray>
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
