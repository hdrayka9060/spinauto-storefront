import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const MAKES = ["Ford", "Toyota", "Jeep", "Honda", "Chevrolet", "Dodge", "Nissan", "GMC", "Hyundai", "BMW"];
const YEARS = Array.from({ length: 25 }, (_, i) => String(2026 - i));

function DarkSelect({ children, "aria-label": ariaLabel }: { children: ReactNode; "aria-label": string }) {
  return (
    <div className="relative">
      <select aria-label={ariaLabel} defaultValue="" className="select-dark pr-10">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
    </div>
  );
}

/**
 * Make/Model/Year quick search.
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitted?.();
    navigate("/cars");
  };

  return (
    <form
      onSubmit={submit}
      className={cn(
        "grid grid-cols-2 gap-3",
        layout === "row" && "lg:grid-cols-[1fr_1fr_1fr_1fr_auto]",
      )}
    >
      <DarkSelect aria-label="Make">
        <option value="">Any Make</option>
        {MAKES.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </DarkSelect>
      <DarkSelect aria-label="Model">
        <option value="">Any Model</option>
      </DarkSelect>
      <DarkSelect aria-label="Minimum year">
        <option value="">Min Year</option>
        {YEARS.map((y) => (
          <option key={y}>{y}</option>
        ))}
      </DarkSelect>
      <DarkSelect aria-label="Maximum year">
        <option value="">Max Year</option>
        {YEARS.map((y) => (
          <option key={y}>{y}</option>
        ))}
      </DarkSelect>
      <button type="submit" className="btn-red col-span-2 h-12 lg:col-span-1 lg:h-full">
        <Search className="h-4 w-4" /> Search
      </button>
    </form>
  );
}
