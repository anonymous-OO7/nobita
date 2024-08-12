export type User = {
  name: string;
  email: string;
  role: string;
  user_id: number;
  exp: number;
};

export type StoreType = {
  authToken?: string;
  setAuthToken: (authToken?: string) => void;
  user?: User;
  setUser: (user: User) => void;
};

//posttype
export type PostBlockProps = {
  post: {
    createdDate: string;
    id: number;
    mediaType: string;
    mediaUrl: string;
    tags: string;
    text: string;
    title: string;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
      college: string;
    };
    votes: number;
  };
};

export interface UserProfile {
  college: string;
  company: string;
  course: string;
  createdAt: Date | null;
  email: string;
  gender: string;
  id: number;
  name: string;
  phone_no: string;
  username: string;
  uuid: string;
  image: string | ArrayBuffer | null;
  country: string;
  bio: string;
  expertise: string[]; // Array of strings representing the user's expertise
  seniority_level: string; // String representing the seniority level of the user
  work_experience: WorkExperience[]; // Array of WorkExperience objects
  education: Education[]; // Array of Education objects
  linkedin: string | null; // URL to the LinkedIn profile
  twitter: string | null; // URL to the Twitter profile
  website: string | null; // URL to a personal or professional website
}

// Define a type for WorkExperience
export interface WorkExperience {
  role: string;
  company: string;
  industry: string[];
  start_date: Date; // Using Date type, format as needed when displaying
  end_date: Date | null; // Nullable if the user is currently in this role
  brief: string;
}

// Define a type for Education
export interface Education {
  university_or_college: string;
  field_of_study: string;
  timeline: string; // Example: "2012 - 2014"
}

// TEXT TYPES

export type FontSize = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40; // Adjust this list as needed

export type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type SubheadingSize = "subheading1" | "subheading2" | "subheading3";
export type DatePart =
  | "year"
  | "month"
  | "date"
  | "time"
  | "hours"
  | "minutes"
  | "seconds";

export type Style = {
  [key: string]: React.CSSProperties;
};

// YEAR TYPES
export type DropdownType = {
  key: string;
  value: string | number;
};

export type SelectType = {
  label: string;
  value: string | number;
};

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type Job = {
  ID: number;
  UserID: number;
  Status: string;
  Uuid: string;
  CompanyName: string;
  Position: string;
  Location: string;
  Type: string;
  Description: string;
  Field: string;
  Owner: string;
  MinPay: number;
  MaxPay: number;
  Price: number;
  TotalEmp: number;
  LogoUrl: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
};
