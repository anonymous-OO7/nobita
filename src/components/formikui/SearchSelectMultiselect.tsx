import React from "react";
import Select from "react-select";
import { useField, useFormikContext } from "formik";

export type SelectType = {
  value: string;
  label: string;
};

interface Props {
  name?: string; // ✅ Now optional for non-Formik usage
  label?: string;
  options: SelectType[];
  isMulti?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  isDisabled?: boolean;
  value?: any; // ✅ For non-Formik usage
  onChange?: (option: any) => void; // ✅ For non-Formik usage
}

const SearchSelect: React.FC<Props> = ({
  name,
  label,
  options,
  isMulti = false,
  placeholder = "Select...",
  isRequired = false,
  className = "",
  isDisabled = false,
  value,
  onChange,
}) => {
  const formikContext = useFormikContext();
  const [field, meta] = name ? useField(name) : [{ value: undefined }, {}];

  const isFormik = !!(name && formikContext?.setFieldValue);

  const actualValue = isFormik ? field.value : value;

  const getValue = () => {
    if (isMulti) {
      return options.filter((option) =>
        (actualValue || []).includes(option.value)
      );
    } else {
      return options.find((option) => option.value === actualValue) || null;
    }
  };

  const handleChange = (selectedOption: any) => {
    const selectedValue = isMulti
      ? selectedOption?.map((opt: any) => opt.value) || []
      : selectedOption?.value || "";

    if (isFormik && name) {
      formikContext.setFieldValue(name, selectedValue);
    }

    if (onChange) {
      onChange(selectedOption);
    }
  };

  const selectId = `select-${name || label || "dropdown"}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      <Select
        inputId={selectId}
        name={name}
        options={options}
        isMulti={isMulti}
        placeholder={placeholder}
        value={getValue()}
        onChange={handleChange}
        isDisabled={isDisabled}
        classNamePrefix="react-select"
      />

      {isFormik && meta.touched && meta.error && (
        <div className="mt-1 text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default SearchSelect;
