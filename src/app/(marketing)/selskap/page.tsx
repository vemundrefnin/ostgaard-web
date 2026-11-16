import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { EVENTS } from "@/lib/landing/arrangementer";

/**
 * Alt utenom bryllup: kurs, fester, selskap og minnestunder. Båndet under
 * toppbildet på forsiden («Vi arrangerer også») lenker hit, og hvert stikkord
 * der lenker rett til sin seksjon (#kurs, #julebord osv.). Seksjonsnavnene
 * står i src/lib/landing/arrangementer.ts, så båndet og siden alltid henger
 * sammen.
 */

export const metadata: Metadata = {
  title: "Selskap, kurs og fest på Østgaard",
  description:
    "Kurs og konferanse, sommerfest, julebord, jubileum, konfirmasjon og minnestund på Østgaard i Halden. Samme vertskap, lokaler og kjøkken som i bryllupene.",
};

const H2 = "font-serif text-[clamp(1.45rem,1.1rem+1.8vw,2.4rem)] leading-[1.15] font-normal";
const BTN =
  "inline-flex min-h-[46px] items-center justify-center gap-2 border border-primary bg-primary px-[22px] text-[0.66rem] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-primary/85";
const LINK = "inline-flex items-center gap-1.5 text-[0.66rem] tracking-[0.2em] uppercase text-primary hover:underline";

const ROOMS = [
  { name: "Gildehallen", capacity: "opptil 130 gjester" },
  { name: "Låvetoppen", capacity: "opptil 150 gjester" },
  { name: "Kurommet", capacity: "opptil 80 gjester" },
  { name: "Fru Østgaard", capacity: "40 til 60 gjester" },
];

export default function SelskapPage() {
  return (
    <main className="text-[15px] leading-[1.62] lg:text-base">
      {/* Toppen */}
      <section className="relative flex min-h-[52svh] items-end overflow-hidden text-cream">
        <Image
          src="/images/landing/lavetoppen-dekket.jpg"
          alt="Låvetoppen dekket til fest med runde bord, blomster og lysekrone"
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
              "linear-gradient(to bottom, hsl(80 14% 9% / .35), hsl(80 14% 9% / .15) 40%, hsl(80 14% 9% / .92))",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-8">
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-[hsl(38_55%_74%)]">
            Vi arrangerer også
          </p>
          <h1 className="mt-2.5 font-serif text-[clamp(1.9rem,1.2rem+3vw,4rem)] leading-[1.12] font-normal">
            Selskap, kurs og fest på Østgaard
          </h1>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-cream/90">
            Samme vertskap, samme lokaler og samme kjøkken som i bryllupene, hele året.
          </p>
        </div>
      </section>

      {/* Snarveier til hver seksjon */}
      <nav aria-label="Arrangementer" className="border-b bg-secondary">
        <ul className="mx-auto flex max-w-6xl flex-wrap gap-1.5 px-5 py-3.5">
          {EVENTS.map((e) => (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                className="inline-block border px-2.5 py-1 text-[0.7rem] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {e.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Arrangementene */}
      <div className="mx-auto max-w-6xl px-5">
        {EVENTS.map((e, i) => (
          <section
            key={e.id}
            id={e.id}
            className={`scroll-mt-20 py-12 lg:py-16 ${i > 0 ? "border-t" : ""}`}
          >
            <div className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-16">
              <div>
                {e.season && (
                  <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary">{e.season}</p>
                )}
                <h2 className={`mt-2 ${H2}`}>{e.title}</h2>
              </div>
              <div>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{e.text}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={`/visning?type=${e.formType}`}
                    className={BTN}
                    data-cta={`Selskap: forespørsel ${e.label}`}
                  >
                    Send forespørsel
                  </a>
                  {e.id === "kurs" && (
                    <a href={SITE.booking.bedrift} className={LINK}>
                      Se bedriftspakkene <ArrowRight className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Lokalene */}
      <section className="border-t bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary">Lokalene</p>
            <h2 className={`mt-2 ${H2}`}>Plass til opptil 150 gjester</h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
              Vi finner lokalet som passer antallet og anledningen, og setter opp
              bord, meny og program etter ønske.
            </p>
            <Link href="/lokaler" className={`mt-5 ${LINK}`}>
              Se alle lokalene <ArrowRight className="size-3" />
            </Link>
          </div>
          <ul>
            {ROOMS.map((r) => (
              <li
                key={r.name}
                className="flex items-baseline justify-between gap-4 border-b py-3 font-serif text-[1.12rem]"
              >
                <span>{r.name}</span>
                <span className="font-sans text-[0.85rem] text-muted-foreground">{r.capacity}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Avslutning */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h2 className={H2}>Fortell oss hva dere planlegger</h2>
        <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Vi svarer innen én virkedag med forslag til lokale, meny og pris. Dere kan
          også ringe oss på{" "}
          <a href={SITE.phoneHref} className="text-foreground underline">
            {SITE.phone}
          </a>
          .
        </p>
        <a href="/visning?type=ANNET" className={`mt-6 ${BTN}`} data-cta="Selskap: forespørsel nederst">
          Send forespørsel
        </a>
      </section>

      <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted-foreground">Foto øverst: Æva Studio</p>
    </main>
  );
}
