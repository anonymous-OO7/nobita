"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import useApi from "@/hooks/useApi";
import { CreateJobApi, SearchGetCompaniesApi } from "@/apis";
import useToast from "@/hooks/useToast";
import Select from "@/components/common/Select";
import { Option, SelectType } from "@/types";
import Textarea from "@/components/common/TextArea";
import Row from "@/components/common/Row";
import SearchSelect from "@/components/common/SearchSelect";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  position: Yup.string().required("Job Title is required"),
  location: Yup.string().required("Location is required"),
  jobType: Yup.string().required("Job Type is required"),
  description: Yup.string().required("Description is required"),
  field: Yup.string().required("Field is required"),
  minPay: Yup.number().required("Minimum pay is required"),
  maxPay: Yup.number().required("Maximum pay is required"),
  price: Yup.number().required("Price is required"),
  category: Yup.string().required("Field is required"),
});

export default function SubmitJob() {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const [jobtype, setType] = React.useState("");
  const [jobCategory, setCategory] = React.useState("");
  const router = useRouter();

  const [companyData, setCompanyData] = React.useState<Option[]>([]);

  const fieldDropdowndata: SelectType[] = React.useMemo(
    () => [
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
    ],
    []
  );

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
    category: "referral",
  });
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
  const handleSuccessPosting = React.useCallback(() => {
    router.push(`/dashboard/myjobs`);
  }, [router]);

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
      } = values;

      setLoading(true);
      return makeApiCall(
        CreateJobApi(
          status,
          companyName,
          position,
          location,
          jobtype,
          description,
          field,
          minPay,
          maxPay,
          price,
          jobCategory
        )
      )
        .then((response) => {
          console.log(response, "RESPONSE OF Create job");
          showToast("Job created successfully!!", { type: "success" });
          handleSuccessPosting();
        })
        .catch((error) => {
          console.error("Job creation Error:- ", error);
          showToast("Some error occurred!!", { type: "error" });
        })
        .finally(() => setLoading(false));
    },
    [showToast, makeApiCall, jobtype, jobCategory]
  );

  const handleShowSource = React.useCallback((data: string) => {
    console.log(data, "selected job type");
    setType(data);
  }, []);
  const handleSetCategory = React.useCallback((data: string) => {
    console.log(data, "selected job category");
    setCategory(data);
  }, []);

  React.useEffect(() => {
    makeApiCall(SearchGetCompaniesApi(""))
      // eslint-disable-next-line
      .then((response: any) => {
        console.log(response, "Response  of all companies");
        var count = Object.keys(response?.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].code,
            label: response.data[i].name,
          });
        }
        setCompanyData(cityArray);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("finally");
      });
  }, [makeApiCall]);

  const searchCompanies = React.useCallback((text: String) => {
    makeApiCall(SearchGetCompaniesApi(text))
      // eslint-disable-next-line
      .then((response: any) => {
        console.log(response, "Response  of all companies");
        var count = Object.keys(response?.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].code,
            label: response.data[i].name,
          });
        }
        setCompanyData(cityArray);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("finally");
      });
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-2xl font-normal text-gray-900">
          Create a Job Referal
        </h2>
        <Formik
          initialValues={InitialValues}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
          validationSchema={validationSchema}
          enableReinitialize
        >
          {() => (
            <Form>
              <div>
                <Spacer size="md" orientation="horizontal" />
                <SearchSelect
                  placeholder="Enter company name (e.g., Microsoft)"
                  label="Company Name"
                  item={companyData}
                  name="companyName"
                  className="bg-white p-1 text-black font-poppins font-light text-lg"
                  size="sm"
                  onChange={(e) => {
                    console.log(e, "Texttt");
                    searchCompanies(e.target.value);
                  }}
                />
                <Spacer size="xs" />
                <Input
                  className="bg-white  p-1  text-black font-poppins font-light text-lg"
                  label="Position"
                  name="position"
                  placeholder="	Enter position (e.g., Backend Developer)"
                />
              </div>
              <Spacer size="xs" />

              <Row>
                <Select
                  label="Job Category"
                  item={dropdownCategory}
                  name="category"
                  onSelect={handleSetCategory}
                  placeholder="Job category (referral or normal job posting"
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

              <Input
                className="bg-white  p-1 text-black font-poppins font-light text-lg"
                label="Job Location"
                name="location"
              />

              <Spacer size="xs" />

              <Textarea
                name="description"
                label="Description"
                size="large"
                // className="text-black font-poppins font-light text-lg"
              />
              <Spacer size="xs" />

              <Select
                label="Field"
                placeholder="Select a professional field (e.g., Engineering, Marketing)"
                item={fieldDropdowndata}
                name="field"
                size="sm"
              />
              <Spacer size="xs" />

              <Input
                className="bg-white p-1 text-black font-poppins font-light text-lg"
                label="Minimum Pay (Lakhs per Annum(LPA))"
                name="minPay"
                type="number"
              />
              <Spacer size="xs" />

              <Input
                className="bg-white p-1 text-black font-poppins font-light text-lg"
                label="Maximum Pay (Lakhs per Annum(LPA))"
                name="maxPay"
                type="number"
              />
              <Spacer size="xs" />

              <Input
                className="bg-white  p-1 text-black font-poppins font-light text-lg"
                label="Price of referring (amount at which you want to refer a person in this company)"
                name="price"
                type="number"
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
