import { ReactNode, useState } from "react";
import { Plus, Minus } from "lucide-react";

export type Filters = {
  keyword: string;
  makes: string[];
  models: string[];
  bodyStyles: string[];
  fuelTypes: string[];
  transmissions: string[];
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  maxKm: string;
};

export const EMPTY_FILTERS: Filters = {
  keyword: "",
  makes: [],
  models: [],
  bodyStyles: [],
  fuelTypes: [],
  transmissions: [],
  minYear: "",
  maxYear: "",
  minPrice: "",
  maxPrice: "",
  maxKm: "",
};

export type Facet = { value: string; count: number };
export type FacetData = {
  makes: Facet[];
  models: Facet[];
  bodyStyles: Facet[];
  fuelTypes: Facet[];
  transmissions: Facet[];
};

const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function Group({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-white"
      >
        {title}
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function CheckList({
  facets,
  selected,
  onToggle,
}: {
  facets: Facet[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  if (facets.length === 0) {
    return <p className="text-sm text-white/40">No options</p>;
  }
  return (
    <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
      {facets.map((f) => (
        <label key={f.value} className="flex cursor-pointer items-center gap-2 text-sm text-body">
          <input
            type="checkbox"
            checked={selected.includes(f.value)}
            onChange={() => onToggle(f.value)}
            className="h-4 w-4 accent-brand-red"
          />
          <span className="flex-1">{f.value}</span>
          <span className="text-white/40">({f.count})</span>
        </label>
      ))}
    </div>
  );
}

const numInput =
  "w-full rounded border border-ink-border bg-ink-black px-2 py-1.5 text-sm text-white outline-none focus:border-brand-red";

export default function FilterGroups({
  filters,
  onChange,
  facets,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  facets: FacetData;
}) {
  return (
    <div>
      <Group title="Make" defaultOpen>
        <CheckList facets={facets.makes} selected={filters.makes} onToggle={(v) => onChange({ makes: toggle(filters.makes, v) })} />
      </Group>

      <Group title="Model">
        <CheckList facets={facets.models} selected={filters.models} onToggle={(v) => onChange({ models: toggle(filters.models, v) })} />
      </Group>

      <Group title="Price">
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min $" value={filters.minPrice} onChange={(e) => onChange({ minPrice: e.target.value })} className={numInput} />
          <span className="text-white/40">–</span>
          <input type="number" placeholder="Max $" value={filters.maxPrice} onChange={(e) => onChange({ maxPrice: e.target.value })} className={numInput} />
        </div>
      </Group>

      <Group title="Year">
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" value={filters.minYear} onChange={(e) => onChange({ minYear: e.target.value })} className={numInput} />
          <span className="text-white/40">–</span>
          <input type="number" placeholder="Max" value={filters.maxYear} onChange={(e) => onChange({ maxYear: e.target.value })} className={numInput} />
        </div>
      </Group>

      <Group title="Odometer">
        <select value={filters.maxKm} onChange={(e) => onChange({ maxKm: e.target.value })} className={numInput}>
          <option value="">Any mileage</option>
          <option value="50000">Under 50,000 KM</option>
          <option value="100000">Under 100,000 KM</option>
          <option value="150000">Under 150,000 KM</option>
          <option value="200000">Under 200,000 KM</option>
        </select>
      </Group>

      <Group title="Body Style">
        <CheckList facets={facets.bodyStyles} selected={filters.bodyStyles} onToggle={(v) => onChange({ bodyStyles: toggle(filters.bodyStyles, v) })} />
      </Group>

      <Group title="Fuel Type">
        <CheckList facets={facets.fuelTypes} selected={filters.fuelTypes} onToggle={(v) => onChange({ fuelTypes: toggle(filters.fuelTypes, v) })} />
      </Group>

      <Group title="Transmission">
        <CheckList facets={facets.transmissions} selected={filters.transmissions} onToggle={(v) => onChange({ transmissions: toggle(filters.transmissions, v) })} />
      </Group>
    </div>
  );
}
