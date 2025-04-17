import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/react";
import * as React from "react";
import { SelectType } from "@/types";
import { FormikValues, useFormikContext } from "formik";

interface Props
  extends Omit<AutocompleteProps, "items" | "children" | "onSelect"> {
  item: SelectType[];
  name: string;
  onSelect?: (value: string) => void;
}

export default function SearchSelect({
  name,
  item,
  label,
  placeholder,
  isRequired,
  className,
  size,
  labelPlacement = "outside",
  onSelect,
  disabled,
  defaultSelectedKey,
  ...props
}: Props) {
  const formikContext = useFormikContext<FormikValues>();

  const { setFieldValue, errors, touched, values } = formikContext;

  const onChange = React.useCallback(
    (event: React.Key | null) => {
      setFieldValue(name, event);
      onSelect?.(event as string);
    },
    [name, onSelect, setFieldValue]
  );

  const isInvalid = React.useMemo(() => {
    if (touched[name] && errors[name] ? String(errors[name]) : "") {
      return true;
    }
    return false;
  }, [errors, name, touched]);

  const finalErrorMessage =
    touched[name] && errors[name] ? String(errors[name]) : "";

  if (!formikContext) {
    return null;
  }

  return (
    <Autocomplete
      className={className}
      label={label}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
      size={size}
      isRequired={isRequired}
      selectedKey={values?.[name] || ""}
      onSelectionChange={onChange}
      errorMessage={finalErrorMessage}
      isInvalid={isInvalid}
      isDisabled={disabled}
      aria-label="select"
      defaultSelectedKey={defaultSelectedKey}
      {...props}
    >
      {item?.map(({ label, value }) => (
        <AutocompleteItem
          key={value}
          className="bg-white p-1 text-black font-poppins font-light text-lg"
        >
          {label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
