import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, PhoneInput, TextArea, FormSection, SubmittedNotice } from "@/components/forms/fields";
import VehiclePicker from "@/components/forms/VehiclePicker";
import { useInquiry } from "@/hooks/use-inquiry";
import { useInventory } from "@/hooks/use-inventory";
import type { Vehicle } from "@/data/vehicles";

export default function TextUsNow() {
  const [sp] = useSearchParams();
  const { vehicles } = useInventory();
  const [selected, setSelected] = useState<Vehicle | null>(null);

  // Pre-select when arriving with a ?vehicle= link.
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
      title="Text Us Now"
      subtitle="Send us a text and we'll reply as soon as we can."
      banner="/assets/hero-audi-rs7.jpg"
    >
      {submitted ? (
        <SubmittedNotice
          title="Text sent!"
          message="Thanks — we'll text you back as soon as we can."
          onReset={reset}
        />
      ) : (
        <form onSubmit={onSubmit}>
          {/* Marks these leads as SMS-preferred in the CRM notes. */}
          <input type="hidden" name="preferredContact" value="Text message (SMS)" />
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
            <TextArea name="comments" rows={5} placeholder="Type your message…" />
          </FormSection>

          {error && (
            <p className="mt-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-red mt-6 w-full disabled:opacity-60 sm:w-auto">
            {submitting ? "Sending…" : "Send Text"}
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
