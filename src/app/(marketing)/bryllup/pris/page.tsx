import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * «Hva koster det?» uten tall.
 *
 * Beslutning (Vemund, aug 2026): prisene skal ikke ligge åpent — prisen gis
 * på visningen, fysisk eller digital. Men et blankt «ta kontakt» taper folk
 * som googler «hva koster bryllup»: denne siden fanger dem, forklarer ærlig
 * hva som driver prisen, og gjør visningen til neste steg.
 *
 * INGEN KRONEBELØP PÅ DENNE SIDEN. Prisåpenhet er et eget tema som må
 * vedtas eksplisitt før tall publiseres igjen.
 */

export const metadata: Metadata = {
  title: "Hva koster et bryllup på Østgaard? | Slik settes prisen",
  description:
    "Prisen på et bryllup på Østgaard avhenger av antall gjester, meny, drikke og baroppsett. Vi går gjennom hele regnestykket med dere på en kostnadsfri visning, på gården eller digitalt.",
};


/** Det som faktisk flytter prisen. Uten tall — se filkommentaren. */
const DRIVERS = [
  {
    title: "Antall gjester",
    text: "Den største enkeltfaktoren. Vi regner en kuvertpris per gjest som dekker lokalet, serveringen og oppdekkingen, så prisen følger selskapets størrelse. Barn har egen pris.",
  },
  {
    title: "Menyen",
    text: "Tre, fire, fem eller seks retter fra vårt eget kjøkken. Antall retter og råvarene dere velger avgjør kuvertprisen, og her er spennet størst.",
  },
  {
    title: "Drikke",
    text: "Dere velger mellom faste drikkepakker til maten eller å betale for det som faktisk går med. To bryllup med samme gjesteliste kan skille betydelig her.",
  },
  {
    title: "Bar og kveldsservering",
    text: "Åpen bar, bongsystem eller gjestene betaler selv, og om kvelden fortsetter med nattmat. Dere bestemmer nivået, vi bemanner deretter.",
  },
  {
    title: "Vielse på gården",
    text: "Vielse i paviljongen ved dammen kommer i tillegg til selve festen, med stoloppsett, lydanlegg og mikrofon.",
  },
  {
    title: "Overnatting og dagen før",
    text: "Herregårdsleiligheten og gårdshuset for de nærmeste, og eventuelt en samling på gården kvelden i forveien.",
  },
];

/** Verdien som ligger i kuvertprisen — svaret på «hva får vi egentlig?». */
const INCLUDED = [
  "Lokalet med uteområde og møbler",
  "Middag fra eget kjøkken",
  "Hovmester og servitører gjennom hele kvelden",
  "Dekkede bord med damaskduker, lin-servietter og stoltrekk",
  "Leie av kandelabre og vaser",
  "Lydanlegg",
  "Egen digital kjøreplan der dere planlegger alt, og vi ser det samme som dere",
];

export default function PrisPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">
        Pris
      </p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-medium sm:text-5xl">
        Hva koster et bryllup på Østgaard?
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        Det ærlige svaret er at det kommer an på dagen dere ser for dere. To
        bryllup med like mange gjester kan ende svært ulikt, alt etter meny,
        drikke og hvor lenge kvelden skal vare. Her er hva som avgjør, og
        hvordan dere får et konkret tall for akkurat deres bryllup.
      </p>

      {/* Hva prisen består av */}
      <section className="mt-14 border-t pt-12">
        <h2 className="font-serif text-3xl font-medium">
          Seks ting avgjør prisen
        </h2>
        <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {DRIVERS.map((d, i) => (
            <div key={d.title}>
              <span className="font-serif text-2xl text-primary/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-serif text-xl">{d.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {d.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hvorfor prisen gis på visningen */}
      <section className="mt-14 grid gap-10 border-t pt-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">
            Derfor gir vi prisen på visningen
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Vi kunne lagt ut et «fra»-tall, men det ville sagt lite om hva
            deres bryllup faktisk koster, og erfaringsmessig skaper slike tall
            flere misforståelser enn de løser.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            I stedet setter vi oss ned med dere, hører hva slags dag dere
            ønsker, og regner ut et konkret og uforpliktende forslag med alle
            postene synlige. Da vet dere nøyaktig hva dere får, og hva det
            koster, før dere bestemmer dere.
          </p>
        </div>
        <aside className="h-fit border bg-secondary/40 p-7">
          <p className="font-serif text-xs tracking-[0.25em] uppercase text-primary">
            Alltid inkludert
          </p>
          <h3 className="mt-2 font-serif text-2xl">
            Dette ligger i kuvertprisen
          </h3>
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

      {/* To veier til prisen */}
      <section className="mt-14 border-t pt-12">
        <h2 className="font-serif text-3xl font-medium">
          To måter å få prisen på
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Begge deler er kostnadsfritt og helt uforpliktende.
        </p>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col border bg-card p-8">
            <p className="font-serif text-xs tracking-[0.25em] uppercase text-primary">
              Anbefalt
            </p>
            <h3 className="mt-2 font-serif text-2xl">Visning på gården</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Vi går rundt sammen: lokalene, paviljongen ved dammen og
              uteområdene. Dere ser hvordan dagen kan henge sammen, og vi setter
              opp prisen for akkurat deres bryllup mens vi snakker. De fleste
              par bestemmer seg først etter å ha stått i rommet.
            </p>
            <a
              href="/visning"
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
              Får dere ikke til å komme innom med det første, tar vi den samme
              gjennomgangen på video. Vi viser lokalene, går gjennom
              mulighetene og setter opp prisen, så kan dere heller komme på
              besøk når det passer bedre.
            </p>
            <a
              href="/visning"
              className="mt-6 inline-flex w-fit items-center gap-2 border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Be om digital visning <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground">
          Nevn gjerne dato, omtrentlig antall gjester og hva slags dag dere ser
          for dere, så har vi noe å regne på når vi møtes.
        </p>
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
              : Gildehallen, Låvetoppen og Herredstyresalen, med kapasitet og
              hva som hører til hvert av dem.
            </li>
            <li>
              <Link href="/utevielse" className="text-primary hover:underline">
                Utevielse ved dammen
              </Link>
              , med en praktisk guide til hvordan man faktisk blir viet utendørs.
            </li>
            <li>
              <Link
                href="/bryllup/intimt"
                className="text-primary hover:underline"
              >
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
