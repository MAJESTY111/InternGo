"use client";

import Link from "next/link";
import { Bookmark, MapPin, Clock, Users } from "lucide-react";
import { Internship } from "@/types";
import { CompanyLogo } from "@/components/shared/company-logo";
import { Badge } from "@/components/ui/badge";
import { getCompanyById } from "@/data/companies";
import { deadlineLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function InternshipCard({
  internship,
  saved,
  onToggleSave,
}: {
  internship: Internship;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
}) {
  const company = getCompanyById(internship.companyId);
  const closingSoon = deadlineLabel(internship.deadline).includes("day");

  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#d4d4d4] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)]">
      {onToggleSave && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleSave(internship.id);
          }}
          aria-label={saved ? "Remove from saved" : "Save internship"}
          aria-pressed={saved}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted shadow-sm ring-1 ring-border transition-colors hover:text-foreground"
        >
          <Bookmark
            className={cn("h-4 w-4 transition-all", saved && "fill-accent text-accent-hover")}
          />
        </button>
      )}

      <Link href={`/internships/${internship.id}`} className="flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <CompanyLogo initials={company?.logoInitials ?? "IN"} color={company?.logoColor ?? "#111111"} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-muted">{company?.name}</p>
            <h3 className="truncate text-[15px] font-semibold text-foreground">
              {internship.title}
            </h3>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {internship.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {internship.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {internship.openings} openings
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Badge variant="soft">{internship.type}</Badge>
          <Badge variant="outline">{internship.workArrangement}</Badge>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span
            className={cn(
              "text-xs font-medium",
              closingSoon ? "text-[#b45309]" : "text-muted"
            )}
          >
            {deadlineLabel(internship.deadline)}
          </span>
          <span className="text-sm font-semibold text-foreground group-hover:text-accent-hover">
            View Internship →
          </span>
        </div>
      </Link>
    </div>
  );
}

export function InternshipCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton h-4 w-36 rounded" />
        </div>
      </div>
      <div className="mt-4 skeleton h-3 w-full rounded" />
      <div className="mt-4 flex gap-2">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}
