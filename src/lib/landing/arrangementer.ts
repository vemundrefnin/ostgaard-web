import { OCCASIONS, type Occasion } from "./season";

/**
 * Arrangementene på /selskap, i den rekkefølgen de står der og i båndet på
 * forsiden. `id` er ankeret (/selskap#julebord), `label` er stikkordet i
 * båndet, og `formType` forhåndsvelger typen i visningsskjemaet. Typene må
 * finnes i EVENT_TYPES i kjøreplan-appen, ellers blir henvendelsen et bryllup.
 *
 * Tekstene hentes fra OCCASIONS i season.ts, så forsiden og /selskap sier det
 * samme. «Annet» finnes bare her.
 */

export interface EventInfo {
  id: string;
  label: string;
  title: string;
  season: string | null;
  text: string;
  formType: string;
}

const from = (key: Occasion["key"]) => {
  const o = OCCASIONS.find((x) => x.key === key);
  if (!o) throw new Error(`Mangler ${key} i OCCASIONS`);
  return { title: o.title, season: o.season, text: o.text };
};

export const EVENTS: EventInfo[] = [
  { id: "kurs", label: "Kurs og konferanse", formType: "KURS_KONFERANSE", ...from("kurs") },
  { id: "sommerfest", label: "Sommerfest", formType: "SOMMERFEST", ...from("sommerfest") },
  { id: "julebord", label: "Julebord", formType: "JULEBORD", ...from("julebord") },
  { id: "jubileum", label: "Jubileum", formType: "SELSKAP", ...from("jubileum") },
  { id: "konfirmasjon", label: "Konfirmasjon", formType: "KONFIRMASJON", ...from("konfirmasjon") },
  { id: "minnestund", label: "Minnestund", formType: "MINNESTUND", ...from("minnestund") },
  {
    id: "annet",
    label: "Annet",
    formType: "ANNET",
    title: "Noe helt annet",
    season: null,
    text: "Afternoon tea for grupper på 15 eller flere, private middager, utstillinger eller et arrangement dere har funnet på selv. Fortell oss hva dere ser for dere, så finner vi en løsning sammen.",
  },
];

/** Lenken et stikkord i båndet skal gå til, eller null hvis det ikke finnes her. */
export function eventHref(label: string): string | null {
  const e = EVENTS.find((x) => x.label === label);
  return e ? `/selskap#${e.id}` : null;
}
