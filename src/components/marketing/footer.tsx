import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-soft-bg">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted">
              Internships shouldn&apos;t be this hard to find.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Students</p>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="/internships" className="text-sm text-muted hover:text-foreground">
                Find Internships
              </Link>
              <Link href="/how-it-works" className="text-sm text-muted hover:text-foreground">
                How It Works
              </Link>
              <Link href="/dashboard" className="text-sm text-muted hover:text-foreground">
                Student Dashboard
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Companies</p>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="/companies" className="text-sm text-muted hover:text-foreground">
                For Companies
              </Link>
              <Link href="/company/internships/new" className="text-sm text-muted hover:text-foreground">
                Post an Internship
              </Link>
              <Link href="/company/dashboard" className="text-sm text-muted hover:text-foreground">
                Company Dashboard
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Company</p>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="/about" className="text-sm text-muted hover:text-foreground">
                About
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © 2026 InternGo. All rights reserved.
          </p>
          <p className="text-xs text-muted">Made for students and companies across Nigeria 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}
