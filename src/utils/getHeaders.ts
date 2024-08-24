import { AxiosHeaders } from "axios";

export const getHeaders = (contentType?: string) => {
  const email = localStorage.getItem("email") ?? "";
  const role = localStorage.getItem("role") ?? "";
  const token = localStorage.getItem("authToken") ?? "";
  const headers = new AxiosHeaders();
  if (contentType !== undefined) {
    headers.set("Content-Type", contentType);
  }
  if (email !== "") {
    headers.set("email", email);
  }
  if (role !== "") {
    headers.set("role", role);
  }
  if (token !== "") {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};
