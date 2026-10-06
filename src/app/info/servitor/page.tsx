import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servitør i bryllup på Østgaard",
  description:
    "Hva gjør en servitør i bryllup? Skjenkerutiner, taler og kveldens rytme, og hvordan det er å jobbe som servitør på Østgaard.",
};

/**
 * Public, shareable page aimed at wedding servers (and anyone curious about
 * the job). Structured general-first for SEO: universal wedding-service
 * know-how up top, Østgaard-specifics further down.
 *
 * PLACEHOLDER CONTENT in parts of the Østgaard section — Nina/Lars fills in
 * the practical details (vaktlengder, oppmøte, hvordan man søker).
 */
export default function ServerInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">Servitør i bryllup</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Å servere i bryllup er noe eget: én lang, nøye planlagt middag der
          alt skal treffe på minuttet, og gjestene skal merke minst mulig til
          logistikken. Her er hvordan kvelden fungerer, og lenger ned hvordan
          det er å jobbe hos oss på Østgaard.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Middagen styres av kjøreplanen</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Bryllupsmiddager følger et stramt tidsskjema: taler og retter er
            planlagt om hverandre, og maten skal ut til riktig tid. Sklir
            programmet, er det hovmesteren og toastmasteren som justerer. Som
            servitør følger du deres signaler.
          </li>
          <li>
            Det serveres normalt tre retter, med taler mellom rettene. Under
            taler står serveringen stille: ingen tallerkener inn eller ut
            mens noen snakker.
          </li>
          <li>
            Allergier og tilpassede retter er planlagt på forhånd per gjest og
            plass, men gjester kan også si fra direkte til deg, så vit alltid
            hvem du skal videreformidle til.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Skjenking</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            En vanlig rytme er én enhet til forretten, to til hovedretten og
            én til desserten. Servitørene skjenker ved bordet og holder
            glassene fulle, med mindre paret har valgt flasker på bordene.
          </li>
          <li>
            Det telles flasker og bonger: paret betaler bare for det som
            faktisk brukes, så nøyaktighet i tellingen er en del av jobben.
          </li>
          <li>
            Etter middagen tar baren over. Da betaler gjestene ofte selv, og
            skjenkingen ved bordene avsluttes.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Etter middagen</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Når middagen er ferdig, sendes gjestene ut for å strekke på beina,
            og servitørene rydder gulvet og skyver bordene til side, så
            dansegulvet står klart når gjestene kommer inn igjen.
          </li>
          <li>
            Utover kvelden handler jobben om rydding, påfyll i baren og å
            holde lokalet presentabelt uten å være i veien for festen.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Servitør på Østgaard</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          På Østgaard er servitørene og hovmesteren inkludert i parets pakke.
          Vi er vertskapets ansikt utad hele kvelden. Hovmesteren leder laget
          og holder dialogen med toastmasteren, så brudeparet slipper alle
          spørsmål; kjøkkenet koordineres samme vei.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Vi dekker bordene fredagen før (hvite duker, stoltrekk, bestikk og
            glass). Lørdag morgen setter eventuelle florister blomster på
            ferdigdekkede bord.
          </li>
          <li>
            Under minglingen setter vi gjerne ut bryllupskaken og teller
            flasker fortløpende.
          </li>
          <li>Skjenking avsluttes kl. 01.30, og kvelden rundes av etter dette.</li>
          <li>
            Søndag henter brudeparet bare pynt og gaver. All rydding og vask
            er vår jobb.
          </li>
          <li>[Plassholder: vaktlengder, oppmøtetid og antrekk.]</li>
          <li>[Plassholder: hvordan man søker / hvem man kontakter for jobb.]</li>
        </ul>
      </section>

      <p className="border-t pt-4 text-sm text-muted-foreground">
        Spørsmål? Ta kontakt med vertskapet på Østgaard. Se også{" "}
        <Link
          href="/info/toastmaster"
          className="underline underline-offset-2 hover:text-foreground"
        >
          toastmaster i bryllup
        </Link>{" "}
        og{" "}
        <Link
          href="/info/dj"
          className="underline underline-offset-2 hover:text-foreground"
        >
          DJ i bryllup
        </Link>
        .
      </p>
    </article>
  );
}
