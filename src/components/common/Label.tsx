import * as React from "react";

interface Props {
  className?: string;
  children: string;
}

export default function Label({ children, className }: Props) {
  const newClassName =
    className ?? "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
  return <label className={newClassName}>{children}</label>;
}
