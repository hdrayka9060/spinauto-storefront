import { useLocation, useNavigate } from "react-router-dom";
import { GitCompare } from "lucide-react";
import { useCompare } from "@/lib/compare-context";

/** Sticky bar showing how many vehicles are queued for comparison. */
export default function CompareBar() {
  const { count, clear } = useCompare();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (count === 0 || pathname === "/compare") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-border bg-ink-black/95 backdrop-blur">
      <div className="container-site flex items-center justify-between gap-4 py-3">
        <span className="flex items-center gap-2 text-sm text-white">
          <GitCompare className="h-4 w-4 text-brand-red" />
          {count} selected to compare
        </span>
        <div className="flex items-center gap-3">
          <button onClick={clear} className="text-sm text-body transition-colors hover:text-white">
            Clear
          </button>
          <button
            onClick={() => navigate("/compare")}
            disabled={count < 2}
            className="btn-red h-10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {count >= 2 ? `Compare ${count} cars` : "Select 1 more"}
          </button>
        </div>
      </div>
    </div>
  );
}
