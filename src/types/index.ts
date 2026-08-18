export type InternshipType =
  | "SIWES / IT"
  | "NYSC"
  | "Graduate Internship"
  | "Graduate Trainee"
  | "Entry Level";

export type WorkArrangement = "On-site" | "Hybrid" | "Remote";

export type Category =
  | "Software Engineering"
  | "Product Design"
  | "UI/UX Design"
  | "Marketing"
  | "Finance"
  | "Accounting"
  | "Data"
  | "Human Resources"
  | "Sales"
  | "Operations";

export type NigerianLocation =
  | "Lagos"
  | "Abuja"
  | "Ibadan"
  | "Port Harcourt"
  | "Enugu"
  | "Kaduna"
  | "Kano"
  | "Benin City"
  | "Ilorin"
  | "Abeokuta"
  | "Remote";

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Accepted"
  | "Rejected";

export interface Company {
  id: string;
  name: string;
  logoInitials: string;
  logoColor: string;
  industry: string;
  description: string;
  website: string;
  location: NigerianLocation;
  size: string;
  founded?: string;
}

export interface Internship {
  id: string;
  companyId: string;
  title: string;
  category: Category;
  type: InternshipType;
  location: NigerianLocation;
  workArrangement: WorkArrangement;
  duration: string;
  openings: number;
  deadline: string; // ISO date
  postedDate: string; // ISO date
  description: string;
  responsibilities: string[];
  requirements: string[];
  whatYouLearn: string[];
  benefits: string[];
  tags: string[];
  status: "Active" | "Closed";
}

export interface Education {
  university: string;
  course: string;
  level: string;
  graduationYear: string;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  university: string;
  course: string;
  level: string;
  graduationYear: string;
  skills: string[];
  experience: string;
  portfolioUrl: string;
  linkedinUrl: string;
  cvFileName?: string;
  avatarInitials: string;
}

export interface Applicant {
  id: string;
  name: string;
  avatarInitials: string;
  university: string;
  course: string;
  level: string;
  location: NigerianLocation;
  skills: string[];
  experience: string;
  portfolioUrl: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  appliedRole: string;
  internshipId: string;
  appliedDate: string;
  status: ApplicationStatus;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  university: string;
  course: string;
  level: string;
  graduationYear: string;
  skills: string;
  experience: string;
  portfolioUrl: string;
  linkedinUrl: string;
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  companyLogoInitials: string;
  companyLogoColor: string;
  location: NigerianLocation;
  appliedDate: string;
  status: ApplicationStatus;
  formData: ApplicationFormData;
}

export interface SavedInternship {
  internshipId: string;
  savedDate: string;
}

export interface CompanyProfileData {
  name: string;
  industry: string;
  description: string;
  website: string;
  location: NigerianLocation;
  size: string;
  logoInitials: string;
  logoColor: string;
  contactEmail: string;
  contactPhone: string;
}

export interface NewInternshipFormData {
  title: string;
  department: string;
  location: NigerianLocation;
  workArrangement: WorkArrangement;
  type: InternshipType;
  category: Category;
  duration: string;
  deadline: string;
  openings: string;
  description: string;
  responsibilities: string;
  requirements: string;
  preferredSkills: string;
  benefits: string;
}
