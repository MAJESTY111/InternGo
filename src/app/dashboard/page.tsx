"use client";

import Link from "next/link";
import { FileText, Bookmark, Clock, Star, ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardStat } from "@/components/dashboard/dashboard-stat";
import { InternshipCard } from "@/components/internships/internship-card";
import { StatusBadge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/shared/company-logo";
import { Button } from "@/components/ui/button";
import {
  useApplications,
  useSavedInternships,
  useStudentProfile,
} from "@/hooks/useAppData";
import { internships } from "@/data/internships";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const { profile } = useStudentProfile();
  const { applications } = useApplications();
  const { saved, isSaved, toggleSave } = useSavedInternships();

  const underReview = applications.filter((a) => a.status === "Under Review").length;
  const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;

  const appliedIds = new Set(applications.map((a) => a.internshipId));
  const recommended = internships
    .filter((i) => i.status === "Active" && !appliedIds.has(i.id))
    .slice(0, 3);

  const recentApplications = applications.slice(0, 5);

  const firstName = profile.fullName.split(" ")[0];
  const greeting = getGreeting();

  return (
    <DashboardShell>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-[26px]">
          {greeting}, {firstName} 👋
        </h1>
        <p className="mt-1 text-sm text-muted">
          Here&apos;s what&apos;s happening with your internship search.
        </p>
      </div>

      <div className="stagger mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DashboardStat label="Applications" value={applications.length} icon={FileText} accent />
        <DashboardStat label="Saved" value={saved.length} icon={Bookmark} />
        <DashboardStat label="Under Review" value={underReview} icon={Clock} />
        <DashboardStat label="Shortlisted" value={shortlisted} icon={Star} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recommended for you</h2>
        <Link
          href="/internships"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground"
        >
          Browse all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="stagger mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {recommended.map((internship) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            saved={isSaved(internship.id)}
            onToggleSave={toggleSave}
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent applications</h2>
        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-foreground"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {recentApplications.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-white p-8 text-center">
          <p className="text-sm text-muted">You haven&apos;t applied to any internships yet.</p>
          <Link href="/internships">
            <Button className="mt-4" size="sm">
              Find internships
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
          {/* Desktop table */}
          <table className="hidden w-full text-left sm:table">
            <thead>
              <tr className="border-b border-border bg-soft-bg/60 text-xs font-semibold uppercase tracking-wide text-muted">
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Date Applied</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 text-sm font-medium text-foreground">
                    {app.internshipTitle}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <CompanyLogo
                        initials={app.companyLogoInitials}
                        color={app.companyLogoColor}
                        size="sm"
                      />
                      <span className="text-sm text-foreground">{app.companyName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">{formatDate(app.appliedDate)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="divide-y divide-border sm:hidden">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-4">
                <CompanyLogo
                  initials={app.companyLogoInitials}
                  color={app.companyLogoColor}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {app.internshipTitle}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {app.companyName} · {formatDate(app.appliedDate)}
                  </p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
