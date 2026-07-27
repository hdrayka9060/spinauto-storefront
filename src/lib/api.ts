/**
 * Lean API client for the public storefront. Only talks to the CDMS backend's
 * PUBLIC (`@Public()`) routes, so there is no auth/token/refresh logic.
 *
 * The backend wraps every response in an envelope
 *   { success, statusCode, message, data, timestamp }
 * and this client unwraps and returns `data`.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api/v1";

// Origin without the /api/v1 suffix — used to resolve relative /uploads image paths.
export const BACKEND_ORIGIN = BASE_URL.replace(/\/api(\/v\d+)?\/?$/, "");

/** Turn a stored photo path into a loadable URL. Absolute (S3) URLs pass through. */
export const fileUrl = (path?: string): string => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${BACKEND_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Envelope<T> = {
  success: boolean;
  statusCode: number;
  message: string | string[];
  data: T;
  timestamp: string;
};

type RequestOpts = {
  method?: string;
  query?: Record<string, unknown>;
  body?: unknown;
  signal?: AbortSignal;
};

export async function api<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  const base = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const url = new URL(base, window.location.origin);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    method: opts.method ?? "GET",
    headers: opts.body ? { "Content-Type": "application/json" } : undefined,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
  });

  let json: Envelope<T> | undefined;
  try {
    json = (await res.json()) as Envelope<T>;
  } catch {
    // non-JSON response
  }

  if (!res.ok) {
    const msg = json?.message
      ? Array.isArray(json.message)
        ? json.message.join(", ")
        : json.message
      : `Request failed (${res.status})`;
    throw new ApiError(res.status, msg, json);
  }

  return json?.data as T;
}
