import ContactSidebar from "@/components/forms/ContactSidebar";
import { site } from "@/data/site";

export default function About() {
  return (
    <div className="bg-ink">
      <div className="h-52 w-full overflow-hidden lg:h-80">
        <img src="/assets/hero-cadillac-ct5v.jpg" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="container-site grid gap-8 py-12 lg:grid-cols-[1fr_340px]">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">About Spin Auto Ltd</h1>
          <div className="mt-6 space-y-4 leading-relaxed text-body">
            <p>
              Spin Auto Ltd is a locally owned and operated used car and truck dealership in Edmonton, Alberta. We
              specialize in quality pre-owned vehicles at honest, competitive prices — cars, trucks, SUVs and vans to
              suit every budget and lifestyle.
            </p>
            <p>
              Our goal is to make car buying simple and stress-free. From flexible financing for good credit, bad
              credit, or no credit, to our on-site mechanic shop keeping your vehicle road-ready, our team is here to
              help every step of the way.
            </p>
            <p>
              Come visit us at {site.address}, or give us a call at {site.phone}. We look forward to helping you find
              your next vehicle.
            </p>
          </div>
        </div>

        <ContactSidebar />
      </div>
    </div>
  );
}
