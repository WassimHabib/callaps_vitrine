import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://callaps.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Callaps — Agents IA personnalisés pour votre entreprise | par Wevlap",
    template: "%s | Callaps",
  },
  description:
    "Callaps crée des agents IA conversationnels sur mesure pour automatiser vos appels, votre service client et votre prospection. Solution développée par Wevlap.",
  keywords: [
    "agent IA",
    "callbot",
    "IA conversationnelle",
    "automatisation appels",
    "service client IA",
    "Wevlap",
    "Callaps",
    "agent vocal",
    "automatisation téléphonique",
  ],
  authors: [{ name: "Wevlap (WH Consulting)" }],
  creator: "Wevlap",
  publisher: "Wevlap",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Callaps",
    title: "Callaps — Agents IA personnalisés pour votre entreprise",
    description:
      "Automatisez vos appels avec des agents IA conversationnels sur mesure. Plus de leads, moins de coûts. 24h/24, 7j/7.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Callaps — Agents IA pour automatiser vos appels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Callaps — Agents IA personnalisés pour votre entreprise",
    description:
      "Automatisez vos appels avec des agents IA conversationnels sur mesure. Plus de leads, moins de coûts.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-FR": SITE_URL,
      "en-US": SITE_URL,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Callaps",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description:
        "Callaps crée des agents IA conversationnels sur mesure pour automatiser vos appels, votre service client et votre prospection.",
      foundingDate: "2026",
      parentOrganization: {
        "@type": "Organization",
        name: "Wevlap (WH Consulting)",
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33651370395",
        email: "contact@wevlap.fr",
        contactType: "sales",
        availableLanguage: ["French", "English"],
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Callaps",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["fr-FR", "en-US"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
