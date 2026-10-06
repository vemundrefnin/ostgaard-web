import { NextResponse } from "next/server";
import { asIsoDate } from "@/lib/dates";

/**
 * Visningsskjemaet leverer hit, og vi sender videre til kjøreplan-appen
 * (POST /api/public/henvendelse) som oppretter henvendelsen i pipelinen og
 * varsler vertskapet. Hemmeligheten ligger bare her på serveren, aldri i
 * nettleseren. Uten konfig svarer vi 503, og skjemaet viser e-post og
 * telefon i stedet, så ingen henvendelse forsvinner stille.
 */
export async function POST(request: Request) {
  const base = process.env.PLAN_API_URL?.replace(/\/$/, "");
  const secret = process.env.PUBLIC_FORM_SECRET;
  if (!base || !secret) {
    return NextResponse.json(
      { error: "Skjemaet er ikke koblet opp ennå." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Ugyldig skjema." }, { status: 400 });
  }
  // «12.06.2027» eller «2027-06-12» i når-feltet er en konkret dato, og
  // appen legger den inn som interessert dato. Alt annet blir fritekst.
  const date = asIsoDate(String(body.period ?? ""));
  if (date) {
    body.date = date;
    delete body.period;
  }

  const upstream = await fetch(`${base}/api/public/henvendelse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
      "X-Forwarded-For": request.headers.get("x-forwarded-for") ?? "",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  }).catch(() => null);

  if (!upstream) {
    return NextResponse.json({ error: "Fikk ikke kontakt. Prøv igjen om litt." }, { status: 502 });
  }
  const data = await upstream.json().catch(() => ({}));
  return NextResponse.json(data, { status: upstream.status });
}

