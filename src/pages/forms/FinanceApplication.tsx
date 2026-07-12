import { useState } from "react";
import { Link } from "react-router-dom";
import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, SelectInput, FormSection, YesNo, SubmittedNotice } from "@/components/forms/fields";
import {
  PROVINCES,
  SALUTATIONS,
  GENDERS,
  MARITAL,
  HOME_STATUS,
  EMPLOYMENT_TYPE,
  CREDIT_RATING,
} from "@/data/form-options";

const opts = (arr: string[]) => (
  <>
    <option value="">Select…</option>
    {arr.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </>
);

export default function FinanceApplication() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FormPageLayout
      title="Finance Application"
      subtitle="Get approved from home! Please fill out the secure credit application below."
      banner="/assets/apply-for-financing.webp"
    >
      {submitted ? (
        <SubmittedNotice
          message="Your credit application has been received. A member of our finance team will contact you shortly."
          onReset={() => setSubmitted(false)}
        />
      ) : (
        <form onSubmit={onSubmit} noValidate={false}>
          <FormSection title="Personal Information">
            <Field label="Salutation">
              <SelectInput>{opts(SALUTATIONS)}</SelectInput>
            </Field>
            <Field label="Gender">
              <SelectInput>{opts(GENDERS)}</SelectInput>
            </Field>
            <Field label="First Name" required>
              <TextInput required />
            </Field>
            <Field label="Last Name" required>
              <TextInput required />
            </Field>
            <Field label="Phone" required>
              <TextInput type="tel" required />
            </Field>
            <Field label="Email" required>
              <TextInput type="email" required />
            </Field>
            <Field label="Marital Status" required>
              <SelectInput required>{opts(MARITAL)}</SelectInput>
            </Field>
            <Field label="Birth Date" required>
              <TextInput type="date" required />
            </Field>
            <Field label="SIN">
              <TextInput inputMode="numeric" />
            </Field>
          </FormSection>

          <FormSection title="Current Address">
            <Field label="Address" required className="sm:col-span-2">
              <TextInput required />
            </Field>
            <Field label="City" required>
              <TextInput required />
            </Field>
            <Field label="Province" required>
              <SelectInput required>{opts(PROVINCES)}</SelectInput>
            </Field>
            <Field label="Postal code" required>
              <TextInput required />
            </Field>
            <Field label="Duration (years)" required>
              <TextInput type="number" min={0} required />
            </Field>
            <Field label="Duration (months)" required>
              <TextInput type="number" min={0} max={11} required />
            </Field>
          </FormSection>

          <FormSection title="Home Rent / Mortgage Information">
            <Field label="Home Status" required>
              <SelectInput required>{opts(HOME_STATUS)}</SelectInput>
            </Field>
            <Field label="Monthly payment" required>
              <TextInput type="number" min={0} required />
            </Field>
          </FormSection>

          <FormSection title="Current Employment">
            <Field label="Type" required>
              <SelectInput required>{opts(EMPLOYMENT_TYPE)}</SelectInput>
            </Field>
            <Field label="Employer" required>
              <TextInput required />
            </Field>
            <Field label="Occupation" required>
              <TextInput required />
            </Field>
            <Field label="Employment Address" required className="sm:col-span-2">
              <TextInput required />
            </Field>
            <Field label="City" required>
              <TextInput required />
            </Field>
            <Field label="Province" required>
              <SelectInput required>{opts(PROVINCES)}</SelectInput>
            </Field>
            <Field label="Postal Code" required>
              <TextInput required />
            </Field>
            <Field label="Phone" required>
              <TextInput type="tel" required />
            </Field>
            <Field label="Duration (years)" required>
              <TextInput type="number" min={0} required />
            </Field>
            <Field label="Duration (months)" required>
              <TextInput type="number" min={0} max={11} required />
            </Field>
            <Field label="Gross Income" required>
              <TextInput type="number" min={0} required />
            </Field>
          </FormSection>

          <FormSection title="Previous Employment">
            <Field label="Previous Employer">
              <TextInput />
            </Field>
            <Field label="Phone">
              <TextInput type="tel" />
            </Field>
            <Field label="Duration (years)">
              <TextInput type="number" min={0} />
            </Field>
            <Field label="Duration (months)">
              <TextInput type="number" min={0} max={11} />
            </Field>
          </FormSection>

          <FormSection title="Other Information">
            <YesNo label="Previous Bankruptcy?" name="bankruptcy" />
            <YesNo label="Previous Repossession?" name="repossession" />
            <YesNo label="Is Co-signer Available?" name="cosigner" />
            <Field label="Please rate your credit">
              <SelectInput>{opts(CREDIT_RATING)}</SelectInput>
            </Field>
            <Field label="Choose Your Vehicle" className="sm:col-span-2">
              <TextInput placeholder="Search inventory or enter a vehicle of interest" />
            </Field>
            <Link to="/cars" className="text-sm text-brand-red hover:underline sm:col-span-2">
              Advanced Search →
            </Link>
          </FormSection>

          <p className="mt-6 text-xs text-white/50">
            Disclaimer: By submitting this application, you authorize us to run your credit report.
          </p>

          <button type="submit" className="btn-red mt-6 w-full sm:w-auto">
            Get Approved
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
