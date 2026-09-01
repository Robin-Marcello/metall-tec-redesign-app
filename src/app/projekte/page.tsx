import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ProjectGallery from "@/components/home/ProjectGallery";
import BeforeAfter from "@/components/home/BeforeAfter";
import CTASection from "@/components/home/CTASection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projekte & Referenzen",
  description:
    "Referenzprojekte von Metall-Tec: Stahlstiegen, Glasgeländer, Schiebetore, Vordächer und Balkonsanierungen in Wiener Neustadt, Baden, Neunkirchen und Umgebung.",
  path: "/projekte",
});

export default function ProjektePage() {
  return (
    <>
      <Section
        className="pt-44 md:pt-52"
        eyebrow="Referenzen"
        title="Jedes Projekt ein Einzelstück."
        intro="Keine Katalogware: Jede Konstruktion wird für ihren Ort, ihre Statik und ihre Menschen entworfen. Filtern Sie nach Kategorie."
      >
        <ProjectGallery />
      </Section>

      <Section
        eyebrow="Vorher / Nachher"
        title="Sanierung sichtbar gemacht."
        intro="Bestandssanierung verlangt Erfahrung: alte Substanz beurteilen, Statik nachweisen, im bewohnten Zustand montieren."
      >
        <BeforeAfter />
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
