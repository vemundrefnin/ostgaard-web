import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DJ i bryllup på Østgaard",
  description:
    "Råd om DJ i bryllup (dansegulv, spilleliste og kveldens rytme) og praktisk informasjon for DJ-er som skal spille på Østgaard.",
};

/**
 * Public, shareable page aimed at DJs playing weddings at Østgaard. The
 * couple shares this link with their DJ from the Leverandører step.
 * Structured general-first for SEO: universal advice up top,
 * Østgaard-specifics further down.
 *
 * PLACEHOLDER CONTENT in the Østgaard sections — Nina/Lars fills in the real
 * practical details.
 */
export default function DjInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">DJ i bryllup</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Råd om musikk og dansegulv i bryllup, og lenger ned alt en DJ
          trenger å vite for å spille hos oss på Østgaard.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Musikk og dansegulv</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Dansegulvet bør ikke være for stort. Det skal være «trangt nok»
            til at folk danser sammen, ikke én i hvert hjørne. Bordene skyves
            gjerne til side etter middagen for å åpne gulvet.
          </li>
          <li>
            Dansingen starter typisk etter en luftepause: toastmasteren sender
            gjestene ut mens servitørene rydder gulvet, og baren åpner når de
            kommer tilbake.
          </li>
          <li>
            En god spilleliste fungerer også fint i bryllup, og mange velger det
            i stedet for DJ. Velger dere DJ, gi dem gjerne en liste over
            må-spilles-låter og en kort «aldri spill»-liste.
          </li>
          <li>
            De fleste lokaler har regler for lydnivå og når musikken må
            avsluttes. Avklar dette med lokalet i god tid.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">DJ på Østgaard: lydanlegget</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Østgaard har egen høyttaler du kan koble deg på, se{" "}
          <Link
            href="/info/hoyttaler"
            className="underline underline-offset-2 hover:text-foreground"
          >
            alt om JBL PartyBox 720 her
          </Link>{" "}
          (Bluetooth, eller kabel rett i kombiinngangen fra mikseren). For
          spilling utendørs uten strøm finnes også en batteridrevet{" "}
          <Link
            href="/info/soundboks"
            className="underline underline-offset-2 hover:text-foreground"
          >
            Soundboks
          </Link>{" "}
          (må avtales med Østgaard). Ta med egen mikser/DJ-bord og kabler.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Rigging og strøm</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>[Plassholder: hvor DJ-en står i Gildehallen/Låvetoppen.]</li>
          <li>[Plassholder: strømuttak og kurser ved DJ-plassen.]</li>
          <li>[Plassholder: når du kan komme og rigge / lydsjekke.]</li>
          <li>[Plassholder: parkering og inn-/utlasting.]</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Kjøreregler</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Skjenking avsluttes kl. 01.30, og siste dans planlegges rundt dette.</li>
          <li>[Plassholder: lydnivå/naboer og eventuelle tidsgrenser.]</li>
          <li>[Plassholder: kontaktperson på selve dagen.]</li>
        </ul>
      </section>

      <p className="border-t pt-4 text-sm text-muted-foreground">
        Spørsmål? Ta kontakt med vertskapet på Østgaard, eller med brudeparet
        som delte denne siden med deg. Se også{" "}
        <Link
          href="/info/toastmaster"
          className="underline underline-offset-2 hover:text-foreground"
        >
          toastmaster i bryllup
        </Link>
        .
      </p>
    </article>
  );
}
