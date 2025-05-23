import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends React.SVGProps<SVGSVGElement> {
  size: number;
}

export const Add = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
      stroke="#fff"
      stroke-width="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
