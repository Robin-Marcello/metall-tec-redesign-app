import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import AnimatedStats from "@/components/ueber-uns/AnimatedStats";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Über uns – Metallbau-Meisterbetrieb aus Katzelsdorf",
  description:
    "Metall-Tec ist ein Metallbau-Meisterbetrieb aus Katzelsdorf bei Wiener Neustadt. Lernen Sie unsere Werkstatt, unsere Werte und unsere Arbeitsweise kennen.",
  path: "/ueber-uns",
});

const values = [
  {
    title: "Präzision",
    text: "± 1 mm ist bei uns keine Werbeaussage, sondern Werkstattalltag. Was nicht passt, verlässt die Halle nicht.",
  },
  {
    title: "Ehrlichkeit",
    text: "Wir sagen auch, wenn etwas nicht sinnvoll ist – oder ein anderer Weg günstiger und besser wäre.",
  },
  {
    title: "Verlässlichkeit",
    text: "Zugesagte Termine halten. Baustellen sauber hinterlassen. Erreichbar bleiben, auch nach der Rechnung.",
  },
];


export default function UeberUnsPage() {
  return (
    <>
      <Section
        className="pt-44 md:pt-52"
        eyebrow="Über uns"
        title="Ein Betrieb, der Metall ernst nimmt."
        intro="Metall-Tec steht für Metallbau aus Katzelsdorf bei Wiener Neustadt: eine Werkstatt, ein eingespieltes Team und der Anspruch, dass jedes Werkstück besser ist als das letzte."
      >
        <AnimatedStats />
      </Section>

      <Section
        eyebrow="Werte"
        title="Woran Sie uns messen können."
      >
        <div className="thread-reactive grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="glass h-full rounded-3xl p-8">
                <span className="inline-block h-1 w-10 rounded-full bg-weld shadow-weld-glow" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-chrome">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Arbeitsweise"
        title="So entsteht Ihr Projekt."
        intro="Fünf Stationen, eine durchgehende Verantwortung – die Naht reißt bei uns nie ab."
      >
        <ProcessTimeline />
      </Section>

      <Section eyebrow="Kundenstimmen" title="Vertrauen, das gewachsen ist.">
        <Testimonials />
      </Section>

      <Section threaded={false}>
        <div data-thread-section="">
          <span data-thread-anchor="" className="sr-only" aria-hidden="true" />
          <CTASection />
        </div>
      </Section>
    </>
  );
}
