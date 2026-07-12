import { useMemo, useState } from "react";
import { Search, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import VehicleCard from "@/components/inventory/VehicleCard";
import FilterGroups, {
  EMPTY_FILTERS,
  type Filters,
  type FilterOptions,
} from "@/components/inventory/FilterGroups";
import { cn } from "@/lib/utils";

const SORTS = ["Year", "Price", "Make", "Model", "Body Style"] as const;
type Sort = (typeof SORTS)[number];

const uniqueSorted = (values: string[]) => [...new Set(values)].sort();

export default function Inventory() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<Sort>("Year");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [advOpen, setAdvOpen] = useState(false);

  const change = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));
  const clear = () => setFilters(EMPTY_FILTERS);

  const options: FilterOptions = useMemo(
    () => ({
      makes: uniqueSorted(vehicles.map((v) => v.make)),
      models: uniqueSorted(vehicles.map((v) => v.model)),
      bodyStyles: uniqueSorted(vehicles.map((v) => v.bodyStyle)),
      fuelTypes: uniqueSorted(vehicles.map((v) => v.fuelType)),
      transmissions: uniqueSorted(vehicles.map((v) => v.transmission)),
    }),
    [],
  );

  const results = useMemo(() => {
    const f = filters;
    const q = f.keyword.trim().toLowerCase();
    const list = vehicles.filter((v) => {
      if (q) {
        const hay = `${v.year} ${v.make} ${v.model} ${v.trim} ${v.stock} ${v.vin}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (f.makes.length && !f.makes.includes(v.make)) return false;
      if (f.models.length && !f.models.includes(v.model)) return false;
      if (f.bodyStyles.length && !f.bodyStyles.includes(v.bodyStyle)) return false;
      if (f.fuelTypes.length && !f.fuelTypes.includes(v.fuelType)) return false;
      if (f.transmissions.length && !f.transmissions.includes(v.transmission)) return false;
      if (f.minYear && v.year < Number(f.minYear)) return false;
      if (f.maxYear && v.year > Number(f.maxYear)) return false;
      if (f.minPrice && v.price < Number(f.minPrice)) return false;
      if (f.maxPrice && v.price > Number(f.maxPrice)) return false;
      if (f.maxKm && v.mileageKm > Number(f.maxKm)) return false;
      return true;
    });

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
  }, [filters, sort]);

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
        {/* ---------- Mobile filter card ---------- */}
        <div className="mb-6 lg:hidden">
          <div className="space-y-3 rounded-lg border border-ink-border bg-ink-card p-4">
            {keywordInput}
            <button
              onClick={() => setAdvOpen((o) => !o)}
              className="flex w-full items-center justify-center gap-2 rounded bg-white/10 py-2.5 text-sm text-white"
            >
              <SlidersHorizontal className="h-4 w-4" /> Advanced Search
            </button>
            <button
              onClick={clear}
              className="w-full rounded bg-white py-2.5 text-sm font-medium text-ink hover:bg-white/90"
            >
              Clear Parameters
            </button>
          </div>
          {advOpen && (
            <div className="mt-4 rounded-lg border border-ink-border bg-ink-card px-4">
              <FilterGroups filters={filters} onChange={change} options={options} />
            </div>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-8">
          {/* ---------- Desktop sidebar ---------- */}
          <aside className="hidden lg:block">
            <div className="rounded-lg border border-ink-border bg-ink-card p-5">
              <h2 className="mb-4 font-display text-2xl font-bold text-white">Filter By</h2>
              <div className="mb-4">{keywordInput}</div>
              <FilterGroups filters={filters} onChange={change} options={options} />
              <button
                onClick={clear}
                className="mt-5 w-full rounded bg-white py-2.5 text-sm font-medium text-ink hover:bg-white/90"
              >
                Clear Parameters
              </button>
            </div>
          </aside>

          {/* ---------- Results ---------- */}
          <div>
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl text-white">{results.length} Vehicles</p>
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

            {results.length === 0 ? (
              <p className="py-20 text-center text-body">No vehicles match your filters.</p>
            ) : (
              <div
                className={cn(
                  "mt-6 grid gap-6",
                  view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
                )}
              >
                {results.map((v) => (
                  <VehicleCard key={v.id} v={v} view={view} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
