import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fotograf i bryllup på Østgaard",
  description:
    "Råd om bryllupsfotografering (tidsbruk, pris og planlegging) og en guide til fotospots og praktisk info for fotografer på Østgaard.",
};

/**
 * Public, shareable page aimed at wedding photographers (and couples choosing
 * one). Structured general-first for SEO: universal advice up top,
 * Østgaard-specifics (photo spots, befaring) further down. The couple shares
 * this link from the Leverandører step.
 */
export default function PhotographerInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">Fotograf i bryllup</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Råd til brudepar som skal velge fotograf, og lenger ned en guide
          for fotografer som skal jobbe i bryllup på Østgaard.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Tidsbruken på dagen</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Ikke bruk hele minglingen på bilder. Ber fotografen om to timer,
            vurder å prioritere mer tid sammen med gjestene. Det er
            hyggeligere for alle at brudeparet ikke bare tar bilder og går
            rett i middagen.
          </li>
          <li>
            Fordel gjerne bildene på flere steder, noen ved vielsesstedet og
            noen ved festlokalet, så dagen dokumenteres fra alle stedene.
          </li>
          <li>
            En fin rytme: litt bilder rett etter vielsen, tilbake til gjestene
            for kakeskjæring eller mingling, så en ny liten fotorunde.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Å velge fotograf</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Som prisreferanse er 25 000–35 000 kr for både foto og video
            rimelig; spennet går opp mot 60–70 000 kr for de største pakkene
            med drone. Det er verdt å sammenligne.
          </li>
          <li>Bruk bekjentskaper og kontakter der dere kan.</li>
          <li>
            Stol på fotografen, og la dem følge sin egen visjon og finne vinkler
            ingen andre har tenkt på.
          </li>
          <li>
            Ved regn: vurder å kjøpe inn like paraplyer til gjestene. Det ser
            mye mer stilfullt ut på bildene enn tilfeldige paraplyer.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Fotograf på Østgaard</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Skal du fotografere et bryllup hos oss? Har du ikke vært på gården
          før, anbefaler vi en befaring i forkant. Da får du sett stedet og
          planlagt motivene i ro og mak. Ta kontakt med vertskapet, så finner
          vi et tidspunkt.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong>Dammen</strong> med paviljong og brygge. Man kan gå hele
            veien rundt, og det er gårdens mest brukte fotospot.
          </li>
          <li>
            <strong>Blomsterhagen</strong> og hagen ned mot vielsesplassen.
          </li>
          <li>
            <strong>Alleen</strong>, spesielt fin for bilder av brudeparet
            alene.
          </li>
          <li>
            <strong>Tømmerstokkene</strong>, <strong>trappa</strong> og{" "}
            <strong>inngangspartiet</strong>.
          </li>
          <li>
            <strong>Det rosa blomstrende treet</strong> i sesong.
          </li>
          <li>
            «Getting ready»-bilder: sommerstua har nydelig naturlig lys, så kom
            gjerne dit mens brudeparet gjør seg i stand.
          </li>
        </ul>
        {/* TODO: bilder fra tidligere bryllup (Instagram) — legges inn her
            som statiske bilder under /public/info/ når utvalget er klart. */}
      </section>

      <p className="border-t pt-4 text-sm text-muted-foreground">
        Spørsmål? Ta kontakt med vertskapet på Østgaard, eller med brudeparet
        som delte denne siden med deg. Se også{" "}
        <Link
          href="/info/dj"
          className="underline underline-offset-2 hover:text-foreground"
        >
          DJ på Østgaard
        </Link>{" "}
        og{" "}
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
