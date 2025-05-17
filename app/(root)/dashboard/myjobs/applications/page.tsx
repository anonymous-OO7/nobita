"use client";

import React, { Suspense } from "react";
import { Applications } from "@/types";
import Spacer from "@/components/common/Spacer";
import useApi from "@/hooks/useApi";
import { useRouter, useSearchParams } from "next/navigation";
import { GetAllApplicationsJobsList } from "@/apis";
import ApplicationsList from "@/components/pages/myjobs/ApplicationsList";
import { useDisclosure } from "@heroui/react";

// Actual app logic
const JobApplication = () => {
  const { makeApiCall } = useApi();
  const searchParams = useSearchParams();
  const { isOpen, onOpen } = useDisclosure();
  const router = useRouter();

  const application_uuid = searchParams?.get("id") ?? "";
  const [jobApplications, setJobApplications] = React.useState<Applications[]>(
    []
  );
  const [invoiceLoading, setInvoiceLoading] = React.useState(false);

  React.useEffect(() => {
    if (!application_uuid) return;

    setInvoiceLoading(true);
    makeApiCall(GetAllApplicationsJobsList(application_uuid))
      .then((response: any) => {
        if (response !== undefined) {
          setJobApplications(response?.data);
        }
      })
      .catch((error: Error) => console.error(error))
      .finally(() => setInvoiceLoading(false));
  }, [makeApiCall, application_uuid]);

  const navigateToClientCode = React.useCallback(
    (clientId: React.Key) => {
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
        onRowAction={navigateToClientCode}
      />
    </div>
  );
};

// Wrap in Suspense in same file
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-gray-500">Loading applications...</div>
      }
    >
      <JobApplication />
    </Suspense>
  );
}
