import { useRouter } from "next/navigation";
import * as React from "react";
import { nextLocalStorage } from "../utils/nextLocalStorage";

export default function useTokenCheck() {
  const router = useRouter();

  React.useEffect(() => {
    const token = nextLocalStorage()?.getItem("authToken");

    if (!token || token === "") {
      console.log("TOKEN empty or undefined");
      localStorage.removeItem("authToken");
      router.replace("/info");
    }
  }, [router]);
}
