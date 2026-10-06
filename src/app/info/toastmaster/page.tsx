import type { Metadata } from "next";
import Link from "next/link";
import { TOASTMASTER_DUTIES } from "@/content/toastmaster";

export const metadata: Metadata = {
  title: "Toastmaster i bryllup på Østgaard",
  description:
    "Hva gjør en toastmaster i bryllup? Taleregler, kveldens rytme og praktiske råd, og alt en toastmaster trenger å vite på Østgaard.",
};

/**
 * Public, shareable page aimed at toastmasters. The couple shares this link
 * from the Toastmaster step. Structured general-first for SEO: the role and
 * universal advice up top, Østgaard-specifics further down.
 */
export default function ToastmasterInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">
          Toastmaster i bryllup
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Skal du være toastmaster? Her er rollen, talereglene og kveldens
          rytme, og lenger ned det du trenger å vite når bryllupet er på
          Østgaard.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Rollen</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Toastmasteren er kveldens konferansier og brudeparets buffer: all
          kommunikasjon om programmet går gjennom deg, slik at brudeparet kan
          glemme kjøreplanen og bare nyte dagen. I lokaler med eget vertskap
          samarbeider du med hovmesteren. Dere to har dialogen gjennom hele
          kvelden, og hovmesteren koordinerer med kjøkkenet så maten treffer
          programmet. Ta en prat før middagen starter, så programmet er
          avklart.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Taler og talelengder</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            En god tommelfingerregel: nærmeste familie holder seg til{" "}
            <strong>5–7 minutter</strong>, venner og øvrige til{" "}
            <strong>3–5 minutter</strong>. Man rekker å si mye på fem minutter.
            Lengre taler blir fort interne, og gjestene faller av.
          </li>
          <li>
            Regnestykket taler for seg: ti talere à ti minutter er over en
            time med bare taler.
          </li>
          <li>
            Det er du, ikke brudeparet, som hyggelig formidler makslengden
            til dem som melder tale. Ingen bør måtte si «du får bare fem
            minutter» til sin egen mor.
          </li>
          <li>
            Samle inn talene med klokkeslett i kjøreplanen, så detaljert som
            mulig. Da vet kjøkkenet når rettene kan gå ut.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Kveldens rytme</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Ved brudeparets entré til middagen: utpek gjerne deg selv eller en
            annen til å sette i gang serviett-viftingen når dørene åpnes. Det
            setter stemningen for kvelden.
          </li>
          <li>
            Etter middagen annonserer du at gjestene kan gå ut og strekke på
            beina en halvtimes tid mens servitørene rydder dansegulvet, og at
            baren er åpen når de kommer tilbake. Det gir et tydelig skille,
            også der gjestene betaler selv i baren utover kvelden.
          </li>
          <li>
            Underveis: minn gjester med allergier på å si fra til servitøren,
            og informer om hva som er inkludert av drikke.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Bruk mikrofon</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Anbefal mikrofon til alle talere. Ikke alle bærer stemmen like
          godt, og det er kjipt å sitte bakerst og ikke få med seg talen. Den
          som er ukomfortabel med mikrofon kan selvsagt takke nei.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Toastmaster på Østgaard</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          På Østgaard møter du hovmesteren når du kommer, og dere to holder
          dialogen gjennom dagen. Vi inviterer gjerne toastmasteren med på et
          planleggingsmøte i forkant, så du er trygg på hvordan dagen foregår.
          Dette pleier toastmasteren å ta seg av hos oss:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          {TOASTMASTER_DUTIES.map((duty) => (
            <li key={duty}>{duty}</li>
          ))}
        </ul>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Skjenking avsluttes kl. 01.30, og siste dans planlegges rundt dette.
          </li>
          <li>
            Til taler låner Østgaard ut lydanlegg og to mikrofoner, se{" "}
            <Link
              href="/info/mikrofon"
              className="underline underline-offset-2 hover:text-foreground"
            >
              mikrofonen
            </Link>{" "}
            og{" "}
            <Link
              href="/info/hoyttaler"
              className="underline underline-offset-2 hover:text-foreground"
            >
              høyttaleranlegget
            </Link>
            .
          </li>
        </ul>
      </section>

      <p className="border-t pt-4 text-sm text-muted-foreground">
        Spørsmål? Ta kontakt med vertskapet på Østgaard, eller med brudeparet
        som delte denne siden med deg. Se også{" "}
        <Link
          href="/info/dj"
          className="underline underline-offset-2 hover:text-foreground"
        >
          DJ på Østgaard
        </Link>
        .
      </p>
    </article>
  );
}
