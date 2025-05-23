"use client";

import React, { useCallback, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { GetPaymentAPI, PaymentVerifyAPI } from "@/apis";
import { Coins, Zap, ShieldCheck, TrendingUp, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const Payment = () => {
  const [orderId, setOrderId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [basicLoading, setBasicLoading] = useState(false);
  const [proLoading, setProLoading] = useState(false);
  const [ultimateLoading, setUltimateLoading] = useState(false);

  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const router = useRouter();

  const navigateToPaymentSuccessPage = React.useCallback(() => {
    router.replace("/payment-success");
  }, [router]);

  const verifyPayment = useCallback(
    async (orderIdToVerify) => {
      let attempts = 0;
      const maxAttempts = 5;

      while (attempts < maxAttempts) {
        try {
          const response = await makeApiCall(PaymentVerifyAPI(orderIdToVerify));
          console.log(
            response,
            `Attempt ${attempts + 1} - payment verify response`
          );
          if (
            response.order_status === "PAID" ||
            response.status_code === 200
          ) {
            showToast("Payment successful! 🎉", { type: "success" });
            navigateToPaymentSuccessPage();

            return;
          } else {
            showToast("Payment could not be verified.", { type: "error" });
            return;
          }
        } catch (err) {
          attempts++;
          const error = err;
          const message =
            error?.response?.data?.message ||
            `Attempt ${attempts} failed. Retrying...`;

          console.warn(message);

          if (attempts === maxAttempts) {
            showToast("Verification failed after multiple attempts.", {
              type: "error",
            });
          } else {
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        }
      }
    },
    [makeApiCall, showToast]
  );

  const handleBuyNow = useCallback(
    async (orderAmount, orderCurrency, packType) => {
      if (
        localStorage.getItem("email") == "" ||
        localStorage.getItem("uuid") == "" ||
        localStorage.getItem("authToken") == ""
      ) {
        router.replace("/login");
        return;
      }
      if (packType === "basic") setBasicLoading(true);
      if (packType === "pro") setProLoading(true);
      if (packType === "ultimate") setUltimateLoading(true);

      try {
        const response = await makeApiCall(
          GetPaymentAPI(orderAmount.toString(), orderCurrency)
        );
        const data = response?.data;

        if (data?.payment_session_id && data?.cf_order_id) {
          setSessionId(data.payment_session_id);
          setOrderId(data.cf_order_id);

          const mode = process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox";
          const cashfree = await load({ mode });
          const checkoutOptions = {
            paymentSessionId: data.payment_session_id,
            redirectTarget: "_modal",
          };

          const res = await cashfree.checkout(checkoutOptions);
          console.log("Payment result:", res);

          if (data.order_id) {
            verifyPayment(data.order_id);
          } else {
            console.error(
              "Original order_id is missing in the backend response."
            );
            showToast(
              "Payment initiated, but could not get original order ID for verification.",
              { type: "warning" }
            );
          }
        } else {
          showToast("Failed to get session ID or order ID from backend", {
            type: "error",
          });
        }
      } catch (err) {
        const error = err;
        showToast(error?.response?.data?.message || "Some error occurred!", {
          type: "error",
        });
      } finally {
        if (packType === "basic") setBasicLoading(false);
        if (packType === "pro") setProLoading(false);
        if (packType === "ultimate") setUltimateLoading(false);
      }
    },
    [makeApiCall, showToast, verifyPayment]
  );

  return (
    <section className="flex items-center justify-center bg-white">
      <div
        className="p-4 sm:px-10 flex flex-col justify-center items-center text-base min-h-screen mx-auto"
        id="pricing"
      >
        <h3 className="text-xl sm:text-4xl font-semibold text-center text-black font-poppins flex gap-2 justify-center mb-4 mt-7">
          Get Workist Credits – Buy Chances to Apply for Referrals!
        </h3>

        <h1 className="text-base sm:text-xl font-semibold text-center text-black font-poppins flex gap-2 justify-center mb-4 mt-2">
          Credits let you apply to referrals. Want more? checkout the plans now
        </h1>
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* BASIC PLAN */}
          <div className="ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10">
            <div className="flex items-center justify-between gap-x-4">
              <h3 className="text-gray-900 text-2xl font-semibold leading-8">
                Basic
              </h3>
            </div>
            <p className="mt-4 text-base leading-6 text-gray-600 flex items-center gap-2">
              <Zap size={18} /> 1 Credit – Ideal to Try
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                ₹499*
                {/* ₹1* */}
              </span>
            </p>
            <button
              onClick={() => handleBuyNow(499, "INR", "basic")} // Original amount commented out
              // onClick={() => handleBuyNow(1, "INR", "basic")} // Test amount
              disabled={basicLoading}
              className="text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300 mt-6 block rounded-md py-2 px-3 text-center text-base font-medium leading-6"
            >
              {basicLoading ? "Processing..." : "Buy now"}
            </button>
            <ul className="mt-8 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Coins size={18} /> 1 Credit
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} /> Apply to any job referral
              </li>
            </ul>
          </div>

          {/* PRO PACK */}
          <div className="ring-2 ring-blue-600 rounded-3xl p-8 xl:p-10">
            <div className="flex items-center justify-between gap-x-4">
              <h3 className="text-blue-600 text-2xl font-semibold leading-8">
                Pro Pack
              </h3>
              <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold text-blue-600">
                Most Popular
              </p>
            </div>
            <p className="mt-4 text-base leading-6 text-gray-600 flex items-center gap-2">
              <TrendingUp size={18} /> 5 Credits – Great for active users
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                ₹1999*
                {/* ₹2* */}
              </span>
            </p>
            <button
              onClick={() => handleBuyNow(1999.0, "INR", "pro")} // Original amount commented out
              // onClick={() => handleBuyNow(2, "INR", "pro")} // Test amount
              disabled={proLoading}
              className="bg-blue-600 text-white shadow-sm hover:bg-blue-500 mt-6 block rounded-md py-2 px-3 text-center text-base font-medium leading-6"
            >
              {proLoading ? "Processing..." : "Buy now"}
            </button>
            <ul className="mt-8 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Coins size={18} /> 5 Credits
              </li>
              <li className="flex items-center gap-2">
                <Star size={18} /> Priority Access
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} /> Apply anytime
              </li>
            </ul>
          </div>

          {/* ULTIMATE PLAN */}
          <div className="ring-1 ring-gray-200 rounded-3xl p-8 xl:p-10">
            <div className="flex items-center justify-between gap-x-4">
              <h3 className="text-gray-900 text-2xl font-semibold leading-8">
                Ultimate
              </h3>
            </div>
            <p className="mt-4 text-base leading-6 text-gray-600 flex items-center gap-2">
              <Star size={18} /> 25 Credits – Best for power users
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                ₹4499*
                {/* ₹3* */}
              </span>
            </p>
            <button
              onClick={() => handleBuyNow(4499.0, "INR", "ultimate")} // Original amount commented out
              // onClick={() => handleBuyNow(3, "INR", "ultimate")} // Test amount
              disabled={ultimateLoading}
              className="text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300 mt-6 block rounded-md py-2 px-3 text-center text-base font-medium leading-6"
            >
              {ultimateLoading ? "Processing..." : "Buy now"}
            </button>
            <ul className="mt-8 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Coins size={18} /> 25 Credits
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp size={18} /> Lowest price/credit
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={18} /> Access to Premium Referrals
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
