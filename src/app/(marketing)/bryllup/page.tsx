import type { Metadata } from "next";
import Image from "next/image";
import { MENUS, kr } from "@/lib/priser";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

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

/** Snarveiene videre. Kompakt liste på telefon, fire kort side om side på PC. */
const PATHS = [
  {
    title: "Utevielse",
    text: "Seremonien i paviljongen ved dammen, der over halvparten av parene våre vier seg.",
    href: "/utevielse",
    image: "/images/landing/paviljong-hage.jpg",
    alt: "Paviljongen ved dammen, sett fra plenen under trærne",
  },
  {
    title: "Lokaler",
    text: "Lune Gildehallen eller lyse Låvetoppen, hver med sin egen hage.",
    href: "/lokaler",
    image: "/images/landing/gildehallen-dekket.jpg",
    alt: "Gildehallen dekket til bryllup, med lysslynger i taket og steinsøyler",
  },
  {
    title: "Mat og drikke",
    text: "Meny etter deres ønsker, med full servering og skjenkebevilling.",
    href: "/bryllup/pris#meny",
    image: "/images/landing/mat-buffet.jpg",
    alt: "Buffet med oster, jordbær, salat og paier",
  },
  {
    title: "Hva koster det?",
    text: "Alle prisene, med lokalet inkludert, og et regneeksempel.",
    href: "/bryllup/pris",
    image: "/images/landing/gildehallen-gjester.jpg",
    alt: "Smilende gjester ved bordene i Gildehallen under lysslyngene",
  },
];

/** Helg og barn nederst på siden. Gjestene på bildene har sagt ja til publisering. */
const EXTRAS = [
  {
    title: "Gjør det til en helg",
    text: "Pizza fra steinovnen kvelden før, og hotell for gjestene på Home Hotel Park, fem minutter unna. Vi hjelper med booking og transport begge veier.",
    image: "/images/landing/hestesko-plen.jpg",
    alt: "Gjest kaster hestesko på plenen i kveldssola",
  },
  {
    title: "Ta med barna",
    text: "Trygt tun å løpe på, god plass til barnevogn og egen barnemeny med den samme gode maten som de voksne får.",
    image: "/images/landing/langbord-gjester.jpg",
    alt: "Glade gjester rundt et langbord ute på tunet",
  },
];

/** Laveste kuvertpris, hentet fra prislisten. */
const FROM_PRICE = Math.min(...MENUS.map((m) => m.price));

/** De tre spørsmålene parene stiller først: plass, vielse og pris. */
const FACTS = [
  { value: "150", label: "gjester til middag" },
  { value: "200", label: "gjester ved dammen" },
  { value: kr(FROM_PRICE).replace(" kr", ""), label: "kr per person, fra" },
];

/** Det som er med i kuvertprisen. Sjekk mot prislisten når prisene endres. */
const PACKAGE = [
  // Rekkefølgen er valgt med vilje. Spør før den endres.
  "Tre retters middag",
  "Hovmester og servitører",
  "Egen digital kjøreplan",
  "Tilgang til lokalet dagen før, til pynting",
  "Bryllupsplanlegging, opptil 5 timer med vår bryllupskoordinator",
  "Oppdekking av runde eller avlange bord, med hvite tøyservietter, stivede hvite linduker og servise",
  "Eget privat, møblert hageområde",
  "Dansegulv etter middagen",
  "Hageleker og utstyr til utlån",
  "Høyttaler, mikrofon og myggmikrofon",
  "Bemannet bar",
  "Rydding og vask dagen etter",
  "Gratis parkering",
  "Vår liste over anbefalte og eksklusive leverandører",
  "Mulighet for prøvesmaking",
  "Mulighet for opplegg over flere dager",
]

/** Tillegg som kan bestilles i tillegg til pakken. Vises i en nedtrekksliste under pakken. */
const ADDONS = [
  { title: "Utevielse ved dammen", href: "/utevielse" },
  { title: "Prøvesmaking", href: null },
  { title: "Opplegg og fest dagen før", href: null },
  { title: "Overnatting", href: null },
]

export default function BryllupPage() {
  return (
    <main>
      {/* Toppen: samme stil som forsiden og /selskap, med tre fakta under */}
      <section className="relative flex min-h-[64svh] items-end overflow-hidden text-cream lg:min-h-[72svh]">
        <Image
          src="/images/landing/brudepar-kyss-hage.jpg"
          alt="Brudgommen kysser bruden i pannen under trærne i hagen, hun holder buketten"
          fill
          priority
          className="object-cover object-[50%_45%]"
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
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-[hsl(38_55%_74%)]">Deres bryllup</p>
          <h1 className="mt-2.5 max-w-3xl font-serif text-[clamp(1.9rem,1.2rem+3vw,4rem)] leading-[1.12] font-normal">
            Bryllup omgitt av natur, historie og tidløs eleganse
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pt-6 pb-14 lg:pt-10">
      <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground lg:text-[1.05rem]">
        Vielse, middag og fest på samme gård, rett over én time fra Oslo. Fra{" "}
        <Link href="/bryllup/intimt" className="text-primary hover:underline">
          de mest intime samlingene
        </Link>{" "}
        til fester med 150 gjester.
      </p>
      <dl className="mt-6 grid max-w-3xl grid-cols-3 border-y">
        {FACTS.map((f, i) => (
          <div key={f.label} className={`flex flex-col-reverse px-1 py-4 text-center lg:py-6 ${i > 0 ? "border-l" : ""}`}>
            <dt className="mt-1.5 text-[0.58rem] leading-snug tracking-[0.12em] uppercase text-muted-foreground lg:text-[0.68rem]">
              {f.label}
            </dt>
            <dd className="font-serif text-[clamp(1.5rem,1.2rem+1.6vw,2.6rem)] leading-none text-primary">{f.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 border-b md:grid md:grid-cols-4 md:gap-6 md:border-b-0">
        {PATHS.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group grid grid-cols-[88px_1fr_auto] items-center gap-3.5 border-t py-3.5 md:block md:border-t-0 md:py-0"
          >
            <div className="relative aspect-square overflow-hidden md:aspect-[4/3]">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 25vw, 88px"
              />
            </div>
            <div>
              <h2 className="font-serif text-[1.22rem] font-normal md:mt-3.5">{p.title}</h2>
              <p className="mt-0.5 text-[0.85rem] leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
            <ArrowRight aria-hidden className="size-4 text-primary md:hidden" />
          </Link>
        ))}
      </div>

      {/* Pakken: prisen og det som er med, samlet i én ramme */}
      <section className="mt-14 border-t pt-12">
        <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary">Bryllupspakken</p>
        <h2 className="mt-2.5 font-serif text-[clamp(1.55rem,1.1rem+2.2vw,3.1rem)] leading-[1.14] font-normal">
          Dette er med i kuvertprisen
        </h2>
        <div className="mt-6 max-w-3xl border border-primary/45 bg-secondary px-5 py-6 lg:px-8 lg:py-8">
          <p className="font-serif text-[clamp(2.2rem,1.8rem+2vw,3.4rem)] leading-none text-primary">
            <span className="mr-2 align-middle font-sans text-[0.62rem] tracking-[0.2em] uppercase text-muted-foreground">
              Fra
            </span>
            {kr(FROM_PRICE)}
          </p>
          <p className="mt-2 text-[0.62rem] tracking-[0.2em] uppercase text-muted-foreground">
            per person, med lokalet inkludert
          </p>
          <ul className="mt-5 border-b md:grid md:grid-cols-2 md:gap-x-8 md:border-b-0">
            {PACKAGE.map((item) => (
              <li key={item} className="flex items-center gap-3 border-t py-3 text-[0.92rem] md:border-b md:border-t-0">
                <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.85rem] leading-relaxed text-muted-foreground">
            Vil dere ha mer? Dere kan legge til flere timer planlegging, flere
            retter og en egen barmeny.
          </p>
          <details className="group mt-5 border-t pt-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-serif text-[1.2rem] [&::-webkit-details-marker]:hidden">
              Tilleggstjenester
              <ChevronDown aria-hidden className="size-5 text-primary transition-transform group-open:rotate-180" />
            </summary>
            <ul className="pb-2">
              {ADDONS.map((a) => (
                <li key={a.title} className="border-t py-3 text-[0.92rem]">
                  {a.href ? (
                    <Link href={a.href} className="flex items-center justify-between gap-3 hover:text-primary">
                      {a.title} <ArrowRight aria-hidden className="size-4 text-primary" />
                    </Link>
                  ) : (
                    a.title
                  )}
                </li>
              ))}
            </ul>
          </details>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/visning"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 border border-primary bg-primary px-[22px] text-[0.66rem] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-primary/85"
            data-cta="Bryllup: book visning fra pakken"
          >
            Book gratis visning
          </a>
          <Link
            href="/bryllup/pris"
            className="inline-flex min-h-[46px] items-center justify-center border border-foreground/45 px-[22px] text-[0.66rem] tracking-[0.22em] uppercase text-foreground transition-colors hover:bg-foreground/10"
          >
            Hva koster det?
          </Link>
        </div>
      </section>

      {/* Helgeformatet og barna. De fleste brudepar er midt i 30-årene, og
          mange har egne barn i følget. Bilde og tekst i sikksakk. */}
      <section className="mt-14 border-t pt-12">
        <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary">Mer enn én dag</p>
        <h2 className="mt-2.5 font-serif text-[clamp(1.55rem,1.1rem+2.2vw,3.1rem)] leading-[1.14] font-normal">
          For hele følget
        </h2>
        <div className="mt-7 grid gap-6 lg:gap-10">
          {EXTRAS.map((x, i) => (
            <div key={x.title} className="grid grid-cols-2 items-center gap-4 lg:gap-12">
              <div className={`relative aspect-[4/5] overflow-hidden lg:aspect-[3/2] ${i % 2 ? "order-2" : ""}`}>
                <Image src={x.image} alt={x.alt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 50vw" />
              </div>
              <div>
                <h3 className="font-serif text-[1.3rem] leading-tight font-normal lg:text-[1.8rem]">{x.title}</h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-muted-foreground lg:text-[0.95rem]">{x.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>

      <p className="mx-auto max-w-6xl px-5 pb-6 text-xs text-muted-foreground">Foto: Birthe Havnes og Sara Kiserud</p>
    </main>
  );
}
