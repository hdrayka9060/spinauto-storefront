import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Real tile artwork captured from the live Spin Auto homepage.
const tiles = [
  { title: "Inventory", cta: "View Inventory", to: "/cars", img: "/assets/inventory.webp" },
  { title: "Quick Approval Process", cta: "Get Pre Approved", to: "/forms/financing", img: "/assets/quick-approval-process.webp" },
  { title: "Car Finder", cta: "Find My Car", to: "/forms/car-finder", img: "/assets/car-finder.webp" },
  { title: "Book Appointment", cta: "Book Appointment", to: "/forms/book-appointment", img: "/assets/book-appointment.webp" },
];

export default function FeatureTiles() {
  return (
    <section className="bg-ink py-10">
      <div className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.title}
            to={t.to}
            className="group relative block h-56 overflow-hidden rounded-sm"
          >
            <img
              src={t.img}
              alt={t.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="font-display text-xl font-bold text-white">{t.title}</h3>
              <span className="mt-1 flex items-center gap-1 text-sm text-body transition-colors group-hover:text-brand-red">
                {t.cta} <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
