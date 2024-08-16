import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownMenuProps,
} from "@nextui-org/react";
import { Selection } from "@nextui-org/react";
import Label from "./Label";
import { DropdownType } from "@/types";

interface Props extends Pick<DropdownMenuProps, "selectionMode"> {
  data: DropdownType[];
  label?: string;
  defaultSelected: string;
  onSelection: (data: string) => void;
  buttonWidth: string;
  isDisabled: boolean;
}

const DropDownSingle = ({
  data,
  label,
  defaultSelected,
  onSelection,
  buttonWidth,
  isDisabled = false,
}: Props) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([defaultSelected])
  );
  const selectedValue = React.useMemo(() => {
    return Array.from(selectedKeys).join(", ").replaceAll("_", " ");
  }, [selectedKeys]);

  const handleChange = React.useCallback(
    (keys: Selection) => {
      const values = Array.from(keys);
      const selectedUuid = values[0];
      const selectedItem = data.find((item) => item.key === selectedUuid);
      if (selectedItem) {
        onSelection(selectedItem.key);
        setSelectedKeys(new Set([selectedItem.value]));
      } else {
        setSelectedKeys(new Set());
      }
    },
    [data, onSelection]
  );

  const getColorVariant = (value: string) => {
    console.log(value, "CURRENT DROpdown value");
    switch (value) {
      case "inactive":
        return "default";
      case "active":
        return "warning";
      case "closed":
        return "danger";
      case "hired":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div>
      {label !== undefined && <Label>{label}</Label>}
      <Dropdown isDisabled={isDisabled}>
        <DropdownTrigger>
          <Button
            variant="ghost"
            color={getColorVariant(selectedValue)}
            className={`capitalize bg-white opacity-100 p-2 min-w-${buttonWidth}`}
          >
            <p className="font-roboto font-medium text-xs">{selectedValue}</p>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          items={data}
          selectedKeys={selectedKeys}
          onSelectionChange={handleChange}
          style={{ maxHeight: "50vh", overflowY: "auto" }}
          className="font-poppins text-black font-light"
        >
          {(item) => <DropdownItem key={item.key}>{item.value}</DropdownItem>}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropDownSingle;
