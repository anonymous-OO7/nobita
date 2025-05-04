"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import { GetLatestpaymentApi } from "@/apis";
import Worklist from "../../../src/assets/logo.png";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Button } from "@nextui-org/react";
import { LatestPaymentType } from "@/types";

const PaymentSuccessful = () => {
  const [paymentDetails, setPaymentdetails] =
    React.useState<LatestPaymentType>();
  const router = useRouter();
  const { makeApiCall } = useApi();

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/dashboard");
  }, [router]);

  React.useEffect(() => {
    makeApiCall(GetLatestpaymentApi())
      .then((response) => {
        setPaymentdetails(response?.data);
        confetti({
          particleCount: 250,
          spread: 80,
        });
      })
      .catch((error) => console.error(error));
  }, [makeApiCall]);

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-12 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center border border-gray-200">
        <div className="flex justify-center mb-6">
          <Image
            src={Worklist}
            alt="Worklist Logo"
            className="w-20 rounded-xl"
          />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Below are your payment details.
        </p>

        {paymentDetails && (
          <div className="text-sm text-left bg-gray-100 p-6 rounded-xl shadow-inner mb-8 border border-dashed border-gray-300 text-black space-y-3">
            <div className="flex justify-between">
              <span className="font-semibold">Order ID:</span>
              <span>{paymentDetails.order_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Amount Paid:</span>
              <span>
                ₹{paymentDetails.order_amount} {paymentDetails.order_currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Credits Added:</span>
              <span>{paymentDetails.credit_added}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Customer Name:</span>
              <span>{paymentDetails.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{paymentDetails.customer_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phone:</span>
              <span>{paymentDetails.customer_phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span className="text-green-600 font-semibold capitalize">
                {paymentDetails.order_status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Date:</span>
              <span>{new Date(paymentDetails.CreatedAt).toLocaleString()}</span>
            </div>
          </div>
        )}

        <Button
          onClick={navigateToHomePage}
          color="success"
          variant="solid"
          className="font-semibold text-white"
        >
          Go to Dashboard
        </Button>
      </div>
    </section>
  );
};

export default PaymentSuccessful;
