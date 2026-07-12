import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { heroSlides } from "@/data/site";
import { cn } from "@/lib/utils";

const DELAY = 5000;

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: DELAY, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* progress bar (restarts each slide) */}
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-white/10">
        <div
          key={selected}
          className="h-full bg-brand-red"
          style={{ animation: `hero-progress ${DELAY}ms linear` }}
        />
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((s) => (
            <div className="min-w-0 flex-[0_0_100%]" key={s.src}>
              <div className="relative h-[46vh] min-h-[320px] w-full lg:h-[78vh]">
                <img src={s.src} alt={s.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/75" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Welcome overlay — desktop only (mobile hero is image-only). */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center lg:flex">
        <div className="text-center">
          <p className="font-display text-3xl text-white">Welcome To</p>
          <h1 className="mt-3 font-display text-6xl font-bold uppercase tracking-[0.15em] text-white">
            Spin Auto Ltd.
          </h1>
        </div>
      </div>

      {/* dots */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all",
              i === selected ? "w-6 bg-brand-red" : "w-2 bg-white/50 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
