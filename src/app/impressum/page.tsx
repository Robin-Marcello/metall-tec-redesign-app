import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { site } from "@/lib/site";
import { addressMapUrl } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Impressum",
    description: "Impressum und Offenlegung gemäß § 5 ECG und § 25 MedienG der Metall-Tec Metallbau.",
    path: "/impressum",
  }),
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <Section className="pt-44 md:pt-52" eyebrow="Rechtliches" title="Impressum" threaded={false}>
      <div className="glass max-w-3xl space-y-8 rounded-3xl p-8 text-sm leading-relaxed text-chrome/90 sm:p-10">

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest2 text-mist">
            Informationen gemäß § 5 ECG, § 14 UGB und Offenlegung gemäß § 25 MedienG
          </h2>
          <p className="mt-4">
            <strong className="text-chrome">{site.legalName}</strong>
            <br />
            Einzelunternehmen
            <br />
            Inhaber: {site.owner}
            <br />
            <a
              href={addressMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chrome transition-colors hover:text-weld-glow"
            >
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}, Österreich
            </a>
          </p>
        </div>

        <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          <div><dt className="text-mist">Telefon</dt><dd className="mt-0.5">{site.phone}</dd></div>
          <div><dt className="text-mist">Fax</dt><dd className="mt-0.5">{site.fax}</dd></div>
          <div><dt className="text-mist">E-Mail</dt><dd className="mt-0.5">{site.email}</dd></div>
          <div><dt className="text-mist">UID-Nummer</dt><dd className="mt-0.5">ATU14176602</dd></div>
          <div><dt className="text-mist">Rechtsform</dt><dd className="mt-0.5">Einzelunternehmen</dd></div>
          <div><dt className="text-mist">Aufsichtsbehörde</dt><dd className="mt-0.5">Bezirkshauptmannschaft Wiener Neustadt</dd></div>
        </dl>

        <div>
          <h3 className="text-mist">Unternehmensgegenstand / Gewerbe</h3>
          <p className="mt-1.5">
            Metallbau, Beschattung (reglementiertes Gewerbe).
            Es gelten die Bestimmungen der Gewerbeordnung 1994:{" "}
            <a href="https://www.ris.bka.gv.at" className="text-weld-glow hover:text-weld-core" rel="noopener noreferrer" target="_blank">www.ris.bka.gv.at</a>
          </p>
        </div>

        <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
          <div><dt className="text-mist">Mitgliedschaft</dt><dd className="mt-0.5">Wirtschaftskammer Niederösterreich</dd></div>
          <div><dt className="text-mist">Aufsichtsbehörde</dt><dd className="mt-0.5">BH Wiener Neustadt</dd></div>
        </dl>

        <div>
          <h3 className="text-mist">Online-Streitbeilegung</h3>
          <p className="mt-1.5">
            Verbraucher haben die Möglichkeit, Beschwerden an die
            Online-Streitbeilegungsplattform der EU zu richten:{" "}
            <a href="https://ec.europa.eu/consumers/odr" className="text-weld-glow hover:text-weld-core" rel="noopener noreferrer" target="_blank">ec.europa.eu/consumers/odr</a>.
            Sie können Ihre Beschwerde auch direkt an die oben angeführte E-Mail-Adresse richten.
          </p>
        </div>

        <div>
          <h3 className="text-mist">Haftung für Inhalte und Links</h3>
          <p className="mt-1.5">
            Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr
            übernommen. Für Inhalte externer Links sind ausschließlich deren
            Betreiber verantwortlich.
          </p>
        </div>

        <div>
          <h3 className="text-mist">Urheberrecht</h3>
          <p className="mt-1.5">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website
            unterliegen dem österreichischen Urheberrecht. Beiträge Dritter sind als
            solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und
            jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen
            der schriftlichen Zustimmung des jeweiligen Autors.
          </p>
        </div>

      </div>
    </Section>
  );
}
