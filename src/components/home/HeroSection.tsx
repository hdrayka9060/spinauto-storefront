import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";
import InventorySearch from "./InventorySearch";

export default function HeroSection() {
  const navigate = useNavigate();
  const [kw, setKw] = useState("");

  return (
    <section className="bg-ink">
      <div className="relative">
        <HeroCarousel />

        {/* Desktop keyword search overlapping the hero's bottom edge. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden translate-y-1/2 lg:block">
          <div className="container-site">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/cars${kw.trim() ? `?q=${encodeURIComponent(kw.trim())}` : ""}`);
              }}
              className="pointer-events-auto flex items-stretch gap-1 shadow-2xl"
            >
              <div className="flex flex-1">
                <input
                  value={kw}
                  onChange={(e) => setKw(e.target.value)}
                  placeholder="Search Inventory..."
                  aria-label="Search inventory"
                  className="h-14 w-full bg-white px-5 text-ink outline-none placeholder:text-ink/50"
                />
                <button type="submit" className="btn-red h-14 shrink-0 px-8 normal-case">
                  Search
                </button>
              </div>
              <Link to="/cars" className="btn-red h-14 flex-1 justify-center normal-case">
                View Our Inventory
              </Link>
            </form>
          </div>
        </div>
      </div>

      {/* Make/Model/Year filter band (extra top padding on desktop to clear the overlap). */}
      <div className="container-site py-6 lg:pb-10 lg:pt-20">
        <InventorySearch />
      </div>
    </section>
  );
}
