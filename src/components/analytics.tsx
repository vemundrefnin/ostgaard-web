"use client";

import { useEffect } from "react";
import { getPostHog, track } from "@/lib/posthog";

/**
 * Starter PostHog etter at siden er interaktiv, og lytter på klikk i hele
 * dokumentet, så CTA-er, telefon, e-post og billettlenker måles uten at
 * hver knapp må instrumenteres for hånd. Hvilken knapp som ble klikket
 * leses fra data-cta, href og teksten på elementet.
 */
export function Analytics() {
  useEffect(() => {
    void getPostHog();

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement | HTMLButtonElement>(
        "a, button"
      );
      if (!el) return;
      const href = el instanceof HTMLAnchorElement ? el.href : "";
      const label = (el.dataset.cta ?? el.textContent ?? "").trim().slice(0, 80);
      const props = { label, href, page: window.location.pathname };

      if (href.startsWith("tel:") || href.startsWith("mailto:")) {
        track("contact_click", { ...props, channel: href.startsWith("tel:") ? "telefon" : "epost" });
      } else if (/event-details|event-list|billett/i.test(href + label)) {
        track("ticket_click", props);
      } else if (el.dataset.cta || /visning|forespørsel|book/i.test(label)) {
        track("cta_click", props);
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
