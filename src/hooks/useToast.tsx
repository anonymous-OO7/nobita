import * as React from "react";
import { ToastOptions, TypeOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Options extends Omit<ToastOptions, "type"> {
  type?: TypeOptions;
}

export default function useToast() {
  const showToast = React.useCallback((message: string, options?: Options) => {
    return toast(message, { ...options, type: options?.type ?? "success" });
  }, []);

  return { showToast };
}
