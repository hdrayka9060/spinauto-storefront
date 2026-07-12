import { site } from "@/data/site";

export default function LocationBand() {
  return (
    <section>
      <div className="bg-[#eeeeee] py-5">
        <p className="container-site text-center text-base text-ink sm:text-lg">
          We are located at {site.address}
        </p>
      </div>
      <div className="h-[420px] w-full">
        <iframe
          title="Spin Auto Ltd location"
          src={site.mapEmbed}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
