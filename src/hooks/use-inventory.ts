import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toClientVehicle, type PaginatedServer, type ServerVehicle } from "@/lib/vehicle-mapper";
import { vehicles as fallbackVehicles, type Vehicle } from "@/data/vehicles";

type InventoryState = {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  usingFallback: boolean;
};

/**
 * Loads the FULL published inventory (backend returns status=unsold only, i.e.
 * vehicles toggled "Published" in the admin Dealer Website tab) by paging
 * through the feed. The complete set is held client-side so filtering, facet
 * counts and infinite-scroll all operate on real data. Falls back to bundled
 * sample data only if the backend is unreachable.
 */
export function useInventory(): InventoryState {
  const [state, setState] = useState<InventoryState>({
    vehicles: [],
    loading: true,
    error: null,
    usingFallback: false,
  });

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const all: ServerVehicle[] = [];
        let page = 1;
        // Page through the whole feed (cap at 20 pages / 1000 cars as a backstop).
        for (let guard = 0; guard < 20; guard++) {
          const res = await api<PaginatedServer<ServerVehicle>>("/website/inventory", {
            query: { page, limit: 50, sort: "-createdAt" },
            signal: ctrl.signal,
          });
          all.push(...(res?.data ?? []));
          if (!res?.hasNext) break;
          page += 1;
        }
        setState({ vehicles: all.map(toClientVehicle), loading: false, error: null, usingFallback: false });
      } catch (e) {
        if (ctrl.signal.aborted) return;
        setState({
          vehicles: fallbackVehicles,
          loading: false,
          error: e instanceof Error ? e.message : "Failed to load inventory",
          usingFallback: true,
        });
      }
    })();
    return () => ctrl.abort();
  }, []);

  return state;
}

type VehicleState = {
  vehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
};

/** Record a single storefront view (fire-and-forget; failures are ignored). */
function recordVehicleView(id: string) {
  api(`/website/inventory/${id}/view`, { method: "POST" }).catch(() => {});
}

export function useVehicle(id?: string): VehicleState {
  const [state, setState] = useState<VehicleState>({ vehicle: null, loading: true, error: null });
  // Count exactly one view per detail-page open. The ref guard makes React
  // StrictMode's dev double-mount (and any remount for the same id) a no-op, so
  // the counter goes up by 1 per open — not 2. Resets when the id changes.
  const viewedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!id || viewedRef.current === id) return;
    viewedRef.current = id;
    recordVehicleView(id);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setState({ vehicle: null, loading: false, error: "No vehicle id" });
      return;
    }
    const ctrl = new AbortController();
    (async () => {
      try {
        const s = await api<ServerVehicle>(`/website/inventory/${id}`, { signal: ctrl.signal });
        setState({ vehicle: toClientVehicle(s), loading: false, error: null });
      } catch (e) {
        if (ctrl.signal.aborted) return;
        const fb = fallbackVehicles.find((v) => v.id === id) ?? null;
        setState({
          vehicle: fb,
          loading: false,
          error: fb ? null : e instanceof Error ? e.message : "Vehicle not found",
        });
      }
    })();
    return () => ctrl.abort();
  }, [id]);

  return state;
}
