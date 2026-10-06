import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { SITE, SITE_INDEXABLE, SITE_URL, absoluteUrl } from "@/lib/site";

/*
 * Fontene lastes via next/font: de hostes fra vårt eget domene og CSS-en
 * ligger inline i HTML-en, så ingen runde til Google ved sidelast.
 */
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans-app",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: SITE.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Østgaard i Halden" }],
  },
  twitter: { card: "summary_large_image" },
  // Indekseres først når SITE_INDEXABLE=true (Vercel Production etter
  // domenebyttet). Preview-deploys skal aldri havne i Google.
  robots: SITE_INDEXABLE
    ? { index: true, follow: true, "max-image-preview": "large" }
    : { index: false, follow: false },
};

/**
 * Strukturerte data for Google og AI-svar: hvem vi er, hvor vi er, hva vi
 * tilbyr. EventVenue er den mest presise typen for en selskapsgård.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["EventVenue", "LocalBusiness"],
      "@id": `${SITE_URL}/#venue`,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE_URL,
      image: absoluteUrl("/og.jpg"),
      description: SITE.description,
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressLocality: SITE.address.city,
        addressCountry: SITE.address.country,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "15:00",
      },
      sameAs: Object.values(SITE.social),
      areaServed: ["Halden", "Østfold", "Oslo", "Norge"],
      knowsAbout: ["bryllup", "utevielse", "selskapslokaler", "konferanse", "overnatting"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      inLanguage: "nb-NO",
      publisher: { "@id": `${SITE_URL}/#venue` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={`${display.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
