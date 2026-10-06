import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HeroVideo } from "@/components/landing/hero-video";
import { occasionsForSeason, seasonBand } from "@/lib/landing/season";
import { MediaReview } from "@/components/landing/media-review";

/**
 * Ny forside — innhold portert fra dagens garder-ostgaard.no (Østgaards eget
 * innhold og egne foto). Alt av billettsalg/booking (arrangementer, afternoon
 * tea, visning) lenker fortsatt til det eksisterende systemet — denne siden
 * skal ikke erstatte de flytene.
 */

const WIX = "https://www.garder-ostgaard.no";

/** Sesongbåndet leses per time, så månedsskiftet slår inn av seg selv. */
export const revalidate = 3600;

const CARDS = [
  {
    title: "Lokaler",
    text: "Ønsker dere å finne det perfekte lokale som setter stemningen for hele kvelden? Vi har flere ulike lokaler dere kan velge mellom.",
    href: "/lokaler",
    image: "/images/landing/gildehallen.jpg",
    alt: "Gildehallen dekket til bryllupsmiddag med lysslynger i taket",
  },
  {
    title: "Bryllupspakker",
    text: "Bryllup i herregårdstil, eller et mer uformelt bryllup? På Østgaard arrangerer vi akkurat det bryllupet dere ønsker.",
    href: "/bryllup",
    image: "/images/landing/brudepar-alle.jpg",
    alt: "Brudepar hånd i hånd i alleen på Østgaard",
  },
  {
    title: "Utevielse",
    text: "Drømmer dere om utevielse i vakker natur som setter rammen for hele dagen?",
    href: "/utevielse",
    image: "/images/landing/utevielse.jpg",
    alt: "Utevielse ved dammen med paviljong og gjester",
  },
];

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

/**
 * Kommende arrangementer — billettsalget skjer i det eksisterende systemet,
 * så hvert kort lenker rett dit. Oppdateres manuelt til arrangementene får en
 * egen kilde.
 */
const EVENTS = [
  {
    title: "HNU Sommerfest på Østgaard",
    date: "Torsdag 27. august",
    href: `${WIX}/event-details/hnu-sommerfest-pa-ostgaard`,
    cta: "Kjøp billetter",
  },
  {
    title: "Bobler og Blomster",
    date: "Fredag 4. september",
    href: `${WIX}/event-details/bobler-og-blomster`,
    cta: "Kjøp billetter",
  },
  {
    title: "Motsetninger med Trygve Skaug & Birdie Fuglehaug",
    date: "Fredag 16. oktober",
    href: `${WIX}/event-details/motsetninger-med-trygve-skaug-birdie-fuglehaug`,
    cta: "Svar på invitasjon",
  },
];

/** Tre steg fra første besøk til bryllupsdag — planen gjester møter oss med. */
const PLAN = [
  {
    title: "Book en visning",
    text: "Vi møter dere på gården, viser lokalene og uteområdene, og snakker om hvordan akkurat deres dag kan se ut. Uforpliktende og kostnadsfritt.",
  },
  {
    title: "Planlegg alt på ett sted",
    text: "Dere får deres egen digitale kjøreplan hvor meny, gjesteliste, bordplan og tidsplan samles. Dere fyller ut i eget tempo, og vi ser det samme som dere.",
  },
  {
    title: "Nyt dagen",
    text: "På selve dagen styrer vertskapet kjøkken, servering og logistikk minutt for minutt etter planen. Dere har én jobb: å være til stede i egen fest.",
  },
];

/** 300 års verthistorie — signaturelementet i om-seksjonen. */
const HISTORY = [
  { when: "1700-tallet", what: "Østgaard blir stedet for feiring og sammenkomster i Halden" },
  { when: "I dag", what: "7. generasjon: Nina og Lars Garder driver gården med sine fire barn" },
  { when: "500+", what: "minnerike begivenheter: bryllup, jubileer, kurs og konferanser" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-serif text-xs tracking-[0.3em] uppercase text-primary">
      {children}
    </p>
  );
}

export default function LandingPage() {
  const band = seasonBand();
  const occasions = occasionsForSeason();

  return (
    <main>
      {/* Hero — dronefilm over gården, stillbilde for reduced-motion */}
      <section className="relative flex min-h-[82vh] items-end">
        <HeroVideo poster="/images/landing/hero-drone-poster.jpg" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 text-white">
          <p className="text-xs tracking-[0.35em] uppercase text-white/80">
            Østgaard · Halden · rett over én time fra Oslo
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] font-medium sm:text-6xl">
            Bryllup i unike omgivelser
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
            På Østgaard får dere være gjester i egen fest, så tar vertskapet seg
            av resten. Start med en uforpliktende og kostnadsfri visning.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`${WIX}/contact-10`}
              className="inline-flex items-center gap-2 border border-white bg-white px-6 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-white/90"
            >
              Book gratis visning <ArrowRight className="size-3.5" />
            </a>
            <a
              href="#plan"
              className="inline-flex items-center border border-white/70 px-6 py-3 text-xs tracking-[0.2em] uppercase text-white transition-colors hover:bg-white/10"
            >
              Slik fungerer det
            </a>
          </div>
        </div>
      </section>

      {/* Sesongbånd — det ENESTE som roterer med årstiden. Hero, H1 og
          sidetittel står fast på bryllup, ellers mister vi bryllupssignalet
          i Google de månedene folk fortsatt søker (278 dagers ledetid). */}
      {band && (
        <aside className="border-b bg-secondary/60">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3">
            <span className="font-serif text-xs tracking-[0.25em] uppercase text-primary">
              {band.eyebrow}
            </span>
            <p className="flex-1 text-sm text-muted-foreground">{band.text}</p>
            <a
              href={band.href}
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
            >
              {band.cta} <ArrowRight className="size-3" />
            </a>
          </div>
        </aside>
      )}

      {/* Tre hovedkort */}
      <section id="bryllup" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
        <Eyebrow>Deres dag, deres rammer</Eyebrow>
        <h2 className="mt-2 max-w-2xl font-serif text-3xl font-medium sm:text-4xl">
          Fra herregårdsbryllup til utevielse ved dammen
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group block border bg-card transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg tracking-[0.15em] uppercase">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.text}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary">
                  Les mer <ArrowRight className="size-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Planen — tre steg fra visning til bryllupsdag */}
      <section id="plan" className="scroll-mt-20 border-t">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-[2fr_3fr]">
          <div className="relative hidden aspect-[3/4] overflow-hidden border lg:block">
            <Image
              src="/images/landing/hero.jpg"
              alt="Nygift par i blomsterengen på Østgaard"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div>
            <Eyebrow>Slik fungerer det</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
              Dere skal ikke være prosjektledere på egen bryllupsdag
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Å planlegge bryllup betyr fort hundre løse tråder og et regneark
              ingen har kontroll på. Hos oss er veien fra første besøk til
              ferdig fest tre steg:
            </p>
            <ol className="mt-8 space-y-7">
              {PLAN.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="font-serif text-3xl text-primary/60">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={`${WIX}/contact-10`}
              className="mt-9 inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book gratis visning <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Om Østgaard */}
      <section id="om" className="scroll-mt-20 border-y bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-[3fr_2fr]">
          <div>
            <Eyebrow>Familieeid siden 1700-tallet</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
              Ønsker du en spesiell ramme for din neste feiring?
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Østgaard har i over 300 år vært stedet for feiring og hyggelige
                sammenkomster, en stolt tradisjon vi viderefører med ekte
                glede. I dag drives gården av 7. generasjon, ekteparet Nina og
                Lars Garder, og de har med seg sine fire barn i driften.
                Sammen skaper de et familieeid sted hvor både historie og
                nyskaping lever side om side.
              </p>
              <p>
                På Østgaard er mulighetene uendelige. Enten det gjelder
                bryllup, jubileum, kurs og konferanser eller en annen stor
                begivenhet, er vi her for å skape en opplevelse skreddersydd
                for deg. Vi har vært vertskap for TV-innspillinger som{" "}
                <em>Gift ved første blikk</em> og andre store produksjoner, og
                vi tar gjerne imot små og store feiringer med åpne armer. Fra
                de mest intime samlingene til de store festene
                tilrettelegger vi for alt du kan tenke deg, med en lidenskap for
                kvalitet og detalj.
              </p>
              <p className="font-serif text-lg text-foreground">
                Velkommen til oss på Østgaard
              </p>
            </div>
            <a
              href={`${WIX}/contact-10`}
              className="mt-7 inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book visning <ArrowRight className="size-3.5" />
            </a>
          </div>
          {/* Verthistorien som tidslinje — seksjonens signatur */}
          <div className="border-l pl-8">
            <ol className="space-y-10">
              {HISTORY.map((h) => (
                <li key={h.when} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[37px] size-2 rounded-full bg-primary"
                  />
                  <p className="font-serif text-2xl">{h.when}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {h.what}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Omtaler */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <Eyebrow>Omtaler</Eyebrow>
        <h2 className="mt-2 max-w-2xl font-serif text-3xl font-medium sm:text-4xl">
          Mer enn 500 minnerike begivenheter
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Vi er takknemlige for alle de flotte tilbakemeldingene vi har fått
          fra gjestene våre, og her kan du lese noen av dem.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.who} className="flex flex-col border bg-card p-6">
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                «{r.text}»
              </blockquote>
              <figcaption className="mt-4 font-serif text-sm tracking-[0.15em] uppercase">
                {r.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Feiringer, selskap og bedrift — halve omsetningen, egen plass */}
      <section id="feiringer" className="scroll-mt-20 border-t">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Eyebrow>Hele året på Østgaard</Eyebrow>
          <h2 className="mt-2 max-w-2xl font-serif text-3xl font-medium sm:text-4xl">
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
              href={`${WIX}/contact-10`}
              className="inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Send oss en forespørsel <ArrowRight className="size-3.5" />
            </a>
            <a
              href={`${WIX}/for-bedrifter`}
              className="inline-flex items-center border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Se bedriftspakkene
            </a>
          </div>
        </div>
      </section>

      {/* Kommende arrangementer — billetter kjøpes i dagens system */}
      <section id="arrangementer" className="scroll-mt-20 border-y bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Eyebrow>Kommende arrangementer</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
            Det skjer på Østgaard
          </h2>
          <div className="mt-10 divide-y border-y">
            {EVENTS.map((e) => (
              <div
                key={e.title}
                className="flex flex-wrap items-center justify-between gap-3 py-5"
              >
                <div>
                  <p className="font-serif text-lg">{e.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {e.date} · Halden
                  </p>
                </div>
                <a
                  href={e.href}
                  className="inline-flex items-center border border-primary px-4 py-2 text-xs tracking-[0.18em] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {e.cta}
                </a>
              </div>
            ))}
          </div>
          <a
            href={`${WIX}/event-list`}
            className="mt-6 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
          >
            Se alle arrangementer <ArrowRight className="size-3" />
          </a>
        </div>
      </section>

      {/* Utstillinger */}
      <section
        id="utstillinger"
        className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-20 lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden border lg:aspect-auto">
          <Image
            src="/images/landing/galleri.jpg"
            alt="Kunstutstilling på steinveggene i Gildehallen"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div>
          <Eyebrow>Utstillinger</Eyebrow>
          <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
            Lille Martine på Østgaard
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              På Østgaard ønsker vi velkommen til unike kunstopplevelser i
              Gildehallen, i samarbeid med Galleri Lille Martine. Flere ganger
              i året fylles hallen med spennende separatutstillinger fra både
              etablerte og nye kunstnere som du ikke vil gå glipp av.
            </p>
            <p>
              Utstillingene har allerede rukket å bli populære møteplasser for
              kunstinteresserte, og kombinasjonen av historiske lokaler, sterke
              kunstuttrykk og et rikt gårdsliv gjør besøket til noe helt
              spesielt. Når du besøker utstillingene, kan du også ta turen
              innom Fru Østgaard kafé, som holder åpent disse dagene. Lunsj,
              kaffe og hjemmebakte kaker er en perfekt avrunding på
              kunstopplevelsen.
            </p>
          </div>
          <a
            href="https://www.gallerilillemartine.no/utstillinger"
            className="mt-6 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
          >
            Se utstillingsprogrammet <ArrowRight className="size-3" />
          </a>
        </div>
      </section>

      {/* Fru Østgaard */}
      <section id="fru-ostgaard" className="scroll-mt-20 border-y bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Eyebrow>Fru Østgaard</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
              Vårt lille spiskammer
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Å starte Fru Østgaard har alltid vært en drøm for Nina, og
                navnet er en hyllest til alle kvinnene som har bodd og virket
                på gården gjennom generasjonene.
              </p>
              <p>
                Afternoon Tea, en stor favoritt, kan bookes via nettsiden
                eller på e-post. For grupper på 15 personer eller flere kan vi
                også tilby Afternoon Tea på forhåndsbestilling.
              </p>
              <p>
                Butikken bugner av unike, egenproduserte varer, laget med
                kjærlighet og råvarer fra egen gård eller nærområdet. Fru
                Østgaard kan også bookes til ulike arrangement. Hva med en
                Afternoon Tea-bursdag, eller en Paint and sip-bursdag?
              </p>
            </div>
            <a
              href={`${WIX}/event-list`}
              className="mt-6 inline-flex items-center gap-2 border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book Afternoon Tea <ArrowRight className="size-3.5" />
            </a>
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden border lg:order-2 lg:aspect-auto">
            <Image
              src="/images/landing/fru-ostgaard.jpg"
              alt="Egenproduserte varer i butikken hos Fru Østgaard"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* TV/film — nisje, men tv2.no sender ekte trafikk hit */}
      <section
        id="bedrifter"
        className="mx-auto grid max-w-6xl scroll-mt-20 gap-6 px-4 py-20 md:grid-cols-2"
      >
        <div className="border bg-card p-8">
          <Eyebrow>Overnatting</Eyebrow>
          <h2 className="mt-2 font-serif text-2xl font-medium">
            Bli natten over
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Gårdshuset og herregårdsleiligheten tar imot brudepar og gjester
            som vil sove tett på festen. For større selskap har vi avtaler med
            hoteller i Halden, og med taxi og buss.
          </p>
          <a
            href={`${WIX}/contact-10`}
            className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
          >
            Spør om overnatting <ArrowRight className="size-3" />
          </a>
        </div>
        <div className="border bg-card p-8">
          <Eyebrow>TV, film og produksjon</Eyebrow>
          <h2 className="mt-2 font-serif text-2xl font-medium">
            En perfekt scene
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Østgaard har vært en del av noen av Norges mest populære
            TV-serier, inkludert <em>Gift ved første blikk</em> og{" "}
            <em>Jakten på kjærligheten</em>. Med stemningsfulle lokaler, vakre
            uteområder og en dedikert stab har vi alt som trengs for ditt
            neste prosjekt, enten det er TV-serie, film, reklame eller fotoopptak.
          </p>
          <a
            href={`${WIX}/contact-10`}
            className="mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase text-primary hover:underline"
          >
            Ta kontakt om produksjon <ArrowRight className="size-3" />
          </a>
        </div>
      </section>

      {/* Avsluttende CTA */}
      <section className="relative">
        <div className="relative flex min-h-[46vh] items-center">
          <Image
            src="/images/landing/gildehallen-2.jpg"
            alt="Gildehallen klar til fest"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto max-w-3xl px-4 py-16 text-center text-white">
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">
              Kom og se Østgaard med egne øyne
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85">
              Visningen er uforpliktende og kostnadsfri. Vi viser dere
              lokalene, uteområdene og mulighetene for akkurat deres dag.
            </p>
            <a
              href={`${WIX}/contact-10`}
              className="mt-7 inline-flex items-center gap-2 border border-white bg-white px-7 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-white/90"
            >
              Book visning <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* UTKAST: medievurdering — kandidatvideoer/-bilder. Fjernes før
          lansering; se media-review.tsx. */}
      <MediaReview />
    </main>
  );
}
