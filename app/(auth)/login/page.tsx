"use client";

import React, { useState } from "react";
import { Form, Formik } from "formik";
import Input from "@/components/common/Input";
import Spacer from "@/components/common/Spacer";
import * as Yup from "yup";
import { LoadingIcon } from "@/assets/images/Loading";
import OtpInput from "react-otp-input";
import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import { LoginApi, OtpSubmitApi } from "@/apis";
import useToast from "@/hooks/useToast";
import Worklist from "../../../src/assets/logo.png";
import Image from "next/image";

const INTIAL_VALUES = {
  email: "",
};

const LoginPage = () => {
  const searchParams = useSearchParams();
  const isRecruiter = searchParams?.get("is_recruiter") === "true";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [showOtp, setSetShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = React.useState(false);
  const router = useRouter();
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const navigateToSignup = React.useCallback(() => {
    router.push(`/signup?is_recruiter=${isRecruiter}`);
  }, [router, isRecruiter]);

  const navigateToHomePage = React.useCallback(() => {
    const homePage = isRecruiter ? "/recruiter" : "/dashboard";
    router.replace(homePage);
  }, [router, isRecruiter]);

  const handleSubmit = React.useCallback(
    ({ email }: typeof INTIAL_VALUES) => {
      setLoading(true);
      setEmail(email);
      localStorage.setItem("email", email);
      return makeApiCall(LoginApi(email))
        .then((response) => {
          console.log(response, "RESPONSE OF OTP SENT");
          if (response?.existingUser == true) {
            setSetShowOtp(true);
            showToast("OTP sent successfully!!", { type: "success" });
          } else {
            showToast("Please signup!!", { type: "info" });
            navigateToSignup();
          }
        })
        .catch((error) => {
          console.error("Login Error:- ", error);
          showToast(error.response?.data, { type: "error" });
          navigateToSignup();
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast, navigateToSignup]
  );

  const otpSubmit = React.useCallback(
    (email: string, otp: string) => {
      setOtpLoading(true);
      return makeApiCall(OtpSubmitApi(email, otp))
        .then((response) => {
          console.log(response, "RESPONSE OF OTP verify");
          if (response?.status == true) {
            showToast("OTP verified successfully!!", { type: "success" });
            if (response?.existingUser == true) {
              localStorage.setItem("authToken", response?.token);
              localStorage.setItem("email", response?.email);
              localStorage.setItem("name", response?.name);
              localStorage.setItem("role", response?.role);
              localStorage.setItem("status", response?.status);
              localStorage.setItem("id", response?.id);
              localStorage.setItem("uuid", response?.uuid);

              navigateToHomePage();
            } else {
              navigateToSignup();
            }
          } else {
            showToast("Please enter valid otp!!", { type: "error" });
          }
        })
        .catch((error) => {
          console.error("OTP VERIFY Error:- ", error);
          showToast("Some error occurred!!", { type: "error" });
        })
        .finally(() => setOtpLoading(false));
    },
    [makeApiCall, navigateToHomePage, navigateToSignup, showToast]
  );

  const onOtpChange = (text: string) => {
    setOtp(text);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image
          src={Worklist}
          alt="logo"
          className={`w-14 sm:w-24 rounded-xl mb-4`}
        />
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <h1 className="text-xl font-medium font-poppins leading-tight tracking-tight text-gray-900 md:text-4xl">
            {isRecruiter ? "Recruiter Login" : "Job Seeker Login"}
          </h1>
        </a>
        <div className="rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          {showOtp ? (
            <div className="flex justify-center items-center text-black">
              <div className="flex flex-col items-center justify-center p-8 text-black w-[80%]">
                <h2 className="text-lg font-medium mb-4">
                  Enter OTP sent to {email}
                </h2>
                <OtpInput
                  value={otp}
                  onChange={onOtpChange}
                  numInputs={6}
                  renderSeparator={
                    <span style={{ margin: "0 0.5rem" }}>-</span>
                  }
                  inputType="number"
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    border: "1px solid #666476",
                    height: "50px",
                    width: "50px",
                    borderRadius: "15px",
                  }}
                />
                <Spacer size="md" />
                <Button
                  color="primary"
                  variant="solid"
                  isLoading={otpLoading}
                  disabled={otp.length < 6}
                  onClick={() => otpSubmit(email, otp)}
                  className="w-full"
                >
                  Verify OTP
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-light font-poppins leading-tight tracking-tight text-gray-900 md:text-2xl">
                {isRecruiter
                  ? "Sign in to your recruiter account"
                  : "Sign in to your account"}
              </h1>
              <p className="text-sm text-gray-600">
                {isRecruiter
                  ? "Access your recruiter dashboard to manage candidates and job postings."
                  : "Access your job seeker dashboard to find your next opportunity."}
              </p>
              <Formik
                initialValues={INTIAL_VALUES}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize
              >
                <Form>
                  <Input
                    label="Your email"
                    placeholder="Enter email"
                    name="email"
                    type="email"
                  />
                  <Spacer size="xs" />
                  {loading ? (
                    <button
                      disabled
                      type="button"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      <LoadingIcon />
                      Sending OTP...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Send OTP
                    </button>
                  )}
                </Form>
              </Formik>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <button
                  onClick={navigateToSignup}
                  className="text-blue-600 hover:underline"
                >
                  {isRecruiter
                    ? "Sign up as recruiter"
                    : "Sign up as job seeker"}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
