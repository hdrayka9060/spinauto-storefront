import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
import { useRouteSeo } from "@/lib/seo";

export default function SiteShell({ children }: { children: ReactNode }) {
  useRouteSeo();
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
