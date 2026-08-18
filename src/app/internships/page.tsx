"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, SearchX } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { internships } from "@/data/internships";
import { getCompanyById } from "@/data/companies";
import { InternshipCard } from "@/components/internships/internship-card";
import {
  FilterPanel,
  FilterState,
  emptyFilters,
} from "@/components/internships/filter-panel";
import { useSavedInternships } from "@/hooks/useAppData";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { Drawer } from "@/components/ui/drawer";

type SortOption = "recent" | "deadline" | "relevant";

function InternshipsContent() {
  const searchParams = useSearchParams();
  const { isSaved, toggleSave } = useSavedInternships();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [filters, setFilters] = useState<FilterState>({
    ...emptyFilters(),
    location: (searchParams.get("location") as FilterState["location"]) || "",
  });
  const [sort, setSort] = useState<SortOption>("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = internships.filter((i) => i.status === "Active");

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((i) => {
        const company = getCompanyById(i.companyId);
        return (
          i.title.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          company?.name.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    if (filters.location) {
      list = list.filter((i) =>
        i.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.type) list = list.filter((i) => i.type === filters.type);
    if (filters.category) list = list.filter((i) => i.category === filters.category);
    if (filters.duration) list = list.filter((i) => i.duration === filters.duration);
    if (filters.workArrangement)
      list = list.filter((i) => i.workArrangement === filters.workArrangement);

    if (sort === "deadline") {
      list = [...list].sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    } else if (sort === "recent") {
      list = [...list].sort(
        (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
    }
    // "relevant" keeps default order when there's a query, otherwise falls back to dataset order

    return list;
  }, [query, filters, sort]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="border-b border-border bg-soft-bg">
        <div className="container-page py-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Find your next opportunity
          </h1>
          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm">
            <Search className="ml-2 h-5 w-5 shrink-0 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role, company, or skill..."
              className="w-full border-none bg-transparent p-2 text-sm text-foreground outline-none placeholder:text-[#b3b3b3]"
              aria-label="Search internships"
            />
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onClear={() => setFilters(emptyFilters())}
              />
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-sm text-muted">
                <span className="font-semibold text-foreground">{results.length}</span>{" "}
                {results.length === 1 ? "opportunity" : "opportunities"} found
              </p>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="w-full sm:w-52"
                aria-label="Sort internships"
              >
                <option value="recent">Most Recent</option>
                <option value="deadline">Deadline Soon</option>
                <option value="relevant">Most Relevant</option>
              </Select>
            </div>

            {results.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="No internships match your search"
                description="Try adjusting your filters or search terms to see more opportunities."
                action={
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters(emptyFilters());
                      setQuery("");
                    }}
                  >
                    Clear all filters
                  </Button>
                }
              />
            ) : (
              <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    saved={isSaved(internship.id)}
                    onToggleSave={toggleSave}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Drawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filters"
        side="bottom"
      >
        <div className="p-4">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters(emptyFilters())}
          />
          <Button className="mt-4 w-full" onClick={() => setMobileFiltersOpen(false)}>
            Show {results.length} results
          </Button>
        </div>
      </Drawer>

      <Footer />
    </div>
  );
}

export default function InternshipsPage() {
  return (
    <Suspense fallback={null}>
      <InternshipsContent />
    </Suspense>
  );
}
