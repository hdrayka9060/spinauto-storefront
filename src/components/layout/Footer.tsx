import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { navItems, hours, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-ink-black">
      <div className="container-site py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-display text-xl font-bold text-white">Dealership</h3>
            <Link to="/about-us" className="text-body transition-colors hover:text-white">
              Read More...
            </Link>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xl font-bold text-white">Our Hours</h3>
            <ul className="space-y-1.5 text-sm">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-6">
                  <span className="text-body">{h.day}</span>
                  <span className={h.time === "Closed" ? "text-brand-red" : "text-white"}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-xl font-bold text-white">Our Contacts</h3>
            <p className="flex items-start gap-2 text-sm text-body">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> {site.address}
            </p>
            <a
              href={site.phoneHref}
              className="mt-3 flex items-center gap-2 text-sm text-body transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-brand-red" /> {site.phone}
            </a>
          </div>

          <div className="flex items-start justify-center md:justify-end">
            <img src="/assets/logo.png" alt="Spin Auto Ltd" className="h-28 w-auto object-contain" />
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <ul className="grid grid-cols-2 gap-4 text-center sm:flex sm:justify-center sm:gap-12">
            {navItems.map((i) => (
              <li key={i.label}>
                <Link to={i.to} className="text-body transition-colors hover:text-brand-red">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-body">
            © 2026 {site.legalName} |{" "}
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy &amp; Policy
            </Link>{" "}
            | Powered by Hillz
          </p>
        </div>
      </div>
    </footer>
  );
}
