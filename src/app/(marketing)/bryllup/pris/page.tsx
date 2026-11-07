import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MENUS, PRICE_YEAR, kr } from "@/lib/priser";

/**
 * Prisene på bryllup, åpent og uten at noen må ta kontakt først.
 *
 * Menyprisene og året står i src/lib/priser.ts, fordi forsiden viser dem også.
 * Tilleggene står her. Bytt alt samlet når ny prisliste gjelder, og sjekk mot
 * /admin/pricing i kjøreplan-appen.
 * Drikkepriser vises ikke, de gis på visningen.
 */

export const metadata: Metadata = {
  title: `Hva koster et bryllup på Østgaard? | Priser ${PRICE_YEAR}`,
  description: `Bryllup på Østgaard fra ${kr(2125)} per person. Se priser på meny, vielse og tillegg, og hva som er inkludert i kuvertprisen.`,
};

/** Verdien som ligger i kuvertprisen, svaret på «hva får vi egentlig?». */
const INCLUDED = [
  "Lokalet med uteområde og møbler",
  "Middag fra eget kjøkken",
  "Hovmester og servitører gjennom hele kvelden",
  "Dekkede bord med damaskduker, lin-servietter og stoltrekk",
  "Leie av kandelabre og vaser",
  "Lydanlegg",
  "Egen digital kjøreplan der dere planlegger alt, og vi ser det samme som dere",
];

const EXTRAS = [
  { name: "Utevielse i paviljongen", price: `fra ${kr(5720)}` },
  { name: "Minglemat", price: `fra ${kr(80)} per person` },
  { name: "Kaffe og te med påfyll", price: `${kr(55)} per person` },
  { name: "Servering av medbrakt kake etter middagen", price: `${kr(50)} per person` },
  { name: "Nattmat", price: `fra ${kr(140)} per person` },
  { name: "Allergitilpasning", price: `${kr(80)} per person` },
  { name: "Måltid til fotograf og andre leverandører", price: `75 % av menyprisen, minst ${kr(675)}` },
  { name: "Pizzakveld på gården dagen før", price: `${kr(6760)} pluss ${kr(470)} per person` },
];

const EXAMPLE_GUESTS = 80;
const EXAMPLE_MENU = 2575;
const EXAMPLE_CEREMONY = 5720;

export default function PrisPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">
        Priser {PRICE_YEAR}
      </p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-medium sm:text-5xl">
        Hva koster et bryllup på Østgaard?
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Prisen følger antall gjester og menyen dere velger, og lokalet er med i
        kuvertprisen. Her er tallene for bryllup i {PRICE_YEAR}. På visningen setter
        vi opp et konkret forslag for akkurat deres dag, også med drikke.
      </p>

      {/* Menyene */}
      <section className="mt-14 grid gap-10 border-t pt-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <h2 className="font-serif text-3xl font-medium">Kuvertpris per voksen gjest</h2>
          <ul className="mt-7 divide-y border-y">
            {MENUS.map((m) => (
              <li key={m.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                <div>
                  <p className="font-serif text-xl">
                    {m.name}
                    {m.recommended ? (
                      <span className="ml-3 font-sans text-xs tracking-[0.15em] uppercase text-primary">
                        Anbefalt
                      </span>
                    ) : null}
                  </p>
                  {m.note ? <p className="text-sm text-muted-foreground">{m.note}</p> : null}
                </div>
                <p className="font-serif text-xl">{kr(m.price)}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>Barn til og med 10 år betaler halv pris.</li>
            <li>
              Er dere færre enn 45 betalende gjester, kommer en lokalleie på {kr(26000)} i
              tillegg.
            </li>
            <li>Drikke kommer i tillegg, enten i faste pakker eller etter forbruk.</li>
          </ul>
        </div>
        <aside className="h-fit border bg-secondary/40 p-7">
          <p className="font-serif text-xs tracking-[0.25em] uppercase text-primary">
            Alltid inkludert
          </p>
          <h3 className="mt-2 font-serif text-2xl">Dette ligger i kuvertprisen</h3>
          <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-primary">
                  –
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Regneeksempel */}
      <section className="mt-14 border-t pt-12">
        <h2 className="font-serif text-3xl font-medium">Et regneeksempel</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {EXAMPLE_GUESTS} voksne gjester, 4-retters meny og utevielse i paviljongen, før drikke.
        </p>
        <dl className="mt-7 max-w-xl divide-y border-y text-sm">
          <div className="flex justify-between gap-6 py-3">
            <dt className="text-muted-foreground">
              {EXAMPLE_GUESTS} gjester à {kr(EXAMPLE_MENU)}
            </dt>
            <dd>{kr(EXAMPLE_GUESTS * EXAMPLE_MENU)}</dd>
          </div>
          <div className="flex justify-between gap-6 py-3">
            <dt className="text-muted-foreground">Utevielse</dt>
            <dd>fra {kr(EXAMPLE_CEREMONY)}</dd>
          </div>
          <div className="flex justify-between gap-6 py-3 font-serif text-lg">
            <dt>Sum før drikke</dt>
            <dd>fra {kr(EXAMPLE_GUESTS * EXAMPLE_MENU + EXAMPLE_CEREMONY)}</dd>
          </div>
        </dl>
      </section>

      {/* Tillegg */}
      <section className="mt-14 border-t pt-12">
        <h2 className="font-serif text-3xl font-medium">Tillegg dere kan velge</h2>
        <ul className="mt-7 max-w-3xl divide-y border-y text-sm">
          {EXTRAS.map((e) => (
            <li key={e.name} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3">
              <span>{e.name}</span>
              <span className="text-muted-foreground">{e.price}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground">
          Gjestene kan bo på Home Hotel Park i Halden, fem minutter unna. Vi hjelper med booking
          og transport begge veier.
        </p>
      </section>

      {/* Neste steg */}
      <section className="mt-14 border-t pt-12">
        <h2 className="font-serif text-3xl font-medium">Få et forslag for deres dag</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Begge deler er kostnadsfritt og helt uforpliktende.
        </p>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col border bg-card p-8">
            <p className="font-serif text-xs tracking-[0.25em] uppercase text-primary">Anbefalt</p>
            <h3 className="mt-2 font-serif text-2xl">Visning på gården</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Vi går rundt sammen: lokalene, paviljongen ved dammen og uteområdene. Dere ser hvordan
              dagen kan henge sammen, og vi regner på akkurat deres bryllup mens vi snakker.
            </p>
            <a
              href="/visning"
              data-cta="Book visning (pris)"
              className="mt-6 inline-flex w-fit items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book visning på gården <ArrowRight className="size-3.5" />
            </a>
          </div>
          <div className="flex flex-col border bg-card p-8">
            <p className="font-serif text-xs tracking-[0.25em] uppercase text-muted-foreground">
              Bor dere langt unna?
            </p>
            <h3 className="mt-2 font-serif text-2xl">Digital visning</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Får dere ikke til å komme innom med det første, tar vi den samme gjennomgangen på
              video, så kan dere heller komme på besøk når det passer bedre.
            </p>
            <a
              href="/visning"
              data-cta="Be om digital visning (pris)"
              className="mt-6 inline-flex w-fit items-center gap-2 border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Be om digital visning <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Videre lesning */}
      <section className="mt-14 grid gap-10 border-t pt-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <h2 className="font-serif text-2xl">Mens dere tenker</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            <li>
              <Link href="/lokaler" className="text-primary hover:underline">
                Se lokalene
              </Link>
              : Gildehallen og Låvetoppen, med kapasitet og hva som hører til hvert av dem.
            </li>
            <li>
              <Link href="/utevielse" className="text-primary hover:underline">
                Utevielse ved dammen
              </Link>
              , med en praktisk guide til hvordan man faktisk blir viet utendørs.
            </li>
            <li>
              <Link href="/bryllup/intimt" className="text-primary hover:underline">
                Intimt bryllup
              </Link>{" "}
              for dere som feirer med de nærmeste 20–45.
            </li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border">
          <Image
            src="/images/landing/gildehallen-2.jpg"
            alt="Gildehallen klar til bryllupsfest"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </section>
    </main>
  );
}
