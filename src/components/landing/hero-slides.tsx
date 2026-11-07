"use client";

import { useEffect, useState } from "react";
import Image, { getImageProps } from "next/image";

/**
 * Bildene som bytter seg i toppen av forsiden. Telefon og PC har hver sin
 * rekke, så telefonen kan få stående bilder og PC-en liggende, og rekkene kan
 * ha ulikt antall. Bare det første bildet lastes med en gang, resten kommer
 * etter noen sekunder så siden åpner raskt. Bildene i rekken som ikke vises,
 * lastes aldri. Med prefers-reduced-motion står det første bildet i ro.
 */

const VIS_I_MS = 5200;
const LAST_RESTEN_ETTER_MS = 3000;
const PC = "(min-width: 768px)";

type Slide = { src: string; alt: string };

const GILDEHALLEN: Slide = {
  src: "/images/landing/gildehallen-dekket.jpg",
  alt: "Gildehallen dekket til bryllupsmiddag med lysslynger i taket",
};

const PHONE: Slide[] = [
  GILDEHALLEN,
  { src: "/images/landing/brudepar-hage.jpg", alt: "Brudepar hånd i hånd på vei gjennom hagen på Østgaard" },
  { src: "/images/landing/paviljong-dammen.jpg", alt: "Hvit paviljong som speiler seg i dammen på Østgaard" },
  { src: "/images/landing/hovedhuset-regnbue.jpg", alt: "Hovedhuset på Østgaard med regnbue over" },
  { src: "/images/landing/brud-bukett.jpg", alt: "Brud med bukett i hagen på Østgaard" },
  { src: "/images/landing/lavetoppen-bord.jpg", alt: "Dekket bord med blomster og lys i Låvetoppen" },
  { src: "/images/landing/brud-inngang-gildehallen.jpg", alt: "Brudeparet går inn i Gildehallen under lysslyngene" },
  { src: "/images/landing/gildehallen-fest.jpg", alt: "Dekket bord under lysslyngene i Gildehallen mens festen er i gang" },
];

const DESKTOP: Slide[] = [
  GILDEHALLEN,
  { src: "/images/landing/brudepar-bil.jpg", alt: "Brudepar ved en rød veteranbil på Østgaard" },
  { src: "/images/landing/paviljong-sommer.jpg", alt: "Paviljongen ved dammen en sommerdag" },
  { src: "/images/landing/brudepar-klem.jpg", alt: "Brudepar som klemmer hverandre i hagen på Østgaard" },
  { src: "/images/landing/gildehallen-gjester.jpg", alt: "Gjester som ler under talene i Gildehallen" },
  { src: "/images/landing/lavetoppen-lysekroner.jpg", alt: "Lysekroner og draperier i taket i Låvetoppen under festen" },
  { src: "/images/landing/lavetoppen-dekket.jpg", alt: "Låvetoppen dekket til bryllup med runde bord og blomster" },
];

/** Første bilde: telefon og PC får hvert sitt, i samme element, uten dobbel lasting. */
function FirstSlide() {
  const common = { alt: PHONE[0].alt, fill: true, sizes: "100vw", priority: true };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: DESKTOP[0].src });
  const { props: phoneProps } = getImageProps({ ...common, src: PHONE[0].src });

  return (
    <picture>
      <source media={PC} srcSet={desktopSrcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt ligger i phoneProps */}
      <img {...phoneProps} className="object-cover" />
    </picture>
  );
}

export function HeroSlides() {
  const [isPc, setIsPc] = useState(false);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(PC);
    const update = () => {
      setIsPc(mq.matches);
      setActive(0);
      setPrevious(null);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const count = isPc ? DESKTOP.length : PHONE.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const load = setTimeout(() => setLoadRest(true), LAST_RESTEN_ETTER_MS);
    const rotate = setInterval(() => {
      setActive((current) => {
        setPrevious(current);
        return (current + 1) % count;
      });
    }, VIS_I_MS);
    return () => {
      clearTimeout(load);
      clearInterval(rotate);
    };
  }, [count]);

  const slides = Math.max(PHONE.length, DESKTOP.length);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: slides }, (_, i) =>
        i === 0 || loadRest ? (
          <div
            key={i}
            aria-hidden={i !== active}
            className={`hero-slide absolute inset-0 ${i === active ? "is-active" : ""} ${
              i === active || i === previous ? "is-moving" : ""
            }`}
          >
            {i === 0 ? (
              <FirstSlide />
            ) : (
              <>
                {/* Skjult rekke har display:none, så de bildene lastes ikke. */}
                {PHONE[i] && (
                  <div className="absolute inset-0 md:hidden">
                    <Image src={PHONE[i].src} alt={PHONE[i].alt} fill sizes="100vw" className="object-cover" />
                  </div>
                )}
                {DESKTOP[i] && (
                  <div className="absolute inset-0 hidden md:block">
                    <Image src={DESKTOP[i].src} alt={DESKTOP[i].alt} fill sizes="100vw" className="object-cover" />
                  </div>
                )}
              </>
            )}
          </div>
        ) : null
      )}
    </div>
  );
}
