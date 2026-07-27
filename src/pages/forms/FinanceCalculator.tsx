import { FormEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import FormPageLayout from "@/components/forms/FormPageLayout";

// Payments per year for each frequency — drives both the period count and the periodic rate.
const FREQUENCIES: { label: string; perYear: number }[] = [
  { label: "Monthly", perYear: 12 },
  { label: "Bi-Weekly", perYear: 26 },
];
const TERMS = [12, 24, 36, 48, 60, 72, 84, 96];
const TAX_RATE = 0.13; // sales tax applied to the vehicle price

const cad = (x: number) =>
  x.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 0, maximumFractionDigits: 0 });

type Result = {
  payment: number;
  freqLabel: string;
  costOfBorrowing: number;
  msrp: number;
  totalObligation: number;
};

const fieldWrap = "flex overflow-hidden rounded border border-ink-border";
const fieldInput = "w-full bg-ink-black px-3 py-2.5 text-sm text-white outline-none focus:bg-ink-black/60";
const unitBox = "grid w-11 place-items-center bg-white/10 text-sm text-white";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid items-center gap-2 sm:grid-cols-[190px_1fr]">
      <span className="text-sm font-medium text-white">{label}</span>
      {children}
    </div>
  );
}

export default function FinanceCalculator() {
  const [frequency, setFrequency] = useState("");
  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [trade, setTrade] = useState("");
  const [term, setTerm] = useState("36");
  const [rate, setRate] = useState("");
  const [includeTax, setIncludeTax] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const reset = () => {
    setFrequency("");
    setPrice("");
    setDown("");
    setTrade("");
    setTerm("36");
    setRate("");
    setIncludeTax(false);
    setResult(null);
    setError("");
  };

  const calculate = (e: FormEvent) => {
    e.preventDefault();
    const freq = FREQUENCIES.find((f) => f.label === frequency);
    const P0 = Number(price) || 0;
    if (!freq) {
      setError("Please select a payment frequency.");
      setResult(null);
      return;
    }
    if (P0 <= 0) {
      setError("Please enter a vehicle price.");
      setResult(null);
      return;
    }
    setError("");

    const tax = includeTax ? P0 * TAX_RATE : 0;
    const financed = Math.max(0, P0 + tax - (Number(down) || 0) - (Number(trade) || 0));
    const ppy = freq.perYear;
    const n = Math.max(1, Math.round((Number(term) / 12) * ppy));
    const i = (Number(rate) || 0) / 100 / ppy;
    const payment = i > 0 ? (financed * i) / (1 - Math.pow(1 + i, -n)) : financed / n;
    const totalPayments = payment * n;

    setResult({
      payment,
      freqLabel: freq.label,
      costOfBorrowing: totalPayments - financed,
      msrp: P0 + tax,
      totalObligation: (Number(down) || 0) + totalPayments,
    });
  };

  const out = (v: number | undefined) => (result && v !== undefined ? cad(v) : "—");

  return (
    <FormPageLayout
      title="Car Loan Calculator"
      subtitle="Estimate your car loan payment with our easy-to-use car loan calculator."
      banner="/assets/apply-for-financing.webp"
    >
      <form onSubmit={calculate}>
        <div className="mb-5 flex items-center justify-between border-b border-ink-border pb-3">
          <h2 className="font-display text-lg font-bold text-white">Payment Calculator</h2>
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 text-sm text-body transition-colors hover:text-white"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        <div className="space-y-4">
          <Row label="Payment Frequency">
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded border border-ink-border bg-ink-black px-3 py-2.5 text-sm text-white outline-none focus:border-brand-red"
            >
              <option value="">Select…</option>
              {FREQUENCIES.map((f) => (
                <option key={f.label} value={f.label}>
                  {f.label}
                </option>
              ))}
            </select>
          </Row>

          <Row label="Vehicle Price">
            <div className={fieldWrap}>
              <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min={0} className={fieldInput} />
              <span className={unitBox}>$</span>
            </div>
          </Row>

          <Row label="Down payment">
            <div className={fieldWrap}>
              <input value={down} onChange={(e) => setDown(e.target.value)} type="number" min={0} className={fieldInput} />
              <span className={unitBox}>$</span>
            </div>
          </Row>

          <Row label="Your trade">
            <div className={fieldWrap}>
              <input value={trade} onChange={(e) => setTrade(e.target.value)} type="number" min={0} className={fieldInput} />
              <span className={unitBox}>$</span>
            </div>
          </Row>

          <Row label="Month Term">
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full rounded border border-ink-border bg-ink-black px-3 py-2.5 text-sm text-white outline-none focus:border-brand-red"
            >
              {TERMS.map((t) => (
                <option key={t} value={t}>
                  {t} Months
                </option>
              ))}
            </select>
          </Row>

          <Row label="Interest rate">
            <div className={fieldWrap}>
              <input value={rate} onChange={(e) => setRate(e.target.value)} type="number" min={0} step="0.01" className={fieldInput} />
              <span className={unitBox}>%</span>
            </div>
          </Row>

          <Row label="Your Estimated Payment">
            <div className="rounded border border-ink-border bg-ink-black px-3 py-2.5 text-sm font-semibold text-brand-red">
              {result ? `${cad(result.payment)} / ${result.freqLabel}` : "—"}
            </div>
          </Row>

          <Row label="Cost Of Borrowing">
            <div className="rounded border border-ink-border bg-ink-black px-3 py-2.5 text-sm text-white">
              {out(result?.costOfBorrowing)}
            </div>
          </Row>

          <Row label="MSRP">
            <div className="rounded border border-ink-border bg-ink-black px-3 py-2.5 text-sm text-white">
              {out(result?.msrp)}
            </div>
          </Row>

          <Row label="Total Obligation">
            <div className="rounded border border-ink-border bg-ink-black px-3 py-2.5 text-sm text-white">
              {out(result?.totalObligation)}
            </div>
          </Row>

          <label className="flex items-center gap-2 pt-1 text-sm text-body">
            <input type="checkbox" checked={includeTax} onChange={(e) => setIncludeTax(e.target.checked)} className="h-4 w-4 accent-brand-red" />
            Include sales tax
          </label>

          {includeTax && (
            <Row label="Sales Tax">
              <div className="rounded border border-ink-border bg-ink-black px-3 py-2.5 text-sm text-white">
                {cad((Number(price) || 0) * TAX_RATE)}
              </div>
            </Row>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">{error}</p>
        )}

        <div className="mt-6 flex flex-col items-center gap-4">
          <button type="submit" className="btn-red w-full sm:w-auto sm:px-12">
            Calculate Payment
          </button>
          <Link to="/forms/financing" className="btn-outline w-full sm:w-auto sm:px-12">
            Apply for Financing
          </Link>
        </div>

        <p className="mt-6 text-xs text-white/50">
          For estimation purposes only — not a financing offer. Actual rates and terms are subject to credit approval.
        </p>
      </form>
    </FormPageLayout>
  );
}
