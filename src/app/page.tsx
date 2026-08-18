import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { HeroSearch } from "@/components/marketing/hero-search";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { FeaturedInternships } from "@/components/marketing/featured-internships";
import { Button } from "@/components/ui/button";
import {
  Check,
  Building2,
  FileSearch,
  ClipboardList,
  Users2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />
        <div className="container-page grid grid-cols-1 items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-soft-bg px-3 py-1.5 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-hover" />
              Now live across Nigeria
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Find the right internship.
              <br />
              Start your career.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted sm:text-lg">
              Discover internship, SIWES, NYSC and graduate opportunities from
              companies across Nigeria — all in one place.
            </p>

            <div className="mt-8">
              <HeroSearch />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                "Opportunities across Nigeria",
                "Internship-focused",
                "Easy applications",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <Check className="h-4 w-4 text-accent-hover" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Featured internships */}
      <FeaturedInternships />

      {/* Value props */}
      <section className="border-t border-border bg-soft-bg">
        <div className="container-page py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: FileSearch,
                title: "One place to search",
                desc: "Stop scrolling WhatsApp groups and DMs. Every opportunity, structured and searchable.",
              },
              {
                icon: ClipboardList,
                title: "Structured applications",
                desc: "Apply once with a clean, guided flow — no scattered emails or forms to track.",
              },
              {
                icon: Users2,
                title: "Built for Nigeria",
                desc: "SIWES, NYSC, graduate trainee and entry-level roles from companies across the country.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
                  <item.icon className="h-5 w-5 text-accent-hover" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies teaser */}
      <section className="border-t border-border">
        <div className="container-page py-16">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-foreground px-6 py-12 text-center sm:px-12 lg:flex-row lg:text-left">
            <div className="max-w-lg">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent lg:mx-0">
                <Building2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Hiring interns? Skip the inbox chaos.
              </h2>
              <p className="mt-3 text-sm text-[#c9c9c9] sm:text-base">
                Post a listing, collect structured applications, and filter
                candidates — all from one dashboard.
              </p>
            </div>
            <Link href="/companies" className="shrink-0">
              <Button size="lg" className="gap-2">
                For Companies <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
