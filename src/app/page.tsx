import Hero from "@/components/home/Hero";
import Section from "@/components/ui/Section";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import ProjectGallery from "@/components/home/ProjectGallery";
import BeforeAfter from "@/components/home/BeforeAfter";
import Testimonials from "@/components/home/Testimonials";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CTASection from "@/components/home/CTASection";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section
        id="leistungen"
        eyebrow="Leistungen"
        title="Sechs Gewerke. Eine Werkstatt."
        intro="Vom privaten Geländer bis zur geprüften Stahlkonstruktion – alles entsteht bei uns in Katzelsdorf, von der ersten Skizze bis zur letzten Schraube."
      >
        <ServicesShowcase />
      </Section>

      <Section
        id="projekte"
        eyebrow="Referenzen"
        title="Arbeit, die man anfassen kann."
        intro="Eine Auswahl aktueller Projekte aus Niederösterreich – jedes davon ein Einzelstück."
      >
        <ProjectGallery />
        <div className="thread-reactive mt-10">
          <Button href="/projekte" variant="ghost">
            Alle Projekte
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Vorher / Nachher"
        title="Aus alt wird sicher."
        intro="Sanierung im Bestand ist unsere Spezialdisziplin. Ziehen Sie den Regler und sehen Sie den Unterschied."
      >
        <BeforeAfter />
      </Section>

      <Section eyebrow="Der Weg Ihres Projekts" title="Fünf Stationen. Eine Naht." intro="Die leuchtende Naht auf dieser Seite ist unser Versprechen: Jeder Schritt ist mit dem nächsten fest verbunden.">
        <ProcessTimeline />
      </Section>

      <Section eyebrow="Kundenstimmen" title="Was unsere Kunden sagen.">
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
