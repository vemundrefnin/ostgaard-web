"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface Review {
  who: string;
  /** En setning hentet ordrett fra omtalen. */
  quote: string;
  img: string;
  alt: string;
}

/**
 * Omtalene på forsiden: ett kort sitat om gangen oppå et bilde. Pilene (eller
 * sveip på telefon) bytter sitat, og bildet bak byttes med. Alle sitatene
 * ligger i samme rute, så høyden ikke hopper når man bytter.
 */
export function Reviews({ reviews }: { reviews: Review[] }) {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (d: number) => setActive((i) => (i + d + reviews.length) % reviews.length);

  return (
    <section
      aria-roledescription="karusell"
      aria-label="Fra parene våre"
      className="relative flex min-h-[400px] items-center overflow-hidden border-t text-cream lg:min-h-[560px]"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {reviews.map((r, i) => (
        <Image
          key={r.img}
          src={r.img}
          alt={i === active ? r.alt : ""}
          aria-hidden={i !== active}
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, hsl(80 14% 9% / .5), hsl(80 14% 9% / .82))" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 lg:py-24">
        <p className="text-[0.62rem] tracking-[0.3em] uppercase text-[hsl(38_55%_74%)]">Fra parene våre</p>
        <span aria-hidden className="mt-6 block h-7 font-serif text-[4rem] leading-[0.6] text-primary">
          “
        </span>
        <div className="grid max-w-3xl">
          {reviews.map((r, i) => (
            <figure
              key={r.who}
              aria-hidden={i !== active}
              className={`[grid-area:1/1] transition-opacity duration-500 ${i === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <blockquote className="font-serif text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.3] italic">
                «{r.quote}»
              </blockquote>
              <figcaption className="mt-4 text-[0.62rem] tracking-[0.25em] uppercase text-[hsl(38_55%_74%)]">
                {r.who}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Forrige omtale"
            className="grid size-10 place-items-center border border-cream/30 text-primary transition-colors hover:bg-cream/10"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Neste omtale"
            className="grid size-10 place-items-center border border-cream/30 text-primary transition-colors hover:bg-cream/10"
          >
            <ArrowRight className="size-4" />
          </button>
          <span className="ml-3 text-[0.7rem] tracking-[0.2em] text-cream/70" aria-live="polite">
            {active + 1} / {reviews.length}
          </span>
        </div>
      </div>
    </section>
  );
}
