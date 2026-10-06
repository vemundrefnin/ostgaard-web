import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Soundboks på Østgaard",
  description:
    "Om Soundboks-høyttaleren på Østgaard, en batteridrevet festhøyttaler for uteområdene. Tilgang må avtales med Østgaard.",
};

/**
 * Public, shareable page about Østgaard's SOUNDBOKS Gen. 3 — the
 * battery-powered speaker for places without power. Access must be agreed
 * with Østgaard.
 */
export default function SoundboksInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">
          Soundboks (Gen. 3)
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Batteridrevet festhøyttaler, perfekt der det ikke er strøm. Del
          gjerne denne siden videre.
        </p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element -- EXIF-rotated
          photos render correctly with a plain img */}
      <img
        src="/images/info/soundboks-panel.jpg"
        alt="Kontrollpanelet på Soundboks Gen. 3, med volum fra 0 til 11"
        className="w-full border"
      />

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Viktig å vite på Østgaard</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Soundboksen er ikke automatisk med i bryllupet:{" "}
            <strong>tilgang må avtales med Østgaard på forhånd</strong>.
          </li>
          <li>
            Den går på <strong>batteri</strong> og trenger ikke strømuttak.
            Derfor er den fin til uteområdene, vielsen på plenen eller andre
            steder langt fra stikkontakt.
          </li>
          <li>
            Batteriet varer omtrent 40 timer på moderat volum (langt kortere
            på fullt volum), og kan byttes på sekunder.
          </li>
          <li>Den veier ca. 15 kg og bæres greit av én til to personer.</li>
          <li>
            Den er bygget for utendørs bruk og tåler sprut og støv, men skal
            ikke stå ute i regnvær over tid.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Lyden</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Opptil 126 dB, blant de kraftigste bærbare
            Bluetooth-høyttalerne som lages.
          </li>
          <li>To 10-tommers basselementer og en diskant.</li>
          <li>
            Kan kobles trådløst sammen med flere Soundboks-høyttalere
            (TeamUP-knappen: SOLO/JOIN/HOST).
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Tilkobling</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/info/soundboks-tilkobling.jpg"
          alt="Tilkoblingspanelet på Soundboks med AUX inn/ut og to kombiinnganger"
          className="w-full border"
        />
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong>Bluetooth</strong> er enkleste vei: koble til fra mobil
            eller PC.
          </li>
          <li>
            <strong>To kombiinnganger</strong> (XLR / 6,3 mm jack, CH 1 og
            CH 2) for mikrofon, gitar eller mikser.
          </li>
          <li>
            <strong>AUX inn/ut</strong> (3,5 mm minijack). Ut-porten kan
            sende signalet videre til en annen høyttaler.
          </li>
          <li>Ta med egne kabler til det utstyret dere selv bruker.</li>
        </ul>
      </section>

      <p className="border-t pt-4 text-sm text-muted-foreground">
        Innendørs (og på plenen ved strøm) er{" "}
        <Link
          href="/info/hoyttaler"
          className="underline underline-offset-2 hover:text-foreground"
        >
          JBL PartyBox 720
        </Link>{" "}
        førstevalget. Se også{" "}
        <Link
          href="/info/dj"
          className="underline underline-offset-2 hover:text-foreground"
        >
          DJ på Østgaard
        </Link>
        . Spørsmål? Ta kontakt med vertskapet på Østgaard.
      </p>
    </article>
  );
}
