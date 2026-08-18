"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Search,
  Bookmark,
  FileText,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Avatar } from "@/components/shared/company-logo";
import { cn } from "@/lib/utils";
import { useStudentProfile } from "@/hooks/useAppData";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "Find Internships", href: "/internships", icon: Search },
  { label: "Saved", href: "/dashboard/saved", icon: Bookmark },
  { label: "Applications", href: "/dashboard/applications", icon: FileText },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile } = useStudentProfile();

  return (
    <div className="min-h-screen bg-soft-bg">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-white lg:flex">
        <div className="px-5 py-5">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent/20 text-foreground"
                    : "text-muted hover:bg-soft-bg hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px]", active && "text-accent-hover")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border px-3 py-4">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-soft-bg hover:text-foreground"
          >
            <Settings className="h-[18px] w-[18px]" /> Settings
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-soft-bg hover:text-foreground"
          >
            <LogOut className="h-[18px] w-[18px]" /> Log out
          </Link>
          <div className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2">
            <Avatar initials={profile.avatarInitials} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{profile.fullName}</p>
              <p className="truncate text-xs text-muted">{profile.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-white px-4 py-3 lg:hidden">
        <Logo />
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-foreground"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="animate-fade-in absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="animate-slide-in-right absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-full p-1.5 text-muted hover:bg-soft-bg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-soft-bg px-3 py-2.5">
              <Avatar initials={profile.avatarInitials} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{profile.fullName}</p>
                <p className="truncate text-xs text-muted">{profile.email}</p>
              </div>
            </div>
            <nav className="mt-4 flex-1 space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                      active ? "bg-accent/20 text-foreground" : "text-muted hover:bg-soft-bg"
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-border pt-3">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-soft-bg"
              >
                <LogOut className="h-[18px] w-[18px]" /> Log out
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="container-page py-8">{children}</div>
      </main>
    </div>
  );
}
