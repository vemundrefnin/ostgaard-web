import type { ReactNode } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SITE } from "@/lib/site";

/**
 * Rammen rundt markedssidene: forsiden og undersidene som forgreiner seg fra
 * den. Innhold portert fra garder-ostgaard.no. Booking og billettsalg
 * (arrangementer, afternoon tea, visning) ligger fortsatt i det eksisterende
 * systemet og lenkes ut; disse sidene skal aldri erstatte de flytene.
 *
 * /info/* har sin egen, enklere ramme (src/app/info/layout.tsx).
 */

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground sm:pb-0">
      <SiteNav />

      {children}

      <footer id="kontakt" className="border-t bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg tracking-[0.3em] uppercase">Østgaard</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </p>
            <div className="mt-4 flex gap-4 text-xs tracking-[0.15em] uppercase text-muted-foreground">
              <a href={SITE.social.instagram} className="transition-colors hover:text-foreground">
                Instagram
              </a>
              <a href={SITE.social.facebook} className="transition-colors hover:text-foreground">
                Facebook
              </a>
              <a href={SITE.social.linkedin} className="transition-colors hover:text-foreground">
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Kontakt</p>
            <p className="mt-3 text-sm leading-relaxed">
              <a href={`mailto:${SITE.email}`} className="hover:underline">
                {SITE.email}
              </a>
              <br />
              <a href={SITE.phoneHref} className="hover:underline">
                {SITE.phone}
              </a>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.openingHours}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Snarveier</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a href="/visning" className="hover:underline">
                  Book visning
                </a>
              </li>
              <li>
                <Link href="/bryllup/pris" className="hover:underline">
                  Hva koster et bryllup?
                </Link>
              </li>
              <li>
                <a href={SITE.booking.arrangementer} className="hover:underline">
                  Arrangementer og billetter
                </a>
              </li>
              <li>
                <a href={SITE.booking.bedrift} className="hover:underline">
                  Bedriftspakker
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.legalName}
        </div>
      </footer>
    </div>
  );
}
