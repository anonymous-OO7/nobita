import React from "react";

interface Props {
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "center";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  children: React.ReactNode;
  className?: string;
}

export default function Row({ justifyContent, alignItems, children }: Props) {
  return (
    <div
      className="flex"
      style={{ justifyContent: justifyContent, alignItems: alignItems }}
    >
      {children}
    </div>
  );
}
