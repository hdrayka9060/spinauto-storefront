import { MapPin, Phone } from "lucide-react";
import { site, hours } from "@/data/site";

export default function Directions() {
  return (
    <div className="bg-ink">
      <div className="container-site py-12">
        <h1 className="font-display text-3xl font-bold text-white">Get Directions</h1>
        <p className="mt-2 flex items-center gap-2 text-body">
          <MapPin className="h-4 w-4 text-brand-red" /> {site.address}
        </p>

        <div className="mt-6 h-[460px] w-full overflow-hidden rounded-lg">
          <iframe
            title="Spin Auto Ltd location"
            src={site.mapEmbed}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-ink-card p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-white">Contact</h2>
            <p className="flex items-center gap-2 text-sm text-body">
              <MapPin className="h-4 w-4 text-brand-red" /> {site.address}
            </p>
            <a href={site.phoneHref} className="mt-3 flex items-center gap-2 text-sm text-body hover:text-white">
              <Phone className="h-4 w-4 text-brand-red" /> {site.phone}
            </a>
          </div>
          <div className="rounded-lg bg-ink-card p-6">
            <h2 className="mb-4 font-display text-xl font-bold text-white">Business Hours</h2>
            <ul className="space-y-1.5 text-sm">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span className="text-body">{h.day}</span>
                  <span className={h.time === "Closed" ? "text-brand-red" : "text-white"}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
