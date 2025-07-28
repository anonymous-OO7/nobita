import { Company, JobListing } from "@/types";
import * as React from "react";

interface Props {
  item: Company;
  onViewOrders: (item: Company) => void;
}

export default function Action({ item, onViewOrders }: Props) {
  const handleViewOrders = React.useCallback(() => {
    return onViewOrders(item);
  }, [item, onViewOrders]);

  return (
    <div className="flex flex-row justify-end gap-x-3 2xl:gap-x-4 whitespace-nowrap">
      <button
        onClick={handleViewOrders}
        className="cursor-pointer font-roboto font-normal"
      >
        <p className="text-blue-600 text-sm font-light font-rubik underline">
          Edit company
        </p>
      </button>
      {/* 
      <button
        onClick={handleDownloadQrCodes}
        className="text-textColorGrey cursor-pointer font-roboto font-normal"
      >
        QR Codes
      </button> */}
    </div>
  );
}
