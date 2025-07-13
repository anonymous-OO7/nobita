"use client";

import React from "react";

import { GetMyJobsApi } from "../../../../src/apis";
import OrdersEpp from "../../../../src/components/pages/recruiter/myjobs/List";
import useApi from "../../../../src/hooks/useApi";
import Spacer from "../../../../src/components/Spacer";
import { JobListing } from "@/types";

const ActiveRentals = () => {
  const { makeApiCall } = useApi();

  const [jobs, setJobseNumbers] = React.useState<JobListing[]>([]);
  const [invoiceLoading, setInvoiceLoading] = React.useState(false);

  // Rental schedule get API call
  React.useEffect(() => {
    setInvoiceLoading(true);
    makeApiCall(GetMyJobsApi())
      .then((response: any) => {
        if (response !== undefined) {
          setJobseNumbers(response?.orders);
        }
      })
      .catch((error: Error) => console.error(error))
      .finally(() => setInvoiceLoading(false));
  }, [makeApiCall]);

  return (
    <div className="text-black bg-pageBackground px-2 min-h-screen">
      <Spacer size="sm" />
      <OrdersEpp eppOrders={jobs} loading={invoiceLoading} />
    </div>
  );
};

export default ActiveRentals;
