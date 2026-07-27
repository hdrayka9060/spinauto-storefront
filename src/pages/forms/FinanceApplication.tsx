import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormPageLayout from "@/components/forms/FormPageLayout";
import { Field, TextInput, PhoneInput, SelectInput, FormSection, YesNo, SubmittedNotice } from "@/components/forms/fields";
import VehiclePicker from "@/components/forms/VehiclePicker";
import { useInquiry } from "@/hooks/use-inquiry";
import { useInventory } from "@/hooks/use-inventory";
import type { Vehicle } from "@/data/vehicles";
import {
  CA_PROVINCES,
  US_STATES,
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

const provinceOptions = () => (
  <>
    <option value="">Select…</option>
    <optgroup label="Canada">
      {CA_PROVINCES.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </optgroup>
    <optgroup label="United States">
      {US_STATES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </optgroup>
  </>
);

export default function FinanceApplication() {
  const [sp] = useSearchParams();
  const { vehicles } = useInventory();
  const [selected, setSelected] = useState<Vehicle | null>(null);

  // Pre-select the vehicle when arriving from a car's "Apply for Financing" CTA.
  useEffect(() => {
    const id = sp.get("vehicle");
    if (id && !selected) {
      const v = vehicles.find((x) => x.id === id);
      if (v) setSelected(v);
    }
  }, [vehicles, sp, selected]);

  const { submitting, submitted, error, onSubmit, reset } = useInquiry("financing", { vehicleId: selected?.id });

  return (
    <FormPageLayout
      title="Finance Application"
      subtitle="Get approved from home! Please fill out the secure credit application below."
      banner="/assets/apply-for-financing.webp"
    >
      {submitted ? (
        <SubmittedNotice
          message="Your credit application has been received. A member of our finance team will contact you shortly."
          onReset={reset}
        />
      ) : (
        <form onSubmit={onSubmit}>
          <FormSection title="Personal Information">
            <Field label="Salutation" name="salutation">
              <SelectInput>{opts(SALUTATIONS)}</SelectInput>
            </Field>
            <Field label="Gender" name="gender">
              <SelectInput>{opts(GENDERS)}</SelectInput>
            </Field>
            <Field label="First Name" required name="firstName">
              <TextInput required />
            </Field>
            <Field label="Last Name" required name="lastName">
              <TextInput required />
            </Field>
            <Field label="Phone" required name="phone">
              <PhoneInput required />
            </Field>
            <Field label="Email" required name="email">
              <TextInput type="email" required />
            </Field>
            <Field label="Marital Status" required name="maritalStatus">
              <SelectInput required>{opts(MARITAL)}</SelectInput>
            </Field>
            <Field label="Birth Date" required name="birthDate">
              <TextInput type="date" required />
            </Field>
            <Field label="SIN" name="sin">
              <TextInput inputMode="numeric" />
            </Field>
          </FormSection>

          <FormSection title="Current Address">
            <Field label="Address" required className="sm:col-span-2" name="address">
              <TextInput required />
            </Field>
            <Field label="City" required name="city">
              <TextInput required />
            </Field>
            <Field label="Province / State" required name="province">
              <SelectInput required>{provinceOptions()}</SelectInput>
            </Field>
            <Field label="Postal code" required name="postalCode">
              <TextInput required />
            </Field>
            <Field label="Duration (years)" required name="addressDurationYears">
              <TextInput type="number" min={0} required />
            </Field>
            <Field label="Duration (months)" required name="addressDurationMonths">
              <TextInput type="number" min={0} max={11} required />
            </Field>
          </FormSection>

          <FormSection title="Home Rent / Mortgage Information">
            <Field label="Home Status" required name="homeStatus">
              <SelectInput required>{opts(HOME_STATUS)}</SelectInput>
            </Field>
            <Field label="Monthly payment" required name="monthlyPayment">
              <TextInput type="number" min={0} required />
            </Field>
          </FormSection>

          <FormSection title="Current Employment">
            <Field label="Type" required name="employmentType">
              <SelectInput required>{opts(EMPLOYMENT_TYPE)}</SelectInput>
            </Field>
            <Field label="Employer" required name="employer">
              <TextInput required />
            </Field>
            <Field label="Occupation" required name="occupation">
              <TextInput required />
            </Field>
            <Field label="Employment Address" required className="sm:col-span-2" name="employmentAddress">
              <TextInput required />
            </Field>
            <Field label="City" required name="employmentCity">
              <TextInput required />
            </Field>
            <Field label="Province / State" required name="employmentProvince">
              <SelectInput required>{provinceOptions()}</SelectInput>
            </Field>
            <Field label="Postal Code" required name="employmentPostalCode">
              <TextInput required />
            </Field>
            <Field label="Phone" required name="employmentPhone">
              <PhoneInput required />
            </Field>
            <Field label="Duration (years)" required name="employmentDurationYears">
              <TextInput type="number" min={0} required />
            </Field>
            <Field label="Duration (months)" required name="employmentDurationMonths">
              <TextInput type="number" min={0} max={11} required />
            </Field>
            <Field label="Gross Income" required name="grossIncome">
              <TextInput type="number" min={0} required />
            </Field>
          </FormSection>

          <FormSection title="Previous Employment">
            <Field label="Previous Employer" name="previousEmployer">
              <TextInput />
            </Field>
            <Field label="Phone" name="previousEmployerPhone">
              <PhoneInput />
            </Field>
            <Field label="Duration (years)" name="previousDurationYears">
              <TextInput type="number" min={0} />
            </Field>
            <Field label="Duration (months)" name="previousDurationMonths">
              <TextInput type="number" min={0} max={11} />
            </Field>
          </FormSection>

          <FormSection title="Other Information">
            <YesNo label="Previous Bankruptcy?" name="bankruptcy" />
            <YesNo label="Previous Repossession?" name="repossession" />
            <YesNo label="Is Co-signer Available?" name="cosigner" />
            <Field label="Please rate your credit" name="creditRating">
              <SelectInput>{opts(CREDIT_RATING)}</SelectInput>
            </Field>
            <Field label="Choose Your Vehicle" className="sm:col-span-2">
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

          <p className="mt-6 text-xs text-white/50">
            Disclaimer: By submitting this application, you authorize us to run your credit report.
          </p>

          {error && (
            <p className="mt-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className="btn-red mt-6 w-full disabled:opacity-60 sm:w-auto">
            {submitting ? "Submitting…" : "Get Approved"}
          </button>
        </form>
      )}
    </FormPageLayout>
  );
}
