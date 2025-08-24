"use client";
import {
  EducationType,
  ProfileDetailsType,
  SocialUrlType,
  WorkExperienceType,
} from "./types";
import { onePiece } from "./utils/AxiosInterceptor";

export const LoginApi = (email: string) => {
  const formData = new FormData();
  formData.append("email", email);

  return onePiece.post("/request-otp", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const OtpSubmitApi = (email: string, otp: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otp", otp);

  return onePiece.post("/verify-otp", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
    },
  });
};

// Function to create a new user
export const CreateUserApi = (
  email: string,
  password: string,
  name: string,
  role: string,
  username: string,
  phone: string,
  gender: string,
  referal_code: string,
  country: string
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", name);
  formData.append("role", role);
  formData.append("username", username);
  formData.append("phone", phone);
  formData.append("gender", gender);
  formData.append("referal_code", referal_code);
  formData.append("country", country);

  return onePiece.post("/signup", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const UserPostApi = (
  title: string,
  text: string,
  tags: string,
  mediaFile: File
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);
  formData.append("mediaType", "image/jpeg");
  formData.append("tags", tags);
  formData.append("mediaFile", mediaFile);

  return onePiece.post("/api/posts/", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const GetAllUserData = () => {
  return onePiece.get("/user", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "text/plain",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const CreateJobApi = (
  status: string,
  companyName: string,
  position: string,
  location: string,
  jobType: string,
  description: string,
  field: string,
  minPay: number,
  maxPay: number,
  price: number,
  category: string,
  job_url: string,
  minExperience: number,
  maxExperience: number,
  remote: boolean,
  hybrid: boolean,
  skills: string[],
  tags: string[],
  currency: string,
  groupId: number,
  vacancy: number,
  hideSalary: boolean,
  variablePercentage: number,
  experienceText: string,
  applyRedirectUrl: string,
  brandedJd: string,
  viewCount: number,
  applyCount: number,
  walkIn: boolean,
  hideApplyButton: boolean,
  showRecruiterDetail: boolean
) => {
  const formData = new FormData();

  formData.append("status", status);
  formData.append("company_code", companyName);
  formData.append("position", position);
  formData.append("location", location);
  formData.append("job_type", jobType);
  formData.append("description", description);
  formData.append("field", field);
  formData.append("min_pay", minPay.toString());
  formData.append("max_pay", maxPay.toString());
  formData.append("price", price.toString());
  formData.append("category", category);
  formData.append("job_url", job_url);
  formData.append("min_experience", minExperience.toString());
  formData.append("max_experience", maxExperience.toString());
  formData.append("remote", remote.toString());
  formData.append("hybrid", hybrid.toString());
  formData.append("currency", currency);
  formData.append("group_id", groupId.toString());
  formData.append("vacancy", vacancy.toString());
  formData.append("hide_salary", hideSalary.toString());
  formData.append("variable_percentage", variablePercentage.toString());
  formData.append("experience_text", experienceText);
  formData.append("apply_redirect_url", applyRedirectUrl);
  formData.append("branded_jd", brandedJd);
  formData.append("view_count", viewCount.toString());
  formData.append("apply_count", applyCount.toString());
  formData.append("walk_in", walkIn.toString());
  formData.append("hide_apply_button", hideApplyButton.toString());
  formData.append("show_recruiter_detail", showRecruiterDetail.toString());

  if (skills?.length > 0) {
    formData.append("skills", JSON.stringify(skills));
  }

  if (tags?.length > 0) {
    formData.append("tags", JSON.stringify(tags));
  }

  return onePiece.post("/create-job", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

//get api for utility claims
export const GetAllJobsList = (
  page: number,
  limit: number,
  search: string,
  filters: Record<string, any> // e.g. { workMode: [1, 2], department: [3], experienceMin: 5, experienceMax: 20 }
) => {
  // Build query params string
  const searchParams = new URLSearchParams();

  // Pagination & search
  if (page !== undefined) searchParams.append("page", String(page));
  if (limit !== undefined) searchParams.append("limit", String(limit));
  if (search) searchParams.append("search", search);

  // Add filters (arrays: multi-select, single values)
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, String(item)));
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  // Compose URL
  const url = `/all-jobs?${searchParams.toString()}`;

  // Axios GET (header for auth only)
  return onePiece.get(url, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const SaveJobApi = (job_id: string) => {
  const formData = new FormData();
  formData.append("job_id", job_id);

  return onePiece.post("/saver", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

export const RemoveSaveJobApi = (job_id: string) => {
  const formData = new FormData();
  formData.append("job_id", job_id);

  return onePiece.post("/unsave", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};
export const GetAllSavedJobsList = () => {
  return onePiece.get(`/saver`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
    },
  });
};

export const ApplyJobAPI = (
  owners_uuid: string,
  cover_letter: string,
  file: File,
  job_id: string
) => {
  const formData = new FormData();
  formData.append("cover", cover_letter);
  formData.append("resume", file);
  formData.append("job_id", job_id);
  formData.append("owners_uuid", owners_uuid);

  return onePiece.post("/apply", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

export const GetAllAppliedJobsList = () => {
  return onePiece.get(`/apply`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

export const GetMyJobsApi = () => {
  return onePiece.get("/myjobs", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

export const UpdateMyJobsStatusApi = (
  job_id: string,
  status: string,
  price: number
) => {
  const formData = new FormData();
  formData.append("id", job_id);
  formData.append("status", status);

  if (price !== undefined) {
    formData.append("price", price.toString());
  }

  return onePiece.post("/myjobs", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
    },
  });
};

export const UpdateProfileApi = (
  uuid: string,
  name: string,
  gender: string,
  country: string,
  bio: string,
  expertise: string,
  seniority: string,
  work_experience: WorkExperienceType[],
  education: EducationType[],
  current_organisation: string,
  tagline: string,
  skill: string[],
  social_urls: SocialUrlType[],
  resume: File | null
) => {
  // Create FormData object
  const formData = new FormData();

  formData.append("uuid", uuid);
  formData.append("name", name);
  formData.append("gender", gender);
  formData.append("country", country);
  formData.append("bio", bio);
  formData.append("expertise", expertise);
  formData.append("seniority", seniority);
  formData.append("current_organisation", current_organisation);
  formData.append("tagline", tagline);

  // Append arrays/objects as JSON strings
  formData.append("work_experience", JSON.stringify(work_experience));
  formData.append("education", JSON.stringify(education));
  formData.append("skill", JSON.stringify(skill));
  formData.append("social_urls", JSON.stringify(social_urls));

  // Append resume file only if it exists
  if (resume) {
    formData.append("resume", resume);
  }

  return onePiece.post("/update-profile", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      user_id: localStorage.getItem("id") || "",
      email: localStorage.getItem("email") || "",
      // Do NOT set Content-Type here; Axios will set `multipart/form-data` boundary automatically
    },
  });
};

export const GetProfileApi = () => {
  return onePiece.get("/get-profile", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email"),
    },
  });
};

export const FeedbackApi = (
  name: string,
  recipient: string,
  subject: string,
  body: string
) => {
  return onePiece.post(
    "/feedback",
    {
      name,
      recipient,
      subject,
      body,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        user_id: localStorage.getItem("id") || "",
        email: localStorage.getItem("email") || "",
      },
    }
  );
};

export const SearchGetCompaniesApi = async (searchText: String) => {
  return onePiece.get("/search-company", {
    params: {
      search: searchText,
    },
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email") || "",
    },
  });
};

export const GetAllUserAppliedJobsList = async () => {
  return onePiece.get(`/all-appliedjobs`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email") || "",
    },
  });
};

export const AddCompanyApi = async (
  logoUrl: string,
  name: string,
  description: string,
  websiteUrl: string,
  industry: string
) => {
  return onePiece.post(
    "/create-company",
    {
      logo_url: logoUrl,
      name: name,
      description: description,
      website_url: websiteUrl,
      industry: industry,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        user_id: localStorage.getItem("id") || "",
        email: localStorage.getItem("email") || "",
      },
    }
  );
};

export const AddReferralRequestApi = async (
  code: string,
  description: string,
  job_link: string,
  cover_letter: string,
  job_role: string,
  status: string
) => {
  return onePiece.post(
    "/create-referralask",
    {
      code: code,
      description: description,
      job_link: job_link,
      cover_letter: cover_letter,
      job_role: job_role,
      status: status,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        user_id: localStorage.getItem("id") || "",
        email: localStorage.getItem("email") || "",
        uuid: `${localStorage.getItem("uuid")}`,
      },
    }
  );
};

export const GetAllCommunityReferralsJobsList = () => {
  return onePiece.get(`/referralask`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
    },
  });
};

export const SendReferralQueryAPI = (
  message: string,
  requester_email: string
) => {
  const formData = new FormData();
  formData.append("message", message);
  formData.append("requester_email", requester_email);

  return onePiece.post("/referral-give", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

//payment
export const GetPaymentAPI = (order_amount: string, order_currency: string) => {
  const formData = new FormData();
  formData.append("order_amount", order_amount);
  formData.append("order_currency", order_currency);
  return onePiece.post(`/payment`, formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email"),
    },
  });
};

export const PaymentVerifyAPI = (order_id: string) => {
  return onePiece.post(
    "/payment-verify",
    { order_id: order_id },
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        user_id: `${localStorage.getItem("id")}`,
        email: localStorage.getItem("email"),
        name: localStorage.getItem("name"),
        uuid: `${localStorage.getItem("uuid")}`,
      },
    }
  );
};

export const GetLatestpaymentApi = () => {
  return onePiece.get("/payment", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email"),
    },
  });
};

export const GetAllUserCredits = async () => {
  return onePiece.get(`/remaining-credits`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email") || "",
    },
  });
};

export const GetAllApplicationsJobsList = (job_uuid: string) => {
  return onePiece.get(`/applications-jobid`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      uuid: job_uuid,
    },
  });
};

export const UpdateApplicantJobsStatusRemarkApi = (
  applicant_id: string,
  job_id: string,
  remark: string,
  status: string
) => {
  // Create a new FormData object and append all required fields
  const formData = new FormData();
  formData.append("uuid", applicant_id);
  formData.append("job_id", job_id);
  formData.append("remark", remark);
  formData.append("status", status);

  // Make the POST request to the API endpoint
  return onePiece.post("/applications-update", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const GetUniversalProfileApi = (user_id: string) => {
  return onePiece.get("/getall-profile", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      user_id: `${user_id}`,
    },
  });
};

export const AddJobsCsvClientApi = (file: File) => {
  const formData = new FormData();

  formData.append("jobs", file);

  return onePiece.post("/admin/add-jobs", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email"),
    },
  });
};

export const AddCompaniesCsvClientApi = (file: File) => {
  const formData = new FormData();

  formData.append("companies", file);

  return onePiece.post("/admin/add-companies", formData, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email"),
    },
  });
};

export const GetAllCompaniesAdminApi = () => {
  return onePiece.get("/admin-getallcompanies", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

//get a company info

export const GetCompanyInfoApi = (company_uuid: string) => {
  return onePiece.get(`/admin-getcompanyinfo/${company_uuid}`, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      uuid: `${localStorage.getItem("uuid")}`,
      email: localStorage.getItem("email"),
    },
  });
};

export interface UpdateCompanyPayload {
  uuid: string;
  logo_url?: string;
  name?: string;
  description?: string;
  website_url?: string;
  industry?: string;
  company_size?: string;
  social_media_links?: string;
  location?: string;
  headquarters_address?: string;
  contact_email?: string;
  contact_phone?: string;
  founded_date?: string;
  company_culture?: string;
  benefits?: string;
  reviews_url?: string;
  glassdoor_url?: string;
  subscription_plan?: string;
  status?: string;
  uploaded_by?: string;
  tech_stack?: string;
  hiring_status?: string;
  last_funding_round?: string;
  employee_growth_rate?: number;
}

export const UpdateCompanyApi = async (payload: UpdateCompanyPayload) => {
  if (!payload.uuid) {
    throw new Error("Company UUID is required");
  }
  return onePiece.post("/admin-update-company", payload, {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      user_id: localStorage.getItem("id") || "",
      email: localStorage.getItem("email") || "",
    },
  });
};

export const GetRecruiterDashboardApi = () => {
  return onePiece.get("/recruiter-dashboard", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

export const DownloadDatabaseDump = () => {
  return onePiece.get("/admin-download-zipped-backup", {
    responseType: "blob",
    headers: {
      "ngrok-skip-browser-warning": "69420",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

export const GetJobInfo = async (uuid: string) => {
  if (!uuid) {
    throw new Error("Job UUID is required");
  }
  return onePiece.post(
    "/job-info",
    { uuid: uuid },
    {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        user_id: localStorage.getItem("id") || "",
        email: localStorage.getItem("email") || "",
      },
    }
  );
};

export const GetDashboardJobsdApi = () => {
  return onePiece.get("/get-public-jobs", {
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });
};
