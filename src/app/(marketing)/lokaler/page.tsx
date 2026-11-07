import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * /lokaler var nest mest besøkte side på gamle nettstedet (822 økter/mnd,
 * +49 %) — derfor egen underside fremfor anker. Innhold fra dagens side.
 */

export const metadata: Metadata = {
  title: "Lokaler på Østgaard | Gildehallen, Låvetoppen og Kurommet",
  description:
    "Velg lokalet som passer dagen deres på Østgaard: historiske Gildehallen (130 gjester), lyse Låvetoppen (150 gjester), Kurommet (80 gjester) og Fru Østgaard. Book en kostnadsfri visning.",
};

/** Festlokalene holder åpent til 02:00. */
const VENUES: {
  name: string;
  capacity: string;
  text: string;
  outdoor: string | null;
  closes: string | null;
  image: string | null;
  alt: string;
}[] = [
  {
    name: "Gildehallen",
    capacity: "Opptil 130 gjester",
    text: "Lun og historisk sal fra 1600-tallet med røffe steinvegger og stemningsfull borddekking. Her holder de fleste av parene våre bryllupet sitt. Gårdshagen hører til.",
    outdoor: "Gårdshagen",
    closes: "02:00",
    image: "/images/landing/gildehallen.jpg",
    alt: "Gildehallen dekket til bryllupsmiddag med lysslynger i taket",
  },
  {
    name: "Låvetoppen",
    capacity: "Opptil 150 gjester",
    text: "Gårdens største og lyseste sal, laget for store fester, dans og lange sommerkvelder. Fast prosjektor og lerret er på plass. Solvesthagen hører til.",
    outdoor: "Solvesthagen",
    closes: "02:00",
    image: "/images/landing/lavetoppen.jpg",
    alt: "Låvetoppen dekket til fest med lysekroner og hvite stoffer under takbjelkene",
  },
  {
    name: "Kurommet",
    capacity: "Opptil 80 gjester",
    text: "Mellomstort lokale for konfirmasjon, jubileum, minnestund og kurs.",
    outdoor: null,
    closes: null,
    image: "/images/landing/kurommet.jpg",
    alt: "Kurommet satt opp til kurs med langbord og hvite steinvegger",
  },
  {
    name: "Fru Østgaard",
    capacity: "40 til 60 gjester",
    text: "Vårt lille spiskammer, for afternoon tea, minnestund og mindre selskaper.",
    outdoor: null,
    closes: null,
    image: "/images/landing/fru-ostgaard.jpg",
    alt: "Egenproduserte varer i butikken hos Fru Østgaard",
  },
  {
    name: "Paviljongen",
    capacity: "Plass til rundt 200 gjester",
    text: "Utevielse ved dammen. Vi setter ut stoler etter hvor mange dere blir.",
    outdoor: "Ved dammen",
    closes: null,
    image: "/images/landing/utevielse.jpg",
    alt: "Utevielse ved dammen med paviljong og gjester",
  },
];

const INCLUDED = [
  "Tre retters middag",
  "Hovmester og servitører",
  "Dekkede bord med damaskduker, lin-servietter og stoltrekk",
  "Bryllupsplanlegging med egen digital kjøreplan",
  "Uteområde med møbler",
  "Lydanlegg",
  "Leie av kandelabre og vaser",
];

export default function LokalerPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">
        Lokaler
      </p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-medium sm:text-5xl">
        Finn lokalet som passer deres helt unike dag
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Hvert lokale har sin egen karakter, og meny settes opp etter ønske. Dere
        har lokalet og hagen helt for dere selv, også når gården har flere
        arrangementer samme dag. For en ekstra spesiell fotostund kan
        Herredstyresalen legges til.
      </p>

      <div className="mt-12 space-y-10">
        {VENUES.map((v) => (
          <section
            key={v.name}
            className="grid gap-8 border-t pt-10 lg:grid-cols-2"
          >
            {v.image ? (
              <div className="relative aspect-[16/10] overflow-hidden border">
                <Image
                  src={v.image}
                  alt={v.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            ) : (
              <div className="hidden lg:block" />
            )}
            <div>
              <h2 className="font-serif text-2xl tracking-[0.12em] uppercase">
                {v.name}
              </h2>
              <p className="mt-1 font-serif text-lg text-primary">{v.capacity}</p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {v.text}
              </p>
              {v.outdoor || v.closes ? (
                <dl className="mt-4 space-y-1 text-sm">
                  {v.outdoor ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Uteområde:</dt>
                      <dd>{v.outdoor}</dd>
                    </div>
                  ) : null}
                  {v.closes ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Åpent til:</dt>
                      <dd>{v.closes}</dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
              <a
                href="/visning"
                className="mt-6 inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book en visning <ArrowRight className="size-3.5" />
              </a>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 border bg-secondary/40 p-8">
        <h2 className="font-serif text-2xl">Dette følger med i bryllupspakkene</h2>
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-primary">
                –
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Full servering av mat og drikke med skjenkebevilling. Se også{" "}
          <Link href="/utevielse" className="underline hover:text-foreground">
            utevielse ved dammen
          </Link>{" "}
          og{" "}
          <Link href="/bryllup" className="underline hover:text-foreground">
            bryllup på Østgaard
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
