import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Intimbryllup — raskest voksende segment (rapporten «Bryllupsmarkedet i
 * tall», aug 2026): 20–40 gjester som prioriterer mat og detaljer over volum.
 * Egen side fordi nesten ingen konkurrenter har et tilbud hit.
 * NB: offentlige priser er fjernet før lansering (Vemund, aug 2026) — kan
 * gjeninnføres fra git-historikken hvis prisåpenhet vedtas senere.
 */

export const metadata: Metadata = {
  title: "Intimt bryllup på Østgaard | 20–45 gjester i historiske omgivelser",
  description:
    "Lite bryllup med stor ramme: vielse ved dammen og middag i historiske lokaler for 20–45 gjester, med samme kjøkken og vertskap som på de store bryllupene.",
};


const REASONS = [
  {
    title: "Hele stedet føles som deres",
    text: "Med de nærmeste rundt ett langbord i Gildehallen, eller i intime Herredstyresalen, blir kvelden nær på en måte store fester ikke kan bli.",
  },
  {
    title: "Pengene går til opplevelsen",
    text: "Mindre gjesteliste betyr rom for flere retter, bedre drikke og detaljene som betyr noe. Kjøkkenet og vertskapet er det samme som på de store bryllupene.",
  },
  {
    title: "Lettere å finne dato",
    text: "Små selskap er enklere å plassere i kalenderen, også med kortere horisont enn de 12–18 månedene store sommerbryllup gjerne krever.",
  },
];

/** Det som alltid er med — også for de små selskapene. */
const EXAMPLE = [
  { label: "Middag fra eget kjøkken", value: "Meny etter ønske" },
  { label: "Servering, oppdekking og kjøreplan", value: "Inkludert" },
  { label: "Vielse ved dammen og overnatting", value: "Kan legges til" },
];

export default function IntimtPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">
        Intime bryllup
      </p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-medium sm:text-5xl">
        Lite bryllup. Stor dag.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Stadig flere par velger å feire med de 20–45 som betyr mest, og
        bruker heller pengene på maten, drikken og detaljene. På Østgaard får
        det lille bryllupet samme ramme som de store: vielse ved dammen,
        historiske lokaler og et vertskap som styrer dagen.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden border">
          <Image
            src="/images/landing/gildehallen.jpg"
            alt="Gildehallen dekket til middag med lysslynger i taket"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
        <div className="space-y-7">
          {REASONS.map((r) => (
            <div key={r.title} className="border-t pt-4 first:border-t-0 first:pt-0">
              <h2 className="font-serif text-xl">{r.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-14 grid gap-10 border-t pt-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">Enkelt og uten overraskelser</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Små selskap settes opp like ryddig som de store: dere velger meny
            og lokale, vi setter opp et uforpliktende forslag på visningen,
            skreddersydd for antallet deres og uten skjulte tillegg.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Vil dere gjøre helgen større, kan de nærmeste bo i
            Herregårdsleiligheten og samles til pizzakveld på gården dagen før.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/visning"
              className="inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book gratis visning <ArrowRight className="size-3.5" />
            </a>
            <Link
              href="/bryllup/pris"
              className="inline-flex items-center border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Hva koster det?
            </Link>
          </div>
        </div>
        <aside className="h-fit border bg-secondary/40 p-7">
          <p className="font-serif text-xs tracking-[0.25em] uppercase text-primary">
            Alltid med
          </p>
          <h3 className="mt-2 font-serif text-2xl">Like gjennomført i lite format</h3>
          <dl className="mt-5 space-y-3">
            {EXAMPLE.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b pb-3"
              >
                <dt className="text-sm text-muted-foreground">{row.label}</dt>
                <dd className="text-sm font-medium whitespace-nowrap tabular-nums">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            På visningen setter vi opp et konkret, uforpliktende forslag for
            akkurat deres selskap.
          </p>
        </aside>
      </section>
    </main>
  );
}
