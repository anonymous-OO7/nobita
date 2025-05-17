"use client";

import React from "react";

import { Applications, JobListing } from "@/types";
import Spacer from "@/components/common/Spacer";
import useApi from "@/hooks/useApi";
import { useRouter, useSearchParams } from "next/navigation";
import { GetAllApplicationsJobsList } from "@/apis";
import ApplicationsList from "@/components/pages/myjobs/ApplicationsList";
import { useDisclosure } from "@heroui/react";

const JobApplication = () => {
  const { makeApiCall } = useApi();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();

  const application_uuid = searchParams?.get("id") ?? "";
  const [loading, setLoading] = React.useState(false);

  const [jobApplications, setJobAppliaction] = React.useState<Applications[]>(
    []
  );
  const [invoiceLoading, setInvoiceLoading] = React.useState(false);
  // Rental schedule get API call
  React.useEffect(() => {
    setInvoiceLoading(true);
    makeApiCall(GetAllApplicationsJobsList(application_uuid))
      .then((response: any) => {
        if (response !== undefined) {
          setJobAppliaction(response?.data);
        }
      })
      .catch((error: Error) => console.error(error))
      .finally(() => setInvoiceLoading(false));
  }, [makeApiCall, application_uuid]);

  // eslint-disable-next-line
  const navigateToClientCode = React.useCallback(
    (clientId: React.Key) => {
      console.log(clientId, "Going to client code");
      router.push(`/dashboard/clients/${clientId}`);
    },
    [router]
  );

  return (
    <div className="text-black bg-pageBackground px-2 min-h-screen">
      <Spacer size="sm" />
      <ApplicationsList
        applicants={jobApplications}
        loading={invoiceLoading}
        onOpen={onOpen}
        application_uuid={application_uuid}
        onRowAction={navigateToClientCode}
      />
    </div>
  );
};

export default JobApplication;
