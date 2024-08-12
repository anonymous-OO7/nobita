import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function useApi() {
  const router = useRouter();

  const makeApiCall = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (promise: Promise<AxiosResponse<any, any>>) => {
      return promise
        .then((response: AxiosResponse) => response.data)
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            localStorage.setItem("authToken", "");
            router.replace("/login");
          } else {
            throw error;
          }
        });
    },
    [router],
  );

  return { makeApiCall };
}
