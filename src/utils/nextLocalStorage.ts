export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

export const nextLocalStorage = (): Storage | void => {
  if (isBrowser()) {
    return window.localStorage;
  }
};

export const getEnviromentVariable = (): string | undefined => {
  if (isBrowser()) {
    if (process.env.NODE_ENV === "development") {
      return "staging";
    }
    const subdomain = window.location.hostname.split(".")[0];
    return subdomain;
  }
};
