"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { CompanyShell } from "@/components/company/company-shell";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCompanyInternships } from "@/hooks/useAppData";
import { useToast } from "@/components/ui/toast";
import { NewInternshipFormData, NigerianLocation } from "@/types";

const locations: NigerianLocation[] = [
  "Lagos", "Abuja", "Ibadan", "Port Harcourt", "Enugu", "Kaduna",
  "Kano", "Benin City", "Ilorin", "Abeokuta", "Remote",
];

const emptyForm: NewInternshipFormData = {
  title: "",
  department: "",
  location: "Lagos",
  workArrangement: "On-site",
  type: "SIWES / IT",
  category: "Software Engineering",
  duration: "3 months",
  deadline: "",
  openings: "1",
  description: "",
  responsibilities: "",
  requirements: "",
  preferredSkills: "",
  benefits: "",
};

export default function NewInternshipPage() {
  const { publish } = useCompanyInternships();
  const { showToast } = useToast();
  const [form, setForm] = useState<NewInternshipFormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [published, setPublished] = useState(false);

  const update = <K extends keyof NewInternshipFormData>(
    field: K,
    value: NewInternshipFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.department.trim()) newErrors.department = "Department is required";
    if (!form.duration.trim()) newErrors.duration = "Duration is required";
    if (!form.deadline.trim()) newErrors.deadline = "Application deadline is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (!validate()) {
      showToast("Please fill in the required fields.", "error");
      return;
    }
    publish(form);
    setPublished(true);
    showToast("Internship published successfully!");
  };

  const handleReset = () => {
    setForm(emptyForm);
    setErrors({});
    setPublished(false);
  };

  if (published) {
    return (
      <CompanyShell>
        <div className="animate-fade-in-up flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-20 text-center">
          <div className="animate-check-pop flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
            <CheckCircle2 className="h-9 w-9 text-success" />
          </div>
          <h2 className="mt-5 text-xl font-bold text-foreground">Internship published!</h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            &quot;{form.title}&quot; is now live and ready to receive applications from students.
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <Link href="/company/internships">
              <Button>View my internships</Button>
            </Link>
            <Button variant="outline" onClick={handleReset}>
              Post another internship
            </Button>
          </div>
        </div>
      </CompanyShell>
    );
  }

  return (
    <CompanyShell>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Post an Internship
        </h1>
        <p className="mt-1 text-sm text-muted">
          Fill in the details below to publish a new internship listing.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <FormSection title="Basic information">
          <Input
            label="Job title"
            required
            placeholder="e.g. Frontend Developer Intern"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            error={errors.title}
            className="sm:col-span-2"
          />
          <Input
            label="Department"
            required
            placeholder="e.g. Engineering"
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            error={errors.department}
          />
          <Select
            label="Category"
            value={form.category}
            onChange={(e) => update("category", e.target.value as NewInternshipFormData["category"])}
          >
            {[
              "Software Engineering", "Product Design", "UI/UX Design", "Marketing",
              "Finance", "Accounting", "Data", "Human Resources", "Sales", "Operations",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </FormSection>

        <FormSection title="Location & type">
          <Select label="Location" value={form.location} onChange={(e) => update("location", e.target.value as NigerianLocation)}>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
          <Select
            label="Work arrangement"
            value={form.workArrangement}
            onChange={(e) => update("workArrangement", e.target.value as NewInternshipFormData["workArrangement"])}
          >
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </Select>
          <Select
            label="Internship type"
            value={form.type}
            onChange={(e) => update("type", e.target.value as NewInternshipFormData["type"])}
          >
            <option value="SIWES / IT">SIWES / IT</option>
            <option value="NYSC">NYSC</option>
            <option value="Graduate Internship">Graduate Internship</option>
            <option value="Graduate Trainee">Graduate Trainee</option>
            <option value="Entry Level">Entry Level</option>
          </Select>
          <Input
            label="Duration"
            required
            placeholder="e.g. 3 months"
            value={form.duration}
            onChange={(e) => update("duration", e.target.value)}
            error={errors.duration}
          />
          <Input
            label="Application deadline"
            required
            type="date"
            value={form.deadline}
            onChange={(e) => update("deadline", e.target.value)}
            error={errors.deadline}
          />
          <Input
            label="Number of openings"
            type="number"
            min={1}
            value={form.openings}
            onChange={(e) => update("openings", e.target.value)}
          />
        </FormSection>

        <FormSection title="Role details" full>
          <Textarea
            label="Description"
            required
            rows={4}
            placeholder="Give an overview of the role and what the intern will be working on"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            error={errors.description}
          />
          <Textarea
            label="Responsibilities"
            rows={4}
            hint="One responsibility per line"
            placeholder="e.g.&#10;Build and maintain UI components&#10;Collaborate with the design team"
            value={form.responsibilities}
            onChange={(e) => update("responsibilities", e.target.value)}
          />
          <Textarea
            label="Requirements"
            rows={4}
            hint="One requirement per line"
            placeholder="e.g.&#10;Currently studying Computer Science or related field&#10;Familiarity with React"
            value={form.requirements}
            onChange={(e) => update("requirements", e.target.value)}
          />
          <Textarea
            label="Preferred skills"
            rows={3}
            hint="Separate with commas"
            placeholder="e.g. React, TypeScript, Git"
            value={form.preferredSkills}
            onChange={(e) => update("preferredSkills", e.target.value)}
          />
          <Textarea
            label="Benefits"
            rows={3}
            hint="One benefit per line"
            placeholder="e.g.&#10;Monthly stipend&#10;Mentorship from senior engineers"
            value={form.benefits}
            onChange={(e) => update("benefits", e.target.value)}
          />
        </FormSection>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={handleReset}>
          Cancel
        </Button>
        <Button onClick={handlePublish}>Publish Internship</Button>
      </div>
    </CompanyShell>
  );
}

function FormSection({
  title,
  children,
  full,
}: {
  title: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div
        className={
          full
            ? "mt-4 flex flex-col gap-4"
            : "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
        }
      >
        {children}
      </div>
    </div>
  );
}
