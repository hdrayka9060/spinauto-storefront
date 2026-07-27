import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Car, Check, ChevronLeft, ChevronRight, Loader2, MapPin, Phone } from "lucide-react";
import { useVehicle } from "@/hooks/use-inventory";
import { useInquiry } from "@/hooks/use-inquiry";
import { fileUrl } from "@/lib/api";
import { site } from "@/data/site";
import { Field, TextInput, PhoneInput, TextArea, SubmittedNotice } from "@/components/forms/fields";
import { cn } from "@/lib/utils";

export default function VehicleDetail() {
  const { id } = useParams();
  const { vehicle: v, loading } = useVehicle(id);
  const [idx, setIdx] = useState(0);
  const inquiry = useInquiry("contact", { vehicleId: id });

  useEffect(() => setIdx(0), [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-body">
        <Loader2 className="h-6 w-6 animate-spin" /> Loading vehicle…
      </div>
    );
  }

  if (!v) {
    return (
      <div className="container-site py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-white">Vehicle not found</h1>
        <p className="mt-2 text-body">This listing may have been sold or removed.</p>
        <Link to="/cars" className="btn-red mt-6">
          Back to Inventory
        </Link>
      </div>
    );
  }

  const sold = v.status === "sold";
  const imgs = v.images;
  const step = (dir: number) => setIdx((i) => (i + dir + imgs.length) % imgs.length);

  const badges: [string, string][] = [
    ["Body Style", v.bodyStyle],
    ["Odometer", v.mileageKm ? `${v.mileageKm.toLocaleString()} KM` : ""],
    ["Fuel Type", v.fuelType],
    ["Engine", v.engine],
  ].filter(([, val]) => val) as [string, string][];

  // Always list every parameter name; show "—" when the backend has no value.
  const specs: [string, string][] = (
    [
      ["Year", v.year ? String(v.year) : ""],
      ["Make", v.make],
      ["Model", v.model],
      ["Trim", v.trim],
      ["Body Style", v.bodyStyle],
      ["Drivetrain", v.drivetrain],
      ["Exterior Color", v.exteriorColor ?? ""],
      ["Interior Color", v.interiorColor ?? ""],
      ["Odometer", v.mileageKm ? `${v.mileageKm.toLocaleString()} KM` : ""],
      ["Engine", v.engine],
      ["Engine Size", v.engineSize ?? ""],
      ["Transmission", v.transmission],
      ["Doors", v.doors ? String(v.doors) : ""],
      ["Fuel Type", v.fuelType],
      ["Owners", v.owners ? String(v.owners) : ""],
      ["VIN", v.vin],
      ["Stock #", v.stock],
    ] as [string, string][]
  ).map(([label, val]) => [label, val && String(val).trim() ? val : "—"]);

  return (
    <div className="bg-ink">
      <div className="container-site py-8">
        <div className="flex items-center justify-between">
          <Link to="/cars" className="text-sm text-body transition-colors hover:text-white">
            ← Back to inventory
          </Link>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* LEFT: gallery + specs + description + features */}
          <div>
            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#333] to-[#161616] lg:h-[460px]">
              {sold && (
                <div className="pointer-events-none absolute left-0 top-0 z-20 h-36 w-36 overflow-hidden">
                  <span className="absolute left-[-58px] top-[34px] w-[240px] rotate-[-45deg] bg-brand-red py-2 text-center text-base font-bold uppercase tracking-widest text-white shadow-lg">
                    Sold
                  </span>
                </div>
              )}
              {imgs[idx] ? (
                <img src={fileUrl(imgs[idx])} alt={`${v.year} ${v.make} ${v.model}`} className="h-full w-full object-cover" />
              ) : (
                <div className="text-center text-white/40">
                  <Car className="mx-auto h-16 w-16" />
                  <p className="mt-2 text-sm">Photo coming soon</p>
                </div>
              )}
              {imgs.length > 1 && (
                <>
                  <button
                    onClick={() => step(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/80 hover:bg-black/70"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => step(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/80 hover:bg-black/70"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                    {idx + 1} / {imgs.length}
                  </span>
                </>
              )}
            </div>

            {imgs.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {imgs.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={cn(
                      "h-16 w-24 shrink-0 overflow-hidden rounded border-2",
                      i === idx ? "border-brand-red" : "border-transparent opacity-70 hover:opacity-100",
                    )}
                  >
                    <img src={fileUrl(src)} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-lg bg-ink-card p-6">
              <h2 className="mb-4 font-display text-xl font-bold text-white">Details</h2>
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-ink-border pb-2 text-sm">
                    <dt className="text-white/50">{label}</dt>
                    <dd className="text-right text-body">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {v.description && (
              <div className="mt-6 rounded-lg bg-ink-card p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-white">Description</h2>
                <p className="leading-relaxed text-body">{v.description}</p>
              </div>
            )}

            {v.features && v.features.length > 0 && (
              <div className="mt-6 rounded-lg bg-ink-card p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-white">Features</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-body">
                      <Check className="h-4 w-4 shrink-0 text-brand-red" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT: title / price / CTAs / contact form */}
          <aside className="space-y-6">
            <div className="rounded-lg bg-ink-card p-6">
              <h1 className="font-display text-2xl font-bold text-white">
                {v.year} {v.make} {v.model}
              </h1>
              {v.trim && <p className="text-body">{v.trim}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {(v.discount ?? 0) > 0 && !sold ? (
                  <>
                    <p className="font-display text-xl font-medium text-white/40 line-through">${v.price.toLocaleString()}</p>
                    <p className="font-display text-3xl font-bold text-brand-red">${(v.price - (v.discount ?? 0)).toLocaleString()}</p>
                    <span className="rounded bg-brand-red px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                      ${(v.discount ?? 0).toLocaleString()} Off
                    </span>
                  </>
                ) : (
                  <p className="font-display text-3xl font-bold text-brand-red">${v.price.toLocaleString()}</p>
                )}
                {sold && (
                  <span className="rounded bg-brand-red px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                    Sold
                  </span>
                )}
              </div>

              {badges.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {badges.map(([label, value]) => (
                    <div key={label} className="rounded bg-ink-black p-3 text-center">
                      <p className="text-sm font-semibold text-white">{value}</p>
                      <p className="text-[11px] uppercase tracking-wide text-white/50">{label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-3">
                <Link to="/forms/finance-calculator" className="btn-outline w-full">
                  Payment Calculator
                </Link>
                <Link to={`/forms/financing?vehicle=${v.id}`} className="btn-red w-full">
                  Apply for Financing
                </Link>
                <Link to="/directions" className="btn-outline w-full">
                  Get Directions
                </Link>
              </div>

              <div className="mt-6 border-t border-ink-border pt-4 text-sm text-body">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-red" /> Spin Auto Ltd
                </span>
                <a href={site.phoneHref} className="mt-2 flex items-center gap-1.5 hover:text-white">
                  <Phone className="h-4 w-4 text-brand-red" /> Tel:{site.phone}
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-ink-card p-6">
              <h2 className="font-display text-xl font-bold text-white">Get More Information</h2>
              <p className="mt-1 text-sm text-body">Interested in this vehicle? Send us a message.</p>
              {inquiry.submitted ? (
                <div className="mt-4">
                  <SubmittedNotice
                    title="Message sent!"
                    message="Thanks for your interest — we'll be in touch about this vehicle shortly."
                    onReset={inquiry.reset}
                  />
                </div>
              ) : (
                <form onSubmit={inquiry.onSubmit} className="mt-4 space-y-4">
                  <input type="hidden" name="preferredContact" value={`Vehicle: ${v.year} ${v.make} ${v.model} (#${v.stock})`} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First Name" required name="firstName">
                      <TextInput required />
                    </Field>
                    <Field label="Last Name" required name="lastName">
                      <TextInput required />
                    </Field>
                    <Field label="Email" required name="email">
                      <TextInput type="email" required />
                    </Field>
                    <Field label="Phone" required name="phone">
                      <PhoneInput required />
                    </Field>
                  </div>
                  <Field label="Message" name="comments">
                    <TextArea rows={3} defaultValue={`I'm interested in the ${v.year} ${v.make} ${v.model}.`} />
                  </Field>
                  {inquiry.error && (
                    <p className="rounded border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                      {inquiry.error}
                    </p>
                  )}
                  <button type="submit" disabled={inquiry.submitting} className="btn-red w-full disabled:opacity-60">
                    {inquiry.submitting ? "Sending…" : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
