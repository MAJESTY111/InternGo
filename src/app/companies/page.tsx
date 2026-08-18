import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { CompanyDashboardVisual } from "@/components/marketing/company-dashboard-visual";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ClipboardList,
  SlidersHorizontal,
  Users2,
  UserCheck,
  ArrowRight,
  Check,
} from "lucide-react";

const steps = [
  { icon: Building2, title: "Create your internship listing", desc: "Set up a structured listing with role, duration, and location in minutes." },
  { icon: SlidersHorizontal, title: "Define your requirements", desc: "Specify the skills, education, and experience you're looking for." },
  { icon: ClipboardList, title: "InternGo collects applications", desc: "Applications arrive structured and organized — no more scattered inboxes." },
  { icon: UserCheck, title: "Review relevant candidates", desc: "Filter, shortlist, and manage every applicant from one dashboard." },
];

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />
        <div className="container-page grid grid-cols-1 items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-soft-bg px-3 py-1.5 text-xs font-medium text-muted">
              <Users2 className="h-3.5 w-3.5" />
              For Companies
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              Find interns without the inbox chaos.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted sm:text-lg">
              InternGo helps companies collect, organize and filter internship applications in one structured system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/company/internships/new">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  Post an Internship <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  See How It Works
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {["Structured applicant data", "Filter by skills & education", "One dashboard for everything"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <Check className="h-4 w-4 text-accent-hover" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <CompanyDashboardVisual />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-soft-bg">
        <div className="container-page py-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How it works for companies
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative rounded-2xl border border-border bg-white p-5">
                <span className="absolute right-4 top-4 text-2xl font-bold text-soft-bg">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
                  <step.icon className="h-5 w-5 text-accent-hover" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="container-page py-16">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-foreground px-6 py-12 text-center sm:px-12 lg:flex-row lg:text-left">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to find your next intern?
              </h2>
              <p className="mt-3 text-sm text-[#c9c9c9] sm:text-base">
                Post your first listing today and start receiving structured applications.
              </p>
            </div>
            <Link href="/company/internships/new" className="shrink-0">
              <Button size="lg" className="gap-2">
                Post an Internship <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
