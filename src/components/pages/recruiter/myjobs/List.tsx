"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Input,
  SortDescriptor,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import secureLocalStorage from "react-secure-storage";
import Spacer from "@/components/Spacer";
import { DropdownType, JobListing } from "@/types.js";
import DropDownSingle from "./SelectionDropdown";
import Action from "./Action";
import { useRouter } from "next/navigation";
import UpdatePrice from "./UpdatePrice";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { UpdateMyJobsStatusApi } from "@/apis";
import { formatDateIntl } from "@/utils/utils";

interface Props {
  eppOrders: JobListing[];
  loading: boolean;
}

const COLUMNS = [
  { name: "Sr No.", key: "sr_no" },
  { name: "Position", key: "position" },
  { name: "Location", key: "location" },
  { name: "Experience", key: "experience" },
  { name: "Salary", key: "salary" },
  { name: "Type", key: "type" },
  { name: "Date", key: "date" },
  { name: "Status", key: "status" },
  { name: "Action", key: "action" },
];

export default function RecruiterJobListing({ eppOrders, loading }: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const role = secureLocalStorage.getItem("role");
  const router = useRouter();
  const [page, setPage] = React.useState(1);

  const dropdownData: DropdownType[] = React.useMemo(
    () => [
      { key: "active", value: "Active" },
      { key: "inactive", value: "Inactive" },
      { key: "closed", value: "Closed" },
      { key: "hired", value: "Hired" },
    ],
    []
  );

  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "CreatedAt",
    direction: "descending",
  });

  const pages = React.useMemo(() => {
    return Math.max(Math.ceil(eppOrders.length / rowsPerPage), 1);
  }, [eppOrders, rowsPerPage]);

  const filteredItems = React.useMemo(() => {
    if (!filterValue) return eppOrders;
    return eppOrders.filter((job) =>
      job.Position.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [eppOrders, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, page, rowsPerPage]);

  const onSaveClaimStatus = React.useCallback(
    (status: string, currentOrder: JobListing, price: number) => {
      makeApiCall(
        UpdateMyJobsStatusApi(currentOrder.ID.toString(), status, price)
      )
        .then(() => {
          showToast("Updated successfully", { type: "success" });
        })
        .catch(() => {
          showToast("Updation failed", { type: "error" });
        });
    },
    [makeApiCall, showToast]
  );

  const handleStatusChange = React.useCallback(
    (status: string, job: JobListing) => {
      onSaveClaimStatus(status, job, job.Price);
    },
    [onSaveClaimStatus]
  );

  const renderStatus = React.useCallback(
    (job: JobListing) => (
      <DropDownSingle
        isDisabled={false}
        data={dropdownData}
        defaultSelected={job?.Status?.toString()}
        onSelection={(val) => handleStatusChange(val, job)}
        buttonWidth="w-60"
        key={`status-${job.ID}`}
      />
    ),
    [dropdownData, handleStatusChange]
  );

  const handleViewOrders = React.useCallback(
    (job: JobListing) => {
      router.push(
        `/dashboard/myjobs/applications?id=${encodeURIComponent(job.Uuid)}`
      );
    },
    [router]
  );

  const renderCell = React.useCallback(
    (job: JobListing, columnKey: React.Key) => {
      const index = eppOrders.findIndex((obj) => obj.ID === job.ID);

      switch (columnKey) {
        case "sr_no":
          return <p className="text-sm">{index + 1}</p>;

        case "position":
          return <p className="text-sm">{job.Position}</p>;

        case "location":
          return <p className="text-sm">{job.Location}</p>;

        case "experience":
          return (
            <p className="text-sm">
              {job.MinExperience} - {job.MaxExperience} yrs
            </p>
          );

        case "salary":
          return (
            <p className="text-sm">
              {job.HideSalary
                ? "Hidden"
                : `${
                    job.Currency
                  } ${job.MinPay.toLocaleString()} - ${job.MaxPay.toLocaleString()}`}
            </p>
          );

        case "type":
          return (
            <p className="text-sm capitalize">
              {job.Type}
              {job.Remote ? " · Remote" : ""}
              {job.Hybrid ? " · Hybrid" : ""}
            </p>
          );

        case "date":
          return <p className="text-sm">{formatDateIntl(job.CreatedAt)}</p>;

        case "status":
          return renderStatus(job);

        case "action":
          return <Action item={job} onViewOrders={handleViewOrders} />;
      }
    },
    [eppOrders, renderStatus, handleViewOrders]
  );

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const aVal = a[sortDescriptor.column as keyof JobListing];
      const bVal = b[sortDescriptor.column as keyof JobListing];
      if (typeof aVal === "number" && typeof bVal === "number") {
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
      return 0;
    });
  }, [items, sortDescriptor]);

  const topContent = (
    <div className="flex justify-between items-center my-2">
      <Input
        isClearable
        placeholder="Search your jobs..."
        size="sm"
        startContent={<CiSearch />}
        value={filterValue}
        onClear={() => setFilterValue("")}
        onValueChange={(val) => setFilterValue(val)}
        classNames={{
          base: "w-full sm:max-w-[44%]",
          inputWrapper: "border-0",
        }}
      />
    </div>
  );

  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        showControls
        page={page}
        total={pages}
        onChange={setPage}
        isDisabled={!!filterValue}
      />
      <div className="flex items-center text-sm">
        Size:&nbsp;
        <select
          className="outline-none px-1 py-0 rounded-md text-sm"
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
          }}
          defaultValue={"10"}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <p className="text-black text-lg leading-8 font-roboto font-normal mt-[2%]">
        Manage your listed Jobs
      </p>
      <Spacer size="xs" />
      <Table
        selectionMode="single"
        classNames={{
          th: ["text-sm font-medium text-gray-700"],
          td: ["text-sm text-gray-600"],
        }}
        topContent={topContent}
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={COLUMNS}>
          {(col) => (
            <TableColumn
              key={col.key}
              align={col.key === "action" ? "end" : "start"}
              width={col.key === "action" ? 100 : undefined}
            >
              {col.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!loading && "No rows to display."}
          items={sortedItems}
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.ID}>
              {(columnKey) => (
                <TableCell className="text-center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
