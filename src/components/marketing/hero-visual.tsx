import { CheckCircle2, Clock3, MapPin } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-accent/30 blur-2xl" />
      <div className="absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

      <div className="relative animate-fade-in-up rounded-2xl border border-border bg-white p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Recommended for you</p>
          <span className="rounded-full bg-soft-bg px-2.5 py-1 text-[11px] font-medium text-muted">
            24 new
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {[
            { role: "Frontend Developer Intern", co: "Zealtrix Digital", loc: "Lagos", tag: "SIWES", color: "#111111" },
            { role: "Product Design Intern", co: "Terraform Studio", loc: "Abuja", tag: "Graduate", color: "#7c3aed" },
            { role: "Data Analyst Intern", co: "Kenoty Analytics", loc: "Lagos", tag: "Trainee", color: "#1d4ed8" },
          ].map((item, i) => (
            <div
              key={item.role}
              className="animate-fade-in-up flex items-center gap-3 rounded-xl border border-border p-3"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.co.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{item.role}</p>
                <p className="flex items-center gap-1 truncate text-xs text-muted">
                  <MapPin className="h-3 w-3" /> {item.loc} · {item.co}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-accent/20 px-2 py-1 text-[10px] font-semibold text-accent-hover">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="animate-fade-in-up absolute -bottom-8 -left-8 hidden w-56 rounded-xl border border-border bg-white p-3.5 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.2)] sm:block"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <p className="text-xs font-semibold text-foreground">Application status</p>
        </div>
        <p className="mt-1.5 text-xs text-muted">Backend Developer Intern</p>
        <div className="mt-2 flex items-center gap-1.5">
          <Clock3 className="h-3 w-3 text-[#b45309]" />
          <span className="text-[11px] font-medium text-[#b45309]">Shortlisted — awaiting interview</span>
        </div>
      </div>
    </div>
  );
}
