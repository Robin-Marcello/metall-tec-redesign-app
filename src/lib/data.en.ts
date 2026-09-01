import type { Service } from "@/lib/data";

export const servicesEn: Service[] = [
  {
    id: "gelaender",
    title: "Railings & Fall Protection",
    spec: "EN 1090 · ÖNORM B 5371",
    description:
      "Staircase, balcony and terrace railings in steel, stainless steel and glass. Designed to standard, installed to the millimetre.",
    details: ["Stainless steel brushed K240", "Laminated safety glass VSG 8.8.2", "Powder-coated to RAL colour"],
  },
  {
    id: "stiegen",
    title: "Staircases & Platforms",
    spec: "Steel · Timber · Glass",
    description:
      "Cantilevered steel stairs, spiral staircases and industrial platforms – structurally verified and delivered as a complete solution.",
    details: ["Stringer & mono-stringer designs", "Treads in timber / grating / sheet steel", "Interior and exterior use"],
  },
  {
    id: "tore",
    title: "Gates, Fences & Drives",
    spec: "Sliding & swing gates",
    description:
      "Entrance gates and fencing with integrated drive technology – smart-home ready and remote-controlled on request.",
    details: ["Cantilevered sliding gates up to 8 m", "Drives including all electrics", "Privacy slat infill"],
  },
  {
    id: "stahlbau",
    title: "Structural Steel & Constructions",
    spec: "EXC1 – EXC2",
    description:
      "Load-bearing structures, subframes, canopies and carports – from survey and fabrication to certified installation.",
    details: ["MAG / TIG welding", "Hot-dip galvanising & corrosion protection", "Installation with our own team"],
  },
  {
    id: "edelstahl",
    title: "Stainless Steel & Custom Work",
    spec: "1.4301 · 1.4404",
    description:
      "Made-to-measure one-offs: handrails, cladding, furniture elements and bespoke solutions that exist nowhere else.",
    details: ["TIG welds ground flush", "Food-grade finishes available", "Prototypes & small series"],
  },
  {
    id: "sonnenschutz",
    title: "Awnings & Sun Protection",
    spec: "Residential · Commercial · Object",
    description:
      "Made-to-measure shade sails, awnings and sun-protection systems for terraces, balconies and commercial properties – modern, durable and easy to use.",
    details: ["Electric & manual systems", "Weather-resistant UV50+ fabrics", "Custom fabrication on request"],
  },
  {
    id: "reparatur",
    title: "Service & Repairs",
    spec: "Existing structures & renovation",
    description:
      "Restoration of existing metalwork, modifications in-situ and fast assistance when something isn't working.",
    details: ["On-site locksmith work", "Renovation of railings & gates", "Gate-drive servicing"],
  },
];

export const testimonialsEn = [
  {
    quote:
      "From the first survey to installation, everything was perfect. The staircase is the first thing our guests comment on.",
    name: "Family H.",
    context: "Steel staircase, Wiener Neustadt",
  },
  {
    quote:
      "Deadline kept, site left clean, gate has been running without a single issue for two years.",
    name: "M. Steiner",
    context: "Sliding gate with drive, Katzelsdorf",
  },
  {
    quote:
      "For custom metalwork we work exclusively with Metall-Tec. The weld quality is simply a different level.",
    name: "DI P. Wagner",
    context: "General contractor, Baden",
  },
  {
    quote:
      "Fast response, honest advice, fair price. Exactly what you'd hope for from a craftsman.",
    name: "K. Brunner",
    context: "Balcony renovation, Neunkirchen",
  },
];

export const processStepsEn = [
  {
    step: "01",
    title: "Consultation & Site Visit",
    text: "We listen, inspect the situation on-site and give you an honest view of what makes technical sense – and what doesn't.",
  },
  {
    step: "02",
    title: "Survey & Design",
    text: "Precise measurements, structural design and detailed drawings. You see exactly what will be built before we start.",
  },
  {
    step: "03",
    title: "Fabrication",
    text: "Cutting, welding, grinding, coating – everything in our Katzelsdorf workshop, checked by hand.",
  },
  {
    step: "04",
    title: "Installation",
    text: "Our own installation team places the piece – clean, on time and with respect for your property.",
  },
  {
    step: "05",
    title: "After-sales",
    text: "We're here after handover too: servicing, adjustments and fast assistance when something's not right.",
  },
];

export const statsEn = [
  { end: 150, prefix: "", suffix: "+", label: "Projects completed" },
  { end: 15, prefix: "", suffix: " years", label: "Experience in metalwork" },
  { end: 100, prefix: "", suffix: " %", label: "Made in Austria" },
];

export const faqEn = [
  {
    question: "How long does a typical railing project take?",
    answer:
      "From initial consultation to installation, we plan approximately 3–5 weeks for a standard balcony railing. This includes survey, construction drawing, fabrication and installation. For larger projects or long lead-time materials we discuss this upfront.",
  },
  {
    question: "Do you carry out renovations and repairs on existing structures?",
    answer:
      "Yes – renovation in-situ is one of our core competencies. We assess the existing structure, provide structural verification and install with minimal disruption to ongoing residential or commercial use. This applies to balconies, railings, gates and platforms.",
  },
  {
    question: "Which materials do you work with?",
    answer:
      "We work with structural steel (S235, S355), stainless steel (1.4301, 1.4404) and aluminium. Depending on the application and weather exposure, we recommend the most suitable material. Surfaces are powder-coated, hot-dip galvanised, brushed or polished – to your requirements.",
  },
  {
    question: "Are your structures built to standard?",
    answer:
      "All our structures comply with the relevant Austrian and EU standards – in particular EN 1090 for structural steelwork. As a certified workshop we maintain full weld documentation and can provide conformity certificates on request.",
  },
  {
    question: "Do I receive a fixed price or an estimate?",
    answer:
      "You always receive a written fixed-price quote before any order is placed. Variations are only raised if the scope of work demonstrably changes after the order is confirmed – and even then only after prior discussion.",
  },
  {
    question: "Do you offer maintenance and after-sales service?",
    answer:
      "Yes. We recommend annual servicing for gate drives and an inspection every 3–5 years for galvanised or coated structures. Minor repairs are carried out at short notice – often the same or next business day, depending on urgency.",
  },
];
