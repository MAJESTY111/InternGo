import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, Target, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border">
        <div className="container-page py-14 sm:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-soft-bg px-3 py-1.5 text-xs font-medium text-muted">
            About InternGo
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Internships shouldn&apos;t be this hard to find.
          </h1>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page grid grid-cols-1 gap-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-foreground">The problem</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Students across Nigeria currently search for internship, SIWES, and NYSC opportunities through scattered WhatsApp groups, social media posts, emails, friends, company websites, and word of mouth. It&apos;s slow, unstructured, and easy to miss a good opportunity entirely.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              On the other side, companies looking to bring on interns receive applications through emails, DMs, forms, and other unstructured channels — making it hard to organize, compare, and follow up with candidates.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">The InternGo solution</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              InternGo brings both sides of internship placement into one structured platform. Students discover, filter, and apply to real opportunities in a few clicks. Companies post listings, define requirements, and manage every applicant from a single dashboard.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              No more scattered channels — just one clear, organized system built specifically for internship placement.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-soft-bg">
        <div className="container-page py-16">
          <h2 className="text-xl font-bold text-foreground">Why internship placement in Nigeria needs better structure</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            Every year, thousands of students and graduates across Nigeria go through SIWES, NYSC, and graduate internship programs — yet the process of finding and applying to the right opportunity hasn&apos;t evolved much. InternGo exists to give internship placement the same structure and clarity that job platforms have brought to full-time hiring, tailored specifically for internships.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page py-16">
          <h2 className="text-xl font-bold text-foreground">Who InternGo serves</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
                <GraduationCap className="h-5 w-5 text-accent-hover" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">Students & graduates</h3>
              <p className="mt-1.5 text-sm text-muted">
                Students, NYSC members, graduate trainees, and young graduates looking for internship, SIWES, or entry-level opportunities across Nigeria.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
                <Building2 className="h-5 w-5 text-accent-hover" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">Companies</h3>
              <p className="mt-1.5 text-sm text-muted">
                Companies of every size offering internship opportunities who want a structured way to collect, organize, and review applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-foreground">
        <div className="container-page py-16 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
            <Target className="h-5 w-5 text-accent-foreground" />
          </div>
          <h2 className="mt-5 text-xs font-semibold uppercase tracking-wide text-[#c9c9c9]">Our mission</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl font-bold leading-snug text-white sm:text-2xl">
            To make internship placement simpler, more accessible, and more structured for young talent and companies across Nigeria.
          </p>
        </div>
      </section>

      <section>
        <div className="container-page flex flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Join InternGo today</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/internships">
              <Button size="lg" className="gap-2">
                Find Internships <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/companies">
              <Button size="lg" variant="outline">For Companies</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
