"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  Bookmark,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Globe,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/shared/company-logo";
import { getInternshipById, internships } from "@/data/internships";
import { getCompanyById } from "@/data/companies";
import { useSavedInternships } from "@/hooks/useAppData";
import { ApplyFlow } from "@/components/internships/apply-flow";
import { InternshipCard } from "@/components/internships/internship-card";
import { deadlineLabel, formatDate, cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function InternshipDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const internship = getInternshipById(id);
  const { isSaved, toggleSave } = useSavedInternships();
  const { showToast } = useToast();
  const [applyOpen, setApplyOpen] = useState(false);

  if (!internship) {
    notFound();
  }

  const company = getCompanyById(internship.companyId);
  const saved = isSaved(internship.id);
  const related = internships
    .filter((i) => i.id !== internship.id && i.category === internship.category)
    .slice(0, 3);

  const handleSave = () => {
    toggleSave(internship.id);
    showToast(saved ? "Removed from saved" : "Internship saved", "success");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="border-b border-border bg-soft-bg">
        <div className="container-page py-8">
          <Link
            href="/internships"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to internships
          </Link>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <CompanyLogo
                initials={company?.logoInitials ?? "IN"}
                color={company?.logoColor ?? "#111111"}
                size="lg"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {internship.title}
                </h1>
                <p className="mt-1 text-sm font-medium text-muted">
                  {company?.name}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {internship.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" /> {internship.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 gap-2.5">
              <Button variant="outline" onClick={handleSave} className="gap-2">
                <Bookmark className={cn("h-4 w-4", saved && "fill-accent text-accent-hover")} />
                {saved ? "Saved" : "Save Internship"}
              </Button>
              <Button onClick={() => setApplyOpen(true)}>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-9">
            <Section title="About the role">
              <p className="text-sm leading-relaxed text-muted">{internship.description}</p>
            </Section>

            <Section title="What you'll do">
              <BulletList items={internship.responsibilities} />
            </Section>

            <Section title="Requirements">
              <BulletList items={internship.requirements} />
            </Section>

            <Section title="What you'll learn">
              <BulletList items={internship.whatYouLearn} />
            </Section>

            <Section title="Benefits">
              <div className="flex flex-wrap gap-2">
                {internship.benefits.map((b) => (
                  <Badge key={b} variant="soft">
                    {b}
                  </Badge>
                ))}
              </div>
            </Section>

            {company && (
              <Section title="Company information">
                <div className="flex items-start gap-4 rounded-2xl border border-border p-5">
                  <CompanyLogo initials={company.logoInitials} color={company.logoColor} />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{company.name}</p>
                    <p className="mt-1 text-sm text-muted">{company.description}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" /> {company.industry}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" /> {company.size}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5" /> {company.website.replace("https://", "")}
                      </span>
                    </div>
                  </div>
                </div>
              </Section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border bg-white p-5">
              <p className="text-sm font-semibold text-foreground">Internship details</p>
              <div className="mt-4 flex flex-col gap-4">
                <DetailRow icon={MapPin} label="Location" value={internship.location} />
                <DetailRow icon={Clock} label="Duration" value={internship.duration} />
                <DetailRow icon={Briefcase} label="Type" value={internship.type} />
                <DetailRow icon={Globe} label="Work arrangement" value={internship.workArrangement} />
                <DetailRow icon={Users} label="Openings" value={String(internship.openings)} />
                <DetailRow
                  icon={Calendar}
                  label="Application deadline"
                  value={formatDate(internship.deadline)}
                  highlight={deadlineLabel(internship.deadline)}
                />
              </div>
              <Button className="mt-5 w-full" onClick={() => setApplyOpen(true)}>
                Apply Now
              </Button>
              <Button variant="outline" className="mt-2.5 w-full gap-2" onClick={handleSave}>
                <Bookmark className={cn("h-4 w-4", saved && "fill-accent text-accent-hover")} />
                {saved ? "Saved" : "Save for later"}
              </Button>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-foreground">Similar opportunities</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((i) => (
                <InternshipCard
                  key={i.id}
                  internship={i}
                  saved={isSaved(i.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile apply bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white p-4 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.15)] lg:hidden">
        <Button className="w-full" onClick={() => setApplyOpen(true)}>
          Apply Now
        </Button>
      </div>
      <div className="h-20 lg:hidden" />

      <Footer />

      <ApplyFlow open={applyOpen} onClose={() => setApplyOpen(false)} internship={internship} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-hover" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-soft-bg">
        <Icon className="h-4 w-4 text-muted" />
      </div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
        {highlight && <p className="text-xs font-medium text-[#b45309]">{highlight}</p>}
      </div>
    </div>
  );
}
