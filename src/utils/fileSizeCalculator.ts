export const bytesToSize = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

export const convertDateTimeToDate = (dateTime: string) => {
  const dateTimeObject = new Date(dateTime);

  // Check if the date is valid
  if (isNaN(dateTimeObject.getTime())) {
    return null;
  }

  // Extract date portion
  const year = dateTimeObject.getFullYear();
  const month = String(dateTimeObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateTimeObject.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const convert = (str: string): string => {
  const date = new Date(str);
  const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
};
