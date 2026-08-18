"use client";

import { useLocalStorage } from "./useLocalStorage";
import {
  Application,
  ApplicationFormData,
  ApplicationStatus,
  CompanyProfileData,
  NewInternshipFormData,
  SavedInternship,
  StudentProfile,
} from "@/types";
import {
  defaultApplications,
  defaultCompanyProfile,
  defaultSavedInternships,
  defaultStudentProfile,
} from "@/data/defaults";
import { applicants as mockApplicants } from "@/data/applicants";
import { internships as mockInternships } from "@/data/internships";
import { generateId } from "@/lib/utils";

// ---------- Saved internships ----------
export function useSavedInternships() {
  const { value, setValue, hydrated } = useLocalStorage<SavedInternship[]>(
    "interngo_saved",
    defaultSavedInternships
  );

  const isSaved = (internshipId: string) =>
    value.some((s) => s.internshipId === internshipId);

  const toggleSave = (internshipId: string) => {
    setValue((prev) => {
      if (prev.some((s) => s.internshipId === internshipId)) {
        return prev.filter((s) => s.internshipId !== internshipId);
      }
      return [
        { internshipId, savedDate: new Date().toISOString().slice(0, 10) },
        ...prev,
      ];
    });
  };

  const unsave = (internshipId: string) => {
    setValue((prev) => prev.filter((s) => s.internshipId !== internshipId));
  };

  return { saved: value, isSaved, toggleSave, unsave, hydrated };
}

// ---------- Applications ----------
export function useApplications() {
  const { value, setValue, hydrated } = useLocalStorage<Application[]>(
    "interngo_applications",
    defaultApplications
  );

  const hasApplied = (internshipId: string) =>
    value.some((a) => a.internshipId === internshipId);

  const submitApplication = (
    internshipId: string,
    internshipTitle: string,
    companyName: string,
    companyLogoInitials: string,
    companyLogoColor: string,
    location: Application["location"],
    formData: ApplicationFormData
  ) => {
    const newApp: Application = {
      id: generateId("app"),
      internshipId,
      internshipTitle,
      companyName,
      companyLogoInitials,
      companyLogoColor,
      location,
      appliedDate: new Date().toISOString().slice(0, 10),
      status: "Applied",
      formData,
    };
    setValue((prev) => [newApp, ...prev]);
    return newApp;
  };

  return { applications: value, hasApplied, submitApplication, hydrated };
}

// ---------- Student profile ----------
export function useStudentProfile() {
  const { value, setValue, hydrated } = useLocalStorage<StudentProfile>(
    "interngo_student_profile",
    defaultStudentProfile
  );

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setValue((prev) => ({ ...prev, ...updates }));
  };

  return { profile: value, updateProfile, hydrated };
}

// ---------- Company profile ----------
export function useCompanyProfile() {
  const { value, setValue, hydrated } = useLocalStorage<CompanyProfileData>(
    "interngo_company_profile",
    defaultCompanyProfile
  );

  const updateProfile = (updates: Partial<CompanyProfileData>) => {
    setValue((prev) => ({ ...prev, ...updates }));
  };

  return { profile: value, updateProfile, hydrated };
}

// ---------- Company-created internships ----------
export interface CompanyInternshipRecord {
  id: string;
  title: string;
  department: string;
  location: string;
  workArrangement: string;
  type: string;
  category: string;
  duration: string;
  deadline: string;
  openings: string;
  description: string;
  responsibilities: string;
  requirements: string;
  preferredSkills: string;
  benefits: string;
  applications: number;
  status: "Active" | "Closed";
  postedDate: string;
}

export function useCompanyInternships() {
  const { value, setValue, hydrated } = useLocalStorage<
    CompanyInternshipRecord[]
  >("interngo_company_internships", []);

  const publish = (form: NewInternshipFormData) => {
    const record: CompanyInternshipRecord = {
      id: generateId("cint"),
      ...form,
      applications: 0,
      status: "Active",
      postedDate: new Date().toISOString().slice(0, 10),
    };
    setValue((prev) => [record, ...prev]);
    return record;
  };

  const closeListing = (id: string) => {
    setValue((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Closed" } : i))
    );
  };

  return { companyInternships: value, publish, closeListing, hydrated };
}

// ---------- Applicant status management (company side) ----------
export function useApplicantStatuses() {
  const { value, setValue, hydrated } = useLocalStorage<
    Record<string, ApplicationStatus>
  >("interngo_applicant_statuses", {});

  const getStatus = (applicantId: string): ApplicationStatus => {
    if (value[applicantId]) return value[applicantId];
    const found = mockApplicants.find((a) => a.id === applicantId);
    return found ? found.status : "Applied";
  };

  const setStatus = (applicantId: string, status: ApplicationStatus) => {
    setValue((prev) => ({ ...prev, [applicantId]: status }));
  };

  return { getStatus, setStatus, hydrated };
}

export function allMockData() {
  return { mockApplicants, mockInternships };
}
