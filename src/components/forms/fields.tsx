import {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputCls =
  "w-full border border-ink-border bg-ink-black px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-brand-red";

export function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-sm text-body">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputCls, props.className)} />;
}

export function SelectInput({ children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={cn(inputCls, "appearance-none pr-9", className)}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
    </div>
  );
}

export function FormSection({
  title,
  cols = 2,
  children,
}: {
  title: string;
  cols?: 1 | 2 | 3;
  children: ReactNode;
}) {
  return (
    <fieldset className="mt-8 first:mt-0">
      <legend className="mb-4 w-full border-b border-ink-border pb-2 font-display text-lg font-bold text-white">
        {title}
      </legend>
      <div
        className={cn(
          "grid gap-4",
          cols === 1 && "grid-cols-1",
          cols === 2 && "sm:grid-cols-2",
          cols === 3 && "sm:grid-cols-3",
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}

export function YesNo({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <div>
      <span className="mb-1.5 block text-sm text-body">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </span>
      <div className="flex gap-6 pt-1">
        {["Yes", "No"].map((v) => (
          <label key={v} className="flex items-center gap-2 text-sm text-white">
            <input type="radio" name={name} value={v} required={required} className="h-4 w-4 accent-brand-red" /> {v}
          </label>
        ))}
      </div>
    </div>
  );
}

export function SubmittedNotice({
  title = "Thank you!",
  message,
  onReset,
}: {
  title?: string;
  message: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-lg border border-ink-border bg-ink-black p-8 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-brand-red" />
      <h2 className="mt-4 font-display text-2xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-body">{message}</p>
      <button onClick={onReset} className="btn-outline mt-6">
        Submit another
      </button>
    </div>
  );
}
