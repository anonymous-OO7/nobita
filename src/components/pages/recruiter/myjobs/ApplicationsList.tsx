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
  Chip,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";

import { Colors } from "@/assets/colors";
import { Applications, DropdownType } from "@/types.js";
import DropdownComponent from "@/components/common/DropdownComponent";
import Row from "@/components/common/Row";
import UpdateRemarks from "./UpdateRemark";
import useApi from "@/hooks/useApi";
import useToast from "@/hooks/useToast";
import DropDownSingle from "./SelectionDropdown";
import { UpdateApplicantJobsStatusRemarkApi } from "@/apis";
import { useSearchParams } from "next/navigation";
import Spacer from "@/components/common/Spacer";
import Button from "@/components/Button";

interface Props {
  applicants: Applications[];
  loading: boolean;
  onOpen: () => void;
  onRowAction: (clientId: React.Key) => void;
}

const COLUMNS = [
  { name: "Sr No.", key: "sr_no", sortable: true },
  { name: "Name", key: "name", sortable: true },
  { name: "Email", key: "email" },
  { name: "Applied At", key: "time" },
  { name: "Cover Letter", key: "cover" },
  { name: "Status", key: "status" },
  { name: "Remark", key: "remark" },
  // { name: "Action", key: "action" },
];

export default function ApplicationsList({
  applicants,
  loading,
  onOpen,
  onRowAction,
}: Props) {
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const searchParams = useSearchParams();

  const application_uuid = searchParams?.get("id") ?? "";

  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [showFilter, setShowFilter] = React.useState(false);
  const [selectedState, setSelectedState] = React.useState("all"); // State for selected filter
  const [tempselectedState, setTempSelectedState] = React.useState("all"); // Temp state for selected filter
  const [, setDropdownFilters] = React.useState<DropdownType[]>([]);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "sr_no",
    direction: "ascending",
  });

  const data: DropdownType[] = React.useMemo(
    () => [
      { key: "new_lead", value: "New Lead" },
      { key: "active", value: "Active" },
      { key: "in_progress", value: "In Progress" },
      { key: "cold_lead", value: "Cold Lead" },
    ],
    []
  );

  React.useEffect(() => {
    const dropdownOptionsData: DropdownType[] = applicants
      ?.map((item: Applications) => ({
        key: item.status,
        value: item.status,
      }))
      .filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.key === option.key)
      );
    console.log(dropdownOptionsData, "Created dropfown data");
    dropdownOptionsData?.unshift({ value: "all", key: "All" });
    setDropdownFilters(dropdownOptionsData);
  }, [applicants]);

  const pages = React.useMemo(() => {
    if (!applicants) {
      return 1;
    }
    return Math.ceil((applicants?.length ?? 1) / rowsPerPage);
  }, [applicants, rowsPerPage]);

  const hasSearchFilter = Boolean(filterValue);
  const [page, setPage] = React.useState(1);

  const filteredItems = React.useMemo(() => {
    let filteredUsers;

    if (applicants?.length > 0) {
      filteredUsers = [...applicants];
    }

    if (hasSearchFilter) {
      filteredUsers = filteredUsers?.filter(
        (user) =>
          user.profile.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.profile.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (selectedState !== "all" && selectedState) {
      filteredUsers = filteredUsers?.filter(
        (user) => user.profile.name === selectedState
      );
    }

    return filteredUsers;
  }, [applicants, hasSearchFilter, selectedState, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  // eslint-disable-next-line
  const onRowsPerPageChange = React.useCallback((e: any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);
  // eslint-disable-next-line
  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  // Handle the state selection change
  const handleStateSelect = (selectedKey: string | number) => {
    console.log(selectedKey, "Selected key in client filter dropdown");
    setTempSelectedState(selectedKey.toString());
  };

  const dropdownData: DropdownType[] = React.useMemo(
    () => [
      { key: "pending", value: "Pending" },
      { key: "active", value: "Active" },
      { key: "accepted", value: "Accepted" },
      { key: "rejected", value: "Rejected" },
    ],
    []
  );

  // const renderStatus = React.useCallback((item: Applications) => {
  //   switch (item?.status) {
  //     case "pending":
  //       return (
  //         <Chip color="warning" variant="flat" size="sm">
  //           Pending
  //         </Chip>
  //       );
  //     case "active":
  //       return (
  //         <Chip color="primary" variant="flat" size="sm">
  //           Active
  //         </Chip>
  //       );
  //     case "accepted":
  //       return (
  //         <Chip color="success" variant="flat" size="sm">
  //           Accepted
  //         </Chip>
  //       );
  //     case "rejected":
  //       return (
  //         <Chip color="danger" variant="flat" size="sm">
  //           Rejected
  //         </Chip>
  //       );
  //     default:
  //       return (
  //         <Chip variant="flat" color="default" size="sm">
  //           Unknown
  //         </Chip>
  //       );
  //   }
  // }, []);

  const onSaveClaimStatus = React.useCallback(
    (status: string, currentOrder: Applications) => {
      console.log(currentOrder, "payload sending to update");

      makeApiCall(
        UpdateApplicantJobsStatusRemarkApi(
          currentOrder.applicant_id,
          application_uuid,
          currentOrder.remark,
          status
        )
      )
        .then(() => {
          showToast("Status updated successfully", { type: "success" });
        })
        .catch(() => {
          showToast("Status updation failed", { type: "error" });
        });
    },
    [makeApiCall, showToast]
  );

  const handleStatusChange = React.useCallback(
    // eslint-disable-next-line
    (data: any, item: Applications) => {
      onSaveClaimStatus(data, item);
    },
    [onSaveClaimStatus]
  );

  const handleSubmitRemark = React.useCallback(
    (remark: string, currentOrder: Applications) => {
      console.log(remark, "remark uodate in save remark");
      makeApiCall(
        UpdateApplicantJobsStatusRemarkApi(
          currentOrder.applicant_id,
          application_uuid,
          remark,
          currentOrder.status
        )
      )
        .then(() => {
          showToast("Remark updated successfully", { type: "success" });
        })
        .catch(() => {
          showToast("Remark updation failed", { type: "error" });
        });
    },
    [makeApiCall, showToast]
  );

  const renderStatus = React.useCallback(
    (item: Applications) => {
      return (
        <DropDownSingle
          isDisabled={false}
          data={dropdownData}
          defaultSelected={item?.status.toString()}
          // eslint-disable-next-line
          onSelection={(data) => handleStatusChange(data, item)}
          buttonWidth="w-60"
          key={`status-dropdown`}
        />
      );
    },
    [dropdownData, handleStatusChange]
  );

  const renderCell = React.useCallback(
    (client: Applications, columnKey: React.Key) => {
      const index = applicants.findIndex(
        (obj) => obj.applicant_id === client.applicant_id
      );

      switch (columnKey) {
        case "sr_no":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {(index !== -1 ? index : 0) + 1}
              </p>
            </div>
          );

        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {client.profile.name}
              </p>
            </div>
          );
        case "email":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {client.profile.email}
              </p>
            </div>
          );

        case "time":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {new Date(client.time * 1000).toLocaleString()}
              </p>
            </div>
          );

        case "cover":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {client.cover.length > 20
                  ? `${client.cover.slice(0, 20)}...`
                  : client.cover}
              </p>
            </div>
          );

        case "status":
          return renderStatus(client);

        // Uncomment and define Action if needed
        // case "action":
        //   return (
        //     <div className="flex">
        //       <Action item={client} onRowAction={onRowAction} />
        //     </div>
        //   );
        case "remark":
          return (
            <UpdateRemarks
              application={client}
              onSubmitRemark={handleSubmitRemark}
            />
          );

        default:
          return null;
      }
    },
    [applicants, renderStatus]
  );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            item: "bg-pageBackground w-6 h-6 min-w-4 font-rubik",
            cursor: "w-6 h-6 min-w-4 font-rubik",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <div className="flex justify-between items-center">
          <label className="flex items-center text-small font-rubik text-black font-light ">
            Items per page:&nbsp;
            <select
              className="border-none shadow-sm outline-none text-default-400 text-small font-rubik font-light px-1 py-0 rounded-md"
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
        "font-rubik",
        "font-regular",
        "text-sm",
      ],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "font-rubik",
        "font-normal",
        "text-textColorGrey",
      ],
      table: "min-h-[350px]",
      wrapper: "table-wrapper",
    }),
    []
  );

  const sortedItems = React.useMemo(() => {
    if (!items || items.length === 0) return [];

    return [...items].sort((a: Applications, b: Applications) => {
      const first = a[sortDescriptor.column as keyof Applications] as number;
      const second = b[sortDescriptor.column as keyof Applications] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const topContent = React.useMemo(() => {
    return (
      <div className="relative flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="focus:outline-none focus:border-none"
            classNames={{
              base: "w-full sm:max-w-[44%] focus:outline-none focus:border-none",
              inputWrapper:
                "border-0 focus:border-0 focus:outline-none focus:border-none",
              input: "border-0 focus:outline-none focus:border-none",
            }}
            placeholder="Search by Name..."
            size="sm"
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => {
              setFilterValue("");
              setSelectedState("all");
            }}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            <Row>
              <Button
                color="default"
                variant="outline"
                // startContent={<CiFilter size={18} />}
                className="font-rubik"
                size="sm"
                radius="sm"
                onClick={() => {
                  setShowFilter(!showFilter);
                  setTempSelectedState(selectedState); // Reset temp state to current state
                }}
              >
                Filter
              </Button>
            </Row>
          </div>
        </div>
        {showFilter && (
          <div className="absolute top-full mt-2 right-0 w-[20%] px-6 py-4 rounded shadow-xl z-10 bg-white">
            <p className="text-black text-base leading-8 font-rubik font-medium mt-[4%] bg-white">
              Select Status
            </p>
            <div className="w-full h-5" />
            <DropdownComponent
              data={data}
              initialSelectedKey="Select"
              onSelectionChange={handleStateSelect}
            />
            <div>
              <Row>
                <Button
                  color="default"
                  className="font-rubik font-light text-sm bg-buttonprimary text-white w-[100%] mt-4"
                  size="md"
                  radius="sm"
                  onClick={() => {
                    setSelectedState(tempselectedState);
                    setShowFilter(false);
                  }}
                >
                  Filter
                </Button>
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    showFilter,
    data,
    selectedState,
    tempselectedState,
  ]);

  return (
    <div className="flex flex-col">
      <Spacer size="sm" />

      <div className="flex flex-row justify-between">
        <p className="text-lg font-normal font-rubik text-black ">Applicants</p>

        {/* <Button
          style={{ color: Colors.primary }}
          className=" bg-yellow-500"
          size="sm"
          onClick={onOpen}
        >
          <span className="text-sm font-normal font-rubik text-white">
            + Add New Client
          </span>
        </Button> */}
      </div>
      <Spacer size="xs" />
      <Table
        // selectionMode="single"
        classNames={classNames}
        topContent={topContent}
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        // onRowAction={onRowAction}
        isStriped
      >
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              allowsSorting={column.sortable}
              key={column.key}
              align={column.key === "action" ? "end" : "start"}
              width={column.key === "action" ? 100 : undefined}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={!loading && "Currently no Applicants to View Here"}
          items={sortedItems}
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow
              key={`${item.applicant_id}`}
              className="cursor-pointer h-12"
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
