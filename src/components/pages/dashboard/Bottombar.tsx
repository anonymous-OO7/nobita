"use client";
import React from "react";
import {
  Home,
  FeedBack,
  InvoicesSVG,
  Marketing,
  ProductSVG,
  RentalScheduleSVG,
  Transaction,
} from "@/assets/images/Images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gradients } from "../../../../src/assets/colors.js";
import { Add } from "@/assets/Add";
import { Button } from "@heroui/react";

function Bottombar() {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/dashboard",
      label: "Home",
      logocmp: <Home color={pathname === "/dashboard" ? "#fff" : "#683FDB"} />,
    },
    {
      imgURL: "/assets/community.svg",
      route: "/dashboard/referral-community",
      label: "Referral",
      logocmp: (
        <Transaction
          color={
            pathname === "/dashboard/referral-community" ? "#fff" : "#683FDB"
          }
        />
      ),
    },
    {
      imgURL: "/assets/search.svg",
      route: "/dashboard/applied",
      label: "Applied",
      logocmp: (
        <InvoicesSVG
          color={pathname === "/dashboard/applied" ? "#fff" : "#683FDB"}
        />
      ),
    },
    // {
    //   imgURL: "/assets/heart.svg",
    //   route: "/dashboard/saved",
    //   label: "Saved",
    //   logocmp: (
    //     <RentalScheduleSVG
    //       color={pathname === "/dashboard/saved" ? "#fff" : "#683FDB"}
    //     />
    //   ),
    // },

    // {
    //   imgURL: "/assets/community.svg",
    //   route: "/dashboard/myjobs",
    //   label: "My Jobs",
    //   logocmp: (
    //     <ProductSVG
    //       color={pathname === "/dashboard/myjobs" ? "#fff" : "#683FDB"}
    //     />
    //   ),
    // },
    {
      imgURL: "/assets/community.svg",
      route: "/dashboard/feedback",
      label: "Feedback",
      logocmp: (
        <FeedBack
          color={pathname === "/dashboard/feedback" ? "#fff" : "#683FDB"}
        />
      ),
    },
  ];

  return (
    <section className="fixed bottom-0 z-10 w-screen max-w-screen bg-white bg-glassmorphism px-4 py-2 shadow-xl sm:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        {sidebarLinks.map((link, index) => {
          const isActive =
            pathname.includes(link.route) &&
            link.route.length > 1 &&
            pathname === link.route;

          return (
            <React.Fragment key={link.label}>
              <Link
                href={link.route}
                className={`relative flex flex-1 flex-col items-center gap-0 rounded-lg px-0.5 py-0.5 text-black ${
                  isActive ? "bg-primary-300" : ""
                }`}
                style={{
                  background: isActive ? gradients?.sidebarActive : undefined,
                }}
              >
                {link.logocmp}
                <p
                  className={`text-xs font-poppins transition-all font-rubik font-light ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  {link.label}
                </p>
              </Link>

              {index === 1 && (
                <Link href="/dashboard/submit" key="submit">
                  <Button
                    variant="light"
                    isIconOnly
                    className="hover:bg-stone-300 bg-buttonPrimary p-2 shadow-md text-white rounded-md font-poppins font-normal"
                    endContent={<Add />}
                  />
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
