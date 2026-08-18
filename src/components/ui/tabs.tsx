"use client";

import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { label: string; value: string; count?: number }[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="scrollbar-none flex gap-1 overflow-x-auto border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "relative flex shrink-0 items-center gap-1.5 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
            active === tab.value
              ? "text-foreground"
              : "text-muted hover:text-foreground"
          )}
        >
          {tab.label}
          {typeof tab.count === "number" && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                active === tab.value
                  ? "bg-accent text-accent-foreground"
                  : "bg-soft-bg text-muted"
              )}
            >
              {tab.count}
            </span>
          )}
          {active === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-foreground" />
          )}
        </button>
      ))}
    </div>
  );
}
