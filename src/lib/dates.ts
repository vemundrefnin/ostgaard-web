/** «12.06.2027», «12/6/2027» eller «2027-06-12» → «2027-06-12», ellers null. */
export function asIsoDate(text: string): string | null {
  const t = text.trim();
  let y: number, m: number, d: number;
  const iso = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  const nb = t.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (iso) [y, m, d] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  else if (nb) [y, m, d] = [Number(nb[3]), Number(nb[2]), Number(nb[1])];
  else return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return date.toISOString().slice(0, 10);
}
