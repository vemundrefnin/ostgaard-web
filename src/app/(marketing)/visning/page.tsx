import type { Metadata } from "next";
import Image from "next/image";
import { VisningForm } from "@/components/visning-form";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book visning på Østgaard",
  description:
    "Kom og se lokalene, hagen og vielsesplassen med egne øyne. Visningen er uforpliktende og kostnadsfri, og vi svarer innen én virkedag.",
};

/**
 * Konverteringssiden: alle «Book visning»-knapper lander her. Skjemaet står
 * øverst, uten distraksjoner, og det som trengs for å tørre å sende er
 * samlet ved siden av: hva som skjer etterpå, hvem som svarer, og at det
 * ikke koster noe.
 */
export default function VisningPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-[1fr_minmax(0,1.3fr)] lg:py-20">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Book visning</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">
            Kom og se Østgaard med egne øyne
          </h1>
          <p className="mt-4 text-muted-foreground">
            Vi møter dere på gården, viser lokalene, hagen og vielsesplassen ved dammen, og
            snakker om hvordan akkurat deres dag kan se ut. Visningen tar omtrent en time, er
            uforpliktende og koster ingenting.
          </p>

          <ol className="mt-8 space-y-4 text-sm">
            {[
              ["Send skjemaet", "Vi trenger bare navn, e-post og en omtrentlig dato."],
              ["Vi svarer innen én virkedag", "Dere får forslag til tidspunkt, gjerne en ettermiddag eller lørdag."],
              ["Møt oss på gården", "Nina og Lars tar imot, og dere kan stille alle spørsmål dere har."],
            ].map(([h, t], i) => (
              <li key={h} className="flex gap-4">
                <span className="font-serif text-2xl leading-none text-muted-foreground">{i + 1}</span>
                <div>
                  <p className="font-medium">{h}</p>
                  <p className="text-muted-foreground">{t}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden border lg:block">
            <Image
              src="/images/landing/brudepar.jpg"
              alt="Brudepar i hagen på Østgaard"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Vil dere heller ringe eller skrive direkte?{" "}
            <a href={SITE.phoneHref} className="underline">
              {SITE.phone}
            </a>{" "}
            eller{" "}
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>
            . {SITE.openingHours}.
          </p>
        </div>

        <div className="border bg-secondary/30 p-6 sm:p-8">
          <VisningForm />
        </div>
      </section>
    </main>
  );
}
