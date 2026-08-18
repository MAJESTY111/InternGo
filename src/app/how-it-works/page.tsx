import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import {
  UserCircle2,
  Search,
  Send,
  ListChecks,
  PartyPopper,
  Building2,
  ClipboardList,
  SlidersHorizontal,
  Users2,
  UserCheck,
  ArrowRight,
} from "lucide-react";

const studentSteps = [
  { icon: UserCircle2, title: "Create your profile", desc: "Add your education, skills, and experience once — reuse it for every application." },
  { icon: Search, title: "Discover opportunities", desc: "Search and filter internships by category, location, and type across Nigeria." },
  { icon: Send, title: "Apply", desc: "Apply through a clean, guided flow instead of scattered forms and emails." },
  { icon: ListChecks, title: "Track your application", desc: "See exactly where each application stands, from submitted to shortlisted." },
  { icon: PartyPopper, title: "Get placed", desc: "Get matched with a role that fits, and start building real experience." },
];

const companySteps = [
  { icon: Building2, title: "Create company profile", desc: "Set up your public company profile so students know who you are." },
  { icon: ClipboardList, title: "Post internship", desc: "Publish a structured listing with role details, duration, and requirements." },
  { icon: SlidersHorizontal, title: "Set requirements", desc: "Define the skills and qualifications you're looking for in a candidate." },
  { icon: Users2, title: "Receive filtered candidates", desc: "Applications arrive structured and searchable — no more sifting through inboxes." },
  { icon: UserCheck, title: "Select interns", desc: "Review, shortlist, and manage candidates from one applicant dashboard." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border">
        <div className="container-page py-14 text-center sm:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-soft-bg px-3 py-1.5 text-xs font-medium text-muted">
            How It Works
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            One structured platform for students and companies
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">
            Whether you&apos;re looking for your next internship or hiring your next intern, InternGo keeps the whole process simple.
          </p>
        </div>
      </section>

      {/* Students */}
      <section className="border-b border-border">
        <div className="container-page py-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">For Students</h2>
            <Link href="/internships">
              <Button variant="outline" size="sm" className="gap-1.5 hidden sm:inline-flex">
                Find Internships <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {studentSteps.map((step, idx) => (
              <StepCard key={step.title} step={step} number={idx + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="bg-soft-bg">
        <div className="container-page py-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">For Companies</h2>
            <Link href="/companies">
              <Button variant="outline" size="sm" className="gap-1.5 hidden sm:inline-flex">
                For Companies <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {companySteps.map((step, idx) => (
              <StepCard key={step.title} step={step} number={idx + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="container-page flex flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Ready to get started?</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/internships">
              <Button size="lg">Find Internships</Button>
            </Link>
            <Link href="/companies">
              <Button size="lg" variant="outline">Post an Internship</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StepCard({
  step,
  number,
}: {
  step: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string };
  number: number;
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-white p-5">
      <span className="absolute right-4 top-4 text-2xl font-bold text-soft-bg">
        {String(number).padStart(2, "0")}
      </span>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
        <step.icon className="h-5 w-5 text-accent-hover" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">{step.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.desc}</p>
    </div>
  );
}
