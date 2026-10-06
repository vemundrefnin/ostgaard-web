import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prosjektor og lerret på Østgaard",
  description:
    "Om prosjektoren og det elektriske lerretet på Låvetoppen, til bildefremvisninger og taler i bryllup på Østgaard.",
};

/**
 * Public, shareable page about the ceiling-mounted projector and electric
 * screen in Låvetoppen. Written generically on purpose (no exact model
 * claims beyond what's visible) — Østgaard owns and maintains the setup.
 */
export default function ProjectorInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">
          Prosjektor og lerret
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Til bildefremvisninger, taler og film. Tilgjengelig på Låvetoppen.
          Del gjerne denne siden med toastmaster eller den som skal holde
          fremvisningen.
        </p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element -- EXIF-rotated
          photos render correctly with a plain img */}
      <img
        src="/images/info/prosjektor.jpg"
        alt="Takmontert BenQ-prosjektor på Låvetoppen"
        className="w-full border"
      />

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Slik fungerer det</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Prosjektoren (BenQ) er <strong>fastmontert i taket</strong> på
            Låvetoppen og skal ikke flyttes eller justeres.
          </li>
          <li>
            Lerretet er <strong>elektrisk</strong> og senkes ned foran det
            store vinduet.
          </li>
          <li>
            En <strong>HDMI-kabel er trukket i taket</strong> og kommer ned
            ved siden av lerretet. Koble PC-en til der, så er dere i gang.
          </li>
          <li>
            Har maskinen deres ikke HDMI-utgang (f.eks. bare USB-C), må dere
            ta med egen adapter.
          </li>
        </ul>
      </section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/info/prosjektor-lerret.jpg"
        alt="Det elektriske lerretet montert over vinduet på Låvetoppen"
        className="w-full border"
      />

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Verdt å vite</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Vi anbefaler å koble til og teste fremvisningen{" "}
            <strong>dagen før bryllupet</strong>, så alt er klart når talene
            starter.
          </li>
          <li>
            I <strong>Gildehallen</strong> finnes et flyttbart lerret, men der
            må prosjektor medbringes selv.
          </li>
          <li>
            Lyd til fremvisningen spilles best over høyttaleren, se{" "}
            <Link
              href="/info/hoyttaler"
              className="underline underline-offset-2 hover:text-foreground"
            >
              JBL PartyBox 720
            </Link>
            .
          </li>
        </ul>
      </section>

      <p className="border-t pt-4 text-sm text-muted-foreground">
        Spørsmål? Ta kontakt med vertskapet på Østgaard, eller med brudeparet
        som delte denne siden med deg.
      </p>
    </article>
  );
}
