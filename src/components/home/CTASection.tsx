import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

type CTAContent = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  primaryCta?: { label: string; href: string };
};

export default function CTASection({
  eyebrow = "Die letzte Naht setzen wir gemeinsam",
  heading = "Erzählen Sie uns von Ihrem Projekt.",
  intro = "Unverbindliche Erstberatung, ehrliche Einschätzung, Fixpreis-Angebot. Meist melden wir uns noch am selben Werktag.",
  primaryCta = { label: "Anfrage starten", href: "/kontakt" },
}: CTAContent = {}) {
  return (
    <div className="thread-reactive relative overflow-hidden rounded-[2rem] glass-strong px-7 py-16 text-center transition-all duration-500 hover:border-white/20 hover:bg-graphite/90 sm:px-12 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" aria-hidden="true" />
      <p className="font-mono text-xs uppercase tracking-widest2 text-weld-glow">
        {eyebrow}
      </p>
      <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-metal sm:text-4xl md:text-5xl">
        {heading}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-mist">
        {intro}
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Button href={primaryCta.href}>{primaryCta.label}</Button>
        <Button href={`tel:${site.phone.replace(/\s/g, "")}`} variant="ghost">
          {site.phone}
        </Button>
      </div>
    </div>
  );
}
