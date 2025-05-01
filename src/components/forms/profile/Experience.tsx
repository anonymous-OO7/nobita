import * as React from "react";
import { useFormikContext, FieldArray } from "formik";
import Spacer from "@/components/common/Spacer";
import { Input as InputText } from "@nextui-org/input";
import {
  EducationType,
  ProfileDetailsType,
  SelectType,
  WorkExperienceType,
} from "@/types";
import Row from "@/components/common/Row";
import Button from "@/components/Button";
import Select from "@/components/common/Select";
import RDatePicker from "@/components/common/RNDatePicker";
import { DateValue } from "@heroui/react";

interface Props {
  profileData: ProfileDetailsType;
}

function Modal({
  isOpen,
  title,
  children,
  onCancel,
  onSave,
}: {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSave: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-between mt-4">
          <button onClick={onCancel} className="text-gray-500">
            Cancel
          </button>
          <button onClick={onSave} className="text-blue-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Experience({ profileData }: Props) {
  const formik = useFormikContext<{
    expertise: string;
    seniority: string;
    work_experience: WorkExperienceType[];
    education: EducationType[];
  }>();

  const [workModalOpen, setWorkModalOpen] = React.useState(false);
  const [eduModalOpen, setEduModalOpen] = React.useState(false);

  const fieldDropdowndata: SelectType[] = React.useMemo(
    () => [
      { value: "fulltime", label: "Full Time" },
      { value: "part_time", label: "Part Time" },
      { value: "internship", label: "Internship" },
      { value: "trainee", label: "Trainee" },
    ],
    []
  );

  const [newWork, setNewWork] = React.useState<WorkExperienceType>({
    role: "",
    company: "",
    employmentType: "",
    duration: { start: "", end: "", years: 0, current: false },
    location: "",
    skills: [],
  });

  const [newEdu, setNewEdu] = React.useState<EducationType>({
    universityName: "",
    degree: "",
    duration: { start: "", end: "", years: 0, current: false },
    skills: [],
  });

  React.useEffect(() => {
    if (profileData) {
      formik.setValues({
        expertise: profileData.expertise || "",
        seniority: profileData.seniority || "",
        work_experience: profileData.work_experience || [],
        education: profileData.education || [],
      });
    }
  }, [profileData]);

  const handleChange = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    path: string,
    value: any
  ) => {
    const parts = path.split(".");
    setter((prev: any) => {
      const updated = { ...prev };
      parts.reduce((acc, key, idx) => {
        if (idx === parts.length - 1) {
          acc[key] = value;
        } else {
          acc[key] = acc[key] || {};
        }
        return acc[key];
      }, updated);
      return updated;
    });
  };

  const saveWorkExperience = () => {
    formik.setFieldValue("work_experience", [
      ...formik.values.work_experience,
      newWork,
    ]);
    setNewWork({
      role: "",
      company: "",
      employmentType: "",
      duration: { start: "", end: "", years: 0, current: false },
      location: "",
      skills: [],
    });
    setWorkModalOpen(false);
  };

  const saveEducation = () => {
    formik.setFieldValue("education", [...formik.values.education, newEdu]);
    setNewEdu({
      universityName: "",
      degree: "",
      duration: { start: "", end: "", years: 0, current: false },
      skills: [],
    });
    setEduModalOpen(false);
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-row space-x-4">
        <div className="flex-1">
          <InputText
            label="Expertise"
            placeholder="Enter expertise"
            {...formik.getFieldProps("expertise")}
          />
          <Spacer size="xs" />
        </div>
        <div className="flex-1">
          <InputText
            label="Seniority Level"
            placeholder="Enter seniority level"
            {...formik.getFieldProps("seniority")}
          />
          <Spacer size="xs" />
        </div>
      </div>

      <div>
        <p className="text-sm font-normal font-poppins mt-5 text-gray-900">
          Work Experience
        </p>
        <FieldArray name="work_experience">
          {({ remove }) => (
            <div className="space-y-4">
              {formik.values.work_experience?.map((exp, i) => (
                <div
                  key={i}
                  className="p-5 bg-white shadow-md rounded-xl border border-gray-200 flex justify-between items-start gap-4 font-poppins"
                >
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {exp.role} at{" "}
                      <span className="text-blue-600">{exp.company}</span>
                    </h3>
                    <p className="text-sm text-gray-700 capitalize">
                      {exp.employmentType}
                    </p>
                    <p className="text-sm text-gray-700 capitalize">
                      {exp.location}
                    </p>
                    <p className="text-sm text-gray-700 capitalize">
                      {exp.duration.start} – {exp.duration.end || "Present"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-gray-800">Years:</span>{" "}
                      {exp.duration.years}
                    </p>
                    <p className="text-sm text-gray-700 capitalize">
                      <span className="font-medium text-gray-800">Skills:</span>{" "}
                      {exp.skills.join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(i)}
                    className="text-red-500 hover:text-red-700 font-semibold text-lg transition"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setWorkModalOpen(true)}
                className="w-64 py-2.5 px-6 bg-blue-600 text-white text-sm font-medium font-poppins rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
              >
                + Add New Work Experience
              </button>
            </div>
          )}
        </FieldArray>
      </div>

      <div>
        <p className="text-sm font-normal font-poppins mt-5 text-gray-900">
          Education
        </p>
        <FieldArray name="education">
          {({ remove }) => (
            <div className="space-y-4">
              {formik.values.education?.map((edu, i) => (
                <div
                  key={i}
                  className="p-5 bg-white shadow-md rounded-xl border border-gray-200 flex justify-between items-start gap-4 font-poppins"
                >
                  <div className="space-y-1.5">
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {edu.degree} from {edu.universityName}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      <span className="font-medium">Duration:</span>{" "}
                      {edu.duration.start} - {edu.duration.end || "Present"}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      <span className="font-medium">Years:</span>{" "}
                      {edu.duration.years}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      <span className="font-medium">Skills:</span>{" "}
                      {edu.skills.join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(i)}
                    className="text-red-500 hover:text-red-700 font-semibold text-lg transition"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEduModalOpen(true)}
                className="w-64 py-2.5 px-5 bg-blue-600 text-white font-poppins font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
              >
                + Add New Education
              </button>
            </div>
          )}
        </FieldArray>
      </div>

      <Modal
        isOpen={workModalOpen}
        title="Add Work Experience"
        onCancel={() => setWorkModalOpen(false)}
        onSave={saveWorkExperience}
      >
        <InputText
          label="Title (role)"
          value={newWork.role}
          onChange={(e) => handleChange(setNewWork, "role", e.target.value)}
        />
        <InputText
          label="Company Name"
          value={newWork.company}
          onChange={(e) => handleChange(setNewWork, "company", e.target.value)}
        />
        <Spacer size="sm" />
        <Select
          label="Employment Type"
          placeholder="Select type"
          item={fieldDropdowndata}
          name="field"
          size="sm"
          onChange={(e) =>
            handleChange(setNewWork, "employmentType", e.target.value)
          }
        />
        <InputText
          label="Location"
          value={newWork.location}
          onChange={(e) => handleChange(setNewWork, "location", e.target.value)}
        />
        <RDatePicker
          name="start_date"
          placeholder="Start Date"
          label="Start Date"
          onDateChange={(val) => {
            handleChange(setNewWork, "duration.start", val ?? "");
          }}
        />
        <RDatePicker
          name="end_date"
          placeholder="End Date"
          label="End Date"
          onDateChange={(val) =>
            handleChange(setNewWork, "duration.end", val ?? "")
          }
        />
        <InputText
          label="Skills"
          placeholder="Comma separated"
          value={newWork.skills.join(", ")}
          onChange={(e) =>
            handleChange(
              setNewWork,
              "skills",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
        />
      </Modal>

      <Modal
        isOpen={eduModalOpen}
        title="Add Education"
        onCancel={() => setEduModalOpen(false)}
        onSave={saveEducation}
      >
        <InputText
          label="University Name"
          value={newEdu.universityName}
          onChange={(e) =>
            handleChange(setNewEdu, "universityName", e.target.value)
          }
        />
        <InputText
          label="Degree"
          value={newEdu.degree}
          onChange={(e) => handleChange(setNewEdu, "degree", e.target.value)}
        />
        <RDatePicker
          name="edu_start_date"
          placeholder="Start Date"
          label="Start Date"
          onDateChange={(val) =>
            handleChange(setNewEdu, "duration.start", val ?? "")
          }
        />
        <RDatePicker
          name="edu_end_date"
          placeholder="End Date"
          label="End Date"
          onDateChange={(val) =>
            handleChange(setNewEdu, "duration.end", val ?? "")
          }
        />
        <InputText
          label="Skills"
          placeholder="Comma separated"
          value={newEdu.skills.join(", ")}
          onChange={(e) =>
            handleChange(
              setNewEdu,
              "skills",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
        />
      </Modal>
    </section>
  );
}
