import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Utevielse — utvidet fra ren salgsside til praktisk guide.
 * Begrunnelse (rapporten «Bryllupsmarkedet i tall» + konkurrentanalyse,
 * aug 2026): borgerlig vigsel er nå den vanligste vigselsformen i Norge
 * (~10 000/år), og ingen konkurrent i regionen forklarer *hvordan* man
 * faktisk får til en vielse utenfor kirken — alle skriver bare «vielse hos
 * oss». Guideinnhold ranker i søk der salgssider ikke gjør det.
 */

export const metadata: Metadata = {
  title: "Utevielse ved dammen på Østgaard | Slik blir dere viet utendørs",
  description:
    "Bli viet i paviljongen ved dammen på Østgaard, og få festen samme sted. Praktisk guide til utendørs vielse: prøvingsattest, valg av vigsler og plan B for vær.",
};

const WIX = "https://www.garder-ostgaard.no";

const FACTS = [
  { label: "Sted", value: "Paviljongen i parken, med dammen som bakteppe" },
  { label: "Kapasitet", value: "Opptil 200 gjester" },
  { label: "Vigsler", value: "Dere velger deres egen" },
];

const INCLUDED = [
  "Lydanlegg og mikrofon",
  "Stoloppsett ved paviljongen",
  "Store paraplyer i tilfelle regn",
];

const GUIDE = [
  {
    title: "Ordne prøvingsattest",
    text: "Alle som skal gifte seg søker om prøvingsattest hos Skatteetaten. Det gjøres digitalt og er gratis. Attesten er gyldig i fire måneder, så søk når det nærmer seg, ikke året før.",
  },
  {
    title: "Velg vigsleren deres",
    text: "Ved dammen bestemmer dere selv hvem som vier dere: en humanistisk vigsler fra Human-Etisk Forbund, en prest, eller en annen godkjent vigsler. De kommer til gården, og vi deler gjerne erfaringer med vigslere andre par har brukt.",
  },
  {
    title: "Vi ordner det praktiske",
    text: "Stoler, lydanlegg og mikrofon står klart når dere kommer. Musikk under inngangen? Det spiller vi av. Dere trenger bare å avtale tidspunktet med vigsleren. De fleste legger vielsen tidlig på ettermiddagen.",
  },
  {
    title: "Plan B ligger alltid klar",
    text: "Norsk sommer er norsk sommer. Store paraplyer står klare ved paviljongen, og på visningen legger vi en konkret værplan sammen med dere, slik at en regnbyge aldri blir mer enn en fotogen detalj.",
  },
];

export default function UtevielsePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">
        Utevielse
      </p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-medium sm:text-5xl">
        Vielsen og festen på samme sted
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Utendørs vielse er blitt den vanligste måten å gifte seg på i Norge,
        og over halvparten av brudeparene våre vier seg her på gården, de
        fleste i paviljongen ved dammen. Etterpå går gjestene rett fra
        seremonien til aperitiffen. Ingen kortesje, ingen venting.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden border">
          <Image
            src="/images/landing/utevielse.jpg"
            alt="Utevielse i paviljongen ved dammen på Østgaard"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
        <div>
          <dl className="space-y-3">
            {FACTS.map((f) => (
              <div key={f.label} className="border-b pb-3">
                <dt className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {f.label}
                </dt>
                <dd className="mt-1 text-sm sm:text-base">{f.value}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-6 font-serif text-lg">Inkludert</h2>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-primary">
                  –
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`${WIX}/contact-10`}
              className="inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book en visning <ArrowRight className="size-3.5" />
            </a>
            <Link
              href="/lokaler"
              className="inline-flex items-center border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Se lokalene til festen
            </Link>
          </div>
        </div>
      </div>

      {/* Guiden — det ingen andre lokaler forklarer */}
      <section className="mt-16 border-t pt-12">
        <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">
          Guide
        </p>
        <h2 className="mt-2 max-w-2xl font-serif text-3xl font-medium">
          Slik blir dere viet ved dammen
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Å gifte seg utenfor kirke og rådhus er enklere enn mange tror. Det
          er fire ting som må på plass, og to av dem ordner vi.
        </p>
        <ol className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {GUIDE.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="font-serif text-3xl text-primary/60">{i + 1}</span>
              <div>
                <h3 className="font-serif text-lg">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-9 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Lurer dere på hva en hel dag med vielse og fest koster?{" "}
          <Link href="/bryllup/pris" className="text-primary hover:underline">
            Her er hva som avgjør prisen
          </Link>
          , og hvordan dere får et konkret tall for akkurat deres dag.
        </p>
      </section>
    </main>
  );
}
