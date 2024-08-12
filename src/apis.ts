"use client";
import { onePiece } from "./utils/AxiosInterceptor";

export const LoginApi = (email: string) => {
  const formData = new FormData();
  formData.append("email", email);

  return onePiece.post("/request-otp", formData, {
    headers: {
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
  organisation: string,
  title: string,
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
  formData.append("organisation", organisation);
  formData.append("title", title);
  formData.append("country", country);

  return onePiece.post("/signup", formData, {
    headers: {
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
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const GetAllUserData = () => {
  return onePiece.get("/user", {
    headers: {
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
  totalEmp: number,
  logoUrl: string
) => {
  const formData = new FormData();
  formData.append("status", status);
  formData.append("company_name", companyName);
  formData.append("position", position);
  formData.append("location", location);
  formData.append("job_type", jobType);
  formData.append("description", description);
  formData.append("field", field);
  formData.append("min_pay", minPay.toString());
  formData.append("max_pay", maxPay.toString());
  formData.append("price", price.toString());
  formData.append("total_emp", totalEmp.toString());
  formData.append("logo_url", logoUrl);

  return onePiece.post("/create-job", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      uuid: `${localStorage.getItem("uuid")}`,
    },
  });
};

//get api for utility claims
export const GetAllJobsList = () => {
  return onePiece.get(`/all-jobs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

export const SaveJobApi = (job_id: string) => {
  const formData = new FormData();
  formData.append("job_id", job_id);

  return onePiece.post("/saver", formData, {
    headers: {
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
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
    },
  });
};

export const GetAllAppliedJobsList = () => {
  return onePiece.get(`/apply`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      user_id: `${localStorage.getItem("id")}`,
    },
  });
};
