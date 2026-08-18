"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Users, Star, CheckCircle2 } from "lucide-react";
import { CompanyShell } from "@/components/company/company-shell";
import { DashboardStat } from "@/components/dashboard/dashboard-stat";
import { ApplicantRow } from "@/components/company/applicant-row";
import { CandidateDrawer } from "@/components/company/candidate-drawer";
import { Button } from "@/components/ui/button";
import {
  useApplicantStatuses,
  useCompanyInternships,
  useCompanyProfile,
} from "@/hooks/useAppData";
import { applicants } from "@/data/applicants";
import { internships } from "@/data/internships";
import { useToast } from "@/components/ui/toast";
import { Applicant } from "@/types";

export default function CompanyDashboardPage() {
  const { profile } = useCompanyProfile();
  const { companyInternships } = useCompanyInternships();
  const { getStatus, setStatus } = useApplicantStatuses();
  const { showToast } = useToast();
  const [selected, setSelected] = useState<Applicant | null>(null);

  const activeInternships =
    internships.filter((i) => i.status === "Active").length + companyInternships.filter((i) => i.status === "Active").length;
  const totalApplicants = applicants.length;
  const shortlisted = applicants.filter((a) => getStatus(a.id) === "Shortlisted").length;
  const positionsFilled = applicants.filter((a) => getStatus(a.id) === "Accepted").length;

  const recentApplicants = [...applicants]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 5);

  return (
    <CompanyShell>
      <div className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-[26px]">
            Good morning, {profile.name} 👋
          </h1>
          <p className="mt-1 text-sm text-muted">
            Here&apos;s an overview of your internship hiring activity.
          </p>
        </div>
        <Link href="/company/internships/new">
          <Button>Post an Internship</Button>
        </Link>
      </div>

      <div className="stagger mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DashboardStat label="Active Internships" value={activeInternships} icon={Briefcase} accent />
        <DashboardStat label="Total Applicants" value={totalApplicants} icon={Users} />
        <DashboardStat label="Shortlisted" value={shortlisted} icon={Star} />
        <DashboardStat label="Positions Filled" value={positionsFilled} icon={CheckCircle2} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent applicants</h2>
        <Link
          href="/company/applicants"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <div className="stagger mt-4 flex flex-col gap-3">
        {recentApplicants.map((applicant) => (
          <ApplicantRow
            key={applicant.id}
            applicant={applicant}
            status={getStatus(applicant.id)}
            onView={() => setSelected(applicant)}
            onShortlist={() => {
              setStatus(applicant.id, "Shortlisted");
              showToast(`${applicant.name} shortlisted`);
            }}
            onReject={() => {
              setStatus(applicant.id, "Rejected");
              showToast(`${applicant.name} rejected`, "error");
            }}
          />
        ))}
      </div>

      <CandidateDrawer
        applicant={selected}
        status={selected ? getStatus(selected.id) : "Applied"}
        open={!!selected}
        onClose={() => setSelected(null)}
        onShortlist={() => {
          if (selected) {
            setStatus(selected.id, "Shortlisted");
            showToast(`${selected.name} shortlisted`);
          }
        }}
        onReject={() => {
          if (selected) {
            setStatus(selected.id, "Rejected");
            showToast(`${selected.name} rejected`, "error");
          }
        }}
        onMoveToReview={() => {
          if (selected) {
            setStatus(selected.id, "Under Review");
            showToast(`${selected.name} moved to review`);
          }
        }}
      />
    </CompanyShell>
  );
}
