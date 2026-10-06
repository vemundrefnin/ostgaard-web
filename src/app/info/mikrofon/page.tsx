import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mikrofon på Østgaard",
  description:
    "Om mikrofonen som kan brukes til utevielse og taler på Østgaard.",
};

/** Public info page for the handheld microphone. PLACEHOLDER CONTENT. */
export default function MicrophoneInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">Mikrofon på Østgaard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Kan brukes under utevielsen og til taler. Del gjerne denne siden med
          vigsler eller toastmaster.
        </p>
      </div>

      <div className="flex aspect-video items-center justify-center border bg-secondary/40 text-sm text-muted-foreground">
        Bilde av mikrofonen kommer
      </div>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Om mikrofonen</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          [Plassholder: modell, trådløs/kablet, rekkevidde, og hvordan den
          kobles til anlegget.]
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Verdt å vite</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>[Plassholder: batteritid / lading før seremonien.]</li>
          <li>[Plassholder: hvem rigger og tester før vielsen.]</li>
        </ul>
      </section>

      <p className="border-t pt-4 text-sm text-muted-foreground">
        Se også{" "}
        <Link
          href="/info/hoyttaler"
          className="underline underline-offset-2 hover:text-foreground"
        >
          høyttaleranlegget på Østgaard
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
