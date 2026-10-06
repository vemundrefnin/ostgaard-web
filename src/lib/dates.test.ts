import { describe, expect, it } from "vitest";
import { asIsoDate } from "./dates";

describe("asIsoDate", () => {
  it("forstår norske og ISO-datoer", () => {
    expect(asIsoDate("12.06.2027")).toBe("2027-06-12");
    expect(asIsoDate("1/6/2027")).toBe("2027-06-01");
    expect(asIsoDate("2027-06-12")).toBe("2027-06-12");
  });
  it("lar fritekst og umulige datoer være", () => {
    expect(asIsoDate("juni 2027")).toBeNull();
    expect(asIsoDate("31.02.2027")).toBeNull();
    expect(asIsoDate("")).toBeNull();
  });
});
