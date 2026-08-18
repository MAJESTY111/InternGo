"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    router.push(`/internships?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full flex-col gap-2 rounded-2xl border border-border bg-white p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5">
        <Search className="h-5 w-5 shrink-0 text-muted" />
        <div className="w-full text-left">
          <label htmlFor="hero-search-q" className="block text-[11px] font-medium text-muted">
            What are you looking for?
          </label>
          <input
            id="hero-search-q"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Software Engineering, Marketing, Accounting..."
            className="w-full border-none bg-transparent p-0 text-sm text-foreground outline-none placeholder:text-[#b3b3b3]"
          />
        </div>
      </div>

      <div className="hidden h-9 w-px bg-border sm:block" />

      <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5">
        <MapPin className="h-5 w-5 shrink-0 text-muted" />
        <div className="w-full text-left">
          <label htmlFor="hero-search-loc" className="block text-[11px] font-medium text-muted">
            Where?
          </label>
          <input
            id="hero-search-loc"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lagos, Ibadan, Abuja..."
            className="w-full border-none bg-transparent p-0 text-sm text-foreground outline-none placeholder:text-[#b3b3b3]"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Search Internships
      </Button>
    </form>
  );
}
