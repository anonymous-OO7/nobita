import {
  Select as NSelect,
  SelectItem,
  SelectProps,
  SelectionMode,
} from "@nextui-org/react";
import { useField } from "formik";
import * as React from "react";
import { SelectType } from "@/types";

// Define the props for the component
interface Props
  extends Omit<
    SelectProps,
    "items" | "children" | "onSelect" | "selectionMode"
  > {
  item: SelectType[]; // List of options
  name: string; // Field name for Formik
  onSelect?: (value: string) => void; // Optional callback when a value is selected
  selectionMode?: SelectionMode; // Mode of selection (single/multiple)
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
  selectionMode = "single",
  ...props
}: Props) {
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
      placeholder={placeholder}
      isRequired={isRequired}
      className={className}
      onChange={onChange}
      size={size}
      labelPlacement={labelPlacement}
      value={field.value} // Set the value from Formik
      errorMessage={meta.touched && meta.error ? meta.error : undefined} // Show error message
      isInvalid={meta.touched && !!meta.error} // Indicate invalid state
      selectionMode={selectionMode}
      {...props}
    >
      {item.map(({ label, value }) => (
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
