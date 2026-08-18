import { cn } from "@/lib/utils";
import { ApplicationStatus } from "@/types";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline" | "soft";
}) {
  const variants = {
    default: "bg-soft-bg text-foreground",
    accent: "bg-accent text-accent-foreground",
    outline: "border border-border text-muted bg-white",
    soft: "bg-[#f4f4f2] text-[#444444]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<
  ApplicationStatus,
  { bg: string; text: string; dot: string }
> = {
  Applied: { bg: "#f4f4f2", text: "#444444", dot: "#9ca3af" },
  "Under Review": { bg: "#fef9c3", text: "#854d0e", dot: "#eab308" },
  Shortlisted: { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
  Accepted: { bg: "#dcfce7", text: "#166534", dot: "#22c55e" },
  Rejected: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const s = statusStyles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: s.dot }}
      />
      {status}
    </span>
  );
}
