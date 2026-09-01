import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import { site } from "@/lib/site";
import { addressMapUrl } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt – Anfrage & Anfahrt",
  description:
    "Kontaktieren Sie Metall-Tec in Katzelsdorf: Projektanfrage, Telefon, E-Mail und Anfahrt. Unverbindliche Erstberatung für Geländer, Stiegen, Tore und Stahlbau.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <>
      <Section
        className="pt-44 md:pt-52"
        eyebrow="Kontakt"
        title="Reden wir über Ihr Projekt."
        intro="Schicken Sie uns ein paar Zeilen – Skizze am Bierdeckel genügt für den Anfang. Wir melden uns meist noch am selben Werktag."
      >
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass rounded-3xl p-7">
              <h2 className="font-mono text-xs uppercase tracking-widest2 text-mist">Direkt erreichen</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <p className="text-mist">Telefon</p>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-0.5 block font-display text-lg font-semibold text-chrome transition-colors hover:text-weld-glow">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <p className="text-mist">E-Mail</p>
                  <a href={`mailto:${site.email}`} className="mt-0.5 block font-display text-lg font-semibold text-chrome transition-colors hover:text-weld-glow">
                    {site.email}
                  </a>
                </li>
                <li>
                  <p className="text-mist">Werkstatt</p>
                  <a
                    href={addressMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-chrome transition-colors hover:text-weld-glow"
                  >
                    {site.address.street}<br />{site.address.zip} {site.address.city}
                  </a>
                </li>
                <li>
                  <p className="text-mist">Öffnungszeiten</p>
                  <p className="mt-0.5 text-chrome">{site.hours}</p>
                </li>
              </ul>
            </div>
            <MapEmbed />
          </div>
        </div>
      </Section>
    </>
  );
}
