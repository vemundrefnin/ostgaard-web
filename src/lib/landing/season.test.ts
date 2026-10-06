import { describe, expect, it, afterEach } from "vitest";
import {
  currentSeason,
  occasionsForSeason,
  seasonBand,
  OCCASIONS,
} from "./season";

const at = (iso: string) => new Date(`${iso}T12:00:00Z`);

afterEach(() => {
  delete process.env.LANDING_SEASON;
});

describe("sesongkalenderen", () => {
  it("selger julebord august–november, altså FØR desember", () => {
    for (const month of ["08", "09", "10", "11"]) {
      expect(currentSeason(at(`2026-${month}-15`))).toBe("julebord");
    }
    // Desember er allerede fullbooket — da selges neste års konfirmasjon.
    expect(currentSeason(at("2026-12-15"))).toBe("konfirmasjon");
  });

  it("selger konfirmasjon des–feb for mai, og sommerfest mars–mai", () => {
    expect(currentSeason(at("2026-01-15"))).toBe("konfirmasjon");
    expect(currentSeason(at("2026-02-15"))).toBe("konfirmasjon");
    expect(currentSeason(at("2026-03-15"))).toBe("sommerfest");
    expect(currentSeason(at("2026-05-15"))).toBe("sommerfest");
  });

  it("viser bryllup i høysesongen juni–juli", () => {
    expect(currentSeason(at("2026-06-15"))).toBe("bryllup");
    expect(currentSeason(at("2026-07-15"))).toBe("bryllup");
  });

  it("dekker alle tolv måneder", () => {
    for (let m = 1; m <= 12; m++) {
      const iso = `2026-${String(m).padStart(2, "0")}-15`;
      expect(currentSeason(at(iso))).toBeTruthy();
    }
  });
});

describe("årstallet i båndet", () => {
  it("gjelder inneværende desember når julebord selges om høsten", () => {
    expect(seasonBand(at("2026-09-01"))?.eyebrow).toBe("Julebord 2026");
  });

  it("gjelder neste mai når konfirmasjon selges i desember", () => {
    expect(seasonBand(at("2026-12-01"))?.eyebrow).toBe("Konfirmasjon 2027");
  });

  it("gjelder inneværende mai når konfirmasjon selges i januar", () => {
    expect(seasonBand(at("2027-01-10"))?.eyebrow).toBe("Konfirmasjon 2027");
  });
});

describe("manuell overstyring", () => {
  it("tvinger fram en sesong uten deploy", () => {
    process.env.LANDING_SEASON = "julebord";
    expect(currentSeason(at("2026-04-15"))).toBe("julebord");
  });

  it("skjuler båndet med «none»", () => {
    process.env.LANDING_SEASON = "none";
    expect(currentSeason(at("2026-09-15"))).toBeNull();
    expect(seasonBand(at("2026-09-15"))).toBeNull();
  });

  it("ignorerer tull og faller tilbake på kalenderen", () => {
    process.env.LANDING_SEASON = "bananer";
    expect(currentSeason(at("2026-09-15"))).toBe("julebord");
  });
});

describe("rekkefølgen i «Hele året»", () => {
  it("løfter sesongens anledning først uten å miste noen", () => {
    const list = occasionsForSeason(at("2026-09-15"));
    expect(list[0].key).toBe("julebord");
    expect(list).toHaveLength(OCCASIONS.length);
    expect(new Set(list.map((o) => o.key)).size).toBe(OCCASIONS.length);
  });

  it("lar rekkefølgen stå i bryllupssesongen", () => {
    expect(occasionsForSeason(at("2026-06-15"))).toEqual(OCCASIONS);
  });
});
