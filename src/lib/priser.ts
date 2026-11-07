/**
 * Bryllupsprisene, brukt av både prissiden og forsiden, så tallene aldri kan
 * spri fra hverandre.
 *
 * Tallene står her med vilje, ikke hentet fra kjøreplan-appen: prisene varierer
 * per år, og det holder å oppdatere dem for hånd. Bytt tall og PRICE_YEAR samlet
 * når ny prisliste gjelder. Sjekk mot /admin/pricing i kjøreplan-appen.
 */

export const PRICE_YEAR = 2028;

/** Tall med mellomrom som tusenskille, for eksempel 2 575 kr. */
export const kr = (n: number) => `${n.toLocaleString("nb-NO").replace(/\s/g, " ")} kr`;

export const MENUS = [
  { name: "3-retters meny", price: 2125, note: null, recommended: false },
  { name: "4-retters meny", price: 2575, note: "Med hvilerett (sorbet)", recommended: true },
  { name: "5-retters meny", price: 2800, note: "Med hvilerett (sorbet)", recommended: false },
  { name: "6-retters meny", price: 3075, note: "Med hvilerett (sorbet)", recommended: false },
  { name: "Grillmeny", price: 2625, note: "1. mai til 30. september", recommended: false },
];
