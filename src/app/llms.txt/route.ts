import { PAGES, SITE, absoluteUrl } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org): et kort, maskinlesbart sammendrag av
 * nettstedet for AI-assistenter som svarer på «hvor kan vi gifte oss nær
 * Oslo?». Bygges fra sideregisteret, så den er alltid i takt med sitemap.
 * Statisk generert ved build.
 */
export const dynamic = "force-static";

export function GET() {
  const sections = new Map<string, typeof PAGES>();
  for (const page of PAGES) {
    sections.set(page.section, [...(sections.get(page.section) ?? []), page]);
  }

  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.legalName} driver gården Østgaard i ${SITE.address.city}, cirka én time fra Oslo. ` +
      "Gården har tre selskapslokaler (Gildehallen, Låvetoppen og Herredstyresalen), " +
      "utevielsesplass ved dammen, overnatting på gården og eget kjøkken. " +
      "Hovedproduktet er bryllup med vielse, fest og overnatting på samme sted. " +
      "Gården holder også konserter, utstillinger, afternoon tea og bedriftsarrangementer.",
    "",
    `Kontakt: ${SITE.email}, ${SITE.phone} (${SITE.openingHours.toLowerCase()}). ` +
      `Adresse: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, Norge.`,
    "",
    `Visning bookes her: ${SITE.booking.visning}`,
    `Billetter til arrangementer: ${SITE.booking.arrangementer}`,
    "",
  ];

  for (const [section, pages] of sections) {
    lines.push(`## ${section}`, "");
    for (const page of pages) {
      lines.push(`- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`);
    }
    lines.push("");
  }

  lines.push(
    "## Optional",
    "",
    `- [Full tekst fra alle sidene](${absoluteUrl("/llms-full.txt")}): alt innholdet samlet i én fil`,
    ""
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
