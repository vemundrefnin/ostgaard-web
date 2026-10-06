/**
 * Skriver «sist endret»-dato per side til src/lib/page-dates.json, hentet fra
 * git-historikken til sidens mappe. Kjøres i `npm run build`, så sitemap.xml
 * alltid viser når innholdet faktisk ble endret.
 *
 * Robust mot grunne kloner (Vercel): finner ikke git en dato, beholdes
 * verdien som allerede ligger i JSON-en.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT = "src/lib/page-dates.json";
const APP = "src/app";

/** Alle page.tsx under src/app, med URL-sti ((gruppe) teller ikke i URL-en). */
function pages(dir = APP, url = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const group = /^\(.*\)$/.test(entry.name);
      out.push(...pages(full, group ? url : `${url}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      out.push({ url: url || "/", dir });
    }
  }
  return out;
}

function lastCommitIso(file) {
  try {
    return (
      execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() || null
    );
  } catch {
    return null;
  }
}

const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
const dates = {};
let resolved = 0;
for (const { url, dir } of pages().sort((a, b) => a.url.localeCompare(b.url))) {
  // Datoen for siden er siste commit i mappen (page.tsx + evt. layout.tsx).
  const iso = lastCommitIso(dir) ?? previous[url] ?? null;
  if (iso) {
    dates[url] = iso;
    resolved++;
  }
}

fs.writeFileSync(OUT, `${JSON.stringify(dates, null, 2)}\n`);
console.log(`[page-dates] ${resolved} sider datert → ${OUT}`);
