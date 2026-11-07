import Image from "next/image";
import { SITE } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import { HeroSlides } from "@/components/landing/hero-slides";
import { occasionsForSeason, seasonBand } from "@/lib/landing/season";
import { MENUS, PRICE_YEAR, kr } from "@/lib/priser";
import { formatEventDate, upcomingEvents } from "@/lib/wix-events";

/**
 * Ny forside — innhold portert fra dagens garder-ostgaard.no (Østgaards eget
 * innhold og egne foto). Alt av billettsalg/booking (arrangementer, afternoon
 * tea, visning) lenker fortsatt til det eksisterende systemet — denne siden
 * skal ikke erstatte de flytene.
 */

const WIX = SITE.booking.base;

/** Sesongbåndet leses per time, så månedsskiftet slår inn av seg selv. */
export const revalidate = 3600;

const CARDS = [
  {
    title: "Lokaler",
    text: "Lune Gildehallen for 130, eller lyse Låvetoppen for 150.",
    href: "/lokaler",
    image: "/images/landing/gildehallen-dekket.jpg",
    alt: "Gildehallen dekket til bryllupsmiddag med lysslynger i taket",
  },
  {
    title: "Utevielse",
    text: "Paviljongen ved dammen, med plass til rundt 200 gjester.",
    href: "/utevielse",
    image: "/images/landing/paviljong-dammen.jpg",
    alt: "Hvit paviljong som speiler seg i dammen på Østgaard",
  },
  {
    title: "Priser",
    text: `Fra ${kr(MENUS[0].price)} per person, med lokalet inkludert.`,
    href: "/bryllup/pris",
    image: "/images/landing/servitor-alleen.jpg",
    alt: "Servitør fra Østgaard i alleen opp mot gården",
  },
];

/** Stilene som går igjen, så forsiden holder én skriftstørrelse på telefon. */
const H2 = "font-serif text-[clamp(1.55rem,1.1rem+2.2vw,3.1rem)] leading-[1.14] font-normal";
const LEAD = "text-[0.95rem] leading-relaxed text-muted-foreground lg:text-[1.05rem]";
const BTN =
  "inline-flex min-h-[46px] items-center justify-center gap-2 border border-primary bg-primary px-[22px] text-[0.66rem] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-primary/85";
const BTN_LINE =
  "inline-flex min-h-[46px] items-center justify-center border border-foreground/45 px-[22px] text-[0.66rem] tracking-[0.22em] uppercase text-foreground transition-colors hover:bg-foreground/10";
const LINK = "inline-flex items-center gap-1.5 text-[0.66rem] tracking-[0.2em] uppercase text-primary hover:underline";

const REVIEWS = [
  {
    who: "Sandra og Kasper",
    text: "Vi feiret bryllupet vårt på Østgaard sommeren 2024, og det var en drøm! Vertskapet sørget for at alt var perfekt planlagt, lokalene var nydelig pyntet, maten fantastisk, og atmosfæren magisk. Vi kunne nyte dagen fullt ut takket være den varme og profesjonelle oppfølgingen. Perfekt sted for vårt bryllup!",
  },
  {
    who: "Ina og Ole-Preben",
    text: "Vi feiret vårt livs største dag på Østgaard med en vakker utevielse ved dammen, kakeskjæring og champagne. Servicen var enestående, og gjestene skrøt av den fantastiske lokasjonen. Østgaard ga oss en perfekt ramme for dagen vår. Vi kunne ikke vært mer fornøyde!",
  },
  {
    who: "Rut og Frode",
    text: "Our wedding at Østgaard was absolutely wonderful! The team answered all my questions and supported me every step of the way. The venue and staff exceeded all expectations. I highly recommend it. Thank you for everything!",
  },
];

/** Tre steg fra første besøk til bryllupsdag — planen gjester møter oss med. */
const PLAN = [
  {
    title: "Book en visning",
    text: "Vi møter dere på gården og viser lokalene og uteområdene. Uforpliktende og kostnadsfritt.",
  },
  {
    title: "Planlegg alt på ett sted",
    text: "Meny, gjesteliste, bordplan og tidsplan samles i deres egen digitale kjøreplan.",
  },
  {
    title: "Nyt dagen",
    text: "Vertskapet styrer resten. Dere har én jobb: å være til stede i egen fest.",
  },
];

/** Verthistorien — signaturelementet i om-seksjonen. */
const HISTORY = [
  { when: "1636", what: "Lokalene bygges, og Østgaard blir stedet for feiring og sammenkomster" },
  { when: "I dag", what: "7. generasjon: Nina og Lars Garder driver gården med sine fire barn" },
  { when: "500+", what: "minnerike begivenheter: bryllup, jubileer, kurs og konferanser" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary">
      {children}
    </p>
  );
}

export default async function LandingPage() {
  // Fra Wix Events (eller src/content/events.json uten API-nøkkel).
  const events = await upcomingEvents(4);
  const band = seasonBand();
  const occasions = occasionsForSeason();

  return (
    <main className="text-[15px] leading-[1.62] lg:text-base">
      {/* Toppen: logo øverst, bildene bytter seg, teksten nederst. På telefon
          ligger visningsknappen alltid i bunnlinjen, så den vises ikke her.
          Egen wrapper: BTN har inline-flex, som ellers vinner over hidden. */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-background text-cream sm:min-h-[92svh]">
        <HeroSlides />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(80 14% 9% / .88), hsl(80 14% 9% / .42) 26%, hsl(80 14% 9% / .1) 46%, hsl(80 14% 9% / .92))",
          }}
        />
        <Image
          src="/images/landing/logo-ostgaard-lys.png"
          alt="Østgaard, herregården for unike minner"
          width={900}
          height={653}
          priority
          sizes="(min-width: 768px) 200px, 150px"
          className="absolute top-[18px] left-1/2 z-10 h-auto w-[150px] -translate-x-1/2 md:w-[200px]"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-[30px] lg:pb-[60px]">
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-[hsl(38_55%_74%)]">
            Halden · rett over én time fra Oslo
          </p>
          <h1 className="mt-2.5 font-serif text-[clamp(1.9rem,1.2rem+3vw,4.4rem)] leading-[1.12] font-normal">
            Bryllup i unike omgivelser
          </h1>
          <p className="mt-2 text-[clamp(0.8rem,3.75vw,1.05rem)] whitespace-nowrap text-cream/90">
            Dere feirer. Vertskapet tar seg av resten.
          </p>
          <div className="mt-[22px] hidden sm:block">
            <a href="/visning" className={BTN}>
              Book gratis visning
            </a>
          </div>
        </div>
      </section>

      {/* Sesongbånd — det ENESTE som roterer med årstiden. Hero, H1 og
          sidetittel står fast på bryllup, ellers mister vi bryllupssignalet
          i Google de månedene folk fortsatt søker (278 dagers ledetid). */}
      {band && (
        <aside className="border-b bg-secondary">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3">
            <span className="text-[0.62rem] tracking-[0.25em] uppercase text-primary">
              {band.eyebrow}
            </span>
            <p className="flex-1 basis-64 text-sm text-muted-foreground">{band.text}</p>
            <a href={band.href} className={LINK}>
              {band.cta} <ArrowRight className="size-3" />
            </a>
          </div>
        </aside>
      )}

      {/* Tre hovedkort */}
      <section id="bryllup" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 lg:py-24">
        <Eyebrow>Deres dag, deres rammer</Eyebrow>
        <h2 className={`mt-2.5 max-w-2xl ${H2}`}>Vielse, middag og fest på samme gård</h2>
        <p className={`mt-3 max-w-2xl ${LEAD}`}>
          Vertskapet har ansvaret for det praktiske, så dere kan være sammen med gjestene.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {CARDS.map((card) => (
            <a key={card.title} href={card.href} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <h3 className="mt-3.5 font-serif text-[1.28rem] font-normal">{card.title}</h3>
              <p className="mt-1 text-[0.88rem] leading-relaxed text-muted-foreground">
                {card.text}
              </p>
            </a>
          ))}
        </div>
        <a href="/bryllup" className={`mt-8 ${LINK}`}>
          Les mer om bryllup på Østgaard <ArrowRight className="size-3" />
        </a>
      </section>

      {/* Priser */}
      <section className="border-t">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Eyebrow>Priser {PRICE_YEAR}</Eyebrow>
            <h2 className={`mt-2.5 ${H2}`}>Åpne priser, med lokalet inkludert</h2>
            <p className={`mt-3 ${LEAD}`}>
              Kuvertprisen dekker lokale, middag, servering, oppdekking og egen digital
              kjøreplan. Drikke kommer i tillegg.
            </p>
            <a href="/bryllup/pris" className={`mt-[22px] ${BTN_LINE}`}>
              Se alle prisene
            </a>
          </div>
          <div>
            {MENUS.slice(0, 4).map((menu) => (
              <div
                key={menu.name}
                className="flex items-baseline justify-between gap-4 border-b py-3 font-serif text-[1.12rem]"
              >
                <span>{menu.name}</span>
                <span className="whitespace-nowrap">{kr(menu.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planen — tre steg fra visning til bryllupsdag */}
      <section id="plan" className="scroll-mt-20 border-t">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Eyebrow>Slik fungerer det</Eyebrow>
            <h2 className={`mt-2.5 ${H2}`}>Dere skal ikke være prosjektledere på egen bryllupsdag</h2>
            <ol className="mt-8 space-y-6">
              {PLAN.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="font-serif text-2xl text-primary">{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-[1.28rem] font-normal">{step.title}</h3>
                    <p className="mt-1 text-[0.88rem] leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/landing/brudepar-rygg.jpg"
              alt="Brudepar hånd i hånd gjennom hagen, bruden ser seg tilbake"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Omtaler */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <Eyebrow>Fra parene våre</Eyebrow>
          <h2 className={`mt-2.5 max-w-2xl ${H2}`}>Mer enn 500 minnerike begivenheter</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.who} className="flex flex-col border-t pt-5">
                <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                  «{r.text}»
                </blockquote>
                <figcaption className="mt-4 text-[0.62rem] tracking-[0.25em] uppercase text-primary">
                  {r.who}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Om Østgaard */}
      <section id="om" className="scroll-mt-20 border-y bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:py-24">
          <div>
            <Eyebrow>Drevet av 7. generasjon</Eyebrow>
            <h2 className={`mt-2.5 ${H2}`}>Feiring og sammenkomster siden 1636</h2>
            <div className={`mt-4 space-y-4 ${LEAD}`}>
              <p>
                Østgaard har siden 1636 vært stedet for feiring og hyggelige
                sammenkomster, en stolt tradisjon vi viderefører med ekte
                glede. I dag drives gården av 7. generasjon, ekteparet Nina og
                Lars Garder, og de har med seg sine fire barn i driften.
              </p>
              <p>
                Vi har vært vertskap for TV-innspillinger som{" "}
                <em>Gift ved første blikk</em> og andre store produksjoner, og
                vi tar gjerne imot små og store feiringer med åpne armer.
              </p>
            </div>
          </div>
          {/* Verthistorien som tidslinje — seksjonens signatur */}
          <div className="border-l pl-8">
            <ol className="space-y-8">
              {HISTORY.map((h) => (
                <li key={h.when} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[37px] size-2 rounded-full bg-primary"
                  />
                  <p className="font-serif text-xl">{h.when}</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-muted-foreground">
                    {h.what}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Overnatting: hotellavtalen er det vi lover. Plassene på gården er ikke
          noe vi selger inn på nettsiden. */}
      <section id="overnatting" className="scroll-mt-20 border-t">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <Eyebrow>Overnatting</Eyebrow>
          <h2 className={`mt-2 max-w-2xl ${H2}`}>
            Hotell og transport for gjestene
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Vi har avtale med Home Hotel Park i Halden, fem minutter unna, og
            hjelper dere med booking og transport begge veier.
          </p>
          <a
            href="/visning"
            className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
          >
            Spør om overnatting <ArrowRight className="size-3" />
          </a>
        </div>
      </section>

      {/* Feiringer, selskap og bedrift. Bryllup er fokus, disse får en kort inngang. */}
      <section id="feiringer" className="scroll-mt-20 border-t">
        <div id="bedrifter" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 lg:py-24">
          <Eyebrow>Hele året på Østgaard</Eyebrow>
          <h2 className={`mt-2 max-w-2xl ${H2}`}>
            Det er ikke bare bryllup vi feirer
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Konfirmasjoner om våren, sommerfester i hagen, julebord i
            Gildehallen og kurs og konferanser gjennom hele året, med samme
            vertskap, samme lokaler og samme mat.
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((o) => (
              <div key={o.title} className="border-t pt-5">
                <h3 className="font-serif text-xl">{o.title}</h3>
                {o.season && (
                  <p className="mt-1 text-xs tracking-[0.15em] uppercase text-primary">
                    {o.season}
                  </p>
                )}
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {o.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/visning"
              className={BTN}
            >
              Send oss en forespørsel <ArrowRight className="size-3.5" />
            </a>
            <a
              href="/visning?type=SOMMERFEST"
              className={BTN_LINE}
            >
              Spør om bedriftsarrangement
            </a>
          </div>
        </div>
      </section>

      {/* Kommende arrangementer — billetter kjøpes i dagens system */}
      <section id="arrangementer" className="scroll-mt-20 border-y bg-secondary">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <Eyebrow>Kommende arrangementer</Eyebrow>
          <h2 className={`mt-2 ${H2}`}>
            Det skjer på Østgaard
          </h2>
          {events.length > 0 ? (
            <div className="mt-10 divide-y border-y">
              {events.map((e) => (
                <div key={e.href + e.start} className="flex flex-wrap items-center justify-between gap-3 py-5">
                  <div>
                    <p className="font-serif text-lg">{e.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatEventDate(e.start)}
                      {e.location ? ` · ${e.location}` : ""}
                    </p>
                  </div>
                  <a
                    href={e.href}
                    className="inline-flex items-center border border-primary px-4 py-2 text-xs tracking-[0.18em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {e.action}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted-foreground">
              Ingen arrangementer er lagt ut akkurat nå. Følg oss på Instagram, så får du beskjed
              når neste er klart.
            </p>
          )}
          <a
            href={`${WIX}/event-list`}
            className="mt-6 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
          >
            Se alle arrangementer <ArrowRight className="size-3" />
          </a>
        </div>
      </section>

      {/* Også på Østgaard: korte innganger. Ankrene brukes av gamle adresser. */}
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-2 lg:py-24">
        <div id="fru-ostgaard" className="scroll-mt-20 border bg-card">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/images/landing/fru-ostgaard.jpg"
              alt="Egenproduserte varer i butikken hos Fru Østgaard"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="p-8">
            <Eyebrow>Fru Østgaard</Eyebrow>
            <h2 className="mt-2 font-serif text-[1.45rem] font-normal">Afternoon tea og gårdsbutikk</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Afternoon tea og egenproduserte varer fra gården og nærområdet.
              Grupper på 15 eller flere kan bestille afternoon tea på forhånd.
            </p>
            <a
              href={`${WIX}/event-list`}
              className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
            >
              Book afternoon tea <ArrowRight className="size-3" />
            </a>
          </div>
        </div>
        <div id="utstillinger" className="scroll-mt-20 border bg-card">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/images/landing/galleri.jpg"
              alt="Kunstutstilling på steinveggene i Gildehallen"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="p-8">
            <Eyebrow>Utstillinger</Eyebrow>
            <h2 className="mt-2 font-serif text-[1.45rem] font-normal">Lille Martine på Østgaard</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Flere ganger i året fylles Gildehallen med separatutstillinger, i
              samarbeid med Galleri Lille Martine.
            </p>
            <a
              href="https://www.gallerilillemartine.no/utstillinger"
              className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
            >
              Se utstillingsprogrammet <ArrowRight className="size-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Avsluttende CTA */}
      <section className="relative flex min-h-[64vh] items-center overflow-hidden text-cream">
        <Image
          src="/images/landing/gard-dam-lufta.jpg"
          alt="Østgaard sett fra lufta, med dammen og hagene rundt gården"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div aria-hidden className="absolute inset-0 bg-[hsl(80_14%_9%/0.55)]" />
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className={H2}>Kom og se Østgaard med egne øyne</h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-cream/85">
            Visningen er uforpliktende og kostnadsfri.
          </p>
          <a href="/visning" className={`mt-[22px] ${BTN}`}>
            Book gratis visning
          </a>
        </div>
      </section>

      <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted-foreground">
        Foto: Birthe Havnes, Sara Kiserud og Æva Studio
      </p>
    </main>
  );
}
