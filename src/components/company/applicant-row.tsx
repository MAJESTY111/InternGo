"use client";

import { MapPin, GraduationCap } from "lucide-react";
import { Applicant, ApplicationStatus } from "@/types";
import { Avatar } from "@/components/shared/company-logo";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ApplicantRow({
  applicant,
  status,
  onView,
  onShortlist,
  onReject,
}: {
  applicant: Applicant;
  status: ApplicationStatus;
  onView: () => void;
  onShortlist: () => void;
  onReject: () => void;
}) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.1)] sm:flex-row sm:items-center sm:p-5">
      <button
        onClick={onView}
        className="flex flex-1 items-center gap-4 text-left"
      >
        <Avatar initials={applicant.avatarInitials} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{applicant.name}</p>
          <p className="truncate text-xs text-muted">{applicant.appliedRole}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5" />
              {applicant.university}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {applicant.location}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {applicant.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="soft">
                {skill}
              </Badge>
            ))}
            {applicant.skills.length > 3 && (
              <Badge variant="outline">+{applicant.skills.length - 3}</Badge>
            )}
          </div>
        </div>
      </button>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-3 sm:flex-col sm:items-end sm:gap-2 sm:border-t-0 sm:pt-0">
        <StatusBadge status={status} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onView}>
            View
          </Button>
          {status !== "Shortlisted" && (
            <Button variant="secondary" size="sm" onClick={onShortlist}>
              Shortlist
            </Button>
          )}
          {status !== "Rejected" && (
            <Button variant="danger" size="sm" onClick={onReject}>
              Reject
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
