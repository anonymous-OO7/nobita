import * as React from "react";
import { useField } from "formik";

interface Props {
  label?: string;
  size?: "default" | "large" | "small";
  error?: string;
  success?: string;
  helperText?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange?: (name: string, event: string) => void;
}

const sizes = {
  default:
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
  large:
    "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500",
  small:
    "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500",
};

export default function Textarea({
  label,
  error,
  success,
  helperText,
  placeholder,
  name,
  size = "default",
  disabled,
  onChange,
}: Props) {
  const finalSize = sizes[size];
  const [field, meta, helpers] = useField(name);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      helpers.setValue(event.target.value);
      if (onChange && typeof onChange === "function") {
        onChange(name, event.target.value);
      }
    },
    [helpers, name, onChange],
  );
  return (
    <>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <textarea
        {...field}
        value={meta.value}
        className={`${finalSize} resize-none`} // Added resize-none to disable resizing, remove if resizing is needed
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        aria-invalid={meta.error && meta.touched ? "true" : undefined}
        aria-describedby={`${name}-feedback ${name}-help`}
      />
      {helperText && (
        <p
          id={`${name}-help`}
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
      {success && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          {success}
        </p>
      )}
      {meta.touched && meta.error && (
        <p
          id={`${name}-feedback`}
          className="mt-2 text-sm text-red-600 dark:text-red-500"
        >
          {error ?? meta.error}
        </p>
      )}
    </>
  );
}
