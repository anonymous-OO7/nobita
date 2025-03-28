import { DatePart } from "../types";

export function generateYearList(yearsBack: number, yearsForward: number) {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - yearsBack; i <= currentYear + yearsForward; i++) {
    years.push({ key: i.toString(), value: i.toString() });
  }

  return years;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function extractFromDate(date: Date, part: DatePart): string | number {
  switch (part) {
    case "year":
      return date.getFullYear();
    case "month":
      // Note: getMonth() returns 0-11, adding 1 to make it 1-12 for common usage
      return date.getMonth() + 1;
    case "date":
      return date.getDate();
    case "hours":
      return date.getHours();
    case "minutes":
      return date.getMinutes();
    case "seconds":
      return date.getSeconds();
    case "time":
      // Returns time as a formatted string HH:MM:SS
      return `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    default:
      throw new Error("Invalid date part requested");
  }
}

export const formatDateIntl = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export function FormatToLakhs(number: number): string {
  // Handle negative numbers
  if (number < 0) {
    return `-${FormatToLakhs(-number)}`;
  }

  // Define conversion factor
  const lakh = 100000;

  // Convert number to lakhs
  const lakhs = number / lakh;

  // Format the number to 2 decimal places
  return lakhs.toFixed(2) + " Lakh";
}
