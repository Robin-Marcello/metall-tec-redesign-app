import type { Metadata } from "next";
import { site } from "@/lib/site";
import { localePathMap } from "@/lib/i18n";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const altPath = localePathMap[path];
  const altUrl = altPath ? `${site.url}${altPath}` : undefined;
  const isEn = path.startsWith("/en");

  const languages: Record<string, string> = {};
  if (altUrl) {
    languages[isEn ? "en" : "de"] = url;
    languages[isEn ? "de" : "en"] = altUrl;
    languages["x-default"] = isEn ? altUrl : url;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(Object.keys(languages).length > 0 && { languages }),
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: isEn ? "en_US" : "de_AT",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    url: site.url,
    telephone: site.phone,
    fax: site.fax,
    email: site.email,
    description: site.description,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    logo: `${site.url}/favicon.svg`,
    image: `${site.url}/opengraph-image`,
    hasMap: `https://www.openstreetmap.org/?mlat=${site.geo.lat}&mlon=${site.geo.lng}`,
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHours: ["Mo-Th 07:00-16:00", "Fr 07:00-12:00"],
    areaServed: [
      { "@type": "City", name: "Wiener Neustadt" },
      { "@type": "City", name: "Baden" },
      { "@type": "City", name: "Neunkirchen" },
      { "@type": "State", name: "Niederösterreich" },
    ],
    knowsAbout: [
      "Metallbau",
      "Geländer",
      "Stahlstiegen",
      "Schiebetore",
      "Stahlbau",
      "Edelstahlverarbeitung",
      "Sonnenschutz",
      "Carport",
    ],
  };
}
