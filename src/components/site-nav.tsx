"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Toppmenyen. På desktop vises lenkene i linjen; på mobil (60 % av
 * besøkene) en hamburger som åpner full meny, og en klebrig bunnlinje med
 * «Book visning» og «Ring», så hovedkonverteringen alltid er innen
 * tommelens rekkevidde.
 *
 * Forsiden har logoen i toppbildet, så der er topplinjen borte: menyknappen
 * flyter over bildet og følger med nedover, og PC-en får noen få lenker oppå
 * bildet.
 */
export const NAV = [
  { label: "Bryllup", href: "/bryllup" },
  { label: "Priser", href: "/bryllup/pris" },
  { label: "Lokaler", href: "/lokaler" },
  { label: "Utevielse", href: "/utevielse" },
  { label: "Om Østgaard", href: "/#om" },
  { label: "Feiringer", href: "/#feiringer" },
  { label: "Arrangementer", href: "/#arrangementer" },
  { label: "Kontakt", href: "/#kontakt" },
];

/** Lenkene oppå toppbildet på forsiden, på PC. Resten ligger lenger ned på siden. */
const NAV_FORSIDE = NAV.slice(0, 4);

const cta =
  "inline-flex items-center justify-center border border-primary bg-primary px-4 py-2 text-xs tracking-[0.2em] whitespace-nowrap uppercase text-primary-foreground transition-colors hover:bg-primary/90";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const isHome = usePathname() === "/";

  // Lukk menyen ved navigasjon og lås skroll mens den er åpen.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const bottomBar = (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] gap-2 border-t bg-background/95 p-2 backdrop-blur sm:hidden">
      <Link href="/visning" className={`${cta} py-3`} data-cta="Book visning (bunn)">
        Book gratis visning
      </Link>
      <a
        href={SITE.phoneHref}
        className="inline-flex items-center justify-center gap-2 border px-4 py-3 text-xs tracking-[0.2em] uppercase"
        aria-label={`Ring ${SITE.phone}`}
      >
        <Phone className="size-4" /> Ring
      </a>
    </div>
  );

  if (isHome) {
    return (
      <>
        {/* Høyde 0: knappen ligger oppå bildet og tar ingen plass. */}
        <div className="sticky top-0 z-40 flex h-0 justify-end pr-3 xl:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobilmeny"
            aria-label="Åpne menyen"
            className="mt-3 inline-flex size-11 shrink-0 items-center justify-center border border-foreground/40 bg-background/55 text-foreground backdrop-blur"
          >
            <Menu className="size-5" />
          </button>
        </div>

        <div className="absolute inset-x-0 top-0 z-30 hidden justify-end px-6 pt-5 xl:flex">
          <nav className="flex items-center gap-7" aria-label="Hovedmeny">
            {NAV_FORSIDE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.66rem] tracking-[0.2em] uppercase text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/visning" className={cta} data-cta="Book visning (topp)">
              Book visning
            </Link>
          </nav>
        </div>

        {open ? (
          <nav
            id="mobilmeny"
            aria-label="Meny"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background px-6 pt-16 pb-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Lukk menyen"
              className="absolute top-3 right-3 inline-flex size-11 items-center justify-center border border-foreground/40"
            >
              <X className="size-5" />
            </button>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b py-3.5 font-serif text-xl"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/visning"
              onClick={() => setOpen(false)}
              className={`${cta} mt-6 py-3.5`}
              data-cta="Book visning (meny)"
            >
              Book gratis visning
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
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

        {bottomBar}
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="font-serif text-lg tracking-[0.35em] uppercase" onClick={() => setOpen(false)}>
            Østgaard
          </Link>
          <nav className="hidden items-center gap-4 xl:flex" aria-label="Hovedmeny">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs tracking-[0.18em] whitespace-nowrap uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {/* Egen wrapper: cta har inline-flex, som ellers vinner over hidden. */}
            <div className="hidden sm:block">
              <Link href="/visning" className={cta} data-cta="Book visning (topp)">
                Book visning
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobilmeny"
              aria-label={open ? "Lukk menyen" : "Åpne menyen"}
              className="inline-flex size-10 items-center justify-center border xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobilmeny"
            aria-label="Meny"
            className="absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] flex-col overflow-y-auto border-t bg-background px-4 py-6 xl:hidden"
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
      {bottomBar}
    </>
  );
}
