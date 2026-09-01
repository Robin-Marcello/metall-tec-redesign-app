import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CTASection from "@/components/home/CTASection";
import Accordion from "@/components/ui/Accordion";
import ServicesList from "@/components/leistungen/ServicesList";
import { services } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

const faq = [
  {
    question: "Wie lange dauert ein typisches Geländerprojekt?",
    answer:
      "Von der Erstberatung bis zur Montage planen wir bei einem Standard-Balkongeländer etwa 3–5 Wochen. Darin enthalten: Aufmaß, Konstruktionszeichnung, Fertigung und Montage. Bei größeren Projekten oder langen Lieferketten (z. B. Spezialwerkstoffe) sprechen wir das gemeinsam im Vorfeld ab.",
  },
  {
    question: "Führen Sie auch Sanierungen und Reparaturen im Bestand durch?",
    answer:
      "Ja – Sanierung im Bestand ist eine unserer Kernkompetenzen. Wir beurteilen die bestehende Konstruktion, erstellen einen statischen Nachweis und montieren möglichst ohne Einschränkung des laufenden Betriebs oder Wohnbetriebs. Das gilt für Balkone, Geländer, Tore und Podeste.",
  },
  {
    question: "Welche Werkstoffe verarbeiten Sie?",
    answer:
      "Wir arbeiten mit Baustahl (S235, S355), Edelstahl (1.4301, 1.4404) und Aluminium. Je nach Einsatzbereich und Witterungsbelastung empfehlen wir den passenden Werkstoff. Oberflächen werden pulverbeschichtet, verzinkt, gebürstet oder poliert – nach Ihren Anforderungen.",
  },
  {
    question: "Sind Ihre Konstruktionen normgerecht?",
    answer:
      "Alle unsere Konstruktionen erfüllen die einschlägigen ÖNORMEN und EU-Normen – insbesondere EN 1090 für tragende Stahlbauteile und EN 1337 / EN 1337 für Geländer. Als zertifizierter Betrieb führen wir die erforderlichen Schweißnahtdokumentationen und stellen auf Wunsch Konformitätsnachweise aus.",
  },
  {
    question: "Erhalte ich einen Fixpreis oder einen Kostenvoranschlag?",
    answer:
      "Sie erhalten immer einen schriftlichen Fixpreis-Kostenvoranschlag, bevor ein Auftrag erteilt wird. Nachtragskosten entstehen nur, wenn sich der Leistungsumfang nach Auftragserteilung nachweislich ändert – und auch dann nur nach Absprache.",
  },
  {
    question: "Bieten Sie Wartung und Service nach der Montage an?",
    answer:
      "Ja. Wir empfehlen für Torantriebe eine jährliche Wartung und für verzinkte oder beschichtete Konstruktionen eine Inspektion alle 3–5 Jahre. Kleinreparaturen führen wir kurzfristig durch – oft noch am selben oder nächsten Werktag, je nach Dringlichkeit.",
  },
];


export const metadata: Metadata = pageMetadata({
  title: "Leistungen – Geländer, Stiegen, Tore & Stahlbau",
  description:
    "Metallbau-Leistungen von Metall-Tec: Geländer, Stahlstiegen, Schiebetore, Stahlkonstruktionen, Edelstahl-Sonderanfertigungen und Reparaturservice in Niederösterreich.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <Section
        className="pt-44 md:pt-52"
        eyebrow="Leistungen"
        title="Alles aus Metall. Alles aus einer Hand."
        intro="Planung, Fertigung und Montage – ohne Subunternehmer, ohne Ausreden. Hier ist im Detail, was wir bauen."
      >
        <ServicesList services={services} />
      </Section>

      <Section
        eyebrow="FAQ"
        title="Häufige Fragen."
        intro="Was Kunden uns vor dem ersten Gespräch oft fragen – ehrlich beantwortet."
      >
        <div className="thread-reactive">
          <Accordion items={faq} />
        </div>
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
