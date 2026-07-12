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

export type FilterOptions = {
  makes: string[];
  models: string[];
  bodyStyles: string[];
  fuelTypes: string[];
  transmissions: string[];
};

const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

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
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
      {options.map((o) => (
        <label key={o} className="flex cursor-pointer items-center gap-2 text-sm text-body">
          <input
            type="checkbox"
            checked={selected.includes(o)}
            onChange={() => onToggle(o)}
            className="h-4 w-4 accent-brand-red"
          />
          {o}
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
  options,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  options: FilterOptions;
}) {
  return (
    <div>
      <Group title="Make" defaultOpen>
        <CheckList
          options={options.makes}
          selected={filters.makes}
          onToggle={(v) => onChange({ makes: toggle(filters.makes, v) })}
        />
      </Group>

      <Group title="Model">
        <CheckList
          options={options.models}
          selected={filters.models}
          onToggle={(v) => onChange({ models: toggle(filters.models, v) })}
        />
      </Group>

      <Group title="Price">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className={numInput}
          />
          <span className="text-white/40">–</span>
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className={numInput}
          />
        </div>
      </Group>

      <Group title="Year">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minYear}
            onChange={(e) => onChange({ minYear: e.target.value })}
            className={numInput}
          />
          <span className="text-white/40">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxYear}
            onChange={(e) => onChange({ maxYear: e.target.value })}
            className={numInput}
          />
        </div>
      </Group>

      <Group title="Odometer">
        <select
          value={filters.maxKm}
          onChange={(e) => onChange({ maxKm: e.target.value })}
          className={numInput}
        >
          <option value="">Any mileage</option>
          <option value="50000">Under 50,000 KM</option>
          <option value="100000">Under 100,000 KM</option>
          <option value="150000">Under 150,000 KM</option>
          <option value="200000">Under 200,000 KM</option>
        </select>
      </Group>

      <Group title="Body Style">
        <CheckList
          options={options.bodyStyles}
          selected={filters.bodyStyles}
          onToggle={(v) => onChange({ bodyStyles: toggle(filters.bodyStyles, v) })}
        />
      </Group>

      <Group title="Fuel Type">
        <CheckList
          options={options.fuelTypes}
          selected={filters.fuelTypes}
          onToggle={(v) => onChange({ fuelTypes: toggle(filters.fuelTypes, v) })}
        />
      </Group>

      <Group title="Transmission">
        <CheckList
          options={options.transmissions}
          selected={filters.transmissions}
          onToggle={(v) => onChange({ transmissions: toggle(filters.transmissions, v) })}
        />
      </Group>
    </div>
  );
}
