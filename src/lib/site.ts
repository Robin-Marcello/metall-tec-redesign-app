export const site = {
  name: "Metall-Tec",
  legalName: "Metall-Tec",
  url: "https://www.metall-tec.at",
  tagline: "Metallbau in Präzision.",
  description:
    "Metall-Tec ist Ihr Partner für hochwertigen Metallbau in Niederösterreich: Geländer, Stiegen, Tore, Carports, Vordächer, Sonnensegel und Sonderanfertigungen aus Stahl, Edelstahl und Aluminium.",
  phone: "+43 2622 4416316",
  fax: "+43 2622 4416317",
  email: "office@metall-tec.at",
  owner: "Martin Krejci",
  address: {
    street: "Gewerbepark 9",
    zip: "2801",
    city: "Katzelsdorf",
    region: "Niederösterreich",
    country: "AT",
  },
  geo: { lat: 47.7869, lng: 16.2542 },
  hours: "Mo–Do 07:00–16:00, Fr 07:00–12:00",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/projekte", label: "Projekte" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
