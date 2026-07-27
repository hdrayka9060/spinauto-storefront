import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, PhoneInput, TextArea, SelectInput, FormSection, SubmittedNotice } from "@/components/forms/fields";
import { useInquiry } from "@/hooks/use-inquiry";
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
  const { submitting, submitted, error, onSubmit, reset } = useInquiry("car-finder");

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
          </FormSection>

          <FormSection title="Vehicle Preferences">
            <Field label="Make" name="make">
              <TextInput placeholder="Any make" />
            </Field>
            <Field label="Model" name="model">
              <TextInput placeholder="Any model" />
            </Field>
            <Field label="Min Year" name="minYear">
              <TextInput type="number" min={1950} max={2026} />
            </Field>
            <Field label="Max Year" name="maxYear">
              <TextInput type="number" min={1950} max={2026} />
            </Field>
            <Field label="Body Style" name="bodyStyle">
              <SelectInput>{opts(BODY_STYLES, "Any body style")}</SelectInput>
            </Field>
            <Field label="Max Price" name="maxPrice">
              <TextInput type="number" min={0} placeholder="$" />
            </Field>
            <Field label="Max Mileage (KM)" name="maxMileage">
              <TextInput type="number" min={0} />
            </Field>
            <Field label="Transmission" name="transmission">
              <SelectInput>{opts(TRANSMISSIONS, "Any")}</SelectInput>
            </Field>
            <Field label="Fuel Type" name="fuelType">
              <SelectInput>{opts(FUEL_TYPES, "Any")}</SelectInput>
            </Field>
          </FormSection>

          <FormSection title="Comments" cols={1}>
            <TextArea name="comments" rows={4} placeholder="Any specific features, colours, or must-haves?" />
          </FormSection>

          {error && (
            <p className="mt-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-red mt-6 w-full disabled:opacity-60 sm:w-auto">
            {submitting ? "Submitting…" : "Find My Car"}
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
