import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Datenschutzerklärung",
    description: "Datenschutzerklärung der Metall-Tec Metallbau gemäß DSGVO.",
    path: "/datenschutz",
  }),
  robots: { index: false, follow: true },
};

/**
 * HINWEIS: Vorlage — vor Go-live juristisch prüfen und Platzhalter ersetzen.
 */
export default function DatenschutzPage() {
  return (
    <Section className="pt-44 md:pt-52" eyebrow="Rechtliches" title="Datenschutzerklärung" threaded={false}>
      <div className="glass max-w-3xl space-y-8 rounded-3xl p-8 text-sm leading-relaxed text-chrome/90 sm:p-10">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest2 text-mist">Verantwortlicher</h2>
          <p className="mt-3">
            {site.legalName}, {site.address.street}, {site.address.zip} {site.address.city},
            Österreich · {site.email} · {site.phone}
          </p>
        </div>

        <div>
          <h3 className="text-chrome">Kontaktformular</h3>
          <p className="mt-1.5">
            Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten
            wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, optional
            Telefonnummer, Inhalt der Nachricht) ausschließlich zur Bearbeitung
            Ihrer Anfrage und für allfällige Anschlussfragen
            (Art 6 Abs 1 lit b DSGVO – vorvertragliche Maßnahmen). Die Daten
            werden nach abschließender Bearbeitung gelöscht, sofern keine
            gesetzlichen Aufbewahrungspflichten bestehen.
          </p>
        </div>

        <div>
          <h3 className="text-chrome">Google Maps</h3>
          <p className="mt-1.5">
            Die Karte auf der Kontaktseite wird erst nach Ihrem ausdrücklichen
            Klick geladen (Art 6 Abs 1 lit a DSGVO – Einwilligung). Erst dann
            werden Daten (u. a. Ihre IP-Adresse) an Google Ireland Ltd.
            übertragen. Details: Datenschutzerklärung von Google.
          </p>
        </div>

        <div>
          <h3 className="text-chrome">Server-Logs &amp; Hosting</h3>
          <p className="mt-1.5">
            Beim Besuch dieser Website verarbeitet unser Hosting-Anbieter
            (Vercel Inc.) technisch notwendige Daten wie IP-Adresse, Datum,
            Uhrzeit und aufgerufene Seite in Server-Logfiles
            (Art 6 Abs 1 lit f DSGVO – berechtigtes Interesse am sicheren
            Betrieb). Diese Website setzt keine Tracking- oder Marketing-Cookies ein.
          </p>
        </div>

        <div>
          <h3 className="text-chrome">Ihre Rechte</h3>
          <p className="mt-1.5">
            Ihnen stehen die Rechte auf Auskunft, Berichtigung, Löschung,
            Einschränkung, Datenübertragbarkeit und Widerspruch zu. Wenn Sie
            glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht
            verstößt, können Sie sich bei der österreichischen
            Datenschutzbehörde (dsb.gv.at) beschweren.
          </p>
        </div>
      </div>
    </Section>
  );
}
