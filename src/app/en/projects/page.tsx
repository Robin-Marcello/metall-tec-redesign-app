import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ProjectGallery from "@/components/home/ProjectGallery";
import CTASection from "@/components/home/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Projects – Metalwork References | ${site.name}`,
  description:
    "A selection of recent Metall-Tec projects: staircases, railings, sliding gates, structural steel and renovations in Lower Austria.",
  alternates: { canonical: "/en/projects" },
};

export default function ProjectsPageEn() {
  return (
    <>
      <Section
        className="pt-44 md:pt-52"
        eyebrow="References"
        title="Work you can touch."
        intro="A selection of recent projects from Lower Austria – each one a one-of-a-kind piece."
      >
        <ProjectGallery />
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
