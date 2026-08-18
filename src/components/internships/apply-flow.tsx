"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ApplicationFormData, Internship } from "@/types";
import { useApplications } from "@/hooks/useAppData";
import { useToast } from "@/components/ui/toast";
import { getCompanyById } from "@/data/companies";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  GraduationCap,
  User,
  Briefcase,
} from "lucide-react";
import { useStudentProfile } from "@/hooks/useAppData";
import Link from "next/link";

const steps = [
  { label: "Personal Information", icon: User },
  { label: "Education", icon: GraduationCap },
  { label: "Experience & Skills", icon: Briefcase },
  { label: "Review", icon: FileCheck2 },
];

const nigerianStates = [
  "Lagos", "Abuja (FCT)", "Ibadan / Oyo", "Rivers", "Enugu", "Kaduna", "Kano",
  "Edo", "Kwara", "Ogun", "Other",
];

export function ApplyFlow({
  open,
  onClose,
  internship,
}: {
  open: boolean;
  onClose: () => void;
  internship: Internship;
}) {
  const { submitApplication, hasApplied } = useApplications();
  const { profile } = useStudentProfile();
  const { showToast } = useToast();
  const company = getCompanyById(internship.companyId);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<ApplicationFormData>({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    state: profile.state,
    university: profile.university,
    course: profile.course,
    level: profile.level,
    graduationYear: profile.graduationYear,
    skills: profile.skills.join(", "),
    experience: profile.experience,
    portfolioUrl: profile.portfolioUrl,
    linkedinUrl: profile.linkedinUrl,
  });

  const update = (field: keyof ApplicationFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (!form.state.trim()) newErrors.state = "State is required";
    } else if (step === 1) {
      if (!form.university.trim()) newErrors.university = "University is required";
      if (!form.course.trim()) newErrors.course = "Course is required";
      if (!form.level.trim()) newErrors.level = "Level is required";
      if (!form.graduationYear.trim())
        newErrors.graduationYear = "Graduation year is required";
    } else if (step === 2) {
      if (!form.skills.trim()) newErrors.skills = "List at least one skill";
      if (form.portfolioUrl && !/^https?:\/\//.test(form.portfolioUrl))
        newErrors.portfolioUrl = "Enter a valid URL starting with https://";
      if (form.linkedinUrl && !/^https?:\/\//.test(form.linkedinUrl))
        newErrors.linkedinUrl = "Enter a valid URL starting with https://";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    submitApplication(
      internship.id,
      internship.title,
      company?.name ?? "Company",
      company?.logoInitials ?? "IN",
      company?.logoColor ?? "#111111",
      internship.location,
      form
    );
    setSubmitted(true);
    showToast("Application submitted successfully!");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(0);
      setSubmitted(false);
      setErrors({});
    }, 250);
  };

  const alreadyApplied = hasApplied(internship.id);

  if (submitted) {
    return (
      <Modal open={open} onClose={handleClose} maxWidth="max-w-md">
        <div className="flex flex-col items-center px-6 py-12 text-center">
          <div className="animate-check-pop flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
            <CheckCircle2 className="h-9 w-9 text-success" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-foreground">
            Application submitted!
          </h2>
          <p className="mt-2 text-sm text-muted">
            Your application for {internship.title} at {company?.name} has
            been sent to the company.
          </p>
          <div className="mt-7 flex w-full flex-col gap-2.5">
            <Link href="/dashboard/applications" className="w-full">
              <Button className="w-full">Track Application</Button>
            </Link>
            <Button variant="ghost" className="w-full" onClick={handleClose}>
              Continue browsing
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  if (alreadyApplied && !submitted) {
    return (
      <Modal open={open} onClose={handleClose} maxWidth="max-w-md">
        <div className="flex flex-col items-center px-6 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-soft-bg">
            <FileCheck2 className="h-8 w-8 text-muted" />
          </div>
          <h2 className="mt-5 text-lg font-bold text-foreground">
            You've already applied
          </h2>
          <p className="mt-2 text-sm text-muted">
            You already submitted an application for this internship. You can
            track its status from your dashboard.
          </p>
          <div className="mt-7 flex w-full flex-col gap-2.5">
            <Link href="/dashboard/applications" className="w-full">
              <Button className="w-full">View Application</Button>
            </Link>
            <Button variant="ghost" className="w-full" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} title="Apply for this internship" maxWidth="max-w-xl">
      <div className="px-6 pt-5">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  i < step
                    ? "bg-foreground text-white"
                    : i === step
                    ? "bg-accent text-accent-foreground"
                    : "bg-soft-bg text-muted"
                }`}
              >
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded-full transition-colors ${
                    i < step ? "bg-foreground" : "bg-soft-bg"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-foreground">
          Step {step + 1} of {steps.length}: {steps[step].label}
        </p>
      </div>

      <div className="px-6 py-5">
        {step === 0 && (
          <div className="animate-fade-in grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              error={errors.fullName}
            />
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              error={errors.email}
            />
            <Input
              label="Phone number"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              error={errors.phone}
            />
            <Select
              label="State"
              required
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              error={errors.state}
            >
              <option value="">Select state</option>
              {nigerianStates.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="University"
              required
              value={form.university}
              onChange={(e) => update("university", e.target.value)}
              error={errors.university}
              className="sm:col-span-2"
            />
            <Input
              label="Course of study"
              required
              value={form.course}
              onChange={(e) => update("course", e.target.value)}
              error={errors.course}
            />
            <Input
              label="Level"
              required
              placeholder="e.g. 400 Level, Graduate"
              value={form.level}
              onChange={(e) => update("level", e.target.value)}
              error={errors.level}
            />
            <Input
              label="Graduation year"
              required
              placeholder="e.g. 2027"
              value={form.graduationYear}
              onChange={(e) => update("graduationYear", e.target.value)}
              error={errors.graduationYear}
              className="sm:col-span-2"
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in flex flex-col gap-4">
            <Input
              label="Skills"
              required
              placeholder="e.g. React, Figma, Excel"
              hint="Separate skills with commas"
              value={form.skills}
              onChange={(e) => update("skills", e.target.value)}
              error={errors.skills}
            />
            <Textarea
              label="Previous experience"
              rows={4}
              placeholder="Briefly describe any relevant projects, internships, or coursework"
              value={form.experience}
              onChange={(e) => update("experience", e.target.value)}
            />
            <Input
              label="Portfolio URL"
              placeholder="https://yourportfolio.com"
              value={form.portfolioUrl}
              onChange={(e) => update("portfolioUrl", e.target.value)}
              error={errors.portfolioUrl}
            />
            <Input
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/yourname"
              value={form.linkedinUrl}
              onChange={(e) => update("linkedinUrl", e.target.value)}
              error={errors.linkedinUrl}
            />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in space-y-5">
            <ReviewSection title="Personal Information">
              <ReviewRow label="Full name" value={form.fullName} />
              <ReviewRow label="Email" value={form.email} />
              <ReviewRow label="Phone" value={form.phone} />
              <ReviewRow label="State" value={form.state} />
            </ReviewSection>
            <ReviewSection title="Education">
              <ReviewRow label="University" value={form.university} />
              <ReviewRow label="Course" value={form.course} />
              <ReviewRow label="Level" value={form.level} />
              <ReviewRow label="Graduation year" value={form.graduationYear} />
            </ReviewSection>
            <ReviewSection title="Experience & Skills">
              <ReviewRow label="Skills" value={form.skills} />
              <ReviewRow label="Experience" value={form.experience || "—"} />
              <ReviewRow label="Portfolio" value={form.portfolioUrl || "—"} />
              <ReviewRow label="LinkedIn" value={form.linkedinUrl || "—"} />
            </ReviewSection>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border px-6 py-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={handleNext} className="gap-1">
            Continue <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit Application</Button>
        )}
      </div>
    </Modal>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      <div className="mt-2 rounded-xl border border-border bg-soft-bg/60 p-3.5">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
