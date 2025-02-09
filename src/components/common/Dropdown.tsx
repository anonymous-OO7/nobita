import * as React from "react";
import {
  Dropdown as NDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
  DropdownMenuProps,
} from "@nextui-org/react";
import { useField } from "formik";
import Label from "./Label";
import { DropdownType } from "@/types";

interface Props extends Pick<DropdownMenuProps, "selectionMode"> {
  data: DropdownType[];
  name: string;
  label?: string;
}

export function Dropdown({
  data,
  name,
  label,
  selectionMode = "single",
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([meta.value])
  );

  const selectedValue = React.useMemo(() => {
    const values = Array.from(selectedKeys).map((key) => {
      const item = data.find((d) => d.key === key);
      return item ? item.value : "";
    });

    return values.join(", ").replaceAll("_", " ");
  }, [selectedKeys, data]);

  const handleChange = React.useCallback(
    (keys: Selection) => {
      const values = Array.from(keys);
      helpers.setValue(selectionMode === "single" ? values[0] : values);
      setSelectedKeys(new Set(values));
    },
    [helpers, selectionMode]
  );

  return (
    <div>
      {label !== undefined && <Label>{label}</Label>}
      <NDropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize" size="sm">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode={selectionMode}
          selectedKeys={selectedKeys}
          onSelectionChange={handleChange}
          className="overflow-y-auto max-h-80"
          closeOnSelect={selectionMode === "single" ? true : false}
          items={data}
        >
          {(item) => <DropdownItem key={item.key}>{item.value}</DropdownItem>}
        </DropdownMenu>
      </NDropdown>
    </div>
  );
}
