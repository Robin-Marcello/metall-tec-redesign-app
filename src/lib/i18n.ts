import { site } from "@/lib/site";

export type Locale = "de" | "en";

export function getLocale(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "de";
}

export const localePathMap: Record<string, string> = {
  "/": "/en",
  "/leistungen": "/en/services",
  "/projekte": "/en/projects",
  "/ueber-uns": "/en/about",
  "/kontakt": "/en/contact",
  "/en": "/",
  "/en/services": "/leistungen",
  "/en/projects": "/projekte",
  "/en/about": "/ueber-uns",
  "/en/contact": "/kontakt",
};

export const navEn = [
  { label: "Services", href: "/en/services" },
  { label: "Projects", href: "/en/projects" },
  { label: "About", href: "/en/about" },
  { label: "Contact", href: "/en/contact" },
];

export const addressMapUrl = `https://maps.google.com/?q=${encodeURIComponent(
  `${site.address.street}, ${site.address.zip} ${site.address.city}, Österreich`
)}`;
