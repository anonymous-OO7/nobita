"use client";

import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import useApi from "@/hooks/useApi";
import { CreateJobApi, SearchGetCompaniesApi } from "@/apis";
import useToast from "@/hooks/useToast";
import Select from "@/components/common/Select";
import { Option, SelectType } from "@/types";
import Row from "@/components/common/Row";
import SearchSelect from "@/components/common/SearchSelect";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/formikui/RichTextEditor";
import FormikMultiSelect from "@/components/formikui/FormikMultiSelect";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  position: Yup.string().required("Job Title is required"),
  location: Yup.string().required("Location is required"),
  jobType: Yup.string().required("Job Type is required"),
  description: Yup.string().required("Description is required"),
  field: Yup.string().required("Field is required"),
  minPay: Yup.number().required("Minimum pay is required"),
  maxPay: Yup.number().required("Maximum pay is required"),
  price: Yup.number(),
  category: Yup.string().required("Category is required"),
  minExperience: Yup.number().min(0),
  maxExperience: Yup.number().min(0),
  remote: Yup.boolean(),
  hybrid: Yup.boolean(),
  skills: Yup.array().of(Yup.string()),
});

export default function SubmitJob() {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const [jobtype, setType] = React.useState("");
  const [jobCategory, setCategory] = React.useState("");
  const [companyData, setCompanyData] = React.useState<Option[]>([]);
  const router = useRouter();

  const skillsOptions: SelectType[] = [
    { value: "Go", label: "Go" },
    { value: "Docker", label: "Docker" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "PostgreSQL", label: "PostgreSQL" },
    { value: "Kubernetes", label: "Kubernetes" },
    { value: "Python", label: "Python" },
    { value: "AWS", label: "AWS" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Java", label: "Java" },
    { value: "Redis", label: "Redis" },
    { value: "SQL", label: "SQL" },
  ];

  const fieldDropdowndata: SelectType[] = [
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "finance", label: "Finance" },
    { value: "human_resources", label: "Human Resources" },
    { value: "information_technology", label: "Information Technology" },
    { value: "customer_service", label: "Customer Service" },
    { value: "operations", label: "Operations" },
    { value: "design", label: "Design" },
    { value: "product_management", label: "Product Management" },
    { value: "business_development", label: "Business Development" },
    { value: "data_science", label: "Data Science" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "consulting", label: "Consulting" },
    { value: "supply_chain", label: "Supply Chain & Logistics" },
    { value: "media", label: "Media & Communications" },
    { value: "real_estate", label: "Real Estate" },
    { value: "government", label: "Government & Public Sector" },
    { value: "hospitality", label: "Hospitality & Tourism" },
    { value: "construction", label: "Construction & Architecture" },
    { value: "pharmaceutical", label: "Pharmaceutical & Biotechnology" },
    { value: "telecommunications", label: "Telecommunications" },
    { value: "energy", label: "Energy & Utilities" },
    { value: "others", label: "Others" },
  ];

  const dropdownData: SelectType[] = [
    { label: "Full Time", value: "fulltime" },
    { label: "Part Time", value: "part_time" },
    { label: "Internship", value: "internship" },
    { label: "Free Lancing", value: "freelancing" },
  ];

  const dropdownCategory: SelectType[] = [
    { label: "Job post", value: "job_post" },
    { label: "Referral", value: "referral_post" },
  ];

  const [InitialValues, setInitialValues] = React.useState({
    status: "active",
    companyName: "",
    position: "",
    location: "",
    jobType: "fulltime",
    description: "",
    field: "",
    owner: "",
    minPay: 0,
    maxPay: 0,
    price: 0,
    category: "referral_post",
    job_url: "",
    remote: false,
    hybrid: false,
    minExperience: 0,
    maxExperience: 0,
    skills: [] as string[],
  });

  const handleSubmit = React.useCallback(
    async (values: typeof InitialValues) => {
      const {
        status,
        companyName,
        position,
        location,
        jobType,
        description,
        field,
        minPay,
        maxPay,
        price,
        category,
        job_url,
        remote,
        hybrid,
        minExperience,
        maxExperience,
        skills,
      } = values;

      const finalPrice = category === "referral_post" ? 0 : price;

      setLoading(true);
      return makeApiCall(
        CreateJobApi(
          status,
          companyName,
          position,
          location,
          jobType,
          description,
          field,
          minPay,
          maxPay,
          finalPrice,
          category,
          job_url,
          minExperience,
          maxExperience,
          remote,
          hybrid,
          skills
        )
      )
        .then(() => {
          showToast("Job created successfully!!", { type: "success" });
          router.push("/dashboard/myjobs");
        })
        .catch(() => {
          showToast("Some error occurred!!", { type: "error" });
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, router, showToast]
  );

  const handleShowSource = (data: string) => setType(data);
  const handleSetCategory = (data: string) => setCategory(data);

  React.useEffect(() => {
    makeApiCall(SearchGetCompaniesApi("")).then((response: any) => {
      let companyList = response.data.map((comp: any) => ({
        value: comp.code,
        label: comp.name,
      }));
      setCompanyData(companyList);
    });
  }, [makeApiCall]);

  const searchCompanies = (text: String) => {
    makeApiCall(SearchGetCompaniesApi(text)).then((response: any) => {
      let companyList = response.data.map((comp: any) => ({
        value: comp.code,
        label: comp.name,
      }));
      setCompanyData(companyList);
    });
  };

  const navigateToCreateCompany = () => {
    router.replace("/dashboard/createcompany");
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-2xl font-normal text-gray-900">
          Create a Job Referal
        </h2>
        <Formik
          initialValues={InitialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ values }) => (
            <Form>
              <Spacer size="md" orientation="horizontal" />
              <SearchSelect
                placeholder="Enter company name (e.g., Microsoft)"
                label="Company Name"
                item={companyData}
                name="companyName"
                className="bg-white p-1 text-black font-poppins font-light text-lg"
                size="sm"
                onChange={(e) => searchCompanies(e.target.value)}
              />
              <p
                className="mt-4 text-base leading-6 text-blue-500 flex justify-end cursor-pointer"
                onClick={navigateToCreateCompany}
              >
                Can't find your company? create here
              </p>
              <Spacer size="xs" />
              <Input
                className="bg-white  p-1  text-black font-poppins font-light text-lg"
                label="Position"
                name="position"
                placeholder="Enter position (e.g., Backend Developer)"
              />
              <Spacer size="xs" />
              <Row>
                <Select
                  label="Job Category"
                  item={dropdownCategory}
                  name="category"
                  onSelect={handleSetCategory}
                  placeholder="Job category"
                  className="text-black font-poppins font-light px-1"
                />
                <Select
                  label="Job Type"
                  item={dropdownData}
                  name="jobType"
                  onSelect={handleShowSource}
                  placeholder="Job type"
                  className="text-black font-poppins font-light px-1"
                />
              </Row>
              <Spacer size="xs" />
              <Row>
                <Input
                  className="bg-white p-1 text-black font-poppins font-light text-lg"
                  label="Job Location"
                  name="location"
                />
                <Spacer size="xs" />
                <Select
                  label="Field"
                  placeholder="Select a professional field"
                  item={fieldDropdowndata}
                  name="field"
                  size="sm"
                />
              </Row>
              <Input
                className="bg-white p-1 text-black font-poppins font-light text-lg"
                label="Job Link (*optional)"
                name="job_url"
              />
              <Spacer size="xs" />
              <RichTextEditor
                name="description"
                label="Description"
                placeholder="Write something..."
                size="large"
                helperText="You can use bold, italics, lists, etc."
              />
              <Spacer size="xs" />
              <Row>
                <Input
                  className="bg-white p-1 text-black font-poppins font-light text-lg"
                  label="Minimum Pay (LPA)"
                  name="minPay"
                  type="number"
                />
                <Spacer size="xs" />
                <Input
                  className="bg-white p-1 text-black font-poppins font-light text-lg"
                  label="Maximum Pay (LPA)"
                  name="maxPay"
                  type="number"
                />
              </Row>
              <Spacer size="xs" />
              {/* <Input
                className="bg-white  p-1 text-black font-poppins font-light text-lg"
                label="Price of referring (amount at which you want to refer a person in this company)"
                name="price"
                type="number"
              /> */}
              {/* <Spacer size="xs" /> */}
              <Row>
                <Input
                  className="bg-white p-1 text-black font-poppins font-light text-lg"
                  label="Minimum Experience (Years)"
                  name="minExperience"
                  type="number"
                />
                <Spacer size="xs" />
                <Input
                  className="bg-white p-1 text-black font-poppins font-light text-lg"
                  label="Maximum Experience (Years)"
                  name="maxExperience"
                  type="number"
                />
              </Row>
              <Spacer size="xs" />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-black">
                  <Field type="checkbox" name="remote" />
                  Remote
                </label>
                <label className="flex items-center gap-2 text-black">
                  <Field type="checkbox" name="hybrid" />
                  Hybrid
                </label>
              </div>
              <Spacer size="xs" />
              <FormikMultiSelect
                name="skills"
                label="Skills"
                placeholder="Select required skills"
                options={skillsOptions}
              />
              <Spacer size="xs" />
              <button
                type="submit"
                className="bg-buttonPrimary font-poppins text-white font-normal py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
