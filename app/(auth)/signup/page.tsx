"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import Spacer from "@/components/common/Spacer";
import { LoadingIcon } from "@/assets/images/Loading";
import Select from "@/components/common/Select";
import { SelectType } from "@/types";
import useApi from "@/hooks/useApi";
import { nextLocalStorage } from "@/utils/nextLocalStorage";
import { CreateUserApi } from "@/apis";
import useToast from "@/hooks/useToast";
import Image from "next/image";
import Worklist from "../../../src/assets/logo.png";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const genderOptions: SelectType[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const INITIAL_VALUES = {
  name: "",
  email: nextLocalStorage()?.getItem("email") ?? "",
  password: "",
  gender: "",
  phone: "",
  referal_code: "",
  country: "",
  username: "",
  role: "normal", // Default role
};

export default function SignUp() {
  const searchParams = useSearchParams();
  const isRecruiter = searchParams?.get("is_recruiter") === "true";
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const emailLocal = nextLocalStorage()?.getItem("email");
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  React.useEffect(() => {
    if (emailLocal === "") {
      localStorage.clear();
      router.replace("/login");
    }
  }, [emailLocal, router]);

  const navigateToHomePage = React.useCallback(() => {
    // Redirect to different pages based on role
    const homePage = isRecruiter ? "/recruiter" : "/dashboard";
    router.replace(homePage);
  }, [router, isRecruiter]);

  const handleSubmit = React.useCallback(
    async (values: typeof INITIAL_VALUES) => {
      setLoading(true);

      // Set role based on isRecruiter flag
      const userRole = isRecruiter ? "recruiter" : "normal";
      const submissionValues = { ...values, role: userRole };

      try {
        const response = await makeApiCall(
          CreateUserApi(
            submissionValues.email,
            submissionValues.password,
            submissionValues.name,
            submissionValues.role,
            submissionValues.username,
            submissionValues.phone,
            submissionValues.gender,
            submissionValues.referal_code,
            submissionValues.country
          )
        );

        if (response?.status === true) {
          localStorage.setItem("authToken", response?.token);
          localStorage.setItem("email", response?.email);
          localStorage.setItem("name", response?.name);
          localStorage.setItem("role", response?.role);
          localStorage.setItem("status", response?.status);
          localStorage.setItem("id", response?.id.toString());
          localStorage.setItem("uuid", response?.uuid);
          showToast("User created successfully!!", {
            type: "success",
          });
          navigateToHomePage();
        }
      } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
        if (error?.response?.data?.message) {
          showToast(error.response.data.message, { type: "error" });
        } else {
          showToast("Some error occurred!!", { type: "error" });
        }
      } finally {
        setLoading(false);
      }
    },
    [makeApiCall, navigateToHomePage, showToast, isRecruiter]
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string().required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
  });

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <Image
          src={Worklist}
          alt="logo"
          className={`w-14 sm:w-24 rounded-xl mb-4`}
        />
        <h2 className="mb-4 text-2xl font-poppins font-normal text-gray-900">
          {isRecruiter ? "Recruiter Sign Up" : "Job Seeker Sign Up"}
        </h2>
        <p className="mb-6 text-gray-600">
          {isRecruiter
            ? "Create your recruiter account to find the best candidates for your company."
            : "Create your account to find your dream job and connect with employers."}
        </p>

        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <Input label="Name" placeholder="Name" name="name" />
            <Spacer size="xs" />
            <Input
              label="Username"
              placeholder="Enter Username"
              name="username"
            />
            <Spacer size="xs" />
            <Input
              label="Password"
              placeholder="Enter Password"
              name="password"
              type="password"
            />
            <Spacer size="xs" />
            <Input label="Phone Number" placeholder="Phone" name="phone" />
            <Spacer size="xs" />
            <Input label="Email" placeholder="Email" name="email" />
            <Spacer size="xs" />
            <Select
              name="gender"
              label="Gender"
              placeholder="Select your gender"
              item={genderOptions}
              className="bg-white text-black rounded-md"
            />
            <Spacer size="xs" />
            <Input
              label="Referal Code (* enter referral code if any)"
              placeholder="Enter Referal Code"
              name="referal_code"
              tooltip="*Optional Enter any referral code shared by your friend. You both will be rewarded by credits"
            />
            <Spacer size="xs" />
            <Input label="Country" placeholder="Country" name="country" />
            <Spacer size="xs" />

            {isRecruiter && (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  By signing up as a recruiter, you agree to our terms of
                  service for employers.
                </p>
              </>
            )}

            <div className="flex justify-center items-center">
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <LoadingIcon />
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isRecruiter
                    ? "Sign Up as Recruiter"
                    : "Sign Up as Job Seeker"}
                </button>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
