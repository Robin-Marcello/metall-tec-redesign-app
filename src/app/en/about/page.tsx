import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import AnimatedStats from "@/components/ueber-uns/AnimatedStats";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { testimonialsEn, processStepsEn, statsEn } from "@/lib/data.en";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About – Master Metalwork Workshop | ${site.name}`,
  description:
    "Metall-Tec is a master metalworking workshop in Katzelsdorf near Wiener Neustadt. Learn about our workshop, our values and our approach.",
  alternates: { canonical: "/en/about" },
};

const valuesEn = [
  {
    title: "Precision",
    text: "Tight tolerances are our daily workshop routine. If it doesn't fit, it doesn't leave.",
  },
  {
    title: "Honesty",
    text: "We'll also tell you when something doesn't make sense – or when another approach would be cheaper and better.",
  },
  {
    title: "Reliability",
    text: "Keeping agreed deadlines. Leaving sites clean. Staying reachable – even after the invoice.",
  },
];

export default function AboutPageEn() {
  return (
    <>
      <Section
        className="pt-44 md:pt-52"
        eyebrow="About us"
        title="A workshop that takes metal seriously."
        intro="Metall-Tec is a master metalworking workshop in Katzelsdorf near Wiener Neustadt: one workshop, a seasoned team, and the drive to make every piece better than the last."
      >
        <AnimatedStats stats={statsEn} />
      </Section>

      <Section eyebrow="Values" title="How you can measure us.">
        <div className="thread-reactive grid gap-5 md:grid-cols-3">
          {valuesEn.map((v, i) => (
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
        eyebrow="Our process"
        title="How your project comes to life."
        intro="Five stages, one unbroken responsibility – the thread never snaps."
      >
        <ProcessTimeline steps={processStepsEn} />
      </Section>

      <Section eyebrow="Client reviews" title="Trust that has grown over time.">
        <Testimonials items={testimonialsEn} />
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
