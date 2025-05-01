import React from "react";
import {
  CalendarDate,
  DatePicker,
  DatePickerProps,
  DateValue,
} from "@heroui/react";
import { useFormikContext, FormikValues } from "formik";
import {
  CalendarDateTime,
  parseDate,
  ZonedDateTime,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

interface RDatePickerProps extends DatePickerProps {
  name: string;
  label?: string;
  onDateChange?: (date: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function RDatePicker({
  name,
  label,
  labelPlacement = "outside",
  size = "md",
  variant,
  showMonthAndYearPickers = true,
  onDateChange,
  disabled,
  ...props
}: RDatePickerProps) {
  const formikContext = useFormikContext<FormikValues>();

  const { setFieldValue, errors, touched, values } = formikContext;

  const parsedValue: DateValue | null = React.useMemo(() => {
    if (values[name]) {
      return parseDate(values[name]);
    }
    return null;
  }, [values, name]);

  const handleChange: DatePickerProps["onChange"] = React.useCallback(
    (value: ZonedDateTime | CalendarDate | CalendarDateTime | null) => {
      const stringValue = value?.toString() ?? "";
      setFieldValue(name, stringValue);
      onDateChange?.(stringValue);
    },
    [name, onDateChange, setFieldValue]
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
    <I18nProvider locale="en-IN">
      <DatePicker
        value={parsedValue}
        label={label}
        labelPlacement={labelPlacement}
        size={size}
        variant={variant}
        errorMessage={finalErrorMessage}
        onChange={handleChange}
        isInvalid={isInvalid}
        showMonthAndYearPickers={showMonthAndYearPickers}
        isDisabled={disabled}
        {...props}
      />
    </I18nProvider>
  );
}
