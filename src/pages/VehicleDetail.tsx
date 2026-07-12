import { Link, useParams } from "react-router-dom";
import { Car, Check, ChevronRight, MapPin, Phone } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { site } from "@/data/site";

export default function VehicleDetail() {
  const { id } = useParams();
  const v = vehicles.find((x) => x.id === id);

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

  const specs: [string, string][] = [
    ["Mileage", `${v.mileageKm.toLocaleString()} KM`],
    ["Engine", v.engine],
    ["Drivetrain", v.drivetrain],
    ["Fuel Type", v.fuelType],
    ["Transmission", v.transmission],
    ["Body Style", v.bodyStyle],
    ["VIN", v.vin],
    ["Stock #", v.stock],
  ];

  return (
    <div className="bg-ink">
      <div className="container-site py-8">
        {/* breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1 text-sm text-body">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-white/30" />
          <Link to="/cars" className="hover:text-white">
            Inventory
          </Link>
          <ChevronRight className="h-4 w-4 text-white/30" />
          <span className="text-white">
            {v.year} {v.make} {v.model}
          </span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* left: photo + specs */}
          <div>
            <div className="flex h-72 items-center justify-center rounded-lg bg-gradient-to-br from-[#333] to-[#161616] lg:h-[420px]">
              <div className="text-center text-white/40">
                <Car className="mx-auto h-16 w-16" />
                <p className="mt-2 text-sm">
                  {v.year} {v.make} {v.model}
                </p>
                <p className="text-[10px] uppercase tracking-wider">Photo coming soon</p>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-ink-card p-6">
              <h2 className="mb-4 font-display text-xl font-bold text-white">Vehicle Details</h2>
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-ink-border pb-2 text-sm">
                    <dt className="text-white/50">{label}</dt>
                    <dd className="text-right text-body">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* right: price + CTAs */}
          <aside className="space-y-6">
            <div className="rounded-lg bg-ink-card p-6">
              <h1 className="font-display text-2xl font-bold text-white">
                {v.year} {v.make} {v.model}
              </h1>
              <p className="text-body">{v.trim}</p>
              <p className="mt-4 font-display text-3xl font-bold text-brand-red">${v.price.toLocaleString()}</p>

              <div className="mt-6 space-y-3">
                <Link to="/forms/financing" className="btn-red w-full">
                  Apply for Financing
                </Link>
                <Link to="/forms/book-appointment" className="btn-outline w-full">
                  Book a Test Drive
                </Link>
                <a href={site.phoneHref} className="btn-outline w-full">
                  Contact Us
                </a>
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
              <h2 className="mb-3 font-display text-lg font-bold text-white">Why buy from us</h2>
              <ul className="space-y-2 text-sm text-body">
                {["Financing for all credit types", "In-house mechanic shop", "Honest, competitive pricing"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-brand-red" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
