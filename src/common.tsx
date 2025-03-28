import { HeadingSize, DropdownType, SubheadingSize, SelectType } from "./types";

export const headingSizeMap: Record<HeadingSize, number> = {
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 16,
  h6: 12,
};

export const subheadingSizeMap: Record<SubheadingSize, number> = {
  subheading1: 20,
  subheading2: 16,
  subheading3: 12,
};

export const months: DropdownType[] = [
  { key: "january", value: "January" },
  { key: "february", value: "February" },
  { key: "march", value: "March" },
  { key: "april", value: "April" },
  { key: "may", value: "May" },
  { key: "june", value: "June" },
  { key: "july", value: "July" },
  { key: "august", value: "August" },
  { key: "september", value: "September" },
  { key: "october", value: "October" },
  { key: "november", value: "November" },
  { key: "december", value: "December" },
];

export const MeetingType: SelectType[] = [
  {
    label: "Telephonic",
    value: "telephonic",
  },
  {
    label: "Face to Face",
    value: "face-to-face",
  },
  {
    label: "Online",
    value: "online",
  },
  {
    label: "Operations",
    value: "opertions",
  },
];

// Create a map from value to label
export const MeetingTypeMap: { [key: string]: string } = MeetingType.reduce(
  (acc, { label, value }) => {
    acc[value] = label;
    return acc;
  },
  {} as { [key: string]: string }
);
