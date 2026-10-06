/**
 * Sesongstyring av landingssiden.
 *
 * Prinsippet: hero, H1 og sidetittel er ALLTID bryllup — bryllupssøk skjer
 * hele året (snitt 278 dagers ledetid fra kontrakt til bryllupsdag), og
 * Google trenger et stabilt signal om hva Østgaard er. Det som endrer seg er
 * (1) ett smalt sesongbånd under heroen og (2) rekkefølgen i «Hele året»-
 * seksjonen.
 *
 * Kalenderen ligger FORAN arrangementet, ikke på det: julebord selges
 * aug–nov (desember er allerede fullbooket da), konfirmasjon des–feb for mai,
 * bedriftssommerfest mar–mai. Kilde: fakturamåneder 2022–25 + arrangements-
 * sesongen (84 % av bryllupene i mai–august).
 *
 * Overstyres uten deploy med LANDING_SEASON: en sesongnøkkel for å tvinge
 * fokus (f.eks. «vi har tre ledige desemberlørdager, push det nå»), eller
 * "none" for å skjule båndet helt.
 */

export type SeasonKey = "bryllup" | "konfirmasjon" | "julebord" | "sommerfest";

export interface Occasion {
  /** Matcher SeasonKey der anledningen kan være sesongfokus. */
  key: SeasonKey | "jubileum" | "minnestund" | "kurs";
  title: string;
  season: string | null;
  text: string;
}

/** Anledningene utenom bryllup — rundt halvparten av omsetningen. */
export const OCCASIONS: Occasion[] = [
  {
    key: "konfirmasjon",
    title: "Konfirmasjon",
    season: "Høysesong i mai",
    text: "Egen sal til familien, meny satt opp etter ønske og uteområde til fotografering. Fra intime selskap til de store slektstreffene.",
  },
  {
    key: "jubileum",
    title: "Jubileum og bursdag",
    season: null,
    text: "Rund dag som fortjener rammer? Vi dekker alt fra 20 rundt ett bord i Herredstyresalen til 150 i Låvetoppen.",
  },
  {
    key: "minnestund",
    title: "Minnestund",
    season: null,
    text: "Rolige, verdige omgivelser og et vertskap som tar seg av det praktiske, så familien kan konsentrere seg om hverandre.",
  },
  {
    key: "julebord",
    title: "Julebord",
    season: "Desember er vår travleste måned",
    text: "Julebord i 1600-tallssalen med lysslynger, tregangers og plass til hele avdelingen. Book tidlig, desemberlørdagene går først.",
  },
  {
    key: "sommerfest",
    title: "Sommerfest",
    season: "Juni–august",
    text: "Grill og lange bord i hagen, vikingfest i Gildehallen eller begge deler. Uteområdene tåler både sol og en byge.",
  },
  {
    key: "kurs",
    title: "Kurs og konferanse",
    season: "Fem minutter fra E6",
    text: "Dagslys, plass til gruppearbeid og lunsj i hagen når været tillater. Vi har avtaler med lokale hoteller, taxi og buss.",
  },
];

/** Måned (1–12) → hva som selges akkurat da. Se doc-kommentaren over. */
const CALENDAR: Record<number, SeasonKey> = {
  1: "konfirmasjon", // siste frist for mai-konfirmasjonene
  2: "konfirmasjon",
  3: "sommerfest", // bedriftene planlegger sommeren
  4: "sommerfest",
  5: "sommerfest",
  6: "bryllup", // bryllupshøysesong: gjester ser lokalet i bruk
  7: "bryllup",
  8: "julebord", // julebordsalget starter – desember bookes nå
  9: "julebord",
  10: "julebord",
  11: "julebord", // siste ledige desemberdatoer
  12: "konfirmasjon", // mai neste år begynner å bookes
};

export interface SeasonBand {
  eyebrow: string;
  text: string;
  cta: string;
  href: string;
}

/**
 * Året anledningen gjelder for, sett fra `now`. Julebord i august 2026 gjelder
 * desember 2026; konfirmasjon i desember 2026 gjelder mai 2027.
 */
function targetYear(season: SeasonKey, now: Date): number {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  if (season === "konfirmasjon" && month === 12) return year + 1;
  return year;
}

const BAND: Record<SeasonKey, (year: number) => SeasonBand> = {
  julebord: (y) => ({
    eyebrow: `Julebord ${y}`,
    text: "Gildehallen med lysslynger, tregangers og plass til hele avdelingen. Desemberlørdagene går først.",
    cta: "Book julebord",
    href: "#feiringer",
  }),
  konfirmasjon: (y) => ({
    eyebrow: `Konfirmasjon ${y}`,
    text: "Egen sal til familien, meny etter ønske og uteområde til fotografering. Mai-helgene fylles tidlig.",
    cta: "Se mulighetene",
    href: "#feiringer",
  }),
  sommerfest: (y) => ({
    eyebrow: `Sommerfest ${y}`,
    text: "Grill og lange bord i hagen, eller vikingfest i Gildehallen. Fem minutter fra E6.",
    cta: "Planlegg sommerfesten",
    href: "#feiringer",
  }),
  bryllup: () => ({
    eyebrow: "Bryllupssesong",
    text: "Vi er midt i sesongen. Kom på visning mens gården står i full stas, og se lokalene i bruk.",
    cta: "Book gratis visning",
    href: "#plan",
  }),
};

/** Sesongen akkurat nå, med LANDING_SEASON som overstyring. */
export function currentSeason(now: Date = new Date()): SeasonKey | null {
  const override = process.env.LANDING_SEASON?.trim().toLowerCase();
  if (override === "none") return null;
  if (override && override in BAND) return override as SeasonKey;
  return CALENDAR[now.getMonth() + 1] ?? "bryllup";
}

/** Båndet som vises under heroen, eller null når det er slått av. */
export function seasonBand(now: Date = new Date()): SeasonBand | null {
  const season = currentSeason(now);
  if (!season) return null;
  return BAND[season](targetYear(season, now));
}

/**
 * «Hele året»-seksjonen med sesongens anledning først. Resten beholder sin
 * rekkefølge, så siden ikke stokker om på seg selv mer enn nødvendig.
 */
export function occasionsForSeason(now: Date = new Date()): Occasion[] {
  const season = currentSeason(now);
  if (!season || season === "bryllup") return OCCASIONS;
  const focused = OCCASIONS.filter((o) => o.key === season);
  return [...focused, ...OCCASIONS.filter((o) => o.key !== season)];
}
