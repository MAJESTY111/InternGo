"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Find Internships", href: "/internships" },
  { label: "For Companies", href: "/companies" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-soft-bg text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/internships">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-foreground lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="animate-fade-in absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="animate-slide-in-right absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full p-1.5 text-muted hover:bg-soft-bg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-soft-bg"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/internships" onClick={() => setOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
