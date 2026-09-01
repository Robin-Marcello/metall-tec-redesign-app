import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-widest2 text-weld-glow">Fehler 404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-metal sm:text-5xl">
        Diese Naht führt ins Leere.
      </h1>
      <p className="mt-4 max-w-md text-mist">
        Die gesuchte Seite gibt es nicht oder nicht mehr. Zurück zur Startseite – dort hält alles.
      </p>
      <div className="mt-8">
        <Button href="/">Zur Startseite</Button>
      </div>
    </section>
  );
}
