"use client";

import { useEffect, useState } from "react";

/**
 * Dronefilmen som hero-bakgrunn (Østgaards egen footage, klipp 0062:
 * klatring over plenen som ender i en tilt-opp-avsløring av hovedhuset,
 * dammen og jordene). Spiller dempet ÉN gang og fryser på sluttbildet —
 * ingen loop-hopp, og siden faller til ro. Med prefers-reduced-motion —
 * og til videoen kan spilles — vises stillbildet i stedet. 2 MB.
 */
export function HeroVideo({ poster }: { poster: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowVideo(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Stillbildet ligger alltid i bunn, så det aldri blinker svart. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover"
      />
      {showVideo && (
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src="/images/landing/hero-drone.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
