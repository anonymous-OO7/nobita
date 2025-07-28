"use client";

import * as React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import Select from "@/components/common/Select";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import {
  GetCompanyInfoApi,
  UpdateCompanyApi,
  UpdateCompanyPayload,
} from "@/apis";
import { Company, SelectType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import RichTextEditor from "@/components/formikui/RichTextEditor";
import { error } from "console";

// --- Select options you may extend/change ---
const companySizeOptions: SelectType[] = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "501-1000", label: "501-1000" },
  { value: "1000+", label: "1000+" },
];
const subscriptionPlanOptions: SelectType[] = [
  { value: "free", label: "Free" },
  { value: "basic", label: "Basic" },
  { value: "premium", label: "Premium" },
];
const statusOptions: SelectType[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
const hiringStatusOptions: SelectType[] = [
  { value: "hiring", label: "Hiring" },
  { value: "not_hiring", label: "Not Hiring" },
];
const industryOptions: SelectType[] = [
  { value: "engineering", label: "Engineering" },
  { value: "it", label: "Information Technology" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "finance", label: "Finance" },
  { value: "human_resources", label: "Human Resources" },
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Company Name is required"),
  description: Yup.string().required("Description required"),
  industry: Yup.string().required("Industry is required"),
  company_size: Yup.string().required("Company size required"),
  logo_url: Yup.string().url("Invalid logo URL").nullable(),
  website_url: Yup.string().url("Invalid website URL").nullable(),
  social_media_links: Yup.string().nullable(),
  location: Yup.string().nullable(),
  headquarters_address: Yup.string().nullable(),
  contact_email: Yup.string().email("Invalid email").nullable(),
  contact_phone: Yup.string().nullable(),
  founded_date: Yup.string().nullable(),
  company_culture: Yup.string().nullable(),
  benefits: Yup.string().nullable(),
  reviews_url: Yup.string().url("Invalid reviews URL").nullable(),
  glassdoor_url: Yup.string().url("Invalid Glassdoor URL").nullable(),
  subscription_plan: Yup.string().required("Plan required"),
  status: Yup.string().required("Status required"),
  uploaded_by: Yup.string().nullable(),
  tech_stack: Yup.string().nullable(),
  hiring_status: Yup.string().required("Hiring status required"),
  last_funding_round: Yup.string().nullable(),
  employee_growth_rate: Yup.number().nullable(),
});

const emptyCompanyDetails: Company = {
  ID: 0,
  CreatedAt: "",
  UpdatedAt: "",
  DeletedAt: null,
  uuid: "",
  code: "",
  name: "",
  description: "",
  industry: "",
  company_size: "",
  logo_url: "",
  website_url: "",
  social_media_links: "",
  location: "",
  headquarters_address: "",
  contact_email: "",
  contact_phone: "",
  founded_date: "",
  company_culture: "",
  benefits: "",
  reviews_count: 0,
  aggregate_rating: 0,
  reviews_url: "",
  glassdoor_url: "",
  subscription_plan: "",
  status: "",
  uploaded_by: "",
  tech_stack: "",
  hiring_status: "",
  last_funding_round: "",
  employee_growth_rate: 0,
};

export default function UpdateCompany() {
  const [loading, setLoading] = React.useState(false);
  const [company, setCompany] = React.useState<Company>(emptyCompanyDetails);

  const router = useRouter();
  const searchParams = useSearchParams();
  const companyuuid = searchParams?.get("id") ?? "";
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  React.useEffect(() => {
    async function fetchCompany() {
      if (!companyuuid) return;
      setLoading(true);
      try {
        const response = await makeApiCall(GetCompanyInfoApi(companyuuid));
        if (response && response.data) {
          setCompany(response.data);
        }
      } catch (error) {
        showToast("Failed to fetch company info", { type: "error" });
      } finally {
        setLoading(false);
      }
    }
    fetchCompany();
  }, [companyuuid, makeApiCall, showToast]);

  // Handle update
  const handleSubmit = async (values: Partial<Company>) => {
    if (!values.uuid) {
      showToast("Company UUID is missing. Cannot update.", { type: "error" });
      return;
    }

    setLoading(true);
    try {
      await makeApiCall(UpdateCompanyApi(values as UpdateCompanyPayload))
        .then(() => {
          showToast("Company updated successfully", { type: "success" });
          router.push("/recruiter/admin/company");
        })
        .catch((error) => {
          console.log(error, "Error in updation of company");
          showToast("Company updation failed", { type: "error" });
        });
    } catch (error: any) {
      showToast(error?.message || "Update failed", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (loading && company?.uuid === "")
    return <div className="p-10">Loading...</div>;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl py-8 px-4 lg:py-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Update Company Profile
        </h2>
        <Formik
          initialValues={company}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form className="space-y-4">
              <Input
                label="Company Name"
                name="name"
                value={values.name}
                readOnly
                disabled
              />
              <Spacer orientation="vertical" size="sm" />

              <RichTextEditor
                name="description"
                label="Description"
                placeholder="Write company description..."
              />
              <Spacer size="xs" />

              <Select
                label="Industry"
                item={industryOptions}
                name="industry"
                value={values.industry}
              />
              <Select
                label="Company Size"
                item={companySizeOptions}
                name="company_size"
                value={values.company_size}
              />
              <Input label="Logo URL" name="logo_url" value={values.logo_url} />
              <Input
                label="Website URL"
                name="website_url"
                value={values.website_url}
              />
              <Input
                label="Social Media Links"
                name="social_media_links"
                value={values.social_media_links}
              />
              <Spacer orientation="vertical" size="sm" />
              <Input label="Location" name="location" value={values.location} />
              <Input
                label="Headquarters Address"
                name="headquarters_address"
                value={values.headquarters_address}
              />
              <Spacer orientation="vertical" size="sm" />
              <Input
                label="Contact Email"
                name="contact_email"
                type="email"
                value={values.contact_email}
              />
              <Input
                label="Contact Phone"
                name="contact_phone"
                value={values.contact_phone}
              />
              <Spacer orientation="vertical" size="sm" />
              <Input
                label="Founded Date"
                name="founded_date"
                value={values.founded_date}
                placeholder="YYYY-MM-DD"
              />

              <RichTextEditor
                name="company_culture"
                label="Company Culture"
                placeholder="Write company culture..."
              />

              <RichTextEditor
                name="benefits"
                label="Benefits"
                placeholder="Write company benefits..."
              />
              <Input
                label="Reviews URL"
                name="reviews_url"
                value={values.reviews_url}
              />
              <Input
                label="Glassdoor URL"
                name="glassdoor_url"
                value={values.glassdoor_url}
              />
              <Select
                label="Subscription Plan"
                item={subscriptionPlanOptions}
                name="subscription_plan"
                value={values.subscription_plan}
              />
              <Select
                label="Status"
                item={statusOptions}
                name="status"
                value={values.status}
              />
              <Spacer orientation="vertical" size="sm" />
              <Input
                label="Uploaded By"
                name="uploaded_by"
                value={values.uploaded_by}
                readOnly
                disabled
              />
              <Input
                label="Tech Stack"
                name="tech_stack"
                value={values.tech_stack}
              />
              <Select
                label="Hiring Status"
                item={hiringStatusOptions}
                name="hiring_status"
                value={values.hiring_status}
              />
              <Input
                label="Last Funding Round"
                name="last_funding_round"
                value={values.last_funding_round}
              />
              <Spacer orientation="vertical" size="sm" />
              <Input
                label="Employee Growth Rate"
                name="employee_growth_rate"
                value={values.employee_growth_rate?.toString() || ""}
              />
              <Spacer size="lg" />
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Company"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
