"use client";
import * as React from "react";
import UploadSvg from "../assets/Upload";
import { useField } from "formik";
import Row from "./Row";
import { bytesToSize } from "../utils/fileSizeCalculator";
import { Spacer } from "@nextui-org/react";
import Image from "next/image";
import FileIcon from "../assets/file.svg";
import { isBrowser } from "../utils/nextLocalStorage";

interface Props {
  type?: "normal" | "dropzone";
  label?: string;
  helperText?: string;
  multiple?: boolean;
  size?: "default" | "small" | "large";
  name: string;
  onChange?: (files?: File | null | FileList) => void;
  accept?: string;
}

const sizes = {
  small:
    "block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50",
  default:
    "block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none",
  large:
    "block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none ",
};

const FileInput: React.FC<Props> = ({
  label,
  helperText,
  type = "normal",
  size = "default",
  multiple,
  name,
  onChange,
  accept,
}: Props) => {
  const finalSize = sizes[size];

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  const handleFiles = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.target.files && event.target.files.length === 1) {
        // formik?.setFieldValue?.(name, event.target.files);
        helpers.setValue(event.target.files[0]);
        onChange?.(event.target.files[0]);
        return true;
      } else if (event.target.files && event.target.files.length > 1) {
        // formik?.setFieldValue?.(name, event.target.files);
        helpers.setValue(event.target.files);
        onChange?.(event.target.files);
        return true;
      }
      return false;
    },
    [helpers, onChange],
  );

  const renderAddedFiles = React.useCallback(() => {
    if (isBrowser()) {
      if (field.value instanceof FileList) {
        const views: React.ReactElement[] = [];
        views.push(<Spacer y={4} />);
        Array.from(field.value).forEach((file: File) => {
          views.push(
            <Row alignItems="flex-end" justifyContent="space-between">
              <div>
                <Row>
                  <Image src={FileIcon} alt="File" />
                  <Spacer x={4} />
                  <span className="text-black text-base font-poppins font-light">
                    {file.name}
                  </span>
                </Row>
              </div>
              <div>{bytesToSize(file.size)}</div>
            </Row>,
          );
          views.push(<Spacer y={4} />);
        });

        views.pop();

        return views;
      } else if (field.value instanceof File) {
        const file = field.value;
        const views: React.ReactElement[] = [];
        views.push(<Spacer y={4} />);
        views.push(
          <Row alignItems="flex-end" justifyContent="space-between">
            <div>
              <Row>
                <Image src={FileIcon} alt="File" />
                <Spacer x={4} />
                <span className="text-black text-base font-poppins font-normal">
                  {file.name}
                </span>
              </Row>
            </div>
            <div>{bytesToSize(file.size)}</div>
          </Row>,
        );
        return views;
      }
      return null;
    }
    return null;
  }, [field.value]);

  if (type === "normal") {
    return (
      <>
        {label !== undefined && (
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
            htmlFor="file_input"
          >
            {label}
          </label>
        )}
        <input
          className={finalSize}
          id="file_input"
          type="file"
          multiple={multiple}
          onChange={handleFiles}
          accept={accept}
          ref={fileInputRef}
        />
        {helperText !== undefined && (
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            {helperText}
          </p>
        )}
      </>
    );
  }
  return (
    <>
      {label !== undefined && (
        <label
          className="block mb-2 text-sm font-medium text-gray-900 "
          htmlFor="file_input"
        >
          {label}
        </label>
      )}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadSvg />
            <p className="mb-2 text-sm text-gray-500 ">
              {label ?? (
                <>
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </>
              )}
            </p>
            {helperText !== undefined && (
              <p className="text-xs text-gray-500 ">{helperText}</p>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple={multiple}
            onChange={handleFiles}
            accept={accept}
            ref={fileInputRef}
          />
        </label>
      </div>
      <div>{renderAddedFiles()}</div>
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-red-600 ">{meta.error}</p>
      )}
    </>
  );
};

export default FileInput;
