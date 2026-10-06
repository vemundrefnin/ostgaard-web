/**
 * REDIRECT-KONTRAKTEN for garder-ostgaard.no.
 *
 * Dagens garder-ostgaard.no (Wix) har innlenker fra andre nettsteder, sosiale
 * medier, QR-koder og Googles indeks. Når domenet pekes mot denne siden skal
 * HVER gammel URL svare med permanent redirect, aldri 404. Kilden er Wix-
 * sitemapene (pages-sitemap.xml + event-pages-sitemap.xml, hentet 2026-08-20):
 * 23 sider + ~68 /event-details/*-URL-er (dekkes av wildcard).
 *
 * Reglene:
 *  - Rader FJERNES aldri. Mål OPPGRADERES når en ekte underside bygges
 *    (f.eks. overnatting → /overnatting den dagen siden finnes).
 *  - Hver destinasjon (uten #anker) må være en side som finnes i src/app.
 *    Testen i legacy-redirects.test.ts feiler ellers.
 *  - Kjør `npm run check:redirects -- <base-url>` før domenebyttet: den
 *    besøker hver gammel sti og feiler på 404.
 *  - Kilder med æøå må stå URL-enkodet, Next matcher den enkodede stien.
 */
export interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

export const LEGACY_REDIRECTS: Redirect[] = [
  // Bryllup og lokaler. /bryllup, /lokaler og /utevielse er nå ekte sider på
  // samme sti; radene står for kontraktens skyld og filtreres bort av
  // activeRedirects() så de ikke blir en evig løkke.
  { source: "/bryllup", destination: "/bryllup", permanent: true },
  { source: "/lokaler", destination: "/lokaler", permanent: true },
  { source: "/kopi-av-lokaler", destination: "/lokaler", permanent: true },
  { source: "/kopi-av-lokaler-1", destination: "/lokaler", permanent: true },
  { source: "/utevielse", destination: "/utevielse", permanent: true },

  // Om gården
  { source: "/om-oss", destination: "/#om", permanent: true },
  { source: "/general-clean", destination: "/#om", permanent: true },

  // Utstillinger (about-1 var «VELKOMMEN TIL EKSKLUSIVE UTSTILLINGER»-målet)
  { source: "/about-1", destination: "/#utstillinger", permanent: true },
  { source: "/kopi-av-galleri", destination: "/#utstillinger", permanent: true },

  // Arrangementer og billetter. Wildcarden dekker alle ~68 event-URL-ene.
  { source: "/event-list", destination: "/#arrangementer", permanent: true },
  { source: "/event-details/:slug*", destination: "/#arrangementer", permanent: true },

  // Fru Østgaard, mat og gavekort
  { source: "/food-and-drinks", destination: "/#fru-ostgaard", permanent: true },
  { source: "/kopi-av-mat-og-drikke-1", destination: "/#fru-ostgaard", permanent: true },
  { source: "/kopi-av-mat-og-drikke-2", destination: "/#fru-ostgaard", permanent: true },
  { source: "/gift-card", destination: "/#fru-ostgaard", permanent: true },

  // Bedrift
  { source: "/for-bedrifter", destination: "/#bedrifter", permanent: true },

  // Overnatting (egen underside kommer, inntil da: forsiden)
  { source: "/sov-p%C3%A5-%C3%B8stgaard", destination: "/", permanent: true },
  { source: "/kopi-av-sov-p%C3%A5-%C3%B8stgaard", destination: "/", permanent: true },
  { source: "/kopi-av-sov-p%C3%A5-%C3%B8stgaard-1", destination: "/", permanent: true },
  { source: "/kopi-av-overnatting", destination: "/", permanent: true },

  // Feiringer og kontakt/booking
  { source: "/livets-begivenheter", destination: "/#feiringer", permanent: true },
  { source: "/contact-10", destination: "/#kontakt", permanent: true },
  { source: "/book-online", destination: "/#kontakt", permanent: true },

  // Stiene sidene hadde mens de lå under /landing i kjøreplan-appen
  // (plan.garder-ostgaard.no). Delt i e-post og Slack før flyttingen.
  { source: "/landing", destination: "/", permanent: true },
  { source: "/landing/:path*", destination: "/:path*", permanent: true },
];

/** Radene Next faktisk skal sette opp: alt som ikke peker på seg selv. */
export function activeRedirects(): Redirect[] {
  return LEGACY_REDIRECTS.filter((r) => r.source !== r.destination);
}
