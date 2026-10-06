/**
 * Skriver public/llms-full.txt: all lesbar tekst fra alle sidene, samlet i én
 * fil for AI-assistenter (se llmstxt.org). Kjøres før `next build` og
 * `next dev`, så filen alltid speiler kildekoden.
 *
 * Teksten hentes rett fra TSX-kilden med TypeScript-parseren: JSX-tekst,
 * strenger i attributter som alt/title/aria-label, og strenger i
 * innholdsobjekter (CARDS, FAQ osv.). Tekniske strenger (className, href,
 * src, importstier) hoppes over. Resultatet er ikke perfekt prosa, men
 * komplett og alltid oppdatert, uten å måtte rendre sidene.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const APP = "src/app";
const OUT = "public/llms-full.txt";

/** Attributter og objektnøkler som er teknikk, ikke tekst. */
const SKIP_KEYS = new Set([
  "className",
  "href",
  "src",
  "poster",
  "image",
  "key",
  "id",
  "type",
  "rel",
  "target",
  "sizes",
  "loading",
  "decoding",
  "fill",
  "width",
  "height",
  "variant",
  "size",
  "robots",
  "url",
  "source",
  "path",
  "fetchPriority",
  "dangerouslySetInnerHTML",
]);

function pages(dir = APP, url = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const group = /^\(.*\)$/.test(entry.name);
      out.push(...pages(full, group ? url : `${url}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      out.push({ url: url || "/", file: full });
    }
  }
  return out.sort((a, b) => a.url.localeCompare(b.url));
}

function clean(s) {
  return s.replace(/\s+/g, " ").trim();
}

/** Nøkkelen en streng henger under: JSX-attributt eller objekt-property. */
function keyOf(node) {
  const p = node.parent;
  if (!p) return null;
  if (ts.isJsxAttribute(p)) return p.name.getText();
  if (ts.isPropertyAssignment(p)) return p.name.getText();
  return null;
}

function extract(file) {
  const src = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const out = [];
  let title = null;

  const visit = (node) => {
    if (ts.isImportDeclaration(node)) return;
    if (ts.isJsxText(node)) {
      const t = clean(node.text);
      if (t) out.push(t);
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const key = keyOf(node);
      const t = clean(node.text);
      if (key === "title" && !title) title = t;
      // Tekniske nøkler, URL-er, CSS-klasser og veldig korte strenger hoppes over.
      if (
        t.length >= 3 &&
        !(key && SKIP_KEYS.has(key)) &&
        !/^[/#]|^https?:|^mailto:|^tel:/.test(t) &&
        !/^[\w:-]+(\s[\w:/[\]().%-]+)+$/.test(t) // ser ut som tailwind-klasser
      ) {
        out.push(t);
      }
    } else if (ts.isJsxExpression(node) && node.expression && ts.isTemplateExpression(node.expression)) {
      // `Fra ${pris} kr`: ta med de faste bitene.
      for (const span of [node.expression.head, ...node.expression.templateSpans.map((s) => s.literal)]) {
        const t = clean(span.text);
        if (t) out.push(t);
      }
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(src);

  // Slå sammen og fjern dubletter som følger rett etter hverandre.
  const seen = new Set();
  const lines = out.filter((t) => (seen.has(t) ? false : (seen.add(t), true)));
  return { title, lines };
}

const site = fs.readFileSync("src/lib/site.ts", "utf8");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://garder-ostgaard.no";
const description = site.match(/description:\s*\n?\s*"([^"]+)"/)?.[1] ?? "";

const blocks = [`# Østgaard`, "", `> ${description}`, "", `Kilde: ${siteUrl}. Generert ${new Date().toISOString().slice(0, 10)} fra sidene på nettstedet.`, ""];
for (const { url, file } of pages()) {
  const { title, lines } = extract(file);
  blocks.push(`## ${title ?? url}`, "", `URL: ${siteUrl}${url === "/" ? "" : url}`, "", ...lines, "");
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, blocks.join("\n"));
console.log(`[llms-full] ${pages().length} sider → ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)} kB)`);
