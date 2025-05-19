import { useField, useFormikContext } from "formik";
import { Select as NSelect, SelectItem } from "@nextui-org/react";
import { SelectType } from "@/types";

interface MultiSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: SelectType[];
}

export default function FormikMultiSelect({
  name,
  label,
  placeholder,
  options,
}: MultiSelectProps) {
  const { setFieldValue } = useFormikContext<any>();
  const [field] = useField(name);

  const handleSelectionChange = (keys: Set<string> | any) => {
    const valuesArray = Array.from(keys);
    setFieldValue(name, valuesArray);
  };

  return (
    <NSelect
      label={label}
      placeholder={placeholder}
      selectionMode="multiple"
      selectedKeys={new Set(field.value || [])}
      onSelectionChange={handleSelectionChange}
      className="max-w-full"
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </NSelect>
  );
}
