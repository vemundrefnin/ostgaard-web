import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Historien om Østgaard. Forsiden viser bare tre tall (FACTS i forsiden) og
 * lenker hit. Den gamle Wix-adressen /om-oss er den samme, så gamle lenker og
 * Google-treff havner rett her.
 *
 * Merk: 1636 gjelder lokalene. Når gården ble familieeid skal ikke stå her,
 * bruk «7. generasjon».
 */

export const metadata: Metadata = {
  title: "Om oss | Feiring og sammenkomster siden 1636",
  description:
    "Østgaard i Halden har vært stedet for feiring og sammenkomster siden 1636. I dag drives gården av 7. generasjon, Nina og Lars Garder, sammen med sine fire barn.",
};

const H2 = "font-serif text-[clamp(1.45rem,1.1rem+1.8vw,2.4rem)] leading-[1.15] font-normal";
const BTN =
  "inline-flex min-h-[46px] items-center justify-center gap-2 border border-primary bg-primary px-[22px] text-[0.66rem] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-primary/85";
const LINK = "inline-flex items-center gap-1.5 text-[0.66rem] tracking-[0.2em] uppercase text-primary hover:underline";

const HISTORY = [
  { when: "1636", what: "Lokalene bygges, og Østgaard blir stedet for feiring og sammenkomster." },
  { when: "I dag", what: "7. generasjon: Nina og Lars Garder driver gården med sine fire barn." },
  { when: "500+", what: "Minnerike begivenheter: bryllup, jubileer, kurs og konferanser." },
];

export default function OmOssPage() {
  return (
    <main className="text-[15px] leading-[1.62] lg:text-base">
      {/* Toppen */}
      <section className="relative flex min-h-[60svh] items-end overflow-hidden text-cream">
        <Image
          src="/images/landing/hovedhuset-regnbue.jpg"
          alt="Hovedhuset på Østgaard med regnbue over"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(80 14% 9% / .3), hsl(80 14% 9% / .1) 40%, hsl(80 14% 9% / .92))",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-8">
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-[hsl(38_55%_74%)]">Om Østgaard</p>
          <h1 className="mt-2.5 font-serif text-[clamp(1.9rem,1.2rem+3vw,4rem)] leading-[1.12] font-normal">
            Feiring og sammenkomster siden 1636
          </h1>
        </div>
      </section>

      {/* Historien */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:py-20">
        <div>
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary">Drevet av 7. generasjon</p>
          <h2 className={`mt-2.5 ${H2}`}>Et vertskap med lang historie</h2>
          <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground lg:text-[1.05rem]">
            <p>
              Østgaard har siden 1636 vært stedet for feiring og hyggelige
              sammenkomster, en stolt tradisjon vi viderefører med ekte glede. I
              dag drives gården av 7. generasjon, ekteparet Nina og Lars Garder,
              og de har med seg sine fire barn i driften.
            </p>
            <p>
              Vi har vært vertskap for TV-innspillinger som{" "}
              <em>Gift ved første blikk</em> og andre store produksjoner, og vi
              tar gjerne imot små og store feiringer med åpne armer.
            </p>
          </div>
        </div>

        <ol className="grid content-start gap-7 border-l border-primary/45 pl-6">
          {HISTORY.map((h) => (
            <li key={h.when} className="relative">
              <span aria-hidden className="absolute top-[9px] -left-[29px] size-[9px] rounded-full bg-primary" />
              <p className="font-serif text-[1.4rem] leading-tight">{h.when}</p>
              <p className="mt-1 text-[0.88rem] leading-relaxed text-muted-foreground">{h.what}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Avslutning */}
      <section className="border-t bg-secondary">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className={H2}>Kom og se gården</h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            Vi viser dere gjerne rundt i lokalene og uteområdene. Uforpliktende
            og kostnadsfritt.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4">
            <a href="/visning" className={BTN} data-cta="Om oss: book visning">
              Book gratis visning
            </a>
            <Link href="/selskap" className={LINK}>
              Selskap, kurs og fest <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>
      </section>

      <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted-foreground">Foto øverst: Sara Kiserud</p>
    </main>
  );
}
