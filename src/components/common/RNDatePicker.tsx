import React from "react";
import {
  CalendarDate,
  DatePicker,
  DatePickerProps,
  DateValue,
} from "@heroui/react";
import {
  CalendarDateTime,
  parseDate,
  ZonedDateTime,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

interface RDatePickerProps extends Omit<DatePickerProps, "onChange" | "value"> {
  name: string;
  label?: string;
  onDateChange?: (date: string) => void;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  error?: string;
  touched?: boolean;
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
  value,
  error,
  touched,
  ...props
}: RDatePickerProps) {
  const parsedValue: DateValue | null = React.useMemo(() => {
    if (value) {
      return parseDate(value);
    }
    return null;
  }, [value]);

  const handleChange = React.useCallback(
    (val: ZonedDateTime | CalendarDate | CalendarDateTime | null) => {
      const stringValue = val?.toString() ?? "";
      onDateChange?.(stringValue);
    },
    [onDateChange]
  );

  const isInvalid = Boolean(touched && error);
  const finalErrorMessage = touched && error ? error : "";

  return (
    <I18nProvider locale="en-IN">
      <DatePicker
        // value={parsedValue}
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
