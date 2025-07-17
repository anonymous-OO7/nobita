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
  walkIn: Yup.boolean(),
  skills: Yup.array().of(Yup.string()),
  tags: Yup.array().of(Yup.string()),
  currency: Yup.string(),
  groupId: Yup.number(),
  vacancy: Yup.number(),
  hideSalary: Yup.boolean(),
  variablePercentage: Yup.number(),
  applyRedirectUrl: Yup.string(),
  brandedJd: Yup.string(),
  viewCount: Yup.number(),
  applyCount: Yup.number(),
  hideApplyButton: Yup.boolean(),
  showRecruiterDetail: Yup.boolean(),
});

export default function SubmitJob() {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const [companyData, setCompanyData] = React.useState<Option[]>([]);
  const router = useRouter();

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : "user";

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
    walkIn: false,
    minExperience: 0,
    maxExperience: 0,
    skills: [] as string[],
    tags: [] as string[],
    currency: "INR",
    groupId: 0,
    vacancy: 1,
    hideSalary: false,
    variablePercentage: 0,
    applyRedirectUrl: "",
    brandedJd: role === "super_recruiter" ? "false" : "true",
    viewCount: 0,
    applyCount: 0,
    hideApplyButton: false,
    showRecruiterDetail: false,
  });

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
  const tagsOptions: SelectType[] = [
    { value: "urgent", label: "Urgent Hiring" },
    { value: "remote_ok", label: "Remote OK" },
    { value: "relocation", label: "Relocation Assistance" },
    { value: "visa_sponsor", label: "Visa Sponsor" },
    { value: "equity", label: "Equity" },
    { value: "bonus", label: "Performance Bonus" },
  ];
  const currencyOptions: SelectType[] = [
    { value: "INR", label: "Indian Rupee (₹)" },
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
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
    { label: "Contract", value: "contract" },
  ];

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
        walkIn,
        minExperience,
        maxExperience,
        skills,
        tags,
        currency,
        groupId,
        vacancy,
        hideSalary,
        variablePercentage,
        applyRedirectUrl,
        brandedJd,
        viewCount,
        applyCount,
        hideApplyButton,
        showRecruiterDetail,
      } = values;

      const finalPrice = category === "referral_post" ? 0 : price;
      const experienceText = `${minExperience}-${maxExperience} Yrs`;

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
          skills,
          tags,
          currency,
          groupId,
          vacancy,
          hideSalary,
          variablePercentage,
          experienceText,
          applyRedirectUrl,
          brandedJd,
          viewCount,
          applyCount,
          walkIn,
          hideApplyButton,
          showRecruiterDetail
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
      <div className="mx-auto max-w-2xl mt-20">
        <h2 className="mb-4 text-2xl font-normal text-gray-900">
          Create a Free Job Posting
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
                placeholder="Enter company name"
                label="Company Name"
                item={companyData}
                name="companyName"
                onChange={(e) => searchCompanies(e.target.value)}
              />
              <p
                className="mt-4 text-base leading-6 text-blue-500 flex justify-end cursor-pointer"
                onClick={navigateToCreateCompany}
              >
                Can't find your company? Create here
              </p>
              <Spacer size="xs" />
              <Input label="Position" name="position" />
              <Spacer size="xs" />
              <Row>
                <Select label="Job Type" item={dropdownData} name="jobType" />
              </Row>
              <Spacer size="xs" />
              <Row>
                <Input label="Job Location" name="location" />
                <Spacer size="xs" />
                <Select label="Field" item={fieldDropdowndata} name="field" />
              </Row>
              <Input label="Job Link (*optional)" name="job_url" />
              <Spacer size="xs" />
              <RichTextEditor
                name="description"
                label="Description"
                placeholder="Write something..."
              />
              <Spacer size="xs" />
              <Row>
                <Input label="Minimum Pay" name="minPay" type="number" />
                <Input label="Maximum Pay" name="maxPay" type="number" />
                <Select
                  label="Currency"
                  item={currencyOptions}
                  name="currency"
                />
              </Row>
              <Spacer size="xs" />
              <Row>
                <Input
                  label="Minimum Experience"
                  name="minExperience"
                  type="number"
                />
                <Input
                  label="Maximum Experience"
                  name="maxExperience"
                  type="number"
                />
              </Row>
              <Spacer size="xs" />
              <Row>
                <Input label="Vacancy Count" name="vacancy" type="number" />
                <Input
                  label="Variable Pay (%)"
                  name="variablePercentage"
                  type="number"
                />
              </Row>
              <Spacer size="xs" />
              <Input label="Apply Redirect URL" name="applyRedirectUrl" />
              <Input label="Branded JD (true/false)" name="brandedJd" />
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
                <label className="flex items-center gap-2 text-black">
                  <Field type="checkbox" name="walkIn" />
                  Walk-in
                </label>
                <label className="flex items-center gap-2 text-black">
                  <Field type="checkbox" name="hideSalary" />
                  Hide Salary
                </label>
                <label className="flex items-center gap-2 text-black">
                  <Field type="checkbox" name="showRecruiterDetail" />
                  Show Recruiter Detail
                </label>
              </div>
              <Spacer size="xs" />
              <FormikMultiSelect
                name="skills"
                label="Required Skills"
                options={skillsOptions}
              />
              <Spacer size="xs" />
              <FormikMultiSelect
                name="tags"
                label="Job Tags"
                options={tagsOptions}
              />
              <Spacer size="md" />
              <button
                type="submit"
                className="bg-buttonPrimary text-white py-2 px-4 rounded w-full"
                disabled={loading}
              >
                {loading ? "Creating Job..." : "Create Job Posting"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
