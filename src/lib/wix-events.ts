import { WIX_URL } from "@/lib/site";
import FALLBACK from "@/content/events.json";

/**
 * Kommende arrangementer fra Wix Events. Billettsalget blir værende i Wix
 * (billettsystem med app, innsjekk osv.); vi leser bare listen og lenker
 * til kjøpssiden der.
 *
 * Krever WIX_API_KEY (Wix-konto → API Keys, tillatelsen «Wix Events: Read
 * Events») og WIX_SITE_ID. Uten dem, eller hvis Wix svarer feil, brukes
 * src/content/events.json. Passerte datoer skjules alltid, så listen aldri
 * viser noe som allerede er over. Forsiden regenereres hver time.
 */

export interface SiteEvent {
  title: string;
  /** ISO 8601 med tidssone, som Wix gir den. */
  start: string;
  location: string | null;
  /** Lenke til arrangementssiden i Wix, der billetter kjøpes. */
  href: string;
  /** Hva knappen skal hete, ut fra påmeldingstypen i Wix. */
  action: "Kjøp billetter" | "Svar på invitasjon" | "Mer informasjon";
  description: string | null;
}

interface WixEvent {
  title?: string;
  slug?: string;
  status?: string;
  dateAndTimeSettings?: { startDate?: string; formatted?: { dateAndTime?: string } };
  location?: { name?: string };
  registration?: { status?: string; type?: string };
  shortDescription?: string;
}

const WIX_API = "https://www.wixapis.com/events/v3/events/query";

function actionFor(registrationStatus: string | undefined): SiteEvent["action"] {
  switch (registrationStatus) {
    case "OPEN_TICKETS":
    case "OPEN_EXTERNAL":
      return "Kjøp billetter";
    case "OPEN_RSVP":
    case "OPEN_RSVP_WAITLIST_ONLY":
    case "SCHEDULED_RSVP":
      return "Svar på invitasjon";
    default:
      return "Mer informasjon";
  }
}

async function fromWix(limit: number): Promise<SiteEvent[] | null> {
  const key = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!key || !siteId) return null;

  const res = await fetch(WIX_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
      "wix-site-id": siteId,
    },
    body: JSON.stringify({
      query: {
        filter: { status: { $in: ["UPCOMING", "STARTED"] } },
        sort: [{ fieldName: "dateAndTimeSettings.startDate", order: "ASC" }],
        paging: { limit, offset: 0 },
      },
      fields: ["DETAILS", "REGISTRATION"],
    }),
    // Forsiden har revalidate = 3600; dette cacher svaret like lenge.
    next: { revalidate: 3600 },
  }).catch(() => null);

  if (!res?.ok) {
    console.warn("[wix-events] Wix svarte", res?.status ?? "ingen kontakt");
    return null;
  }
  const data = (await res.json().catch(() => null)) as { events?: WixEvent[] } | null;
  if (!data?.events) return null;

  return data.events
    .filter((e) => e.title && e.slug && e.dateAndTimeSettings?.startDate)
    .map((e) => ({
      title: e.title!,
      start: e.dateAndTimeSettings!.startDate!,
      location: e.location?.name ?? null,
      href: `${WIX_URL}/event-details/${e.slug}`,
      action: actionFor(e.registration?.status),
      description: e.shortDescription ?? null,
    }));
}

/** Kommende arrangementer, maks `limit`, aldri passerte. */
export async function upcomingEvents(limit = 4): Promise<SiteEvent[]> {
  const list = (await fromWix(limit)) ?? (FALLBACK as SiteEvent[]);
  return onlyUpcoming(list, new Date()).slice(0, limit);
}

/** Ren funksjon så filtreringen kan testes: fjerner alt som er passert. */
export function onlyUpcoming(events: SiteEvent[], now: Date): SiteEvent[] {
  // Et arrangement regnes som aktuelt ut dagen det starter.
  const cutoff = new Date(now);
  cutoff.setUTCHours(0, 0, 0, 0);
  return events
    .filter((e) => new Date(e.start).getTime() >= cutoff.getTime())
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Oslo",
  }).format(new Date(iso));
}
