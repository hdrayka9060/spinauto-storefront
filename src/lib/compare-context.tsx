import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import type { Vehicle } from "@/data/vehicles";

const KEY = "spinauto.compare";

type CompareCtx = {
  items: Vehicle[];
  count: number;
  has: (id: string) => boolean;
  add: (v: Vehicle) => void;
  remove: (id: string) => void;
  toggle: (v: Vehicle) => void;
  clear: () => void;
};

const Ctx = createContext<CompareCtx | null>(null);

function load(): Vehicle[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Vehicle[]) : [];
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Vehicle[]>(load);

  const update = useCallback((updater: (prev: Vehicle[]) => Vehicle[]) => {
    setItems((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore quota / disabled storage */
      }
      return next;
    });
  }, []);

  const add = useCallback((v: Vehicle) => update((prev) => (prev.some((x) => x.id === v.id) ? prev : [...prev, v])), [update]);
  const remove = useCallback((id: string) => update((prev) => prev.filter((v) => v.id !== id)), [update]);
  const toggle = useCallback(
    (v: Vehicle) => update((prev) => (prev.some((x) => x.id === v.id) ? prev.filter((x) => x.id !== v.id) : [...prev, v])),
    [update],
  );
  const clear = useCallback(() => update(() => []), [update]);
  const has = useCallback((id: string) => items.some((v) => v.id === id), [items]);

  return (
    <Ctx.Provider value={{ items, count: items.length, has, add, remove, toggle, clear }}>{children}</Ctx.Provider>
  );
}

export function useCompare(): CompareCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCompare must be used within CompareProvider");
  return c;
}
