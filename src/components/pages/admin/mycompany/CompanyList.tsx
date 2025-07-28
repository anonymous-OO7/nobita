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
import { Company, DropdownType, JobListing } from "@/types.js";
import DropDownSingle from "./SelectionDropdown";

import Action from "./Action";
import { useRouter } from "next/navigation";
import UpdatePrice from "./UpdatePrice";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import { formatDateIntl } from "@/utils/utils";

interface Props {
  eppOrders: Company[];
  loading: boolean;
}

const COLUMNS = [
  {
    name: "Sr No.",
    key: "sr_no",
  },
  {
    name: "Name",
    key: "name",
  },
  {
    name: "Industry",
    key: "industry",
  },
  {
    name: "Size",
    key: "company_size",
  },
  {
    name: "Location",
    key: "location",
  },
  {
    name: "Rating",
    key: "aggregate_rating",
  },
  {
    name: "Status",
    key: "status",
  },
  {
    name: "Code",
    key: "code",
  },

  {
    name: "Founded",
    key: "founded_date",
  },
  {
    name: "Website",
    key: "website_url",
  },
  {
    name: "Tech Stack",
    key: "tech_stack",
  },
  {
    name: "Subscription Plan",
    key: "subscription_plan",
  },
  {
    name: "Action",
    key: "action",
  },
];

export default function ListCompany({ eppOrders, loading }: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();
  const role = secureLocalStorage.getItem("role");
  const router = useRouter();

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
    column: "schedule_number",
    direction: "ascending",
  });

  const pages = React.useMemo(() => {
    if (eppOrders.length === 0) {
      return 1;
    }
    return Math.ceil((eppOrders?.length ?? 1) / rowsPerPage);
  }, [eppOrders, rowsPerPage]);

  const hasSearchFilter = Boolean(filterValue);
  const [page, setPage] = React.useState(1);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...eppOrders];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [eppOrders, filterValue, hasSearchFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  // const renderStatus = React.useCallback((item: JobListing) => {
  //   if (item?.Status === "pending") {
  //     return (
  //       <Chip variant="solid" color="warning">
  //         Pending
  //       </Chip>
  //     );
  //   } else if (item?.Status === "success") {
  //     return (
  //       <Chip variant="solid" color="success">
  //         Completed
  //       </Chip>
  //     );
  //   } else {
  //     return <Chip variant="solid">Not Started</Chip>;
  //   }
  // }, []);

  const onSaveClaimStatus = React.useCallback(
    (status: string, currentOrder: JobListing, price: number) => {
      console.log(currentOrder, "payload sending to update");

      // makeApiCall(
      //   UpdateMyJobsStatusApi(currentOrder.ID.toString(), status, price)
      // )
      //   .then(() => {
      //     showToast("updated successfully", { type: "success" });
      //   })
      //   .catch(() => {
      //     showToast("updation failed", { type: "error" });
      //   });
    },
    [makeApiCall, showToast]
  );

  const handleStatusChange = React.useCallback(
    // eslint-disable-next-line
    (data: any, item: JobListing) => {
      onSaveClaimStatus(data, item, item.Price);
    },
    [onSaveClaimStatus]
  );

  const renderStatus = React.useCallback(
    (item: JobListing) => {
      return (
        <DropDownSingle
          isDisabled={false}
          data={dropdownData}
          defaultSelected={item?.Status.toString()}
          // eslint-disable-next-line
          onSelection={(data) => handleStatusChange(data, item)}
          buttonWidth="w-60"
          key={`status-dropdown`}
        />
      );
    },
    [dropdownData, handleStatusChange]
  );

  const handleViewOrders = React.useCallback(
    (item: Company) => {
      router.push(
        `/recruiter/admin/company/company-edit?id=${encodeURIComponent(
          item.uuid
        )}`
      );
    },
    [router]
  );

  const handleSubmitPrice = React.useCallback(
    (price: number, currentOrder: JobListing) => {
      onSaveClaimStatus(currentOrder.Status, currentOrder, price);
    },
    []
  );

  const renderCell = React.useCallback(
    (company: Company, columnKey: React.Key) => {
      const index = eppOrders.findIndex((object) => object.ID === company.ID);

      switch (columnKey) {
        case "sr_no":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{index + 1}</p>
            </div>
          );

        case "name":
          return (
            <div className="flex items-center gap-2">
              {company.logo_url && (
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="w-6 h-6 rounded object-cover"
                />
              )}
              <p className="text-bold text-sm capitalize">{company.name}</p>
            </div>
          );

        case "industry":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize">{company.industry || "—"}</p>
            </div>
          );

        case "company_size":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize">
                {company.company_size || "—"}
              </p>
            </div>
          );

        case "location":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize">{company.location || "—"}</p>
            </div>
          );

        case "aggregate_rating":
          return (
            <div className="flex flex-col">
              <p className="text-sm">
                {company.aggregate_rating !== undefined &&
                company.aggregate_rating !== null
                  ? company.aggregate_rating.toFixed(1)
                  : "N/A"}
              </p>
            </div>
          );

        case "status":
          return (
            <div className="flex flex-col">
              <span
                className={`px-2 py-1 text-xs rounded-full w-fit capitalize ${
                  company.status === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {company.status || "—"}
              </span>
            </div>
          );

        // New columns:

        case "code":
          return (
            <div className="flex flex-col">
              <p className="text-sm lowercase">{company.code || "—"}</p>
            </div>
          );

        case "uploaded_by":
          return (
            <div className="flex flex-col">
              <p className="text-sm">{company.uploaded_by || "—"}</p>
            </div>
          );

        case "founded_date":
          return (
            <div className="flex flex-col">
              <p className="text-sm">
                {company.founded_date
                  ? new Date(company.founded_date).getFullYear()
                  : "N/A"}
              </p>
            </div>
          );

        case "website_url":
          return (
            <div className="flex flex-col">
              {company.website_url ? (
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm truncate max-w-[150px]"
                >
                  {company.website_url}
                </a>
              ) : (
                <p className="text-sm">—</p>
              )}
            </div>
          );

        case "tech_stack":
          return (
            <div className="flex flex-col">
              <p className="text-sm truncate max-w-[150px]">
                {company.tech_stack || "—"}
              </p>
            </div>
          );

        case "subscription_plan":
          return (
            <div className="flex flex-col capitalize">
              <p className="text-sm">{company.subscription_plan || "—"}</p>
            </div>
          );

        case "action":
          return (
            <div className="flex">
              <Action item={company} onViewOrders={handleViewOrders} />
            </div>
          );

        default:
          return null;
      }
    },
    [eppOrders, handleViewOrders]
  );

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Company, b: Company) => {
      const first = a[sortDescriptor.column as keyof Company] as number;
      const second = b[sortDescriptor.column as keyof Company] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const topContent = React.useMemo(() => {
    return (
      <div className="relative flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end my-2">
          <Input
            isClearable
            className="focus:outline-none focus:border-none"
            classNames={{
              base: "w-full sm:max-w-[44%] focus:outline-none focus:border-none",
              inputWrapper:
                "border-0 focus:border-0 focus:outline-none focus:border-none",
              input: "border-0 focus:outline-none focus:border-none",
            }}
            placeholder="Search your jobs..."
            size="sm"
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => {
              setFilterValue("");
            }}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [filterValue, onSearchChange]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            item: "bg-pageBackground w-8 h-6 min-w-4 font-roboto",
            cursor: "bg-info w-8 h-6 min-w-4 font-roboto",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <div className="flex justify-between items-center">
          <label className="flex items-center text-small font-roboto text-black font-light ">
            Size :&nbsp;
            <select
              className="border-none shadow-sm outline-none text-default-400 text-small font-roboto font-light px-1 py-0 rounded-md"
              onChange={onRowsPerPageChange}
              defaultValue={"20"}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [hasSearchFilter, page, pages, onRowsPerPageChange]);

  const classNames = React.useMemo(
    () => ({
      th: [
        "bg-transparent",
        "text-tableHeaderColor",
        "border-b",
        "border-divider",
        "font-roboto",
        "font-regular",
        "text-sm",
      ],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "font-roboto",
        "font-normal",
        "text-textColorGrey",
      ],
      table: "min-h-[350px]",
      wrapper: "table-wrapper",
    }),
    []
  );

  return (
    <div className="flex flex-col">
      <p className="text-black text-lg leading-8 font-roboto font-normal mt-[2%]">
        Manage all listed companies
      </p>
      <Spacer size="xs" />
      <Table
        selectionMode="single"
        classNames={classNames}
        topContent={topContent}
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "action" ? "end" : "start"}
              width={column.key === "action" ? 100 : undefined}
              className="text-center"
            >
              {column.name}
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
            <TableRow
              key={`${item.uuid}-${item.ID}`}
              className="cursor-pointer h-12 "
            >
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
