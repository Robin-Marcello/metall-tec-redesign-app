export type Service = {
  id: string;
  title: string;
  spec: string;
  description: string;
  details: string[];
  image?: string; // path relative to /public, e.g. "/images/leistungen/tore.jpg"
};

export const services: Service[] = [
  {
    id: "gelaender",
    title: "Geländer & Absturzsicherung",
    spec: "EN 1090 · ÖNORM B 5371",
    description:
      "Stiegen-, Balkon- und Terrassengeländer aus Stahl, Edelstahl und Glas. Normgerecht geplant, millimetergenau montiert.",
    details: ["Edelstahl geschliffen K240", "Glasfüllung VSG 8.8.2", "Pulverbeschichtung nach RAL"],
    image: "/images/leistungen/gelaender.png",
  },
  {
    id: "stiegen",
    title: "Stiegen & Podeste",
    spec: "Stahl · Glas",
    description:
      "Freitragende Stahlstiegen, Spindeltreppen und Industriepodeste – statisch geprüft und als Komplettlösung aus einer Hand.",
    details: ["Wangen- & Holmkonstruktionen", "Trittstufen Holz / Gitterrost / Blech", "Innen- und Außenbereich"],
    image: "/images/leistungen/stiegen.png",
  },
  {
    id: "tore",
    title: "Tore, Zäune & Antriebe",
    spec: "Schiebe- & Drehtore",
    description:
      "Einfahrtstore und Zaunanlagen mit integrierter Antriebstechnik – auf Wunsch smart-home-fähig und fernsteuerbar.",
    details: ["Freitragende Schiebetore bis 8 m", "Antriebe inkl. Elektrik", "Sichtschutz-Lamellen"],
    image: "/images/leistungen/tore.png",
  },
  {
    id: "stahlbau",
    title: "Stahlbau & Konstruktionen",
    spec: "EN 1090 · EXC2",
    description:
      "Tragwerke, Unterkonstruktionen, Vordächer und Carports – vom Aufmaß über die Fertigung bis zur zertifizierten Montage.",
    details: ["Schweißarbeiten MAG / WIG", "Verzinkung & Korrosionsschutz", "Montage mit eigenem Team"],
    image: "/images/leistungen/carport.png",
  },
  {
    id: "edelstahl",
    title: "Edelstahl & Sonderanfertigungen",
    spec: "V2A · V4A Edelstahl",
    description:
      "Maßgefertigte Einzelstücke: Handläufe, Abdeckungen, Möbelelemente und Sonderlösungen, die es so kein zweites Mal gibt.",
    details: ["WIG-Schweißnähte verschliffen", "Lebensmittelechte Ausführung", "Prototypen & Kleinserien"],
  },
  {
    id: "sonnenschutz",
    title: "Sonnensegel & Sonnenschutz",
    spec: "Privat · Gewerbe · Objekt",
    description:
      "Maßgefertigte Sonnensegel, Markisen und Beschattungsanlagen für Terrassen, Balkone und gewerbliche Objekte – modern, langlebig und einfach zu bedienen.",
    details: ["Elektrische & manuelle Anlagen", "Wetterfeste Stoffe UV50+", "Maßanfertigung auf Anfrage"],
    image: "/images/leistungen/sonnenschutz.png",
  },
  {
    id: "reparatur",
    title: "Service & Reparatur",
    spec: "Bestand & Sanierung",
    description:
      "Instandsetzung bestehender Metallkonstruktionen, Anpassungen im Bestand und schnelle Hilfe, wenn es klemmt.",
    details: ["Schlosserarbeiten vor Ort", "Sanierung von Geländern & Toren", "Wartung von Torantrieben"],
    image: "/images/leistungen/gelaender.png",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  material: string;
  description: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "p-01",
    title: "Freitragende Stahlstiege",
    category: "Stiegen",
    location: "Wiener Neustadt",
    year: "2025",
    material: "S235JR · Eiche massiv",
    description:
      "Zweiläufige Faltwerkstiege mit verdeckter Befestigung und Eichenstufen – das Herzstück eines privaten Neubaus.",
    image: "/images/leistungen/stiegen.png",
  },
  {
    id: "p-02",
    title: "Schiebetor 6,5 m",
    category: "Tore",
    location: "Katzelsdorf",
    year: "2025",
    material: "Aluminium · pulverbeschichtet",
    description:
      "Freitragendes Schiebetor mit integriertem Antrieb, Smart-Home-Anbindung und Lamellen-Sichtschutz.",
    image: "/images/leistungen/tore.png",
  },
  {
    id: "p-03",
    title: "Glasgeländer Penthouse",
    category: "Geländer",
    location: "Baden",
    year: "2024",
    material: "Edelstahl 1.4301 · VSG",
    description:
      "Rahmenloses Ganzglasgeländer über zwei Dachterrassen mit Edelstahl-Handlauf, geschliffen K240.",
    image: "/images/leistungen/gelaender.png",
  },
  {
    id: "p-04",
    title: "Vordach Gewerbeobjekt",
    category: "Stahlbau",
    location: "Neunkirchen",
    year: "2024",
    material: "Stahl verzinkt · VSG",
    description:
      "14 m Stahl-Glas-Vordach als abgespannte Konstruktion – geplant, gefertigt und in zwei Tagen montiert.",
    image: "/images/leistungen/carport.png",
  },
  {
    id: "p-05",
    title: "Balkonsanierung Wohnanlage",
    category: "Sanierung",
    location: "Wiener Neustadt",
    year: "2024",
    material: "Stahl · Pulver RAL 7016",
    description:
      "28 Balkongeländer im Bestand getauscht – inklusive statischem Nachweis und Montage im bewohnten Zustand.",
    image: "/images/leistungen/gelaender.png",
  },
  {
    id: "p-06",
    title: "Industriepodest mit Stiege",
    category: "Stahlbau",
    location: "Ternitz",
    year: "2023",
    material: "S355 · Gitterrost",
    description:
      "Wartungspodest für eine Produktionslinie – EXC2, geprüfte Schweißnähte, Montage am Wochenende ohne Stillstand.",
    image: "/images/leistungen/carport.png",
  },
];

export const testimonials = [
  {
    quote:
      "Vom ersten Aufmaß bis zur Montage hat alles gepasst. Die Stiege ist heute das erste, was Gäste bei uns ansprechen.",
    name: "Familie H.",
    context: "Stahlstiege, Wiener Neustadt",
  },
  {
    quote:
      "Termin gehalten, Baustelle sauber hinterlassen, Tor läuft seit zwei Jahren ohne ein einziges Problem.",
    name: "M. Steiner",
    context: "Schiebetor mit Antrieb, Katzelsdorf",
  },
  {
    quote:
      "Wir arbeiten bei Sonderanfertigungen ausschließlich mit Metall-Tec. Die Schweißnähte sind schlicht eine andere Liga.",
    name: "DI P. Wagner",
    context: "Generalunternehmer, Baden",
  },
  {
    quote:
      "Schnelle Reaktion, ehrliche Beratung, fairer Preis. Genau so stellt man sich einen Handwerksbetrieb vor.",
    name: "K. Brunner",
    context: "Balkonsanierung, Neunkirchen",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Beratung & Besichtigung",
    text: "Wir hören zu, schauen uns die Situation vor Ort an und sagen ehrlich, was technisch sinnvoll ist – und was nicht.",
  },
  {
    step: "02",
    title: "Aufmaß & Planung",
    text: "Millimetergenaues Aufmaß, Konstruktion und Detailplanung. Sie sehen vorab genau, was gebaut wird.",
  },
  {
    step: "03",
    title: "Fertigung",
    text: "Zuschnitt, Schweißen, Schleifen, Beschichten – alles in unserer Werkstatt in Katzelsdorf, von Hand geprüft.",
  },
  {
    step: "04",
    title: "Montage",
    text: "Unser eigenes Montageteam setzt das Werkstück – sauber, termingerecht und mit Respekt vor Ihrem Zuhause.",
  },
  {
    step: "05",
    title: "Service",
    text: "Auch nach der Abnahme sind wir da: Wartung, Anpassungen und schnelle Hilfe, wenn etwas klemmt.",
  },
];
