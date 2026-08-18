"use client";

import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { CompanyShell } from "@/components/company/company-shell";
import { ApplicantRow } from "@/components/company/applicant-row";
import { CandidateDrawer } from "@/components/company/candidate-drawer";
import { EmptyState } from "@/components/shared/empty-state";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useApplicantStatuses } from "@/hooks/useAppData";
import { useToast } from "@/components/ui/toast";
import { applicants } from "@/data/applicants";
import { Applicant, ApplicationStatus } from "@/types";

const statusOptions: ("All" | ApplicationStatus)[] = [
  "All",
  "Applied",
  "Under Review",
  "Shortlisted",
  "Accepted",
  "Rejected",
];

export default function CompanyApplicantsPage() {
  const { getStatus, setStatus } = useApplicantStatuses();
  const { showToast } = useToast();
  const [selected, setSelected] = useState<Applicant | null>(null);

  const [search, setSearch] = useState("");
  const [internshipFilter, setInternshipFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [educationFilter, setEducationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | ApplicationStatus>("All");

  const internshipTitles = useMemo(() => {
    const titles = new Set(applicants.map((a) => a.appliedRole));
    return ["All", ...Array.from(titles)];
  }, []);

  const locations = useMemo(() => {
    const locs = new Set(applicants.map((a) => a.location));
    return ["All", ...Array.from(locs)];
  }, []);

  const universities = useMemo(() => {
    const unis = new Set(applicants.map((a) => a.university));
    return ["All", ...Array.from(unis)];
  }, []);

  const filtered = applicants.filter((a) => {
    const status = getStatus(a.id);
    if (statusFilter !== "All" && status !== statusFilter) return false;
    if (internshipFilter !== "All" && a.appliedRole !== internshipFilter) return false;
    if (locationFilter !== "All" && a.location !== locationFilter) return false;
    if (educationFilter !== "All" && a.university !== educationFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const haystack = `${a.name} ${a.skills.join(" ")} ${a.university}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  return (
    <CompanyShell>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Applicants</h1>
        <p className="mt-1 text-sm text-muted">
          Review and manage candidates who applied to your internships.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-border bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
        <Input
          placeholder="Search by name, skill, university..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="lg:col-span-1"
        />
        <Select value={internshipFilter} onChange={(e) => setInternshipFilter(e.target.value)}>
          {internshipTitles.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All internships" : t}
            </option>
          ))}
        </Select>
        <Select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l === "All" ? "All locations" : l}
            </option>
          ))}
        </Select>
        <Select value={educationFilter} onChange={(e) => setEducationFilter(e.target.value)}>
          {universities.map((u) => (
            <option key={u} value={u}>
              {u === "All" ? "All universities" : u}
            </option>
          ))}
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "All" | ApplicationStatus)}>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All statuses" : s}
            </option>
          ))}
        </Select>
      </div>

      <p className="mt-4 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? "applicant" : "applicants"} found
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon={Users}
            title="No applicants found"
            description="Try adjusting your filters, or check back later as students apply."
          />
        </div>
      ) : (
        <div className="stagger mt-4 flex flex-col gap-3">
          {filtered.map((applicant) => (
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
      )}

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
