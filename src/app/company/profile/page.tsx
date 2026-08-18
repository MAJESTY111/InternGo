"use client";

import { useEffect, useState } from "react";
import { Globe, MapPin, Users2, Mail, Phone } from "lucide-react";
import { CompanyShell } from "@/components/company/company-shell";
import { CompanyLogo } from "@/components/shared/company-logo";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCompanyProfile } from "@/hooks/useAppData";
import { useToast } from "@/components/ui/toast";
import { CompanyProfileData, NigerianLocation } from "@/types";

const locations: NigerianLocation[] = [
  "Lagos", "Abuja", "Ibadan", "Port Harcourt", "Enugu", "Kaduna",
  "Kano", "Benin City", "Ilorin", "Abeokuta", "Remote",
];

const logoColors = ["#111111", "#EAB308", "#2563EB", "#059669", "#DC2626", "#7C3AED"];

export default function CompanyProfilePage() {
  const { profile, updateProfile } = useCompanyProfile();
  const { showToast } = useToast();
  const [form, setForm] = useState<CompanyProfileData>(profile);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(profile);
  }, [profile]);

  const update = (field: keyof CompanyProfileData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile(form);
    showToast("Company profile updated!");
  };

  return (
    <CompanyShell>
      <div className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Company Profile</h1>
          <p className="mt-1 text-sm text-muted">
            This is how your company appears to students on InternGo.
          </p>
        </div>
        <Button onClick={handleSave}>Save changes</Button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <FormSection title="Company details">
            <Input label="Company name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
            <Input label="Industry" value={form.industry} onChange={(e) => update("industry", e.target.value)} />
            <Textarea
              label="Description"
              rows={4}
              className="sm:col-span-2"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
            <Input label="Website" placeholder="https://yourcompany.com" value={form.website} onChange={(e) => update("website", e.target.value)} />
            <Select label="Location" value={form.location} onChange={(e) => update("location", e.target.value)}>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
            <Select label="Company size" value={form.size} onChange={(e) => update("size", e.target.value)}>
              {["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "500+ employees"].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                )
              )}
            </Select>
          </FormSection>

          <FormSection title="Logo">
            <div className="flex items-center gap-4 sm:col-span-2">
              <CompanyLogo initials={form.logoInitials} color={form.logoColor} size="lg" />
              <div className="flex-1">
                <Input
                  label="Logo initials"
                  maxLength={2}
                  value={form.logoInitials}
                  onChange={(e) => update("logoInitials", e.target.value.toUpperCase())}
                />
                <div className="mt-3 flex gap-2">
                  {logoColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => update("logoColor", color)}
                      aria-label={`Choose color ${color}`}
                      className="h-7 w-7 rounded-full ring-offset-2 transition-shadow"
                      style={{
                        backgroundColor: color,
                        boxShadow: form.logoColor === color ? `0 0 0 2px ${color}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection title="Contact information">
            <Input label="Contact email" type="email" value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} />
            <Input label="Contact phone" value={form.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} />
          </FormSection>
        </div>

        {/* Public preview */}
        <div className="h-fit rounded-2xl border border-border bg-white p-5 lg:sticky lg:top-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Public preview</p>
          <div className="mt-4 flex items-center gap-3">
            <CompanyLogo initials={form.logoInitials} color={form.logoColor} size="lg" />
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-foreground">{form.name || "Company name"}</p>
              <p className="truncate text-sm text-muted">{form.industry || "Industry"}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground">
            {form.description || "Your company description will appear here."}
          </p>
          <div className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
            <div className="flex items-center gap-2.5 text-muted">
              <MapPin className="h-4 w-4 shrink-0" /> {form.location}
            </div>
            <div className="flex items-center gap-2.5 text-muted">
              <Users2 className="h-4 w-4 shrink-0" /> {form.size}
            </div>
            {form.website && (
              <div className="flex items-center gap-2.5 text-muted">
                <Globe className="h-4 w-4 shrink-0" />
                <span className="truncate text-accent-hover">{form.website}</span>
              </div>
            )}
            {form.contactEmail && (
              <div className="flex items-center gap-2.5 text-muted">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{form.contactEmail}</span>
              </div>
            )}
            {form.contactPhone && (
              <div className="flex items-center gap-2.5 text-muted">
                <Phone className="h-4 w-4 shrink-0" /> {form.contactPhone}
              </div>
            )}
          </div>
        </div>
      </div>
    </CompanyShell>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in-up rounded-2xl border border-border bg-white p-5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}
