import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import type { Vehicle } from "@/data/vehicles";
import { cn } from "@/lib/utils";

const cardBtn =
  "inline-flex h-11 items-center justify-center px-2 font-display text-sm font-bold uppercase tracking-wide transition-colors";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/50">{label} :</dt>
      <dd className="text-right text-body">{value}</dd>
    </div>
  );
}

function VehiclePhoto({ v }: { v: Vehicle }) {
  const hasPhoto = v.images.length > 0;
  return (
    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-[#333] to-[#161616]">
      {hasPhoto ? (
        <img src={v.images[0]} alt={`${v.year} ${v.make} ${v.model}`} className="h-full w-full object-cover" />
      ) : (
        <div className="px-4 text-center text-white/40">
          <Car className="mx-auto h-12 w-12" />
          <p className="mt-2 text-xs">
            {v.year} {v.make} {v.model}
          </p>
          <p className="text-[10px] uppercase tracking-wider">Photo coming soon</p>
        </div>
      )}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white/70 hover:bg-black/60"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1 text-white/70 hover:bg-black/60"
        aria-label="Next photo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function VehicleCard({ v, view = "grid" }: { v: Vehicle; view?: "grid" | "list" }) {
  const [compare, setCompare] = useState(false);

  return (
    <article className={cn("overflow-hidden rounded-lg bg-ink-card", view === "list" && "sm:flex")}>
      <div className={cn(view === "list" && "sm:w-80 sm:shrink-0")}>
        <VehiclePhoto v={v} />
      </div>

      <div className="flex-1 p-5">
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-body">
            <input
              type="checkbox"
              checked={compare}
              onChange={() => setCompare(!compare)}
              className="h-4 w-4 accent-brand-red"
            />
            Select For Compare
          </label>
          <span className="bg-ink-black px-3 py-1 font-display text-lg font-bold text-white">
            ${v.price.toLocaleString()}
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold text-white">
          {v.year} {v.make} {v.model}
        </h3>
        <p className="text-body">{v.trim}</p>

        <p className="mt-3 border-b border-ink-border pb-2 text-sm text-body">Finance form :</p>

        <dl className="mt-3 space-y-1.5 text-sm">
          <Spec label="Mileage" value={`${v.mileageKm.toLocaleString()} KM`} />
          <Spec label="Engine" value={v.engine} />
          <Spec label="Drivetrain" value={v.drivetrain} />
          <Spec label="Fuel Type" value={v.fuelType} />
          <Spec label="Transmission" value={v.transmission} />
          <Spec label="VIN" value={v.vin} />
          <Spec label="Stock #" value={v.stock} />
        </dl>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link to={`/cars/${v.id}`} className={cn(cardBtn, "bg-brand-red text-white hover:bg-brand-red-dark")}>
            View Details
          </Link>
          <Link to="/forms/financing" className={cn(cardBtn, "bg-brand-red text-white hover:bg-brand-red-dark")}>
            Financing
          </Link>
          <a href={site.phoneHref} className={cn(cardBtn, "bg-brand-red text-white hover:bg-brand-red-dark")}>
            Contact Us
          </a>
          <button
            onClick={() => setCompare(!compare)}
            className={cn(
              cardBtn,
              "border",
              compare
                ? "border-brand-red bg-brand-red text-white"
                : "border-white/70 text-white hover:bg-white hover:text-ink",
            )}
          >
            Compare
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-ink-border pt-4 text-sm text-body">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-brand-red" /> Spin Auto Ltd
          </span>
          <a href={site.phoneHref} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="h-4 w-4 text-brand-red" /> Tel:{site.phone}
          </a>
        </div>
      </div>
    </article>
  );
}
