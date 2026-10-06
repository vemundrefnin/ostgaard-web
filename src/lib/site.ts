/**
 * Ett sted for alt som beskriver nettstedet utad: adresse, kontaktinfo og
 * listen over sider. sitemap.xml, llms.txt, robots.txt, canonical-lenker og
 * JSON-LD leser herfra, så en ny side legges til ÉN gang (i PAGES) og dukker
 * opp overalt.
 */

/** Kanonisk adresse. Preview-deploys på Vercel får sin egen URL automatisk. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  "http://localhost:3000"
).replace(/\/$/, "");

/**
 * Skal søkemotorer indeksere siden? Bare når SITE_INDEXABLE=true er satt
 * (gjøres i Vercel Production den dagen garder-ostgaard.no peker hit). Alle
 * preview-deploys og lokal kjøring svarer noindex, så ingen halvferdig
 * variant havner i Google ved siden av den ekte.
 */
export const SITE_INDEXABLE = process.env.SITE_INDEXABLE === "true";

/** Adressen Wix-siten svarer på. Byttes til en subdomene ved domenebyttet. */
export const WIX_URL = (
  process.env.NEXT_PUBLIC_WIX_URL ?? "https://www.garder-ostgaard.no"
).replace(/\/$/, "");


export const SITE = {
  name: "Østgaard",
  legalName: "Østgaard Event AS",
  tagline: "Bryllup i unike omgivelser i Halden",
  description:
    "Bryllup, feiringer, kurs og konferanser på Østgaard i Halden, en familieeid gård med over 300 års verthistorie. Book en uforpliktende og kostnadsfri visning.",
  email: "ostgaard@garder.no",
  phone: "+47 977 18 670",
  phoneHref: "tel:+4797718670",
  address: {
    street: "Brødenveien 31",
    postalCode: "1763",
    city: "Halden",
    country: "NO",
  },
  openingHours: "Mandag–fredag 09:00–15:00",
  social: {
    instagram: "https://www.instagram.com/ostgaard_event/",
    facebook: "https://www.facebook.com/ostgaard.event",
    linkedin: "https://no.linkedin.com/company/ostgaard-event",
  },
  /**
   * Booking, billetter, gavekort og visningsskjema lever fortsatt på dagens
   * Wix-system. Når garder-ostgaard.no pekes hit, MÅ Wix-siden få en annen
   * adresse (f.eks. booking.garder-ostgaard.no), ellers peker disse lenkene
   * tilbake på oss selv. Sett NEXT_PUBLIC_WIX_URL i Vercel samme dag.
   */
  booking: {
    base: WIX_URL,
    visning: `${WIX_URL}/contact-10`,
    arrangementer: `${WIX_URL}/event-list`,
    bedrift: `${WIX_URL}/for-bedrifter`,
    gavekort: `${WIX_URL}/gift-card`,
  },
} as const;

export interface SitePage {
  path: string;
  title: string;
  description: string;
  /** Hvor ofte innholdet typisk endres. Styrer sitemap-hintet. */
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
  /** Gruppering i llms.txt. */
  section: "Hovedsider" | "Bryllup" | "Praktisk informasjon til leverandører";
}

/**
 * Alle offentlige sider. Rekkefølgen her er rekkefølgen i llms.txt.
 * Legg til en rad når du lager en ny side, og slett aldri en rad uten å
 * legge inn en redirect i src/lib/legacy-redirects.ts først.
 */
export const PAGES: SitePage[] = [
  {
    path: "/",
    title: "Østgaard, bryllup i unike omgivelser i Halden",
    description: SITE.description,
    changeFrequency: "weekly",
    priority: 1,
    section: "Hovedsider",
  },
  {
    path: "/lokaler",
    title: "Lokaler på Østgaard",
    description:
      "Gildehallen, Låvetoppen og Herredstyresalen: størrelse, kapasitet og hva som passer til hvilken feiring.",
    changeFrequency: "monthly",
    priority: 0.8,
    section: "Hovedsider",
  },
  {
    path: "/bryllup",
    title: "Bryllup på Østgaard",
    description:
      "Herregårdsbryllup i Halden, rett over én time fra Oslo. Vielse, fest og overnatting på samme gård.",
    changeFrequency: "monthly",
    priority: 0.9,
    section: "Bryllup",
  },
  {
    path: "/bryllup/pris",
    title: "Hva koster et bryllup på Østgaard?",
    description:
      "Slik settes prisen: lokalleie, mat og drikke, overnatting og hva som er inkludert.",
    changeFrequency: "monthly",
    priority: 0.8,
    section: "Bryllup",
  },
  {
    path: "/bryllup/intimt",
    title: "Intimt bryllup på Østgaard",
    description: "Bryllup for 20–45 gjester i historiske omgivelser.",
    changeFrequency: "monthly",
    priority: 0.7,
    section: "Bryllup",
  },
  {
    path: "/utevielse",
    title: "Utevielse ved dammen på Østgaard",
    description: "Slik blir dere viet utendørs, og hva som skjer hvis det regner.",
    changeFrequency: "monthly",
    priority: 0.7,
    section: "Bryllup",
  },
  {
    path: "/info/dj",
    title: "DJ i bryllup på Østgaard",
    description: "Praktisk informasjon til DJ: lydanlegg, strøm, rigging og tider.",
    changeFrequency: "yearly",
    priority: 0.3,
    section: "Praktisk informasjon til leverandører",
  },
  {
    path: "/info/fotograf",
    title: "Fotograf i bryllup på Østgaard",
    description: "Praktisk informasjon til fotograf: lys, steder og tider på gården.",
    changeFrequency: "yearly",
    priority: 0.3,
    section: "Praktisk informasjon til leverandører",
  },
  {
    path: "/info/toastmaster",
    title: "Toastmaster i bryllup på Østgaard",
    description: "Praktisk informasjon til toastmaster: mikrofon, kjøreplan og samarbeid med kjøkkenet.",
    changeFrequency: "yearly",
    priority: 0.3,
    section: "Praktisk informasjon til leverandører",
  },
  {
    path: "/info/servitor",
    title: "Servitør i bryllup på Østgaard",
    description: "Praktisk informasjon til servitører som jobber på Østgaard.",
    changeFrequency: "yearly",
    priority: 0.3,
    section: "Praktisk informasjon til leverandører",
  },
  {
    path: "/info/hoyttaler",
    title: "Høyttaler: JBL PartyBox 720 på Østgaard",
    description: "Slik kobler du til og bruker høyttaleren.",
    changeFrequency: "yearly",
    priority: 0.2,
    section: "Praktisk informasjon til leverandører",
  },
  {
    path: "/info/soundboks",
    title: "Soundboks på Østgaard",
    description: "Slik kobler du til og bruker Soundboks-høyttaleren.",
    changeFrequency: "yearly",
    priority: 0.2,
    section: "Praktisk informasjon til leverandører",
  },
  {
    path: "/info/mikrofon",
    title: "Mikrofon på Østgaard",
    description: "Slik bruker du den trådløse mikrofonen.",
    changeFrequency: "yearly",
    priority: 0.2,
    section: "Praktisk informasjon til leverandører",
  },
  {
    path: "/info/myggmikrofon",
    title: "Myggmikrofon på Østgaard",
    description: "Slik bruker du myggmikrofonen til vielse og taler.",
    changeFrequency: "yearly",
    priority: 0.2,
    section: "Praktisk informasjon til leverandører",
  },
  {
    path: "/info/prosjektor",
    title: "Prosjektor og lerret på Østgaard",
    description: "Slik kobler du til prosjektoren og setter opp lerretet.",
    changeFrequency: "yearly",
    priority: 0.2,
    section: "Praktisk informasjon til leverandører",
  },
];

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}
