"use client";

import { useEffect, useState } from "react";
import { FileUp, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Avatar } from "@/components/shared/company-logo";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useStudentProfile } from "@/hooks/useAppData";
import { useToast } from "@/components/ui/toast";
import { StudentProfile } from "@/types";

const nigerianStates = [
  "Lagos", "Abuja (FCT)", "Oyo", "Rivers", "Enugu", "Kaduna", "Kano",
  "Edo", "Kwara", "Ogun", "Other",
];

function calcCompletion(p: StudentProfile): number {
  const fields = [
    p.fullName, p.email, p.phone, p.state,
    p.university, p.course, p.level, p.graduationYear,
    p.skills.length > 0 ? "x" : "", p.experience,
    p.portfolioUrl, p.linkedinUrl, p.cvFileName ?? "",
  ];
  const filled = fields.filter((f) => f && f.trim().length > 0).length;
  return Math.round((filled / fields.length) * 100);
}

export default function ProfilePage() {
  const { profile, updateProfile } = useStudentProfile();
  const { showToast } = useToast();
  const [form, setForm] = useState(profile);
  const [skillsInput, setSkillsInput] = useState(profile.skills.join(", "));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(profile);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSkillsInput(profile.skills.join(", "));
  }, [profile]);

  const update = (field: keyof StudentProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const completion = calcCompletion({
    ...form,
    skills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
  });

  const handleSave = () => {
    updateProfile({
      ...form,
      skills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
    });
    showToast("Profile updated successfully!");
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      update("cvFileName", file.name);
      showToast("CV uploaded — remember to save your profile.");
    }
  };

  return (
    <DashboardShell>
      <div className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Profile</h1>
          <p className="mt-1 text-sm text-muted">
            Keep your profile up to date so companies can get to know you.
          </p>
        </div>
        <Button onClick={handleSave}>Save changes</Button>
      </div>

      {/* Completion indicator */}
      <div className="animate-fade-in-up mt-6 flex items-center gap-4 rounded-2xl border border-border bg-white p-5">
        <Avatar initials={profile.avatarInitials} size="lg" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              Your profile is {completion}% complete
            </p>
            {completion === 100 && <CheckCircle2 className="h-4 w-4 text-success" />}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-soft-bg">
            <div
              className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FormSection title="Personal information">
          <Input label="Full name" required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
          <Input label="Email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
          <Input label="Phone number" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          <Select label="State" value={form.state} onChange={(e) => update("state", e.target.value)}>
            <option value="">Select state</option>
            {nigerianStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormSection>

        <FormSection title="Education">
          <Input label="University" required value={form.university} onChange={(e) => update("university", e.target.value)} />
          <Input label="Course of study" required value={form.course} onChange={(e) => update("course", e.target.value)} />
          <Input label="Level" placeholder="e.g. 400 Level" value={form.level} onChange={(e) => update("level", e.target.value)} />
          <Input label="Graduation year" placeholder="e.g. 2027" value={form.graduationYear} onChange={(e) => update("graduationYear", e.target.value)} />
        </FormSection>

        <FormSection title="Skills">
          <Input
            label="Skills"
            hint="Separate skills with commas"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
          />
        </FormSection>

        <FormSection title="Experience">
          <Textarea
            label="Previous experience"
            rows={5}
            placeholder="Briefly describe any relevant projects, internships, or coursework"
            value={form.experience}
            onChange={(e) => update("experience", e.target.value)}
          />
        </FormSection>

        <FormSection title="Portfolio & LinkedIn">
          <Input label="Portfolio URL" placeholder="https://yourportfolio.com" value={form.portfolioUrl} onChange={(e) => update("portfolioUrl", e.target.value)} />
          <Input label="LinkedIn URL" placeholder="https://linkedin.com/in/yourname" value={form.linkedinUrl} onChange={(e) => update("linkedinUrl", e.target.value)} />
        </FormSection>

        <FormSection title="CV / Resume">
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-soft-bg/50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <FileUp className="h-4 w-4 text-muted" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {form.cvFileName || "No file uploaded"}
              </p>
              <label className="mt-1 inline-block cursor-pointer text-xs font-medium text-accent-hover hover:underline">
                Upload a new CV
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCvUpload} />
              </label>
            </div>
          </div>
        </FormSection>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>Save changes</Button>
      </div>
    </DashboardShell>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </div>
  );
}
