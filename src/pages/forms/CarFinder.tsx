import { useState } from "react";
import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, TextArea, SelectInput, FormSection, SubmittedNotice } from "@/components/forms/fields";
import { BODY_STYLES, FUEL_TYPES, TRANSMISSIONS } from "@/data/form-options";

const opts = (arr: string[], any: string) => (
  <>
    <option value="">{any}</option>
    {arr.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </>
);

export default function CarFinder() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FormPageLayout
      title="Car Finder"
      subtitle="Can't find what you're looking for? Tell us and we'll track it down for you."
      banner="/assets/hero-audi-rs7.jpg"
    >
      {submitted ? (
        <SubmittedNotice
          title="We're on it!"
          message="Your car finder request has been submitted. Our team will reach out with matching vehicles soon."
          onReset={() => setSubmitted(false)}
        />
      ) : (
        <form onSubmit={onSubmit}>
          <FormSection title="Your Information">
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

          <FormSection title="Vehicle Preferences">
            <Field label="Make">
              <TextInput placeholder="Any make" />
            </Field>
            <Field label="Model">
              <TextInput placeholder="Any model" />
            </Field>
            <Field label="Min Year">
              <TextInput type="number" min={1950} max={2026} />
            </Field>
            <Field label="Max Year">
              <TextInput type="number" min={1950} max={2026} />
            </Field>
            <Field label="Body Style">
              <SelectInput>{opts(BODY_STYLES, "Any body style")}</SelectInput>
            </Field>
            <Field label="Max Price">
              <TextInput type="number" min={0} placeholder="$" />
            </Field>
            <Field label="Max Mileage (KM)">
              <TextInput type="number" min={0} />
            </Field>
            <Field label="Transmission">
              <SelectInput>{opts(TRANSMISSIONS, "Any")}</SelectInput>
            </Field>
            <Field label="Fuel Type">
              <SelectInput>{opts(FUEL_TYPES, "Any")}</SelectInput>
            </Field>
          </FormSection>

          <FormSection title="Comments" cols={1}>
            <TextArea rows={4} placeholder="Any specific features, colours, or must-haves?" />
          </FormSection>

          <button type="submit" className="btn-red mt-6 w-full sm:w-auto">
            Find My Car
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
