import * as React from "react";
import { Datepicker as RNDatePicker, DatepickerProps } from "flowbite-react";
import { useField } from "formik";
import Label from "./Label";
import { convert } from "@/utils/fileSizeCalculator";

interface Props extends DatepickerProps {
  name: string;
  label?: string;
}

export default function DatePicker({ name, label }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(
    field?.value ?? null
  );

  const selectedDateObj = selectedDate ? new Date(selectedDate) : null;

  const onChange = React.useCallback(
    (date: Date | null) => {
      if (date) {
        const formattedDate = convert(date.toString());
        setSelectedDate(formattedDate);
        helpers.setValue(formattedDate);
      } else {
        setSelectedDate(null);
        helpers.setValue(null);
      }
    },
    [helpers]
  );

  const emptyProps = {
    value: selectedDateObj,
    placeholder: "Select date",
  };

  return (
    <div>
      {label !== undefined && <Label>{label}</Label>}
      <RNDatePicker {...emptyProps} onChange={onChange} />
    </div>
  );
}
