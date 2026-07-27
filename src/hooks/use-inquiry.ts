import { FormEvent, useState } from "react";
import { submitInquiry, type InquiryFormType } from "@/lib/inquiry";

// Field names that carry contact identity — pulled out of the details bag.
const CONTACT_KEYS = new Set(["firstName", "lastName", "name", "email", "phone", "comments"]);

/**
 * Wires a native <form> to the public inquiry endpoint. Reads all named controls
 * via FormData, extracts the contact fields, and sends the rest as `details`.
 * Give a control a `name` (via <Field name>) to include it in the submission.
 */
export function useInquiry(formType: InquiryFormType, opts?: { vehicleId?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const fd = new FormData(e.currentTarget);
    const raw: Record<string, unknown> = {};
    for (const key of new Set(fd.keys())) {
      const values = fd.getAll(key).map(String).filter((s) => s.trim() !== "");
      if (values.length) raw[key] = values.length > 1 ? values : values[0];
    }

    const firstName = String(raw.firstName ?? "");
    const lastName = String(raw.lastName ?? "");
    const name = String(raw.name ?? `${firstName} ${lastName}`.trim());
    const email = String(raw.email ?? "");
    const phone = String(raw.phone ?? "");
    const message = raw.comments ? String(raw.comments) : undefined;

    const details: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (!CONTACT_KEYS.has(k)) details[k] = v;
    }

    setSubmitting(true);
    setError(null);
    try {
      await submitInquiry({
        formType,
        name,
        email,
        phone,
        vehicleId: opts?.vehicleId,
        message,
        details: Object.keys(details).length ? details : undefined,
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, submitted, error, onSubmit, reset: () => setSubmitted(false) };
}
