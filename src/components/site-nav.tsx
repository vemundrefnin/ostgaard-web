"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Toppmenyen. På desktop vises lenkene i linjen; på mobil (60 % av
 * besøkene) en hamburger som åpner full meny, og en klebrig bunnlinje med
 * «Book visning» og «Ring», så hovedkonverteringen alltid er innen
 * tommelens rekkevidde.
 */
export const NAV = [
  { label: "Bryllup", href: "/bryllup" },
  { label: "Lokaler", href: "/lokaler" },
  { label: "Utevielse", href: "/utevielse" },
  { label: "Om Østgaard", href: "/#om" },
  { label: "Feiringer", href: "/#feiringer" },
  { label: "Arrangementer", href: "/#arrangementer" },
  { label: "Gårdsbutikken", href: "/#fru-ostgaard" },
  { label: "Kontakt", href: "/#kontakt" },
];

const cta =
  "inline-flex items-center justify-center border border-primary bg-primary px-4 py-2 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  // Lukk menyen ved navigasjon og lås skroll mens den er åpen.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="font-serif text-lg tracking-[0.35em] uppercase" onClick={() => setOpen(false)}>
            Østgaard
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Hovedmeny">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/visning" className={`${cta} hidden sm:inline-flex`} data-cta="Book visning (topp)">
              Book visning
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobilmeny"
              aria-label={open ? "Lukk menyen" : "Åpne menyen"}
              className="inline-flex size-10 items-center justify-center border lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobilmeny"
            aria-label="Meny"
            className="absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] flex-col overflow-y-auto border-t bg-background px-4 py-6 lg:hidden"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b py-4 font-serif text-2xl"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/visning" onClick={() => setOpen(false)} className={`${cta} mt-6 py-3`} data-cta="Book visning (meny)">
              Book visning
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">
              <a href={SITE.phoneHref} className="underline">
                {SITE.phone}
              </a>
              <br />
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
            </p>
          </nav>
        ) : null}
      </header>

      {/* Klebrig bunnlinje på mobil. Skjult på sm+ der toppknappen vises. */}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] gap-2 border-t bg-background/95 p-2 backdrop-blur sm:hidden">
        <Link href="/visning" className={`${cta} py-3`} data-cta="Book visning (bunn)">
          Book visning
        </Link>
        <a
          href={SITE.phoneHref}
          className="inline-flex items-center justify-center gap-2 border px-4 py-3 text-xs tracking-[0.2em] uppercase"
          aria-label={`Ring ${SITE.phone}`}
        >
          <Phone className="size-4" /> Ring
        </a>
      </div>
    </>
  );
}
