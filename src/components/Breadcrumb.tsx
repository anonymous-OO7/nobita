import * as React from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  BreadcrumbItemProps,
} from "@nextui-org/react";
import Home from "../assets/Home";

export interface LocationProps extends Omit<BreadcrumbItemProps, "children"> {
  name: string;
  path: string;
}

interface Props {
  locations: LocationProps[];
}

export default function Breadcrumb({ locations }: Props) {
  return (
    <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
      <BreadcrumbItem href="/" startContent={<Home />}>
        Home
      </BreadcrumbItem>
      {locations?.map((item, index) => (
        <BreadcrumbItem
          key={`location-${item?.name}-${index}`}
          startContent={item?.startContent}
          href={item?.path}
        >
          {item?.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
