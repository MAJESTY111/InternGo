"use client";

import { Drawer } from "@/components/ui/drawer";
import { Avatar } from "@/components/shared/company-logo";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Applicant, ApplicationStatus } from "@/types";
import { getInternshipById } from "@/data/internships";
import { formatDate } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Link2,
  Calendar,
} from "lucide-react";

export function CandidateDrawer({
  applicant,
  status,
  open,
  onClose,
  onShortlist,
  onReject,
  onMoveToReview,
}: {
  applicant: Applicant | null;
  status: ApplicationStatus;
  open: boolean;
  onClose: () => void;
  onShortlist: () => void;
  onReject: () => void;
  onMoveToReview: () => void;
}) {
  if (!applicant) return null;
  const internship = getInternshipById(applicant.internshipId);

  return (
    <Drawer open={open} onClose={onClose} title="Candidate profile">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-4">
          <Avatar initials={applicant.avatarInitials} size="lg" />
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-foreground">{applicant.name}</h3>
            <p className="truncate text-sm text-muted">{applicant.appliedRole}</p>
            <div className="mt-1.5">
              <StatusBadge status={status} />
            </div>
          </div>
        </div>

        <Section title="Application details">
          <Row icon={Calendar} label="Applied for" value={internship?.title ?? applicant.appliedRole} />
          <Row icon={Calendar} label="Date applied" value={formatDate(applicant.appliedDate)} />
          <Row icon={MapPin} label="Location" value={applicant.location} />
        </Section>

        <Section title="Education">
          <Row icon={GraduationCap} label="University" value={applicant.university} />
          <Row icon={GraduationCap} label="Course" value={applicant.course} />
          <Row icon={GraduationCap} label="Level" value={applicant.level} />
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {applicant.skills.map((skill) => (
              <Badge key={skill} variant="soft">
                {skill}
              </Badge>
            ))}
          </div>
        </Section>

        <Section title="Experience">
          <p className="text-sm leading-relaxed text-foreground">{applicant.experience}</p>
        </Section>

        <Section title="Contact & links">
          <Row icon={Mail} label="Email" value={applicant.email} />
          <Row icon={Phone} label="Phone" value={applicant.phone} />
          {applicant.portfolioUrl && (
            <Row icon={Link2} label="Portfolio" value={applicant.portfolioUrl} isLink />
          )}
          {applicant.linkedinUrl && (
            <Row icon={Link2} label="LinkedIn" value={applicant.linkedinUrl} isLink />
          )}
        </Section>

        <div className="sticky bottom-0 -mx-6 -mb-6 flex flex-col gap-2 border-t border-border bg-white px-6 py-4 sm:flex-row">
          <Button className="flex-1" onClick={onShortlist} disabled={status === "Shortlisted"}>
            Shortlist
          </Button>
          <Button variant="outline" className="flex-1" onClick={onMoveToReview} disabled={status === "Under Review"}>
            Move to Review
          </Button>
          <Button variant="danger" className="flex-1" onClick={onReject} disabled={status === "Rejected"}>
            Reject
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
      <div className="mt-2.5 space-y-2">{children}</div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  isLink,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-medium text-accent-hover hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="truncate font-medium text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}
