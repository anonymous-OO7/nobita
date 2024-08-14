"use client";

import React, { useState } from "react";
import { Form, Formik } from "formik";
import Input from "@/components/common/Input";
import Spacer from "@/components/common/Spacer";
import * as Yup from "yup";
import { Logo } from "@/assets/images/Logo";
import { LoadingIcon } from "@/assets/images/Loading";
import OtpInput from "react-otp-input";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import { LoginApi, OtpSubmitApi } from "@/apis";
import useToast from "@/hooks/useToast";
const INTIAL_VALUES = {
  email: "",
};
const LoginPage = () => {
  const [email, setEmail] = useState(""); // eslint-disable-line
  const [loading, setLoading] = React.useState(false); // eslint-disable-line
  const [showOtp, setSetShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = React.useState(false);
  const router = useRouter();

  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const navigateToSignup = React.useCallback(() => {
    router.push(`/signup`);
  }, [router]);

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/");
  }, [router]);

  const handleSubmit = React.useCallback(
    ({ email }: typeof INTIAL_VALUES) => {
      setLoading(true);
      setEmail(email);
      localStorage.setItem("email", email);

      return makeApiCall(LoginApi(email))
        .then((response) => {
          console.log(response, "RESPONSE OF OTP SENT");
          console.log("LOGIN SUCCESS");
          setSetShowOtp(true);
          showToast("OTP sent successfully!!", { type: "success" });
        })
        .catch((error) => {
          console.error("Login Error:- ", error);
          showToast("Some error occurred!!", { type: "error" });
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const otpSubmit = React.useCallback(
    (email: string, otp: string) => {
      setOtpLoading(true); // Set otpLoading to true
      return makeApiCall(OtpSubmitApi(email, otp))
        .then((response) => {
          console.log(response, "RESPONSE OF OTP verify");
          if (response?.status == true) {
            console.log("OTP VERIfy SUCCESS");
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
            console.log("OTP invalid ");
            showToast("Please enter valid otp!!", { type: "error" });
          }
        })
        .catch((error) => {
          console.error("OTP VERIFY Error:- ", error);
          showToast("Some error occurred!!", { type: "error" });
          return false;
        })
        .finally(() => setOtpLoading(false));
    },
    [makeApiCall, navigateToHomePage, navigateToSignup, showToast]
  );

  const onOtpChange = (text: string) => {
    console.log(text, "OTPPP");
    setOtp(text);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <Logo /> */}
          <h1 className="text-xl font-semibold font-poppins leading-tight tracking-tight text-gray-900 md:text-2xl">
            Log In
          </h1>
        </a>
        <div className="  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          {showOtp ? (
            <div className="flex justify-center items-center text-black">
              <div className="flex flex-col items-center justify-center p-8  text-black">
                <OtpInput
                  value={otp}
                  onChange={(text) => onOtpChange(text)}
                  numInputs={6}
                  renderSeparator={
                    <span style={{ margin: "0 0.5rem" }}>-</span>
                  }
                  renderInput={(props, index) => <input {...props} />} // eslint-disable-line
                  // inputStyle="  border border-gray-300 rounded-md  py-4 px-1  mx-4 text-black"
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
                  isLoading={otpLoading}
                  disabled={otp.length >= 4 ? false : true}
                  onClick={() => otpSubmit(email, otp)}
                >
                  Loading
                </Button>
              </div>
            </div>
          ) : (
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-light font-poppins leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <Formik
                initialValues={INTIAL_VALUES}
                onSubmit={handleSubmit}
                validateOnBlur
                validateOnChange
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
                      Loading...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Send otp
                    </button>
                  )}
                </Form>
              </Formik>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
