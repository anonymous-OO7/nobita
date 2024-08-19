"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();
  // backdrop-blur-lg
  return (
    <section className="fixed -bottom-0.5 z-10 w-full shadow-xl  bg-glassmorphism px-4 py-1 bg-white xs:px-7  sm:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname.includes(link.route) &&
            link.route.length > 1 &&
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={` relative flex text-black flex-col items-center gap-2 rounded-lg px-2 py-1 sm:flex-1 sm:px-2 sm:py-2.5 ${
                isActive && "bg-primary-300"
              }`}
            >
              {/* <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMMbTeQ3avpXty_1plz1_iD07cPMGWQzX_Vg&usqp=CAU"
                alt={link.label}
                width={16}
                height={16}
                className='object-contain'
              /> */}
              {link.logocmp}

              <p className="text-sm text-black font-poppins ">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
