import * as React from "react";
import Link from "next/link";

interface Props {
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startContent?: React.ReactElement;
  children?: string;
}

export default function SideBarItem({ startContent, children }: Props) {
  return (
    <li>
      <Link href="/profile">
        <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          {startContent !== undefined && <>{startContent}</>}
          <span className="ml-3">{children}</span>
        </a>{" "}
      </Link>
    </li>
  );
}
