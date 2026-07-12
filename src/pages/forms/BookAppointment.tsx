import { useState } from "react";
import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, TextArea, SelectInput, FormSection, SubmittedNotice } from "@/components/forms/fields";
import { TIMES } from "@/data/form-options";

export default function BookAppointment() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

          <FormSection title="Appointment Details">
            <Field label="Preferred Date" required>
              <TextInput type="date" required />
            </Field>
            <Field label="Preferred Time">
              <SelectInput>
                <option value="">Select a time…</option>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Vehicle of Interest" className="sm:col-span-2">
              <TextInput placeholder="Year / Make / Model or Stock #" />
            </Field>
          </FormSection>

          <FormSection title="Comments" cols={1}>
            <TextArea rows={4} placeholder="Anything you'd like us to know before your visit?" />
          </FormSection>

          <button type="submit" className="btn-red mt-6 w-full sm:w-auto">
            Book Appointment
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
