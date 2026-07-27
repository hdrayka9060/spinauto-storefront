import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, PhoneInput, TextArea, FormSection, SubmittedNotice } from "@/components/forms/fields";
import VehiclePicker from "@/components/forms/VehiclePicker";
import { useInquiry } from "@/hooks/use-inquiry";
import { useInventory } from "@/hooks/use-inventory";
import type { Vehicle } from "@/data/vehicles";

export default function ContactUs() {
  const [sp] = useSearchParams();
  const { vehicles } = useInventory();
  const [selected, setSelected] = useState<Vehicle | null>(null);

  // Pre-select when arriving with a ?vehicle= link (e.g. a card's "Contact Us").
  useEffect(() => {
    const id = sp.get("vehicle");
    if (id && !selected) {
      const v = vehicles.find((x) => x.id === id);
      if (v) setSelected(v);
    }
  }, [vehicles, sp, selected]);

  const { submitting, submitted, error, onSubmit, reset } = useInquiry("contact", { vehicleId: selected?.id });

  return (
    <FormPageLayout
      title="Contact Us"
      subtitle="Get in touch with us — phone, email or in person, here's how to reach us."
      banner="/assets/hero-cadillac-ct5v.jpg"
    >
      {submitted ? (
        <SubmittedNotice
          title="Message sent!"
          message="Thanks for reaching out — we'll get back to you shortly."
          onReset={reset}
        />
      ) : (
        <form onSubmit={onSubmit}>
          <FormSection title="Your Information">
            <Field label="First Name" required name="firstName">
              <TextInput required />
            </Field>
            <Field label="Last Name" required name="lastName">
              <TextInput required />
            </Field>
            <Field label="Email" required name="email">
              <TextInput type="email" required />
            </Field>
            <Field label="Phone" required name="phone">
              <PhoneInput required />
            </Field>
            <Field label="Vehicle of Interest" className="sm:col-span-2">
              <VehiclePicker vehicles={vehicles} value={selected} onChange={setSelected} />
            </Field>
            {selected && (
              <input
                type="hidden"
                name="vehicleOfInterest"
                value={`${selected.year} ${selected.make} ${selected.model} (Stock ${selected.stock})`}
              />
            )}
          </FormSection>

          <FormSection title="Message" cols={1}>
            <TextArea name="comments" rows={5} placeholder="How can we help?" />
          </FormSection>

          {error && (
            <p className="mt-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-red mt-6 w-full disabled:opacity-60 sm:w-auto">
            {submitting ? "Sending…" : "Send"}
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
