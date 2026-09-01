import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/home/CTASection";
import SteelPlate from "@/components/ui/SteelPlate";
import Accordion from "@/components/ui/Accordion";
import { servicesEn, faqEn } from "@/lib/data.en";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Services – Railings, Staircases, Gates & Steel | ${site.name}`,
  description:
    "Metall-Tec services: railings, steel staircases, sliding gates, structural steel, stainless custom work and sun protection in Lower Austria.",
  alternates: { canonical: "/en/services" },
};

export default function ServicesPageEn() {
  return (
    <>
      <Section
        className="pt-44 md:pt-52"
        eyebrow="Services"
        title="All from metal. All from one source."
        intro="Planning, fabrication and installation – no subcontractors, no excuses. Here's what we build, in detail."
      >
        <div className="space-y-6">
          {servicesEn.map((s, i) => (
            <article key={s.id} id={s.id} data-thread-section="" className="scroll-mt-32">
              <Reveal>
                <div className="thread-reactive grid gap-0 overflow-hidden rounded-3xl glass transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(201,207,216,0.18)] md:grid-cols-[1fr_1.4fr]">
                  <div className="relative min-h-[200px] md:min-h-[260px]">
                    <SteelPlate seed={i + 2} label={s.title} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-graphite/80 md:bg-gradient-to-r" />
                  </div>
                  <div className="p-7 sm:p-9">
                    <div className="flex items-center gap-3">
                      <span data-thread-anchor="" className="thread-marker h-2.5 w-2.5 rounded-full bg-seam" aria-hidden="true" />
                      <p className="font-mono text-[11px] uppercase tracking-widest2 text-weld-glow">{s.spec}</p>
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-chrome sm:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-mist">{s.description}</p>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {s.details.map((d) => (
                        <li key={d} className="flex items-center gap-2.5 text-sm text-chrome/85">
                          <span className="h-1 w-4 shrink-0 rounded-full bg-weld" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="FAQ"
        title="Frequently asked questions."
        intro="What clients often ask before the first conversation – answered honestly."
      >
        <div className="thread-reactive">
          <Accordion items={faqEn} />
        </div>
      </Section>

      <Section threaded={false}>
        <div data-thread-section="">
          <span data-thread-anchor="" className="sr-only" aria-hidden="true" />
          <CTASection
            eyebrow="Let's put the finishing touch together"
            heading="Tell us about your project."
            intro="No-obligation consultation, honest assessment, fixed-price quote. We usually respond the same business day."
            primaryCta={{ label: "Start your enquiry", href: "/en/contact" }}
          />
        </div>
      </Section>
    </>
  );
}
