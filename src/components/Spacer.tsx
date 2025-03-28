import * as React from "react";
import { Spacer as NSpacer } from "@nextui-org/react";

interface Props {
  size: keyof typeof spacingClasses;
  orientation?: "horizontal" | "vertical";
}

declare const spacing: {
  0: string;
  4: string;
  8: string;
  16: string;
  24: string;
  32: string;
};

type Space = keyof typeof spacing;

const spacingClasses = {
  none: 0 as Space,
  xs: 4 as Space,
  sm: 8 as Space,
  md: 16 as Space,
  lg: 24 as Space,
  xl: 32 as Space,
};

export default function Spacer({
  size = "md",
  orientation = "vertical",
}: Props) {
  return (
    <NSpacer
      x={orientation === "horizontal" ? spacingClasses[size] : 0}
      y={orientation === "vertical" ? spacingClasses[size] : 0}
    />
  );
}
