"use client";

import { X } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Category,
  InternshipType,
  NigerianLocation,
  WorkArrangement,
} from "@/types";

export interface FilterState {
  location: NigerianLocation | "";
  type: InternshipType | "";
  category: Category | "";
  duration: string;
  workArrangement: WorkArrangement | "";
}

export const locations: NigerianLocation[] = [
  "Lagos",
  "Abuja",
  "Ibadan",
  "Port Harcourt",
  "Enugu",
  "Kaduna",
  "Kano",
  "Benin City",
  "Ilorin",
  "Abeokuta",
  "Remote",
];

export const internshipTypes: InternshipType[] = [
  "SIWES / IT",
  "NYSC",
  "Graduate Internship",
  "Graduate Trainee",
  "Entry Level",
];

export const categories: Category[] = [
  "Software Engineering",
  "Product Design",
  "UI/UX Design",
  "Marketing",
  "Finance",
  "Accounting",
  "Data",
  "Human Resources",
  "Sales",
  "Operations",
];

export const durations = ["3 months", "6 months", "12 months"];
export const workArrangements: WorkArrangement[] = ["On-site", "Hybrid", "Remote"];

export function FilterPanel({
  filters,
  onChange,
  onClear,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}) {
  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-medium text-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" /> Clear ({activeCount})
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <Select
          label="Location"
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value as NigerianLocation | "" })}
        >
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </Select>

        <Select
          label="Internship Type"
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value as InternshipType | "" })}
        >
          <option value="">All types</option>
          {internshipTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>

        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as Category | "" })}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        <Select
          label="Duration"
          value={filters.duration}
          onChange={(e) => onChange({ ...filters, duration: e.target.value })}
        >
          <option value="">Any duration</option>
          {durations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>

        <Select
          label="Work arrangement"
          value={filters.workArrangement}
          onChange={(e) =>
            onChange({ ...filters, workArrangement: e.target.value as WorkArrangement | "" })
          }
        >
          <option value="">Any arrangement</option>
          {workArrangements.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export function emptyFilters(): FilterState {
  return { location: "", type: "", category: "", duration: "", workArrangement: "" };
}
