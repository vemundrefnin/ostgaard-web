import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Høyttaler: JBL PartyBox 720 på Østgaard",
  description:
    "Om JBL PartyBox 720-høyttalerne på Østgaard: lyd, tilkobling og praktisk info for DJ-er, band og brudepar.",
};

/**
 * Public, shareable page about Østgaard's JBL PartyBox 720 speakers. Content
 * is deliberately owned here (not a link to the manufacturer) so it never
 * changes under us and can carry Østgaard-specific details.
 */
export default function SpeakerInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">
          Høyttaler: JBL PartyBox 720
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          For DJ-er, band, toastmastere og brudepar som skal spille musikk hos
          oss. Del gjerne denne siden videre.
        </p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element -- EXIF-rotated
          photos render correctly with a plain img */}
      <img
        src="/images/info/hoyttaler-front.jpg"
        alt="JBL PartyBox 720 i festlokalet på Østgaard"
        className="w-full border"
      />

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Viktig å vite på Østgaard</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Østgaard har <strong>to</strong> JBL PartyBox 720, men bare{" "}
            <strong>én er garantert tilgjengelig per bryllup</strong> (den
            andre kan være i bruk i et annet lokale). Trenger dere begge, for
            eksempel til stereo eller to områder, må det{" "}
            <strong>avtales og bekreftes med Østgaard på forhånd</strong>.
          </li>
          <li>
            De to kan pares trådløst (Auracast) for stereo eller samspill,
            hvis begge er bekreftet tilgjengelige.
          </li>
          <li>
            Høyttaleren brukes normalt med strømkabel. Gi beskjed hvis dere
            ønsker musikk et sted uten strømuttak, så finner vi en løsning.
          </li>
          <li>
            Den står på hjul med teleskophåndtak og flyttes enkelt mellom
            lokalene og plenen (den tåler vannsprut, IPX4, men skal ikke stå
            ute i regn).
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Lyden</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>800 W RMS, som dekker fint både festlokalet og plenen.</li>
          <li>To 9-tommers basselementer og to diskantelementer.</li>
          <li>
            Innebygd lysshow rundt elementene som pulserer med musikken. Det kan
            justeres eller slås helt av i JBL One-appen.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Tilkobling</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/info/hoyttaler-panel.jpg"
          alt="Tilkoblingspanelet på JBL PartyBox 720"
          className="w-full border"
        />
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong>Bluetooth 5.4</strong> er enkleste vei: koble til fra
            mobil, PC eller DJ-utstyr med Bluetooth.
          </li>
          <li>
            <strong>To mikrofoninnganger</strong> (kombi XLR / 6,3 mm jack)
            med hver sin gain-kontroll. Inngang 2 kan byttes til
            linje/instrument, så en DJ-mikser eller gitar kan kobles rett inn
            med kabel.
          </li>
          <li>
            <strong>AUX inn</strong> (3,5 mm minijack) og <strong>USB-C</strong>{" "}
            for avspilling.
          </li>
          <li>
            <strong>Daisy chain inn/ut</strong> for kabling mot flere
            høyttalere.
          </li>
          <li>Ta med egne kabler til det utstyret dere selv bruker.</li>
        </ul>
      </section>

      <p className="border-t pt-4 text-sm text-muted-foreground">
        Gården har også en kraftig{" "}
        <Link
          href="/info/soundboks"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Soundboks
        </Link>{" "}
        (må avtales). Se også{" "}
        <Link
          href="/info/dj"
          className="underline underline-offset-2 hover:text-foreground"
        >
          DJ på Østgaard
        </Link>
        ,{" "}
        <Link
          href="/info/mikrofon"
          className="underline underline-offset-2 hover:text-foreground"
        >
          mikrofonen
        </Link>{" "}
        og{" "}
        <Link
          href="/info/myggmikrofon"
          className="underline underline-offset-2 hover:text-foreground"
        >
          myggmikrofonen
        </Link>
        . Spørsmål? Ta kontakt med vertskapet på Østgaard.
      </p>
    </article>
  );
}
