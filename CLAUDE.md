# CLAUDE.md

Offentlig nettside for Østgaard (garder-ostgaard.no): forsiden, bryllupssidene
og infosidene til leverandører. Next.js App Router på Vercel. Ingen database,
ingen innlogging, ingen hemmeligheter. Alt innhold ligger i kode, og alle
sider er statiske.

Kjøreplan-appen (plan.garder-ostgaard.no) er et annet repo. Booking,
billettsalg og visning skjer i det eksisterende systemet på
www.garder-ostgaard.no og lenkes ut herfra. Denne siden skal ikke erstatte de
flytene.

## Slik jobber du her

Den som redigerer er ofte ikke utvikler. Gjør det enkelt:

- Gjør endringen på en egen branch og lag en pull request. Vercel bygger en
  forhåndsvisning av hver PR, og lenken dukker opp i PR-en etter et par
  minutter. Ingenting treffer den ekte siden før PR-en er merget til `main`.
- Kjør `npm run check` før du lager PR (typer, lint og tester). CI kjører det
  samme og blokkerer merge hvis noe feiler.
- Hold deg til innholdet. Tekst, bilder, priser, rekkefølge på seksjoner og
  nye undersider er fritt frem. Ikke rør `next.config.ts`, `vercel.json`,
  `src/app/layout.tsx`, `src/lib/site.ts` (utover `PAGES`) eller skriptene i
  `scripts/` uten at det er selve oppgaven.
- Bekreft med brukeren før du legger til npm-pakker.

## Hvor ting ligger

| Hva | Hvor |
| --- | --- |
| Forsiden | `src/app/(marketing)/page.tsx` |
| Bryllup, pris, intimt, utevielse, lokaler | `src/app/(marketing)/<sti>/page.tsx` |
| Topp og bunn på markedssidene | `src/app/(marketing)/layout.tsx` |
| Infosider til leverandører (DJ, fotograf, utstyr) | `src/app/info/<sti>/page.tsx` |
| Bilder og video | `public/images/landing/` og `public/images/info/` |
| Kontaktinfo, adresse, sosiale medier, booking-lenker | `src/lib/site.ts` (`SITE`) |
| Liste over alle sider (gir sitemap og llms.txt) | `src/lib/site.ts` (`PAGES`) |
| Gamle adresser som må fortsette å fungere | `src/lib/legacy-redirects.ts` |
| Farger og fonter | `src/app/globals.css` |

## Ny side

1. Lag `src/app/(marketing)/<sti>/page.tsx` med `export const metadata`
   (title + description) og innholdet. Kopier strukturen fra en eksisterende
   side, for eksempel `utevielse`.
2. Legg til en rad i `PAGES` i `src/lib/site.ts`. Testen feiler hvis du
   glemmer det, og siden ville ellers manglet i sitemap og llms.txt.
3. Lenk til den fra en side som finnes, så den er mulig å finne.

## URL-er er kontrakter

Adresser lever i e-poster, bokmerker, QR-koder og Googles indeks.

- Flytt eller døp aldri om en side uten å legge til en permanent redirect
  fra gammel til ny sti i `src/lib/legacy-redirects.ts`.
- Rader i `legacy-redirects.ts` slettes aldri. Mål oppgraderes når en bedre
  side finnes (overnatting peker på forsiden til `/overnatting` er bygget).
- Før domenebytte: `npm run check:redirects -- https://<preview-url>` skal gi
  grønt på alle stier.
- Kilder med æøå må stå URL-enkodet i redirect-kartet.

## Bilder

- Legg nye bilder i `public/images/landing/` som JPG, maks ca. 2400 px bred
  og under 1 MB. Bruk `<Image>` fra `next/image` med `width`/`height` eller
  `fill` + `sizes`, så optimaliserer Vercel selv til AVIF/WebP.
- Hero-bildet over folden skal ha `priority`. Alt annet lastes lazy (standard).
- Alle bilder trenger en beskrivende `alt`-tekst på norsk.
- Nytt OG-bilde (det som vises når lenken deles): bytt `public/og.jpg`,
  1200×630.

## Tekst

- Norsk bokmål. Ingen tankestrek (—) eller « – » i brukervendt tekst, skriv om
  med komma eller punktum.
- Ikke pur rent hvitt eller rent svart. Fargene heter cream, parchment, ink,
  moss, brass og linen og ligger i `globals.css`.
- Priser står i `src/app/(marketing)/bryllup/pris/page.tsx`. Endrer du dem,
  sjekk at tallene stemmer med det kjøreplan-appen bruker.

## Teknisk

- Alle sider er statiske og serveres fra Vercels CDN. Forsiden regenereres
  hver time fordi sesongbåndet avhenger av dato (`revalidate = 3600`).
  Unngå `fetch`, databaser og dynamiske API-er i sidene. Da mister vi det.
- `robots.txt` og `<meta robots>` sier noindex til `SITE_INDEXABLE=true` er
  satt i Vercel Production. Det skjer den dagen garder-ostgaard.no pekes hit.
  Preview-deploys er alltid noindex.
- `llms.txt` bygges fra `PAGES`. `llms-full.txt` (all tekst fra alle sider)
  genereres ved build av `scripts/generate-llms-full.mjs` og er ikke sjekket
  inn.
- Vercel-regionen er Stockholm (`arn1`), nærmest Norge. Statiske sider
  serveres uansett fra CDN-punktet nærmest brukeren.
- Kommandoer: `npm run dev`, `npm run check`, `npm run build`,
  `npm run check:redirects -- <url>`.
