"use client";

import React from "react";

import { Company, JobListing } from "@/types";
import ListCompany from "@/components/pages/admin/mycompany/CompanyList";
import Spacer from "@/components/common/Spacer";
import useApi from "@/hooks/useApi";
import { GetAllCompaniesAdminApi } from "@/apis";

const ActiveRentals = () => {
  const { makeApiCall } = useApi();

  const [companies, setCompaniesNumbers] = React.useState<Company[]>([]);
  const [invoiceLoading, setInvoiceLoading] = React.useState(false);

  // Rental schedule get API call
  React.useEffect(() => {
    setInvoiceLoading(true);
    makeApiCall(GetAllCompaniesAdminApi())
      .then((response: any) => {
        if (response !== undefined) {
          console.log(response, "Get all companies klisr");
          setCompaniesNumbers(response?.data);
        }
      })
      .catch((error: Error) => console.error(error))
      .finally(() => setInvoiceLoading(false));
  }, [makeApiCall]);

  return (
    <div className="text-black bg-pageBackground px-2 min-h-screen">
      <Spacer size="sm" />
      <ListCompany eppOrders={companies} loading={invoiceLoading} />
    </div>
  );
};

export default ActiveRentals;
