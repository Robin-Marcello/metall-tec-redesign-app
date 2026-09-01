import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Section from "@/components/ui/Section";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import ProjectGallery from "@/components/home/ProjectGallery";
import BeforeAfter from "@/components/home/BeforeAfter";
import Testimonials from "@/components/home/Testimonials";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CTASection from "@/components/home/CTASection";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";
import { servicesEn, testimonialsEn, processStepsEn } from "@/lib/data.en";

export const metadata: Metadata = {
  title: `${site.name} – Metalwork in Precision | ${site.address.city}, Austria`,
  description:
    "Metall-Tec: Railings, staircases, gates and structural steel – planned, fabricated and installed in Katzelsdorf, Lower Austria. Request a quote today.",
  alternates: { canonical: "/en" },
};

export default function HomePageEn() {
  return (
    <>
      <Hero
        eyebrow={`Metal construction · ${site.address.city}, Lower Austria`}
        heading={
          <>
            From steel,
            <br />
            what endures.
          </>
        }
        intro="Railings, staircases, gates and steel structures – planned, fabricated and installed by a team that takes every weld personally."
        primaryCta={{ label: "Request a quote", href: "/en/contact" }}
        secondaryCta={{ label: "View projects", href: "/en/projects" }}
        specs={[
          { label: "Materials", value: "Steel · Stainless · Aluminium" },
          { label: "Standard", value: "EN 1090 · EXC2" },
        ]}
      />

      <Section
        id="services"
        eyebrow="Services"
        title="Six trades. One workshop."
        intro="From a private railing to a certified steel structure – everything is built right here in Katzelsdorf, from the first sketch to the last bolt."
      >
        <ServicesShowcase
          services={servicesEn}
          detailsBasePath="/en/services"
          detailsLabel="More on"
        />
      </Section>

      <Section
        id="projects"
        eyebrow="References"
        title="Work you can touch."
        intro="A selection of recent projects from Lower Austria – each one a one-of-a-kind."
      >
        <ProjectGallery />
        <div className="thread-reactive mt-10">
          <Button href="/en/projects" variant="ghost">
            All projects
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Before / After"
        title="From worn to safe."
        intro="Renovation of existing structures is our specialty. Drag the slider and see the difference."
      >
        <BeforeAfter />
      </Section>

      <Section
        eyebrow="Your project's journey"
        title="Five stages. One seam."
        intro="The glowing seam on this page is our promise: every step is firmly connected to the next."
      >
        <ProcessTimeline steps={processStepsEn} />
      </Section>

      <Section eyebrow="Client reviews" title="What our clients say.">
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
