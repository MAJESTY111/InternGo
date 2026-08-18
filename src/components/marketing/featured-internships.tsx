"use client";

import Link from "next/link";
import { internships } from "@/data/internships";
import { InternshipCard } from "@/components/internships/internship-card";
import { useSavedInternships } from "@/hooks/useAppData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedInternships() {
  const { isSaved, toggleSave } = useSavedInternships();
  const featured = internships.slice(0, 6);

  return (
    <section className="border-t border-border">
      <div className="container-page py-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured opportunities
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
              Explore opportunities from companies looking for the next
              generation of talent.
            </p>
          </div>
          <Link href="/internships" className="shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5">
              View all internships <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="stagger mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              saved={isSaved(internship.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
