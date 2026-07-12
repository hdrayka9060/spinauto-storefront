import { useState } from "react";
import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, TextArea, FormSection, SubmittedNotice } from "@/components/forms/fields";
import { SERVICES } from "@/data/form-options";

export default function Service() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FormPageLayout
      title="Book Service Appointment"
      subtitle="Schedule a visit with our in-house mechanic shop."
      banner="/assets/hero-cadillac-ct5v.jpg"
    >
      {submitted ? (
        <SubmittedNotice
          title="Request received!"
          message="Thanks for booking. We'll confirm your service appointment availability shortly."
          onReset={() => setSubmitted(false)}
        />
      ) : (
        <form onSubmit={onSubmit}>
          <FormSection title="Personal Information">
            <Field label="First Name" required>
              <TextInput required />
            </Field>
            <Field label="Last Name" required>
              <TextInput required />
            </Field>
            <Field label="Email" required>
              <TextInput type="email" required />
            </Field>
            <Field label="Phone" required>
              <TextInput type="tel" required />
            </Field>
          </FormSection>

          <FormSection title="Vehicle Information">
            <Field label="Make">
              <TextInput />
            </Field>
            <Field label="Model">
              <TextInput />
            </Field>
            <Field label="VIN">
              <TextInput />
            </Field>
            <Field label="Year">
              <TextInput type="number" min={1950} max={2026} />
            </Field>
          </FormSection>

          <FormSection title="Appointment Information" cols={1}>
            <Field label="Date" required className="sm:max-w-xs">
              <TextInput type="date" required />
            </Field>
          </FormSection>

          <FormSection title="Services List" cols={1}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SERVICES.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm text-body">
                  <input type="checkbox" name="services" value={s} className="h-4 w-4 accent-brand-red" />
                  {s}
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="Comments" cols={1}>
            <TextArea rows={4} placeholder="Tell us anything else about your vehicle or the service you need…" />
          </FormSection>

          <button type="submit" className="btn-red mt-6 w-full sm:w-auto">
            Check Availability
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
