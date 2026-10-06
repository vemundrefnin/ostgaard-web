"use client";

import { useEffect } from "react";

/**
 * PostHog (EU), lastet først etter at siden er interaktiv og bare når en
 * nøkkel finnes. Går via /ingest (rewrite i next.config.ts), så kallene er
 * førstepartskall til vårt eget domene. Uten NEXT_PUBLIC_POSTHOG_KEY lastes
 * ikke en eneste byte analytics-kode.
 */
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function Analytics() {
  useEffect(() => {
    if (!KEY) return;
    let cancelled = false;
    import("posthog-js").then(({ default: posthog }) => {
      if (cancelled) return;
      posthog.init(KEY, {
        api_host: "/ingest",
        ui_host: "https://eu.posthog.com",
        defaults: "2025-05-24",
        capture_pageview: "history_change",
        capture_exceptions: true,
        persistence: "memory",
      });
      posthog.register({ site: "garder-ostgaard.no" });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
