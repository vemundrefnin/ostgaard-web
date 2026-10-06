import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXABLE) {
    // Preview-deploys og tiden før domenebyttet: ingenting skal indekseres.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/ingest/"] },
      // AI-crawlere er velkomne; llms.txt gir dem det korte sammendraget.
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
