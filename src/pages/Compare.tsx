import { Link } from "react-router-dom";
import { Car, X } from "lucide-react";
import { useCompare } from "@/lib/compare-context";
import { fileUrl } from "@/lib/api";
import type { Vehicle } from "@/data/vehicles";

const ROWS: { label: string; get: (v: Vehicle) => string }[] = [
  { label: "Price", get: (v) => `$${v.price.toLocaleString()}` },
  { label: "Year", get: (v) => String(v.year) },
  { label: "Mileage", get: (v) => (v.mileageKm ? `${v.mileageKm.toLocaleString()} KM` : "—") },
  { label: "Make", get: (v) => v.make || "—" },
  { label: "Model", get: (v) => v.model || "—" },
  { label: "Trim", get: (v) => v.trim || "—" },
  { label: "Body Style", get: (v) => v.bodyStyle || "—" },
  { label: "Engine", get: (v) => v.engine || "—" },
  { label: "Drivetrain", get: (v) => v.drivetrain || "—" },
  { label: "Fuel Type", get: (v) => v.fuelType || "—" },
  { label: "Transmission", get: (v) => v.transmission || "—" },
  { label: "VIN", get: (v) => v.vin || "—" },
  { label: "Stock #", get: (v) => v.stock || "—" },
];

export default function Compare() {
  const { items, remove, clear } = useCompare();

  if (items.length === 0) {
    return (
      <div className="bg-ink">
        <div className="container-site py-24 text-center">
          <h1 className="font-display text-3xl font-bold text-white">Compare Vehicles</h1>
          <p className="mt-2 text-body">No vehicles selected yet. Add some from the inventory using “Compare”.</p>
          <Link to="/cars" className="btn-red mt-6">
            Browse Inventory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink">
      <div className="container-site py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold text-white">Compare Vehicles</h1>
          <button onClick={clear} className="text-sm text-body transition-colors hover:text-white">
            Clear all
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="w-36" />
                {items.map((v) => (
                  <th key={v.id} className="p-3 align-top">
                    <div className="relative h-32 overflow-hidden rounded bg-gradient-to-br from-[#333] to-[#161616]">
                      {v.images[0] ? (
                        <img src={fileUrl(v.images[0])} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/40">
                          <Car className="h-8 w-8" />
                        </div>
                      )}
                      <button
                        onClick={() => remove(v.id)}
                        className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                        aria-label="Remove from comparison"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <Link
                      to={`/cars/${v.id}`}
                      className="mt-2 block font-display text-sm font-bold text-white hover:text-brand-red"
                    >
                      {v.year} {v.make} {v.model}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="border-t border-ink-border">
                  <td className="p-3 text-sm font-medium text-white/60">{r.label}</td>
                  {items.map((v) => (
                    <td key={v.id} className="p-3 text-sm text-body">
                      {r.get(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/cars" className="btn-outline mt-8">
          ← Back to Inventory
        </Link>
      </div>
    </div>
  );
}
