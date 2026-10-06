import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * /bryllup var tredje mest besøkte side (661 økter/mnd, +50 %) og
 * «Bryllupspakker» det mest klikkede elementet på gamle nettstedet —
 * derfor egen underside med pakkeinnholdet lett synlig.
 */

export const metadata: Metadata = {
  title: "Bryllup på Østgaard | Herregårdsbryllup i Halden, rett over én time fra Oslo",
  description:
    "Bryllup omgitt av natur, historie og tidløs eleganse på Østgaard i Halden. Utevielse ved dammen, historiske lokaler og bryllupspakker med alt inkludert.",
};

const WIX = "https://www.garder-ostgaard.no";

const PATHS = [
  {
    title: "Utevielse",
    text: "Seremonien i paviljongen ved dammen. Over halvparten av parene våre vier seg her.",
    href: "/utevielse",
    external: false,
    image: "/images/landing/utevielse.jpg",
    alt: "Utevielse i paviljongen ved dammen",
  },
  {
    title: "Lokaler",
    text: "Gildehallen, Låvetoppen og Herredstyresalen. Velg ett, eller kombiner flere gjennom kvelden.",
    href: "/lokaler",
    external: false,
    image: "/images/landing/gildehallen.jpg",
    alt: "Gildehallen dekket til bryllupsmiddag",
  },
  {
    title: "Hva koster det?",
    text: "Prisen avhenger av gjester, meny, drikke og bar. Se hva som avgjør, og hvordan dere får et konkret tall.",
    href: "/bryllup/pris",
    external: false,
    image: "/images/landing/gildehallen-2.jpg",
    alt: "Gildehallen klar til fest",
  },
  {
    title: "Mat og drikke",
    text: "Meny satt opp etter deres ønsker, med full servering og skjenkebevilling.",
    href: `${WIX}/food-and-drinks`,
    external: true,
    image: "/images/landing/brudepar.jpg",
    alt: "Brudepar på Østgaard",
  },
];

const PACKAGE = [
  "Tre retters middag",
  "Hovmester og servitører",
  "Dekkede bord med damaskduker, lin-servietter og stoltrekk",
  "Bryllupsplanlegging med egen digital kjøreplan",
  "Uteområde med møbler",
  "Lydanlegg og leie av kandelabre og vaser",
];

export default function BryllupPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">
        Deres bryllup
      </p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-medium sm:text-5xl">
        Bryllup omgitt av natur, historie og tidløs eleganse
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        På Østgaard i Halden, rett over én time fra Oslo, arrangerer vi akkurat
        det bryllupet dere ønsker, fra{" "}
        <Link href="/bryllup/intimt" className="text-primary hover:underline">
          de mest intime samlingene
        </Link>{" "}
        til fester med 150 gjester. Dere velger rammene; vertskapet tar seg av
        resten.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PATHS.map((p) => {
          const Card = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="p-5">
                <h2 className="font-serif text-lg tracking-[0.15em] uppercase">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary">
                  Les mer <ArrowRight className="size-3" />
                </span>
              </div>
            </>
          );
          return p.external ? (
            <a key={p.title} href={p.href} className="group block border bg-card transition-shadow hover:shadow-md">
              {Card}
            </a>
          ) : (
            <Link key={p.title} href={p.href} className="group block border bg-card transition-shadow hover:shadow-md">
              {Card}
            </Link>
          );
        })}
      </div>

      <section className="mt-14 grid gap-10 border-t pt-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">Bryllupspakkene inkluderer</h2>
          <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            {PACKAGE.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-primary">
                  –
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Prisen settes av menyvalg og antall gjester, og i motsetning til
            de fleste lokaler viser vi tallene før dere tar kontakt. På
            visningen setter vi opp et uforpliktende forslag for akkurat
            deres dag.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`${WIX}/contact-10`}
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
        <figure className="border bg-secondary/40 p-6">
          <blockquote className="text-sm leading-relaxed text-muted-foreground">
            «Vi feiret bryllupet vårt på Østgaard sommeren 2024, og det var en
            drøm! Vertskapet sørget for at alt var perfekt planlagt, lokalene
            var nydelig pyntet, maten fantastisk, og atmosfæren magisk.»
          </blockquote>
          <figcaption className="mt-3 font-serif text-sm tracking-[0.15em] uppercase">
            Sandra og Kasper
          </figcaption>
        </figure>
      </section>

      {/* Helgeformatet + barna — de fleste brudepar er midt i 30-årene og
          mange har egne barn i følget; nesten ingen konkurrenter adresserer
          det (konkurrentanalyse aug 2026). */}
      <section className="mt-14 grid gap-x-10 gap-y-8 border-t pt-12 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">Gjør det til en helg</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Samle de nærmeste til steinovnsbakt pizza på gården kvelden før,
            sov i Herregårdsleiligheten med plass til 12–15 av dem dere er
            aller mest glad i, og bruk søndagen på en rolig avreise. Utsjekk
            er ikke før klokken 16. For større følger har vi avtaler med
            hoteller i Halden, og med taxi og buss.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-2xl">Ta med barna</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Mange av parene våre har egne barn i følget, og gården er laget
            for det: trygt tun å løpe på, god plass til barnevogn, og
            egen barnemeny. Barna spiser den
            samme gode maten som de voksne, tilpasset dem.
          </p>
        </div>
      </section>
    </main>
  );
}
