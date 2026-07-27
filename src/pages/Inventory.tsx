import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, LayoutGrid, List, SlidersHorizontal, Loader2, AlertCircle } from "lucide-react";
import { useInventory } from "@/hooks/use-inventory";
import type { Vehicle } from "@/data/vehicles";
import VehicleCard from "@/components/inventory/VehicleCard";
import FilterGroups, {
  EMPTY_FILTERS,
  type Facet,
  type FacetData,
  type Filters,
} from "@/components/inventory/FilterGroups";
import { cn } from "@/lib/utils";

const SORTS = ["Year", "Price", "Make", "Model", "Body Style"] as const;
type Sort = (typeof SORTS)[number];
const PAGE = 9;

/** Whether a vehicle passes the filters. `exclude` skips one facet dimension (for facet counting). */
function matches(v: Vehicle, f: Filters, exclude?: keyof Filters): boolean {
  const q = f.keyword.trim().toLowerCase();
  if (q) {
    const hay = `${v.year} ${v.make} ${v.model} ${v.trim} ${v.stock} ${v.vin}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (exclude !== "makes" && f.makes.length && !f.makes.includes(v.make)) return false;
  if (exclude !== "models" && f.models.length && !f.models.includes(v.model)) return false;
  if (exclude !== "bodyStyles" && f.bodyStyles.length && !f.bodyStyles.includes(v.bodyStyle)) return false;
  if (exclude !== "fuelTypes" && f.fuelTypes.length && !f.fuelTypes.includes(v.fuelType)) return false;
  if (exclude !== "transmissions" && f.transmissions.length && !f.transmissions.includes(v.transmission)) return false;
  if (f.minYear && v.year < Number(f.minYear)) return false;
  if (f.maxYear && v.year > Number(f.maxYear)) return false;
  if (f.minPrice && v.price < Number(f.minPrice)) return false;
  if (f.maxPrice && v.price > Number(f.maxPrice)) return false;
  if (f.maxKm && v.mileageKm > Number(f.maxKm)) return false;
  return true;
}

export default function Inventory() {
  const { vehicles, loading, usingFallback } = useInventory();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => ({
    ...EMPTY_FILTERS,
    keyword: searchParams.get("q") ?? "",
    makes: searchParams.get("make") ? [searchParams.get("make") as string] : [],
    models: searchParams.get("model") ? [searchParams.get("model") as string] : [],
    minYear: searchParams.get("minYear") ?? "",
    maxYear: searchParams.get("maxYear") ?? "",
  }));
  const [sort, setSort] = useState<Sort>("Year");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [advOpen, setAdvOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE);

  const change = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));
  const clear = () => setFilters(EMPTY_FILTERS);

  // Facet counts, each cross-filtered by every OTHER active filter.
  const facets: FacetData = useMemo(() => {
    const build = (field: keyof Vehicle, key: keyof Filters): Facet[] => {
      const counts = new Map<string, number>();
      for (const v of vehicles) {
        if (!matches(v, filters, key)) continue;
        const val = String(v[field] ?? "");
        if (val) counts.set(val, (counts.get(val) ?? 0) + 1);
      }
      return [...counts.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => a.value.localeCompare(b.value));
    };
    return {
      makes: build("make", "makes"),
      models: build("model", "models"),
      bodyStyles: build("bodyStyle", "bodyStyles"),
      fuelTypes: build("fuelType", "fuelTypes"),
      transmissions: build("transmission", "transmissions"),
    };
  }, [vehicles, filters]);

  const results = useMemo(() => {
    const list = vehicles.filter((v) => matches(v, filters));
    return list.sort((a, b) => {
      switch (sort) {
        case "Price":
          return a.price - b.price;
        case "Make":
          return a.make.localeCompare(b.make);
        case "Model":
          return a.model.localeCompare(b.model);
        case "Body Style":
          return a.bodyStyle.localeCompare(b.bodyStyle);
        case "Year":
        default:
          return b.year - a.year;
      }
    });
  }, [vehicles, filters, sort]);

  // Reset the visible window whenever the result set changes.
  useEffect(() => {
    setVisible(PAGE);
  }, [filters, sort]);

  // Infinite scroll: reveal more cards as the sentinel scrolls into view.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible((v) => (v < results.length ? Math.min(v + PAGE, results.length) : v));
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [results.length]);

  const shown = results.slice(0, visible);

  const keywordInput = (
    <div className="flex items-center gap-2 rounded border border-ink-border bg-ink-black px-3">
      <Search className="h-4 w-4 shrink-0 text-white/50" />
      <input
        value={filters.keyword}
        onChange={(e) => change({ keyword: e.target.value })}
        placeholder="Search by Name, Stock #, Make or Model."
        className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-white/40"
      />
    </div>
  );

  return (
    <div className="bg-ink">
      <div className="container-site py-8">
        {usingFallback && (
          <div className="mb-6 flex items-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Showing sample inventory — couldn't reach the live vehicle feed.
          </div>
        )}

        {/* Mobile filter card */}
        <div className="mb-6 lg:hidden">
          <div className="space-y-3 rounded-lg border border-ink-border bg-ink-card p-4">
            {keywordInput}
            <button
              onClick={() => setAdvOpen((o) => !o)}
              className="flex w-full items-center justify-center gap-2 rounded bg-white/10 py-2.5 text-sm text-white"
            >
              <SlidersHorizontal className="h-4 w-4" /> Advanced Search
            </button>
            <button onClick={clear} className="w-full rounded bg-white py-2.5 text-sm font-medium text-ink hover:bg-white/90">
              Clear Parameters
            </button>
          </div>
          {advOpen && (
            <div className="mt-4 rounded-lg border border-ink-border bg-ink-card px-4">
              <FilterGroups filters={filters} onChange={change} facets={facets} />
            </div>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="rounded-lg border border-ink-border bg-ink-card p-5">
              <h2 className="mb-4 font-display text-2xl font-bold text-white">Filter By</h2>
              <div className="mb-4">{keywordInput}</div>
              <FilterGroups filters={filters} onChange={change} facets={facets} />
              <button
                onClick={clear}
                className="mt-5 w-full rounded bg-white py-2.5 text-sm font-medium text-ink hover:bg-white/90"
              >
                Clear Parameters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl text-white">{loading ? "Loading…" : `${results.length} Vehicles`}</p>
              <div className="flex overflow-hidden rounded border border-ink-border">
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={cn("p-2", view === "list" ? "bg-brand-red text-white" : "text-white/60")}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={cn("p-2", view === "grid" ? "bg-brand-red text-white" : "text-white/60")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink-border pb-4 text-sm">
              <span className="font-bold text-white">Sort:</span>
              {SORTS.map((s, i) => (
                <span key={s} className="flex items-center gap-3">
                  {i > 0 && <span className="text-white/20">|</span>}
                  <button
                    onClick={() => setSort(s)}
                    className={cn("transition-colors", sort === s ? "text-brand-red" : "text-body hover:text-white")}
                  >
                    {s}
                  </button>
                </span>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center gap-2 py-24 text-body">
                <Loader2 className="h-5 w-5 animate-spin" /> Loading inventory…
              </div>
            ) : results.length === 0 ? (
              <p className="py-20 text-center text-body">No vehicles match your filters.</p>
            ) : (
              <>
                <div className={cn("mt-6 grid gap-6", view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                  {shown.map((v) => (
                    <VehicleCard key={v.id} v={v} view={view} />
                  ))}
                </div>
                {visible < results.length && (
                  <div ref={sentinelRef} className="flex items-center justify-center gap-2 py-10 text-sm text-body">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading more vehicles…
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
