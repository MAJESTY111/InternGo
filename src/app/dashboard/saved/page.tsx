"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { InternshipCard } from "@/components/internships/internship-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { useSavedInternships } from "@/hooks/useAppData";
import { getInternshipById } from "@/data/internships";

export default function SavedInternshipsPage() {
  const { saved, isSaved, toggleSave } = useSavedInternships();

  const savedInternships = saved
    .map((s) => getInternshipById(s.internshipId))
    .filter((i): i is NonNullable<typeof i> => !!i);

  return (
    <DashboardShell>
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Saved Internships</h1>
        <p className="mt-1 text-sm text-muted">
          Opportunities you&apos;ve bookmarked to revisit and apply later.
        </p>
      </div>

      {savedInternships.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Bookmark}
            title="No saved opportunities yet"
            description="Save internships you're interested in and they'll appear here."
            action={
              <Link href="/internships">
                <Button size="sm">Find internships</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="stagger mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {savedInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              saved={isSaved(internship.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
