import * as React from "react";
import { FontSize, HeadingSize, SubheadingSize } from "@/types";
import { headingSizeMap, subheadingSizeMap } from "@/common";

interface TextProps extends Pick<React.CSSProperties, "fontWeight"> {
  children: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fontSize?: FontSize;
  lineHeight?: string | number;
  headingSize?: HeadingSize;
  subheadingSize?: SubheadingSize;
  bold?: boolean;
}

export function Text({
  children,
  className,
  style,
  fontSize,
  lineHeight,
  headingSize,
  subheadingSize,
  bold,
}: TextProps) {
  const customStyle: React.CSSProperties = {
    ...style,
    fontSize: fontSize,
    lineHeight: lineHeight !== undefined ? lineHeight : undefined,
    ...(headingSize && {
      fontSize: `${headingSizeMap[headingSize]}px`,
    }),
    ...(subheadingSize && {
      fontSize: `${subheadingSizeMap[subheadingSize]}px`,
    }),
    fontWeight: bold ? "bold" : undefined,
  };

  return (
    <span className={className} style={customStyle}>
      {children}
    </span>
  );
}
