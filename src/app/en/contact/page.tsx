import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/contact/ContactForm";
import MapEmbed from "@/components/contact/MapEmbed";
import { site } from "@/lib/site";
import { addressMapUrl } from "@/lib/i18n";

export const metadata: Metadata = {
  title: `Contact – Enquiry & Directions | Metall-Tec`,
  description:
    "Contact Metall-Tec in Katzelsdorf: project enquiry, phone, e-mail and directions. No-obligation initial consultation for railings, staircases, gates and structural steel.",
  alternates: { canonical: "/en/contact" },
};

export default function ContactPageEn() {
  return (
    <>
      <Section
        className="pt-44 md:pt-52"
        eyebrow="Contact"
        title="Let's talk about your project."
        intro="Send us a few lines – a rough sketch is enough to start. We usually respond the same business day."
      >
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <ContactForm locale="en" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="glass rounded-3xl p-7">
              <h2 className="font-mono text-xs uppercase tracking-widest2 text-mist">Direct contact</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <p className="text-mist">Phone</p>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-0.5 block font-display text-lg font-semibold text-chrome transition-colors hover:text-weld-glow">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <p className="text-mist">E-mail</p>
                  <a href={`mailto:${site.email}`} className="mt-0.5 block font-display text-lg font-semibold text-chrome transition-colors hover:text-weld-glow">
                    {site.email}
                  </a>
                </li>
                <li>
                  <p className="text-mist">Workshop</p>
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
                  <p className="text-mist">Opening hours</p>
                  <p className="mt-0.5 text-chrome">Mon–Thu 07:00–16:00, Fri 07:00–12:00</p>
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
