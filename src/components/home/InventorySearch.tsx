import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const MAKES = ["BMW", "Chevrolet", "Ford", "GMC", "Honda", "Hyundai", "Jeep", "Kia", "Mazda", "Nissan", "Ram", "Tesla", "Toyota", "Volkswagen"];
const YEARS = Array.from({ length: 25 }, (_, i) => String(2026 - i));

function DarkSelect({
  children,
  "aria-label": ariaLabel,
  value,
  onChange,
}: {
  children: ReactNode;
  "aria-label": string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select-dark pr-10"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
    </div>
  );
}

/**
 * Make/Model/Year quick search. Submitting navigates to /cars with the chosen
 * values as query params, which the Inventory page reads into its filters.
 * - `row`: desktop shows 4 fields + button in a single row; mobile falls back to 2×2.
 * - `stacked`: always 2×2 (used inside the mobile drawer).
 */
export default function InventorySearch({
  layout = "row",
  onSubmitted,
}: {
  layout?: "row" | "stacked";
  onSubmitted?: () => void;
}) {
  const navigate = useNavigate();
  const [make, setMake] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (minYear) params.set("minYear", minYear);
    if (maxYear) params.set("maxYear", maxYear);
    onSubmitted?.();
    const qs = params.toString();
    navigate(`/cars${qs ? `?${qs}` : ""}`);
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "grid grid-cols-2 gap-3",
        layout === "row" && "lg:grid-cols-[1fr_1fr_1fr_1fr_auto]",
      )}
    >
      <DarkSelect aria-label="Make" value={make} onChange={setMake}>
        <option value="">Any Make</option>
        {MAKES.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </DarkSelect>
      <DarkSelect aria-label="Model" value="" onChange={() => {}}>
        <option value="">Any Model</option>
      </DarkSelect>
      <DarkSelect aria-label="Minimum year" value={minYear} onChange={setMinYear}>
        <option value="">Min Year</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </DarkSelect>
      <DarkSelect aria-label="Maximum year" value={maxYear} onChange={setMaxYear}>
        <option value="">Max Year</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </DarkSelect>
      <button type="submit" className="btn-red col-span-2 h-12 lg:col-span-1 lg:h-full">
        <Search className="h-4 w-4" /> Search
      </button>
    </form>
  );
}
