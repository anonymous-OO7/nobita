import * as React from "react";

interface BodyProps {
  sideView?: React.JSX.Element;
  children: React.ReactNode;
}

export default function Body({ sideView, children }: BodyProps) {
  return (
    <>
      {sideView !== undefined && sideView}
      {children}
    </>
  );
}
