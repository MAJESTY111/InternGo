"use client";

import { Drawer } from "@/components/ui/drawer";
import { CompanyLogo } from "@/components/shared/company-logo";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Application } from "@/types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export function ApplicationDetailDrawer({
  application,
  open,
  onClose,
}: {
  application: Application | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!application) return null;

  return (
    <Drawer open={open} onClose={onClose} title="Application details">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-4">
          <CompanyLogo
            initials={application.companyLogoInitials}
            color={application.companyLogoColor}
            size="lg"
          />
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-foreground">
              {application.internshipTitle}
            </h3>
            <p className="truncate text-sm text-muted">{application.companyName}</p>
            <div className="mt-1.5">
              <StatusBadge status={application.status} />
            </div>
          </div>
        </div>

        <Section title="Application">
          <Row label="Location" value={application.location} />
          <Row label="Date applied" value={formatDate(application.appliedDate)} />
        </Section>

        <Section title="Personal information">
          <Row label="Full name" value={application.formData.fullName} />
          <Row label="Email" value={application.formData.email} />
          <Row label="Phone" value={application.formData.phone} />
          <Row label="State" value={application.formData.state} />
        </Section>

        <Section title="Education">
          <Row label="University" value={application.formData.university} />
          <Row label="Course" value={application.formData.course} />
          <Row label="Level" value={application.formData.level} />
          <Row label="Graduation year" value={application.formData.graduationYear} />
        </Section>

        <Section title="Experience & skills">
          <Row label="Skills" value={application.formData.skills} />
          <Row label="Experience" value={application.formData.experience || "—"} />
          <Row label="Portfolio" value={application.formData.portfolioUrl || "—"} />
          <Row label="LinkedIn" value={application.formData.linkedinUrl || "—"} />
        </Section>

        <Link href={`/internships/${application.internshipId}`} className="w-full">
          <Button variant="outline" className="w-full">
            View internship listing
          </Button>
        </Link>
      </div>
    </Drawer>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      <div className="mt-2 rounded-xl border border-border bg-soft-bg/60 p-3.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1 text-sm">
      <span className="shrink-0 text-muted">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
