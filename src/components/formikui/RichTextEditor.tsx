import * as React from "react";
import { useField } from "formik";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues in Next.js
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  label?: string;
  size?: "default" | "large";
  error?: string;
  success?: string;
  helperText?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange?: (name: string, value: string) => void;
}

// Fixed height for scrollable editor
const sizes = {
  default: "h-[150px]",
  large: "h-[300px]",
};

export default function RichTextEditor({
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
  const [field, meta, helpers] = useField(name);
  const finalSize = sizes[size];

  const handleChange = React.useCallback(
    (value: string) => {
      helpers.setValue(value);
      if (onChange && typeof onChange === "function") {
        onChange(name, value);
      }
    },
    [helpers, name, onChange]
  );

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-normal text-dark font-poppins">
          {label}
        </label>
      )}
      <div
        className={`bg-white border border-gray-300 rounded-lg overflow-hidden ${finalSize}`}
      >
        <ReactQuill
          value={field.value || ""}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={disabled}
          className={`h-full ${
            disabled ? "opacity-70 cursor-not-allowed" : ""
          }`}
          theme="snow"
        />
      </div>
      {helperText && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
      {success && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          {success}
        </p>
      )}
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {error ?? meta.error}
        </p>
      )}
    </div>
  );
}
