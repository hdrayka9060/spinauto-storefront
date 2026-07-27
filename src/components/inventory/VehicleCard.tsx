import { MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import type { Vehicle } from "@/data/vehicles";
import { fileUrl } from "@/lib/api";
import { useCompare } from "@/lib/compare-context";
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
  const [idx, setIdx] = useState(0);
  const imgs = v.images;
  const offer = v.discount ?? 0;
  const step = (e: MouseEvent, dir: number) => {
    e.stopPropagation();
    e.preventDefault();
    setIdx((i) => (i + dir + imgs.length) % imgs.length);
  };

  return (
    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-[#333] to-[#161616]">
      {v.status === "sold" && (
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-28 w-28 overflow-hidden">
          <span className="absolute left-[-52px] top-[24px] w-[200px] rotate-[-45deg] bg-brand-red py-1.5 text-center text-sm font-bold uppercase tracking-widest text-white shadow-lg">
            Sold
          </span>
        </div>
      )}
      {v.status !== "sold" && offer > 0 && (
        <span className="absolute right-2 top-2 z-20 rounded bg-brand-red px-2 py-1 font-display text-xs font-bold uppercase tracking-wide text-white shadow-lg">
          ${offer.toLocaleString()} Off
        </span>
      )}
      {imgs.length > 0 ? (
        <img src={fileUrl(imgs[idx])} alt={`${v.year} ${v.make} ${v.model}`} className="h-full w-full object-cover" />
      ) : (
        <div className="px-4 text-center text-white/40">
          <Car className="mx-auto h-12 w-12" />
          <p className="mt-2 text-xs">
            {v.year} {v.make} {v.model}
          </p>
          <p className="text-[10px] uppercase tracking-wider">Photo coming soon</p>
        </div>
      )}

      {imgs.length > 1 && (
        <>
          <button
            onClick={(e) => step(e, -1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white/80 hover:bg-black/70"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => step(e, 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white/80 hover:bg-black/70"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {imgs.map((_, i) => (
              <span key={i} className={cn("h-1.5 w-1.5 rounded-full", i === idx ? "bg-white" : "bg-white/40")} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function VehicleCard({ v, view = "grid" }: { v: Vehicle; view?: "grid" | "list" }) {
  const navigate = useNavigate();
  const compare = useCompare();
  const selected = compare.has(v.id);

  const stop = (e: MouseEvent) => e.stopPropagation();

  const onCompare = (e: MouseEvent) => {
    e.stopPropagation();
    const willCount = selected ? compare.count : compare.count + 1;
    if (!selected) compare.add(v);
    if (willCount >= 2) navigate("/compare");
  };

  const specs = (
    [
      ["Mileage", v.mileageKm ? `${v.mileageKm.toLocaleString()} KM` : ""],
      ["Engine", v.engine],
      ["Drivetrain", v.drivetrain],
      ["Fuel Type", v.fuelType],
      ["Transmission", v.transmission],
      ["VIN", v.vin],
      ["Stock #", v.stock],
    ] as [string, string][]
  ).filter(([, value]) => value);

  return (
    <article
      onClick={() => navigate(`/cars/${v.id}`)}
      className={cn(
        "cursor-pointer overflow-hidden rounded-lg bg-ink-card transition-shadow hover:shadow-lg hover:shadow-black/40",
        view === "list" && "sm:flex",
      )}
    >
      <div className={cn(view === "list" && "sm:w-80 sm:shrink-0")}>
        <VehiclePhoto v={v} />
      </div>

      <div className="flex-1 p-5">
        <div className="flex items-center justify-between">
          <label onClick={stop} className="flex cursor-pointer items-center gap-2 text-xs text-body">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => compare.toggle(v)}
              onClick={stop}
              className="h-4 w-4 accent-brand-red"
            />
            Select For Compare
          </label>
          {(v.discount ?? 0) > 0 ? (
            <span className="flex items-baseline gap-2 bg-ink-black px-3 py-1">
              <span className="font-display text-xs text-white/40 line-through">${v.price.toLocaleString()}</span>
              <span className="font-display text-lg font-bold text-white">${(v.price - (v.discount ?? 0)).toLocaleString()}</span>
            </span>
          ) : (
            <span className="bg-ink-black px-3 py-1 font-display text-lg font-bold text-white">
              ${v.price.toLocaleString()}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-xl font-bold text-white">
          {v.year} {v.make} {v.model}
        </h3>
        <p className="text-body">{v.trim}</p>

        <p className="mt-3 border-b border-ink-border pb-2 text-sm text-body">Finance form :</p>

        <dl className="mt-3 space-y-1.5 text-sm">
          {specs.map(([label, value]) => (
            <Spec key={label} label={label} value={value} />
          ))}
        </dl>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link to={`/cars/${v.id}`} onClick={stop} className={cn(cardBtn, "bg-brand-red text-white hover:bg-brand-red-dark")}>
            View Details
          </Link>
          <Link
            to={`/forms/financing?vehicle=${v.id}`}
            onClick={stop}
            className={cn(cardBtn, "bg-brand-red text-white hover:bg-brand-red-dark")}
          >
            Financing
          </Link>
          <Link
            to={`/forms/contact-us?vehicle=${v.id}`}
            onClick={stop}
            className={cn(cardBtn, "bg-brand-red text-white hover:bg-brand-red-dark")}
          >
            Contact Us
          </Link>
          <button
            onClick={onCompare}
            className={cn(
              cardBtn,
              "border",
              selected
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
          <a href={site.phoneHref} onClick={stop} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="h-4 w-4 text-brand-red" /> Tel:{site.phone}
          </a>
        </div>
      </div>
    </article>
  );
}
