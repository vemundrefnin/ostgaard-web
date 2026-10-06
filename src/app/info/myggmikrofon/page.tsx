import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Myggmikrofon på Østgaard",
  description:
    "Om myggmikrofonen som kan brukes av vigsler under utevielse på Østgaard.",
};

/** Public info page for the lavalier (mygg) microphone. PLACEHOLDER CONTENT. */
export default function LavalierInfoPage() {
  return (
    <article className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-medium">
          Myggmikrofon på Østgaard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Diskré mikrofon som festes på vigsleren, så alle på plenen hører
          vielsen. Del gjerne denne siden med presten/vigsleren deres.
        </p>
      </div>

      <div className="flex aspect-video items-center justify-center border bg-secondary/40 text-sm text-muted-foreground">
        Bilde av myggmikrofonen kommer
      </div>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Om myggmikrofonen</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          [Plassholder: modell, hvordan den festes, og hvordan den kobles til
          anlegget.]
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-xl">Verdt å vite</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>[Plassholder: når den festes og testes før vielsen.]</li>
          <li>[Plassholder: batteritid og hvem som følger opp under seremonien.]</li>
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
          href="/info/mikrofon"
          className="underline underline-offset-2 hover:text-foreground"
        >
          mikrofonen
        </Link>
        . Spørsmål? Ta kontakt med vertskapet på Østgaard.
      </p>
    </article>
  );
}
