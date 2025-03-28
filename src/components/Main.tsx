"use client";
import * as React from "react";
import Body from "./Body";
import { ToastContainer } from "react-toastify";
import { LocationProps } from "./Breadcrumb";
import DashHeader from "./pages/dashboard/DashHeader";
import Sidebar, { SidebarItem } from "./SideBarNew";
import {
  Search,
  CircleUserIcon,
  BadgeInfo,
  Wrench,
  BookmarkCheckIcon,
  BookText,
  Telescope,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Bottombar from "./pages/dashboard/Bottombar";
import CommonModal from "./pages/home/CommonModal";
import { useDisclosure } from "@nextui-org/react";
import {
  Clients,
  DocumentSVG,
  EmployeeDirectorySvg,
  Home,
  InvoicesSVG,
  Marketing,
  ProductSVG,
  RentalScheduleSVG,
  Transaction,
} from "../assets/images/Images";
interface Props {
  children: React.ReactNode;
  locations?: LocationProps[];
}

export default function Main({ children }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // eslint-disable-line
  const [modaltype, setModaltype] = React.useState(""); // eslint-disable-line
  const [loading, setLoading] = React.useState(false); // eslint-disable-line

  const [expandedMain, setExpandedMain] = React.useState(true);
  const onopentoggle = React.useCallback(() => {}, []);

  const oncloseModal = React.useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <ToastContainer />
      <CommonModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onopentoggle}
        type={modaltype}
        loading={loading}
        onClose={oncloseModal}
      />

      <div className={`fixed top-0 left-0 right-0 transition-all ml-[17%] `}>
        <DashHeader onOpen={onOpen} />
      </div>
      <Body sideView={<SidebarNew setExpandedMain={setExpandedMain} />}>
        <div className="px-4 bg-white py-6">
          <div
            className={`mt-14 transition-all ${
              expandedMain ? "sm:ml-72" : "sm:ml-24"
            }`}
          >
            {children}
          </div>
        </div>
      </Body>
      <Bottombar />
    </>
  );
}

function SidebarNew({
  setExpandedMain,
}: {
  setExpandedMain: (expanded: boolean) => void;
}) {
  const router = useRouter(); // eslint-disable-line
  const pathname = usePathname();

  return (
    <Sidebar setExpandedMain={setExpandedMain}>
      <SidebarItem
        icon={<Home color={pathname === "/dashboard" ? "#fff" : "#683FDB"} />}
        text={"Home"}
        alert={pathname === "/dashboard"}
        active={pathname === "/dashboard"}
        href="/dashboard"
      />
      <SidebarItem
        icon={
          <InvoicesSVG
            color={pathname === "/dashboard/applied" ? "#fff" : "#683FDB"}
          />
        }
        text={"Applied"}
        alert={pathname === "/dashboard/applied"}
        active={pathname === "/dashboard/applied"}
        href="/dashboard/applied"
      />
      <SidebarItem
        icon={
          <RentalScheduleSVG
            color={pathname === "/dashboard/saved" ? "#fff" : "#683FDB"}
          />
        }
        text={"Saved"}
        alert={pathname === "/dashboard/saved"}
        active={pathname === "/dashboard/saved"}
        href="/dashboard/saved"
      />

      {/* <SidebarItem
        icon={<Wrench />}
        text={"Settings"}
        alert={pathname === "/dashboard/settings"}
        active={pathname === "/dashboard/settings"}
        href="/dashboard/settings"
      /> */}
      <SidebarItem
        icon={
          <ProductSVG
            color={pathname === "/dashboard/myjobs" ? "#fff" : "#683FDB"}
          />
        }
        text={"My Jobs"}
        alert={pathname === "/dashboard/myjobs"}
        active={pathname === "/dashboard/myjobs"}
        href="/dashboard/myjobs"
      />

      <SidebarItem
        icon={
          <Transaction
            color={pathname === "/dashboard/feedback" ? "#fff" : "#683FDB"}
          />
        }
        text={"Feedback"}
        alert={pathname === "/dashboard/feedback"}
        active={pathname === "/dashboard/feedback"}
        href="/dashboard/feedback"
      />
    </Sidebar>
  );
}
