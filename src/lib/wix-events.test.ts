import { describe, expect, it } from "vitest";
import { onlyUpcoming, type SiteEvent } from "./wix-events";
import FALLBACK from "@/content/events.json";

const ev = (title: string, start: string): SiteEvent => ({
  title,
  start,
  location: null,
  href: "https://example.test/" + title,
  action: "Mer informasjon",
  description: null,
});

describe("onlyUpcoming", () => {
  it("skjuler passerte og sorterer stigende", () => {
    const list = [ev("c", "2026-12-01T18:00:00+01:00"), ev("a", "2026-01-01T18:00:00+01:00"), ev("b", "2026-10-20T18:00:00+02:00")];
    expect(onlyUpcoming(list, new Date("2026-10-06T12:00:00Z")).map((e) => e.title)).toEqual(["b", "c"]);
  });

  it("beholder arrangementet ut dagen det starter", () => {
    const list = [ev("i dag", "2026-10-06T10:00:00+02:00")];
    expect(onlyUpcoming(list, new Date("2026-10-06T20:00:00+02:00"))).toHaveLength(1);
  });
});

describe("events.json (fallback)", () => {
  it("har gyldige felter", () => {
    for (const e of FALLBACK as SiteEvent[]) {
      expect(e.title.length).toBeGreaterThan(0);
      expect(Number.isNaN(Date.parse(e.start)), e.start).toBe(false);
      expect(e.href).toMatch(/^https?:\/\//);
      expect(["Kjøp billetter", "Svar på invitasjon", "Mer informasjon"]).toContain(e.action);
    }
  });
});
