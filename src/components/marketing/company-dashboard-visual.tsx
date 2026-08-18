import { Briefcase, Users, Star } from "lucide-react";

export function CompanyDashboardVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/30 blur-2xl" />
      <div className="absolute -bottom-8 -left-4 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

      <div className="relative animate-fade-in-up rounded-2xl border border-border bg-white p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Zealtrix Digital</p>
          <span className="rounded-full bg-soft-bg px-2.5 py-1 text-[11px] font-medium text-muted">
            Overview
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { icon: Briefcase, label: "Active", value: "4" },
            { icon: Users, label: "Applicants", value: "126" },
            { icon: Star, label: "Shortlisted", value: "18" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border p-3 text-center">
              <stat.icon className="mx-auto h-4 w-4 text-accent-hover" />
              <p className="mt-1.5 text-base font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2.5">
          {[
            { name: "Chiamaka Nwosu", role: "Frontend Developer Intern", status: "Shortlisted", color: "#dbeafe", text: "#1e40af" },
            { name: "Tobiloba Adeyemi", role: "Product Design Intern", status: "Under Review", color: "#fef9c3", text: "#854d0e" },
          ].map((a, i) => (
            <div
              key={a.name}
              className="animate-fade-in-up flex items-center gap-3 rounded-xl border border-border p-3"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-white">
                {a.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{a.name}</p>
                <p className="truncate text-xs text-muted">{a.role}</p>
              </div>
              <span
                className="shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold"
                style={{ backgroundColor: a.color, color: a.text }}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
