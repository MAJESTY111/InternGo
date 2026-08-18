"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ApplicationDetailDrawer } from "@/components/dashboard/application-detail-drawer";
import { Tabs } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/shared/company-logo";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useApplications } from "@/hooks/useAppData";
import { formatDate } from "@/lib/utils";
import { Application, ApplicationStatus } from "@/types";

type TabValue = "All" | ApplicationStatus;

export default function ApplicationsPage() {
  const { applications } = useApplications();
  const [tab, setTab] = useState<TabValue>("All");
  const [selected, setSelected] = useState<Application | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: applications.length };
    for (const status of ["Under Review", "Shortlisted", "Accepted", "Rejected"]) {
      c[status] = applications.filter((a) => a.status === status).length;
    }
    return c;
  }, [applications]);

  const filtered =
    tab === "All" ? applications : applications.filter((a) => a.status === tab);

  return (
    <DashboardShell>
      <div className="animate-fade-in-up flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Applications</h1>
          <p className="mt-1 text-sm text-muted">Track the status of every internship you&apos;ve applied to.</p>
        </div>
      </div>

      <div className="mt-6">
        <Tabs
          tabs={[
            { label: "All", value: "All", count: counts.All },
            { label: "Under Review", value: "Under Review", count: counts["Under Review"] },
            { label: "Shortlisted", value: "Shortlisted", count: counts["Shortlisted"] },
            { label: "Accepted", value: "Accepted", count: counts["Accepted"] },
            { label: "Rejected", value: "Rejected", count: counts["Rejected"] },
          ]}
          active={tab}
          onChange={(v) => setTab(v as TabValue)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={FileText}
            title="No applications here yet"
            description={
              tab === "All"
                ? "You haven't applied to any internships yet."
                : `No applications with status "${tab}" yet.`
            }
            action={
              <Link href="/internships">
                <Button size="sm">Find internships</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="stagger mt-6 flex flex-col gap-3">
          {filtered.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelected(app)}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 text-left transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.1)] sm:flex-row sm:items-center sm:p-5"
            >
              <CompanyLogo initials={app.companyLogoInitials} color={app.companyLogoColor} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {app.internshipTitle}
                </p>
                <p className="truncate text-xs text-muted">
                  {app.companyName} · {app.location}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-3 sm:border-t-0 sm:pt-0">
                <span className="text-xs text-muted">Applied {formatDate(app.appliedDate)}</span>
                <StatusBadge status={app.status} />
              </div>
              <span className="hidden shrink-0 text-sm font-medium text-muted sm:inline">
                View Details →
              </span>
            </button>
          ))}
        </div>
      )}

      <ApplicationDetailDrawer
        application={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </DashboardShell>
  );
}
