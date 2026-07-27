import { useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { fileUrl } from "@/lib/api";

/**
 * Type-ahead vehicle selector for forms. Filters the live inventory by
 * name / VIN / make / model / year / body type; selecting attaches the vehicle
 * (the parent links it to the lead). Clearable.
 */
export default function VehiclePicker({
  vehicles,
  value,
  onChange,
}: {
  vehicles: Vehicle[];
  value: Vehicle | null;
  onChange: (v: Vehicle | null) => void;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout>>();

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return vehicles
      // Never offer a sold car as a "vehicle of interest" — buyers should only
      // be able to enquire about available stock.
      .filter((v) => v.status !== "sold")
      .filter((v) =>
        `${v.year} ${v.make} ${v.model} ${v.trim} ${v.vin} ${v.bodyStyle} ${v.stock}`.toLowerCase().includes(s),
      )
      .slice(0, 8);
  }, [q, vehicles]);

  if (value) {
    return (
      <div className="flex items-center gap-3 rounded border border-ink-border bg-ink-black p-2">
        <div className="h-12 w-16 shrink-0 overflow-hidden rounded bg-ink-card">
          {value.images[0] && <img src={fileUrl(value.images[0])} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="flex-1 text-sm">
          <p className="font-medium text-white">
            {value.year} {value.make} {value.model}
          </p>
          <p className="text-xs text-white/50">
            ${value.price.toLocaleString()} · Stock {value.stock}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            onChange(null);
            setQ("");
          }}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-body transition-colors hover:text-white"
        >
          <X className="h-4 w-4" /> Clear
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded border border-ink-border bg-ink-black px-3">
        <Search className="h-4 w-4 shrink-0 text-white/50" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            blurTimer.current = setTimeout(() => setOpen(false), 150);
          }}
          placeholder="Search by name, VIN, make, model, year…"
          className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-white/40"
        />
      </div>

      {open && q.trim() && (
        <div className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded border border-ink-border bg-ink-card shadow-xl">
          {matches.length === 0 ? (
            <p className="px-3 py-3 text-sm text-white/50">No matching vehicles.</p>
          ) : (
            matches.map((v) => (
              <button
                key={v.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(v);
                  setQ("");
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 border-b border-ink-border px-3 py-2 text-left last:border-0 hover:bg-white/5"
              >
                <div className="h-10 w-14 shrink-0 overflow-hidden rounded bg-ink-black">
                  {v.images[0] && <img src={fileUrl(v.images[0])} alt="" className="h-full w-full object-cover" />}
                </div>
                <span className="flex-1 text-sm">
                  <span className="block text-white">
                    {v.year} {v.make} {v.model}
                  </span>
                  <span className="block text-xs text-white/50">
                    ${v.price.toLocaleString()} · {v.bodyStyle} · Stock {v.stock}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
