"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { track } from "@/lib/posthog";

/**
 * Visningsskjemaet: det korteste skjemaet som gir vertskapet nok til å svare
 * med noe konkret. Leverer til /api/visning, som sender videre til
 * kjøreplan-appen. Feiler koblingen, vises e-post og telefon, aldri en død
 * knapp. «website»-feltet er en honningfelle som bare roboter fyller ut.
 */

const TYPES = [
  { value: "BRYLLUP", label: "Bryllup" },
  { value: "KONFIRMASJON", label: "Konfirmasjon" },
  { value: "SOMMERFEST", label: "Sommerfest eller firmafest" },
  { value: "JULEBORD", label: "Julebord" },
  { value: "MINNESTUND", label: "Minnestund" },
];

const input =
  "w-full border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";
const label = "block text-xs tracking-[0.15em] uppercase text-muted-foreground";

export function VisningForm() {
  // «?type=SOMMERFEST» fra knapper som «Spør om bedriftsarrangement»
  // forhåndsvelger typen. Settes rett på select-elementet i nettleseren,
  // så siden kan prerendres statisk med skjemaet i HTML-en.
  const typeRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("type") ?? "";
    if (typeRef.current && TYPES.some((t) => t.value === wanted)) typeRef.current.value = wanted;
  }, []);
  const page = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/visning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Noe gikk galt.");
      }
      setState("sent");
      track("inquiry_submitted", { event_type: data.eventType, page });
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Noe gikk galt.");
      track("inquiry_failed", { page });
    }
  }

  if (state === "sent") {
    return (
      <div className="border bg-secondary/40 px-6 py-8" role="status">
        <p className="font-serif text-2xl">Takk, vi har fått henvendelsen deres.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Vi svarer innen én virkedag med forslag til tidspunkt for visning. Haster det, ring oss
          på{" "}
          <a href={SITE.phoneHref} className="underline">
            {SITE.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => {
        if (!touched) {
          setTouched(true);
          track("inquiry_started", { page });
        }
      }}
      className="grid gap-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Navn
          </label>
          <input id="name" name="name" required autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            E-post
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={input} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Telefon
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </div>
        <div>
          <label htmlFor="eventType" className={label}>
            Hva skal feires?
          </label>
          <select id="eventType" name="eventType" ref={typeRef} defaultValue="BRYLLUP" className={input}>
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="period" className={label}>
            Når? (dato eller for eksempel «juni 2027»)
          </label>
          <input id="period" name="period" placeholder="Gjerne omtrentlig" className={input} />
        </div>
        <div>
          <label htmlFor="guestCount" className={label}>
            Omtrent hvor mange gjester?
          </label>
          <input id="guestCount" name="guestCount" type="number" min={1} inputMode="numeric" className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={label}>
          Er det noe dere lurer på allerede nå?
        </label>
        <textarea id="message" name="message" rows={4} className={input} />
      </div>
      {/* Honningfelle: skjult for mennesker, fristende for roboter. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Nettside</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" ? (
        <p className="border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm" role="alert">
          {error} Send oss gjerne en e-post på{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>{" "}
          eller ring{" "}
          <a href={SITE.phoneHref} className="underline">
            {SITE.phone}
          </a>
          .
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          data-cta="Send forespørsel om visning"
          className="inline-flex items-center border border-primary bg-primary px-6 py-3 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {state === "sending" ? "Sender …" : "Send forespørsel om visning"}
        </button>
        <p className="text-xs text-muted-foreground">Uforpliktende og kostnadsfritt. Vi svarer innen én virkedag.</p>
      </div>
    </form>
  );
}
