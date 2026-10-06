import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Siden finnes ikke",
  robots: { index: false, follow: false },
};

/**
 * Skal i praksis aldri vises for en gammel lenke: alle stier fra den gamle
 * nettsiden ligger i src/lib/legacy-redirects.ts. Dukker den opp for en
 * adresse noen faktisk har brukt, er det en redirect som mangler.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Østgaard</p>
      <h1 className="mt-6 font-serif text-4xl font-medium">Denne siden finnes ikke lenger</h1>
      <p className="mt-4 text-muted-foreground">
        Nettsiden har fått ny form, og adressen du brukte er ikke i bruk lenger. Det du leter
        etter finner du sannsynligvis fra forsiden.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <Link
          href="/"
          className="inline-flex items-center border border-primary bg-primary px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-primary-foreground hover:bg-primary/90"
        >
          Til forsiden
        </Link>
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex items-center border px-5 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-secondary"
        >
          Kontakt oss
        </a>
      </div>
    </main>
  );
}
