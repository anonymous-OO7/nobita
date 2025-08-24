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

export type JobListing = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  UserID: number;
  Status: string;
  Uuid: string;
  CompanyCode: string; // Added from response
  Company: {
    ID: number;
    uuid: string;
    code: string;
    name: string;
    logo_url: string;
    website_url: string;
    location: string;
  }; // New: Nested company object
  Position: string;
  Location: string;
  Type: string;
  Description: string;
  Field: string;
  Owner: string;
  MinPay: number;
  MaxPay: number;
  Price: number;
  Currency: string;
  HideSalary: boolean;
  MinExperience: number;
  MaxExperience: number;
  ExperienceText: string;
  Remote: boolean;
  Hybrid: boolean;
  Category: string;
  JobUrl: string;
  Skills: string[]; // Changed from string to array
  Tags: string;
  GroupID: number;
  Vacancy: number;
  Mode: string;
  Board: string;
  SourceCreatedDate: number;
  FooterLabel: string;
  FooterColor: string;
  ShowMultipleApply: boolean;
};

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

export type Company = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  uuid: string;
  code: string;
  name: string;
  description: string;
  industry: string;
  company_size: string;
  logo_url: string;
  website_url: string;
  social_media_links: string;
  location: string;
  headquarters_address: string;
  contact_email: string;
  contact_phone: string;
  founded_date: string;
  company_culture: string;
  benefits: string;
  reviews_count: number;
  aggregate_rating: number;
  reviews_url: string;
  glassdoor_url: string;
  subscription_plan: string;
  status: string;
  uploaded_by: string;
  tech_stack: string;
  hiring_status: string;
  last_funding_round: string;
  employee_growth_rate: number;
};

export type Job = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  UserID: number;
  Status: string;
  Uuid: string;
  CompanyCode: string;
  Position: string;
  Location: string;
  Type: string;
  Description: string;
  Field: string;
  Owner: string;
  MinPay: number;
  MaxPay: number;
  Price: number;
  Currency: string;
  HideSalary: boolean;
  MinExperience: number;
  MaxExperience: number;
  ExperienceText: string;
  Remote: boolean;
  Hybrid: boolean;
  WalkIn: boolean;
  EducationDoesNotMatter: boolean;
  EducationUG: string;
  EducationPG: string;
  EducationPPG: string;
  EducationDegreeCombo: string;
  EducationBTechPremium: boolean;
  EducationMbaPremium: boolean;
  EducationPremiumProcessed: boolean;
  EducationLabel: string;
  EducationIsSchool: boolean;
  Category: string;
  Skills: string | string[];
  Tags: string;
  GroupID: number;
  Vacancy: number;
  Mode: string;
  Board: string;
  SourceCreatedDate: number;
  ViewCount: number;
  ApplyCount: number;
  HideApplyButton: boolean;
  ShowRecruiterDetail: boolean;
  FooterLabel: string;
  FooterColor: string;
  ShowMultipleApply: boolean;
  JobUrl: string;
  ApplyRedirectUrl: string;
  BrandedJd: string;
  Company: Company; // ✅ now has updated structure
};

export interface WorkExperienceType {
  role: string;
  company: string;
  employmentType: string;
  duration: {
    start: string;
    end: string;
    years: number;
    current: boolean;
  };
  location: string;
  skills: string[];
}

export interface EducationType {
  universityName: string;
  degree: string;
  duration: {
    start: string;
    end: string;
    years: number;
    current: boolean;
  };
  skills: string[];
}

export interface SocialUrlType {
  platform: string;
  url: string;
}

export interface ProfileDetailsType {
  email: string;
  uuid: string;
  name: string;
  gender: string;
  country: string;
  bio: string;
  expertise: string;
  seniority: string;
  work_experience: WorkExperienceType[];
  education: EducationType[];
  current_organisation: string;
  tagline: string;
  skill: string[];
  social_urls: SocialUrlType[];
  username: string;
  resume: File | null;
}

export interface Option {
  value: string;
  label: string;
}

export type CommunityReferral = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  uuid: string;
  code: string;
  description: string;
  job_link: string;
  cover_letter: string;
  job_role: string;
  status: string;
  owner_uuid: string;
  amount: string;

  Company: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    logo_url: string;
    name: string;
    uuid: string;
    code: string;
    description: string;
    website_url: string;
    industry: string;
    company_size: string;
    location: string;
    company_culture: string;
    benefits: string;
    social_media_links: string;
    founded_date: string;
    headquarters_address: string;
    contact_email: string;
    contact_phone: string;
    subscription_plan: string;
    status: string;
    glassdoor_url: string;
    uploaded_by: string;
  };

  Profile: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    email: string;
    uuid: string;
    name: string;
    gender: string;
    country: string;
    bio: string;
    expertise: string;
    seniority: string;
    work_experience: string;
    education: string;
    current_organisation: string;
    tagline: string;
    skill: string;
    social_url: string;
    referal_code: string;
    referred_by: string;
    applies: number;
  };
};
export interface LatestPaymentType {
  CreatedAt: string;
  DeletedAt: string | null;
  ID: number;
  UpdatedAt: string;
  cart_details: any; // Or a more specific type if you know the structure
  cf_order_id: string;
  credit_added: number;
  customer_email: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  email: string;
  order_amount: number;
  order_currency: string;
  order_id: string;
  order_meta: any;
  order_note: string | null;
  order_status: string;
  order_tags: any;
  payment_session_id: string;
  terminal_data: any;
  uuid: string; // Assuming this is the payment's UUID
}

export interface ProfileDetailsType {
  email: string;
  uuid: string;
  name: string;
  gender: string;
  country: string;
  bio: string;
  expertise: string;
  seniority: string;
  work_experience: WorkExperienceType[];
  education: EducationType[];
  current_organisation: string;
  tagline: string;
  skill: string[];
  social_urls: SocialUrlType[];
  referal_code: string;
  applies: number;
}

export interface Applications {
  applicant_id: string;
  profile: {
    uuid: string;
    name: string;
    email: string;
  };
  time: number;
  cover: string;
  status: string;
  remark: string;
}
export interface FilterOption {
  label: string;
  value: number;
}

export interface OptionsMap {
  workMode: FilterOption[];
  department: FilterOption[];
  location: FilterOption[];
  salary: FilterOption[];
  companyType: FilterOption[];
  roleCategory: FilterOption[];
  education: FilterOption[];
  postedBy: FilterOption[];
  industry: FilterOption[];
}
