import * as React from "react";
import { useField } from "formik";
import { Input as NInput, InputProps } from "@nextui-org/react";

interface Props extends InputProps {
  name: string;
  disabled?: boolean;
  upperCase?: boolean;
}

export default function Input({
  label,
  type = "string",
  placeholder,
  name,
  disabled,
  upperCase = false,
  description,
  size = "md",
  startContent,
  endContent,
  errorMessage,
  labelPlacement = "outside",
  className,
  maxLength,
  minLength,
  hidden = false,
  inputMode = "none",
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      helpers.setValue(
        upperCase ? event.target.value.toUpperCase() : event.target.value
      );
    },
    [helpers, upperCase]
  );

  const isInvalid = React.useMemo(() => {
    if (meta.touched && meta.error) {
      return true;
    }
    return false;
  }, [meta.error, meta.touched]);

  return (
    <NInput
      value={meta.value}
      type={type}
      description={description}
      size={size}
      startContent={startContent}
      endContent={endContent}
      isInvalid={isInvalid}
      errorMessage={meta.touched && meta.error && (errorMessage ?? meta.error)}
      onChange={handleChange}
      placeholder={placeholder}
      label={label}
      isDisabled={disabled}
      labelPlacement={labelPlacement}
      className={className}
      maxLength={maxLength}
      minLength={minLength}
      hidden={hidden}
      inputMode={inputMode}
    />
  );
}
