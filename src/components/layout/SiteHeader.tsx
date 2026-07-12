import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin, Phone, Menu, X, ChevronDown, Clock } from "lucide-react";
import { navItems, hours, site, type NavItem } from "@/data/site";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import InventorySearch from "@/components/home/InventorySearch";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===================== DESKTOP ===================== */}
      {/* Top bar (scrolls away) */}
      <div className="hidden bg-ink-black lg:block">
        <div className="container-site flex items-center justify-between py-3">
          <Logo className="h-20" />
          <div className="space-y-1 text-right text-sm">
            <a
              href="/directions"
              className="flex items-center justify-end gap-2 text-body transition-colors hover:text-white"
            >
              <MapPin className="h-4 w-4 text-brand-red" /> {site.address}
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center justify-end gap-2 text-body transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-brand-red" /> {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Nav bar (sticky) */}
      <nav className="sticky top-0 z-40 hidden border-y border-white/10 bg-ink-black lg:block">
        <div className="container-site flex items-center justify-between">
          <HoursDropdown />
          <ul className="flex items-center">
            {navItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </ul>
        </div>
      </nav>

      {/* ===================== MOBILE ===================== */}
      <div className="sticky top-0 z-40 bg-ink-black lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-5">
            <a href="/directions" aria-label="Directions">
              <MapPin className="h-5 w-5 text-white" />
            </a>
            <a href={site.phoneHref} aria-label="Call us">
              <Phone className="h-5 w-5 text-white" />
            </a>
          </div>
          <Logo className="h-14" />
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-7 w-7 text-white" />
          </button>
        </div>
      </div>

      {open && <MobileDrawer onClose={() => setOpen(false)} />}
    </>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const hasChildren = !!item.children?.length;
  return (
    <li className="group relative">
      <NavLink
        to={item.to}
        end={item.end}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-1 px-5 py-4 text-sm text-white transition-colors hover:text-brand-red",
            isActive && "text-brand-red",
          )
        }
      >
        {item.label}
        {hasChildren && <ChevronDown className="h-4 w-4" />}
      </NavLink>
      {hasChildren && (
        <ul className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 border border-ink-border bg-ink-black opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
          {item.children!.map((c) => (
            <li key={c.label}>
              <Link
                to={c.to}
                className="block px-4 py-3 text-sm text-body transition-colors hover:bg-brand-red hover:text-white"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function HoursDropdown() {
  return (
    <div className="group relative">
      <button className="flex items-center gap-2 py-4 pr-6 text-sm text-white transition-colors hover:text-brand-red">
        <Clock className="h-4 w-4" /> Our Hours <ChevronDown className="h-4 w-4" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 border border-ink-border bg-ink-black p-4 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white">Our Hours</p>
        <ul className="space-y-1.5 text-xs">
          {hours.map((h) => (
            <li key={h.day} className="flex justify-between">
              <span className="text-body">{h.day}</span>
              <span className={h.time === "Closed" ? "text-brand-red" : "text-white"}>{h.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-black lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-5">
          <MapPin className="h-5 w-5 text-white" />
          <Phone className="h-5 w-5 text-white" />
        </div>
        <Logo className="h-14" />
        <button onClick={onClose} aria-label="Close menu">
          <X className="h-7 w-7 text-white" />
        </button>
      </div>

      <nav className="px-6 pb-10 pt-6">
        <ul className="space-y-5">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="flex w-full items-center gap-2 text-lg text-white"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", expanded === item.label && "rotate-180")}
                    />
                  </button>
                  {expanded === item.label && (
                    <ul className="mt-3 space-y-3 pl-4">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link to={c.to} onClick={onClose} className="block text-body hover:text-white">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) => cn("block text-lg", isActive ? "text-brand-red" : "text-white")}
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Quick search lives inside the mobile drawer (matches the live site). */}
        <div className="mt-8">
          <InventorySearch layout="stacked" onSubmitted={onClose} />
        </div>
      </nav>
    </div>
  );
}
