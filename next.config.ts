import type { NextConfig } from "next";
import { activeRedirects } from "./src/lib/legacy-redirects";

const nextConfig: NextConfig = {
  // Alle sider er statiske (SSG/ISR) og serveres fra Vercels CDN. Ingen
  // database, ingen innlogging, ingen API-ruter som trenger server per request.
  async redirects() {
    return [
      // østgaard.no (punycode xn--stgaard-p1a.no) eies av oss, men alt skal til
      // garder-ostgaard.no: ingen ø i URL-er, mer kjent navn og bedre SEO.
      {
        source: "/:path*",
        has: [{ type: "host", value: "xn--stgaard-p1a.no" }],
        destination: "https://garder-ostgaard.no/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.xn--stgaard-p1a.no" }],
        destination: "https://garder-ostgaard.no/:path*",
        permanent: true,
      },
      // www → apex, én kanonisk adresse.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.garder-ostgaard.no" }],
        destination: "https://garder-ostgaard.no/:path*",
        permanent: true,
      },
      // Alle URL-ene fra gamle garder-ostgaard.no (Wix) og fra tiden sidene lå
      // under /landing i kjøreplan-appen. Se src/lib/legacy-redirects.ts.
      ...activeRedirects(),
    ];
  },
  async headers() {
    return [
      // Til SITE_INDEXABLE=true: noindex som HTTP-header på ALT, også bilder,
      // og.jpg, llms.txt og sitemap.xml som ikke kan bære en <meta robots>.
      // robots.txt og <meta> sier det samme; dette er beltet til bukseselen.
      ...(process.env.SITE_INDEXABLE === "true"
        ? []
        : [
            {
              source: "/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
            },
          ]),
      {
        // Bilder og video endrer seg sjelden og får nytt innhold ved deploy.
        // Lang CDN-cache, kort nettleser-cache, så et byttet bilde vises innen
        // en dag uten at vi må døpe om filer.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    // PostHog via eget domene: ingen tredjepartskall å blokkere, ingen DNS.
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  images: {
    // AVIF først, WebP som fallback. Vercel optimaliserer ved første kall og
    // cacher resultatet på CDN.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
