"use client";

import type { PostHog } from "posthog-js";

/**
 * PostHog (EU), samme prosjekt som kjøreplan-appen, så trakten fra nettside
 * til henvendelse til signert kontrakt kan følges i én graf. Lastes lazy og
 * bare når NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN er satt; uten nøkkel er alle kall no-op.
 * Går via /ingest (rewrite i next.config.ts), altså førstepartskall.
 */
const KEY = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
let client: Promise<PostHog | null> | null = null;

export function getPostHog(): Promise<PostHog | null> {
  if (!KEY || typeof window === "undefined") return Promise.resolve(null);
  if (!client) {
    client = import("posthog-js").then(({ default: posthog }) => {
      posthog.init(KEY, {
        api_host: "/ingest",
        ui_host: "https://eu.posthog.com",
        defaults: "2025-05-24",
        capture_pageview: "history_change",
        capture_pageleave: true,
        capture_exceptions: true,
        // Ingen cookies: minne-persistens holder til trakt per besøk, og vi
        // slipper samtykkebanner for en ren markedsside.
        persistence: "memory",
      });
      posthog.register({ site: "garder-ostgaard.no" });
      return posthog;
    });
  }
  return client;
}

/** Konverteringshendelser. Navnene er kontrakten mot PostHog-dashbordet. */
export type SiteEvent =
  | "cta_click"
  | "contact_click"
  | "inquiry_started"
  | "inquiry_submitted"
  | "inquiry_failed"
  | "ticket_click"
  | "section_viewed";

export function track(event: SiteEvent, properties?: Record<string, unknown>) {
  void getPostHog().then((ph) => ph?.capture(event, properties));
}
