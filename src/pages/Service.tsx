import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, PhoneInput, TextArea, FormSection, SubmittedNotice } from "@/components/forms/fields";
import { useInquiry } from "@/hooks/use-inquiry";
import { SERVICES } from "@/data/form-options";

export default function Service() {
  const { submitting, submitted, error, onSubmit, reset } = useInquiry("service");

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
          onReset={reset}
        />
      ) : (
        <form onSubmit={onSubmit}>
          <FormSection title="Personal Information">
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

          <FormSection title="Vehicle Information">
            <Field label="Make" name="make">
              <TextInput />
            </Field>
            <Field label="Model" name="model">
              <TextInput />
            </Field>
            <Field label="VIN" name="vin">
              <TextInput />
            </Field>
            <Field label="Year" name="year">
              <TextInput type="number" min={1950} max={2026} />
            </Field>
          </FormSection>

          <FormSection title="Appointment Information" cols={1}>
            <Field label="Date" required name="date" className="sm:max-w-xs">
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
            <TextArea name="comments" rows={4} placeholder="Tell us anything else about your vehicle or the service you need…" />
          </FormSection>

          {error && (
            <p className="mt-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-red mt-6 w-full disabled:opacity-60 sm:w-auto">
            {submitting ? "Checking…" : "Check Availability"}
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
