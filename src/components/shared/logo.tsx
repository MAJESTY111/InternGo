import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2 shrink-0", className)}
      aria-label="InternGo home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
        <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
      </span>
      <span className="text-lg font-bold tracking-tight text-foreground">
        Intern<span className="text-accent-hover">Go</span>
      </span>
    </Link>
  );
}
