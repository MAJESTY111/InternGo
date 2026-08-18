import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardStat({
  label,
  value,
  icon: Icon,
  accent = false,
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-fade-in-up flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          accent ? "bg-accent" : "bg-soft-bg"
        )}
      >
        <Icon className={cn("h-5 w-5", accent ? "text-accent-foreground" : "text-foreground")} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="truncate text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
