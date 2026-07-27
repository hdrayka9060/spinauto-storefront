import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { site, hours } from "@/data/site";

export default function ContactSidebar() {
  return (
    <aside className="space-y-6">
      <div className="rounded-lg bg-ink-card p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-white">Contact Information</h2>
        <p className="flex items-center gap-2 text-sm text-body">
          <Phone className="h-4 w-4 text-brand-red" />
          <span>
            <strong className="text-white">Phone:</strong> {site.phone}
          </span>
        </p>
        <p className="mt-4 flex items-start gap-2 text-sm text-body">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
          <span>
            <strong className="text-white">Addresses:</strong>
            <br />
            {site.address}
          </span>
        </p>
      </div>

      <div className="rounded-lg bg-ink-card p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-white">Business Hours</h2>
        <ul className="space-y-1.5 text-sm">
          {hours.map((h) => (
            <li key={h.day} className="flex justify-between">
              <span className="uppercase text-body">{h.day}</span>
              <span className={h.time === "Closed" ? "text-brand-red" : "text-white"}>{h.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/directions" className="btn-red w-full">
        Get Direction
      </Link>

      <div className="flex gap-3">
        <Link
          to="/cars"
          className="flex-1 border border-white/40 py-2.5 text-center text-sm text-white transition-colors hover:bg-white hover:text-ink"
        >
          Inventory
        </Link>
        <Link
          to="/forms/contact-us"
          className="flex-1 border border-white/40 py-2.5 text-center text-sm text-white transition-colors hover:bg-white hover:text-ink"
        >
          Contact us
        </Link>
      </div>
    </aside>
  );
}
