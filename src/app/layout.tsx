import type { Metadata, Viewport } from "next";
import { Nunito, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WeldThread from "@/components/thread/WeldThread";
import ScrollButtons from "@/components/ui/ScrollButtons";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { site } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/seo";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Metallbau in Präzision | ${site.address.city}, NÖ`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Metallbau Niederösterreich",
    "Schlosserei Katzelsdorf",
    "Geländer Wiener Neustadt",
    "Stahlstiege",
    "Schiebetor",
    "Stahlbau",
    "Edelstahl Sonderanfertigung",
  ],
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: site.url,
    siteName: site.name,
    title: `${site.name} – Metallbau in Präzision`,
    description: site.description,
  },
  alternates: {
    canonical: site.url,
    languages: {
      "de": site.url,
      "en": `${site.url}/en`,
      "x-default": site.url,
    },
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT" className={`${nunito.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* Prevent flash: apply stored theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='light'||(t==='system'&&!window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('light');})();` }} />
      </head>
      <body className="relative min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-weld focus:px-5 focus:py-2 focus:text-[#0A0B0E]"
        >
          Zum Inhalt springen
        </a>
        <ThemeProvider>
          <WeldThread />
          <Navbar />
          <main id="inhalt">{children}</main>
          <Footer />
          <ScrollButtons />
        </ThemeProvider>
      </body>
    </html>
  );
}
