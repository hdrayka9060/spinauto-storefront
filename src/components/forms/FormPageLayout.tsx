import { ReactNode } from "react";
import ContactSidebar from "./ContactSidebar";

export default function FormPageLayout({
  title,
  subtitle,
  banner,
  children,
}: {
  title: string;
  subtitle?: string;
  banner?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-ink">
      {banner && (
        <div className="h-52 w-full overflow-hidden lg:h-72">
          <img src={banner} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      <div className="container-site grid gap-8 py-12 lg:grid-cols-[1fr_340px]">
        <div className="rounded-lg bg-ink-card p-6 lg:p-8">
          <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-2 text-body">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>

        <ContactSidebar />
      </div>

      <p className="container-site pb-10 text-xs text-white/40">
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </p>
    </div>
  );
}
