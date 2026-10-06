/**
 * Lanserings-sjekk: besøk hver gammel garder-ostgaard.no-sti mot den nye
 * siden og feil hvis noen svarer 404. Kjøres FØR (mot preview/prod-URL) og
 * ETTER at domenet pekes om.
 *
 *   node scripts/check-legacy-redirects.mjs https://ostgaard.vercel.app
 *
 * Wildcard-rader testes med et representativt eksempel.
 */
const base = process.argv[2];
if (!base) {
  console.error("Bruk: node scripts/check-legacy-redirects.mjs <base-url>");
  process.exit(1);
}

const { LEGACY_REDIRECTS } = await import(
  new URL("../src/lib/legacy-redirects.ts", import.meta.url).pathname
  // tsx/ts-node trengs ikke: filen er ren TS uten typer i runtime-posisjon —
  // men Node kan ikke importere .ts direkte, så vi leser og evaluerer den.
).catch(() => ({ LEGACY_REDIRECTS: null }));

let sources;
if (LEGACY_REDIRECTS) {
  sources = LEGACY_REDIRECTS.map((r) => r.source);
} else {
  // Fallback: parse kildene rett ut av TS-fila.
  const { readFileSync } = await import("node:fs");
  const ts = readFileSync(
    new URL("../src/lib/legacy-redirects.ts", import.meta.url),
    "utf8"
  );
  sources = [...ts.matchAll(/source:\s*"([^"]+)"/g)].map((m) => m[1]);
}

let failures = 0;
for (const raw of sources) {
  // Wildcards testes med et ekte eksempel fra gamle sitemapen.
  const path = raw
    .replace("/event-details/:slug*", "/event-details/bobler-og-blomster")
    .replace(/:\w+\*?/g, "test");
  // Kilder med æøå står allerede URL-enkodet i kartet — ikke enkode dem igjen.
  const url = base.replace(/\/$/, "") + (path.includes("%") ? path : encodeURI(path));
  try {
    const res = await fetch(url, { redirect: "manual" });
    const ok = (res.status >= 300 && res.status < 400) || res.status === 200;
    const dest = res.headers.get("location") ?? "";
    console.log(`${ok ? "✓" : "✗ " + res.status}  ${path}  ${dest}`);
    if (!ok) failures++;
  } catch (err) {
    console.log(`✗ FEIL  ${path}  ${err.message}`);
    failures++;
  }
}
console.log(
  failures === 0
    ? `\nAlle ${sources.length} gamle stier svarer. Trygt å peke domenet.`
    : `\n${failures} stier feiler — IKKE pek domenet før dette er fikset.`
);
process.exit(failures === 0 ? 0 : 1);
