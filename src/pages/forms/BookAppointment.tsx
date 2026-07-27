import { useSearchParams } from "react-router-dom";
import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, PhoneInput, TextArea, SelectInput, FormSection, SubmittedNotice } from "@/components/forms/fields";
import { useInquiry } from "@/hooks/use-inquiry";
import { TIMES } from "@/data/form-options";

export default function BookAppointment() {
  const [sp] = useSearchParams();
  const vehicleId = sp.get("vehicle") ?? undefined;
  const { submitting, submitted, error, onSubmit, reset } = useInquiry("appointment", { vehicleId });

  return (
    <FormPageLayout
      title="Book Appointment"
      subtitle="Book a time to visit us and take a vehicle for a test drive."
      banner="/assets/hero-ferrari-purosangue.jpg"
    >
      {submitted ? (
        <SubmittedNotice
          title="Appointment requested!"
          message="Thanks — we'll confirm your appointment time shortly."
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

          <FormSection title="Appointment Details">
            <Field label="Preferred Date" required name="preferredDate">
              <TextInput type="date" required />
            </Field>
            <Field label="Preferred Time" name="preferredTime">
              <SelectInput>
                <option value="">Select a time…</option>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Vehicle of Interest" className="sm:col-span-2" name="vehicleOfInterest">
              <TextInput placeholder="Year / Make / Model or Stock #" />
            </Field>
          </FormSection>

          <FormSection title="Comments" cols={1}>
            <TextArea name="comments" rows={4} placeholder="Anything you'd like us to know before your visit?" />
          </FormSection>

          {error && (
            <p className="mt-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-red mt-6 w-full disabled:opacity-60 sm:w-auto">
            {submitting ? "Submitting…" : "Book Appointment"}
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
