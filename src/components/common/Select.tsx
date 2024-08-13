import { Select as NSelect, SelectItem, SelectProps } from "@nextui-org/react";
import { useField } from "formik";
import * as React from "react";
import { SelectType } from "@/types";

interface Props extends Omit<SelectProps, "items" | "children" | "onSelect"> {
  item: SelectType[];
  name: string;
  onSelect?: (value: string) => void;
}

export default function Select({
  name,
  item,
  label,
  placeholder,
  isRequired,
  className,
  size,
  labelPlacement = "outside",
  onSelect,
  ...props
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      helpers.setValue(event.target.value);
      onSelect?.(event.target.value);
    },
    [helpers, onSelect]
  );

  return (
    <NSelect
      label={label}
      placeholder={placeholder}
      isRequired={isRequired}
      className={className}
      onChange={onChange}
      size={size}
      labelPlacement={labelPlacement}
      errorMessage={meta.touched && meta.error !== undefined && meta.error}
      isInvalid={meta.touched && meta.error !== undefined ? true : false}
      {...props}
    >
      {item?.map(({ label, value }) => (
        <SelectItem
          className="text-base text-black font-poppins"
          key={value}
          value={value}
        >
          {label}
        </SelectItem>
      ))}
    </NSelect>
  );
}
