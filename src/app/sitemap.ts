import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const b = site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: b,                  lastModified: "2025-06-01", changeFrequency: "monthly", priority: 1.0 },
    { url: `${b}/leistungen`,  lastModified: "2025-06-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${b}/projekte`,    lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.9 },
    { url: `${b}/ueber-uns`,   lastModified: "2025-06-01", changeFrequency: "yearly",  priority: 0.7 },
    { url: `${b}/kontakt`,     lastModified: "2025-06-01", changeFrequency: "yearly",  priority: 0.8 },
    { url: `${b}/impressum`,   lastModified: "2025-06-01", changeFrequency: "yearly",  priority: 0.1 },
    { url: `${b}/datenschutz`, lastModified: "2025-06-01", changeFrequency: "yearly",  priority: 0.1 },
    { url: `${b}/en`,               lastModified: "2025-06-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${b}/en/services`,      lastModified: "2025-06-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${b}/en/projects`,      lastModified: "2025-06-01", changeFrequency: "weekly",  priority: 0.8 },
    { url: `${b}/en/about`,         lastModified: "2025-06-01", changeFrequency: "yearly",  priority: 0.6 },
    { url: `${b}/en/contact`,       lastModified: "2025-06-01", changeFrequency: "yearly",  priority: 0.7 },
  ];
}
