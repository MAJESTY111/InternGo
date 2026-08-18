"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Briefcase, Eye, Pencil, Users, XCircle } from "lucide-react";
import { CompanyShell } from "@/components/company/company-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCompanyInternships, useCompanyProfile } from "@/hooks/useAppData";
import { getInternshipsByCompany } from "@/data/internships";
import { applicants } from "@/data/applicants";
import { formatDate, deadlineLabel } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function CompanyInternshipsPage() {
  const { profile } = useCompanyProfile();
  const { companyInternships, closeListing } = useCompanyInternships();
  const { showToast } = useToast();

  const ownedMock = useMemo(() => {
    // In this demo, the signed-in company owns the internships from company c1 (Zealtrix Digital)
    return getInternshipsByCompany("c1").map((i) => ({
      id: i.id,
      title: i.title,
      location: i.location,
      workArrangement: i.workArrangement,
      type: i.type,
      deadline: i.deadline,
      status: i.status,
      applications: applicants.filter((a) => a.internshipId === i.id).length,
      isMock: true as const,
    }));
  }, []);

  const created = companyInternships.map((i) => ({
    id: i.id,
    title: i.title,
    location: i.location,
    workArrangement: i.workArrangement,
    type: i.type,
    deadline: i.deadline,
    status: i.status,
    applications: i.applications,
    isMock: false as const,
  }));

  const allListings = [...created, ...ownedMock];

  return (
    <CompanyShell>
      <div className="animate-fade-in-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Internship Listings
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage {profile.name}&apos;s active and past internship listings.
          </p>
        </div>
        <Link href="/company/internships/new">
          <Button>Post an Internship</Button>
        </Link>
      </div>

      {allListings.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Briefcase}
            title="No internship listings yet"
            description="Create your first internship listing to start receiving applications."
            action={
              <Link href="/company/internships/new">
                <Button size="sm">Post an Internship</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
          <table className="hidden w-full text-left lg:table">
            <thead>
              <tr className="border-b border-border bg-soft-bg/60 text-xs font-semibold uppercase tracking-wide text-muted">
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Applications</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Deadline</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allListings.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 text-sm font-medium text-foreground">{item.title}</td>
                  <td className="px-5 py-4 text-sm text-muted">{item.applications}</td>
                  <td className="px-5 py-4 text-sm text-muted">{item.location}</td>
                  <td className="px-5 py-4">
                    <Badge variant="soft">{item.type}</Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">{deadlineLabel(item.deadline) || formatDate(item.deadline)}</td>
                  <td className="px-5 py-4">
                    <Badge variant={item.status === "Active" ? "accent" : "outline"}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      {item.isMock ? (
                        <Link
                          href={`/internships/${item.id}`}
                          className="rounded-lg p-2 text-muted hover:bg-soft-bg hover:text-foreground"
                          aria-label="View listing"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      ) : (
                        <button
                          className="rounded-lg p-2 text-muted hover:bg-soft-bg hover:text-foreground"
                          aria-label="Edit listing"
                          onClick={() => showToast("Editing isn't available in this demo yet.")}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      <Link
                        href="/company/applicants"
                        className="rounded-lg p-2 text-muted hover:bg-soft-bg hover:text-foreground"
                        aria-label="View applicants"
                      >
                        <Users className="h-4 w-4" />
                      </Link>
                      {!item.isMock && item.status === "Active" && (
                        <button
                          className="rounded-lg p-2 text-muted hover:bg-soft-bg hover:text-error"
                          aria-label="Close listing"
                          onClick={() => {
                            closeListing(item.id);
                            showToast("Listing closed.");
                          }}
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="divide-y divide-border lg:hidden">
            {allListings.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {item.location} · {item.type}
                    </p>
                  </div>
                  <Badge variant={item.status === "Active" ? "accent" : "outline"}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{item.applications} applications</span>
                  <span>{deadlineLabel(item.deadline) || formatDate(item.deadline)}</span>
                </div>
                <div className="flex gap-2">
                  {item.isMock ? (
                    <Link href={`/internships/${item.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => showToast("Editing isn't available in this demo yet.")}
                    >
                      Edit
                    </Button>
                  )}
                  <Link href="/company/applicants" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Applicants
                    </Button>
                  </Link>
                  {!item.isMock && item.status === "Active" && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        closeListing(item.id);
                        showToast("Listing closed.");
                      }}
                    >
                      Close
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CompanyShell>
  );
}
