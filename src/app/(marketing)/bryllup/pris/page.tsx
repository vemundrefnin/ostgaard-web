import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PACKAGE } from "@/lib/bryllupspakke";
import { MENUS, PRICE_YEAR, kr } from "@/lib/priser";

/**
 * Prisene på bryllup, åpent og uten at noen må ta kontakt først.
 *
 * Bare laveste kuvertpris vises. Prisene på de andre menyene, drikke og
 * tillegg gis på visningen. Menyprisene og året står i src/lib/priser.ts, og
 * det som er med i kuvertprisen står i src/lib/bryllupspakke.ts.
 */

export const metadata: Metadata = {
  title: `Hva koster et bryllup på Østgaard? | Priser ${PRICE_YEAR}`,
  description: `Bryllup på Østgaard fra ${kr(Math.min(...MENUS.map((m) => m.price)))} per person, med lokalet inkludert. Se hva som ligger i kuvertprisen, og hvilke tillegg dere kan velge.`,
};

/** Tillegg som kan bestilles. Prisene gis på visningen, ikke her. */
const EXTRAS = [
  "Utevielse i paviljongen",
  "Minglemat",
  "Kaffe og te med påfyll",
  "Servering av medbrakt kake etter middagen",
  "Nattmat",
  "Allergitilpasning",
  "Måltid til fotograf og andre leverandører",
  "Pizzakveld på gården dagen før",
];

/** Laveste kuvertpris. Oppgraderingene (4, 5, 6 retter, grill) står i teksten under prisen. */
const FROM_PRICE = Math.min(...MENUS.map((m) => m.price));

const EXAMPLE_GUESTS = 80;

/**
 * Ca.-pris per person for fire glass av husets vin under middagen.
 * MÅ FYLLES UT før siden går live på garder-ostgaard.no. Så lenge den er
 * null, vises ikke vinlinjen i regneeksempelet.
 */
const WINE_PER_PERSON: number | null = null;

/** Snarveiene nederst på siden. */
const MORE = [
  { title: "Lokalene", text: "Gildehallen og Låvetoppen", href: "/lokaler", image: "/images/landing/gildehallen-dekket.jpg", alt: "Gildehallen dekket til bryllupsmiddag med lysslynger i taket" },
  { title: "Utevielse", text: "Paviljongen ved dammen", href: "/utevielse", image: "/images/landing/paviljong-hage.jpg", alt: "Paviljongen ved dammen, sett fra plenen under trærne" },
  { title: "Intimt bryllup", text: "For de nærmeste, 20 til 45 gjester", href: "/bryllup/intimt", image: "/images/landing/brud-bukett.jpg", alt: "Brud med bukett i hagen på Østgaard" },
];

const CHEVRON = "size-5 text-primary transition-transform group-open:rotate-180";

const SUMMARY =
  "flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-[1.35rem] [&::-webkit-details-marker]:hidden";

export default function PrisPage() {
  return (
    <main>
      {/* Toppen: samme stil som forsiden, /bryllup og /selskap */}
      <section className="relative flex min-h-[56svh] items-end overflow-hidden text-cream lg:min-h-[64svh]">
        <Image
          src="/images/landing/servitor-alleen.jpg"
          alt="Servitør fra Østgaard i alleen opp mot gården"
          fill
          priority
          className="object-cover object-[50%_35%]"
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
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-[hsl(38_55%_74%)]">Priser {PRICE_YEAR}</p>
          <h1 className="mt-2.5 max-w-3xl font-serif text-[clamp(1.9rem,1.2rem+3vw,4rem)] leading-[1.12] font-normal">
            Hva koster et bryllup på Østgaard?
          </h1>
          <p className="mt-3 max-w-xl text-[0.85rem] leading-relaxed text-cream/85 lg:text-[0.95rem]">
            Hos oss kan bryllupet vare så lenge dere vil, fra én dag til en hel helg.
            Meny, vin og detaljer finner dere ut av sammen med bryllupskoordinatoren vår.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 pt-6 pb-14 lg:pt-10">
        {/* Prisen. Ankeret #meny brukes av «Mat og drikke» på /bryllup. */}
        <section id="meny" className="scroll-mt-20 border border-primary/45 bg-secondary px-5 py-6 lg:px-8 lg:py-8">
          <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">Kuvertpris {PRICE_YEAR}</p>
          <p className="mt-3 font-serif text-[clamp(2.6rem,2rem+3vw,4rem)] leading-none text-primary">
            <span className="mr-2 align-middle font-sans text-[0.7rem] tracking-[0.2em] uppercase text-muted-foreground">
              Fra
            </span>
            {kr(FROM_PRICE)}
          </p>
          <ul className="mt-5 space-y-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">
            <li>Gjelder tre retters middag, og kan oppgraderes til 4, 5 eller 6 retter eller grillmeny.</li>
            <li>Barn til og med 10 år betaler halv pris.</li>
            <li>
              Mindre bryllup? Se{" "}
              <Link href="/bryllup/intimt" className="text-primary hover:underline">
                intimt bryllup
              </Link>
              .
            </li>
          </ul>
        </section>

        {/* Det som er med, regneeksempel og tillegg, lukket til man trykker */}
        <section className="mt-8 border-t">
          <details className="group border-b">
            <summary className={SUMMARY}>
              Dette ligger i kuvertprisen
              <ChevronDown aria-hidden className={CHEVRON} />
            </summary>
            <ul className="mb-6">
              {PACKAGE.map((item) => (
                <li key={item} className="flex items-center gap-3 border-t py-2.5 text-[0.9rem]">
                  <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </details>
          <details className="group border-b">
            <summary className={SUMMARY}>
              Et regneeksempel
              <ChevronDown aria-hidden className={CHEVRON} />
            </summary>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {EXAMPLE_GUESTS} voksne gjester med tre retters middag
              {WINE_PER_PERSON ? " og fire glass av husets vin under middagen" : ", før drikke og tillegg"}.
            </p>
            <dl className="mt-4 mb-4 divide-y border-y text-sm">
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-muted-foreground">
                  {EXAMPLE_GUESTS} gjester à {kr(FROM_PRICE)}
                </dt>
                <dd>{kr(EXAMPLE_GUESTS * FROM_PRICE)}</dd>
              </div>
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-muted-foreground">Lokalet</dt>
                <dd>Inkludert</dd>
              </div>
              {WINE_PER_PERSON ? (
                <div className="flex justify-between gap-6 py-3">
                  <dt className="text-muted-foreground">
                    Vin til middagen, ca. {kr(WINE_PER_PERSON)} per person
                  </dt>
                  <dd>ca. {kr(EXAMPLE_GUESTS * WINE_PER_PERSON)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-6 py-3 font-serif text-lg">
                <dt>{WINE_PER_PERSON ? "Sum med vin til middagen" : "Sum før drikke"}</dt>
                <dd>
                  {WINE_PER_PERSON ? "ca. " : ""}
                  {kr(EXAMPLE_GUESTS * (FROM_PRICE + (WINE_PER_PERSON ?? 0)))}
                </dd>
              </div>
            </dl>
            {WINE_PER_PERSON ? (
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Drikke kan tilpasses, også alkoholfritt, egen barmeny eller etter forbruk.
              </p>
            ) : null}
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Vi hjelper dere gjerne med å sette opp et mer konkret regneeksempel med
              deres ønsker.{" "}
              <a href="/visning" className="text-primary hover:underline" data-cta="Pris: be om regneeksempel">
                Bare si ifra
              </a>
              .
            </p>
          </details>
          <details className="group border-b">
            <summary className={SUMMARY}>
              Tillegg dere kan velge
              <ChevronDown aria-hidden className={CHEVRON} />
            </summary>
            <ul className="mb-6 divide-y border-y text-sm">
              {EXTRAS.map((e) => (
                <li key={e} className="py-3">
                  {e}
                </li>
              ))}
            </ul>
          </details>
        </section>

      </div>

      {/* Neste steg, oppå et bilde av Gildehallen */}
      <section className="relative overflow-hidden text-center text-cream">
        <Image
          src="/images/landing/gildehallen-dekket.jpg"
          alt="Gildehallen dekket til bryllupsmiddag med lysslynger i taket"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, hsl(80 14% 9% / .6), hsl(80 14% 9% / .88))" }}
        />
        <div className="relative mx-auto max-w-2xl px-5 py-16 lg:py-24">
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-[hsl(38_55%_74%)]">Neste steg</p>
          <h2 className="mt-2.5 font-serif text-[clamp(1.55rem,1.1rem+2.2vw,3.1rem)] leading-[1.14] font-normal">
            Kom og se gården
          </h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/85">
            Vi går rundt sammen, og regner på akkurat deres bryllup mens vi snakker.
            Kostnadsfritt og uforpliktende.
          </p>
          <a
            href="/visning"
            data-cta="Book visning (pris)"
            className="mt-6 inline-flex min-h-[46px] items-center justify-center gap-2 border border-primary bg-primary px-[22px] text-[0.66rem] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Book gratis visning
          </a>
          <div>
            <a
              href="/visning"
              data-cta="Be om digital visning (pris)"
              className="mt-4 inline-flex items-center gap-1.5 text-[0.66rem] tracking-[0.2em] uppercase text-[hsl(38_55%_74%)] hover:underline"
            >
              Bor dere langt unna? Be om digital visning <ArrowRight className="size-3" />
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 pb-14">
        {/* Mens dere tenker */}
        <section className="pt-12">
          <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">Mens dere tenker</p>
          <div className="mt-5 border-b">
            {MORE.map((m) => (
              <Link
                key={m.title}
                href={m.href}
                className="group grid grid-cols-[72px_1fr_auto] items-center gap-3.5 border-t py-3"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image src={m.image} alt={m.alt} fill className="object-cover" sizes="72px" />
                </div>
                <div>
                  <h3 className="font-serif text-[1.2rem] font-normal">{m.title}</h3>
                  <p className="text-[0.84rem] text-muted-foreground">{m.text}</p>
                </div>
                <ArrowRight aria-hidden className="size-4 text-primary" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <p className="mx-auto max-w-3xl px-5 pb-6 text-xs text-muted-foreground">Foto: Birthe Havnes og Sara Kiserud</p>
    </main>
  );
}
