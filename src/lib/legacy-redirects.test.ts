import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS, activeRedirects } from "./legacy-redirects";
import { PAGES } from "./site";

const APP_DIR = join(__dirname, "..", "app");

/** Finnes det en page.tsx for stien? Prøver med og uten (marketing)-gruppen. */
function pageExists(path: string): boolean {
  const rel = path === "/" ? "" : path.replace(/^\//, "");
  return [join(APP_DIR, rel, "page.tsx"), join(APP_DIR, "(marketing)", rel, "page.tsx")].some(
    existsSync
  );
}

describe("legacy-redirects", () => {
  it("hver destinasjon er en side som finnes", () => {
    for (const r of LEGACY_REDIRECTS) {
      const dest = r.destination.replace(/#.*$/, "").replace(/\/:path\*$/, "");
      expect(pageExists(dest), `${r.source} → ${r.destination}`).toBe(true);
    }
  });

  it("ingen aktiv redirect peker på seg selv (evig løkke)", () => {
    for (const r of activeRedirects()) {
      expect(r.source).not.toBe(r.destination);
    }
  });

  it("alle rader er permanente", () => {
    for (const r of LEGACY_REDIRECTS) expect(r.permanent).toBe(true);
  });

  it("kilder med æøå er URL-enkodet", () => {
    for (const r of LEGACY_REDIRECTS) {
      expect(r.source, r.source).toMatch(/^[\x20-\x7e]+$/);
    }
  });
});

describe("site PAGES", () => {
  it("hver side i registeret finnes i src/app", () => {
    for (const p of PAGES) expect(pageExists(p.path), p.path).toBe(true);
  });

  it("hver side i src/app står i registeret (ellers mangler den i sitemap og llms.txt)", async () => {
    const { readdirSync } = await import("node:fs");
    const found: string[] = [];
    const walk = (dir: string, urlPrefix: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          const isGroup = /^\(.*\)$/.test(entry.name);
          walk(join(dir, entry.name), isGroup ? urlPrefix : `${urlPrefix}/${entry.name}`);
        } else if (entry.name === "page.tsx") {
          found.push(urlPrefix || "/");
        }
      }
    };
    walk(APP_DIR, "");
    const registered = new Set(PAGES.map((p) => p.path));
    for (const path of found) expect(registered.has(path), path).toBe(true);
  });
});
