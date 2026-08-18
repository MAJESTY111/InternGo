import { cn } from "@/lib/utils";

export function CompanyLogo({
  initials,
  color,
  size = "md",
  className,
}: {
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-9 w-9 text-xs rounded-lg",
    md: "h-12 w-12 text-sm rounded-xl",
    lg: "h-16 w-16 text-base rounded-2xl",
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center font-bold text-white",
        sizes[size],
        className
      )}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-foreground font-semibold text-white",
        sizes[size],
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
