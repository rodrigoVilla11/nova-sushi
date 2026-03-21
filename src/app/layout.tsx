import type { Metadata } from "next";
import "./globals.css";
import { CONTACT } from "src/lib/config";
import Footer from "src/components/Footer";

const SITE_URL = CONTACT.siteUrl;

export const metadata: Metadata = {
  title: "NÕVA SUSHI | El mejor Sushi de Córdoba",
  description:
    "Sushidog, sushi burgers y rolls artesanales en Córdoba. Pedí online o visitanos en cualquiera de nuestros 2 locales. Lunes a viernes desde las 11:30 hs.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "NÕVA SUSHI | El mejor Sushi de Córdoba",
    description:
      "Sushidog, sushi burgers y rolls artesanales en Córdoba. Pedí online o visitanos en cualquiera de nuestros 2 locales.",
    type: "website",
    url: SITE_URL,
    locale: "es_AR",
    images: [
      {
        url: "/hero/logo.png",
        width: 300,
        height: 200,
        alt: "Nõva Sushi",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "NÕVA SUSHI | Sushi en Córdoba",
    description:
      "Sushidog, sushi burgers y rolls artesanales en Córdoba. Pedí online o visitanos en cualquiera de nuestros 2 locales.",
    images: ["/hero/logo.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "11:30",
    closes: "14:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "18:00",
    closes: "23:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday"],
    opens: "19:00",
    closes: "23:59",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Nõva Sushi",
  url: SITE_URL,
  email: CONTACT.email,
  servesCuisine: ["Sushi", "Japonesa", "Fusión"],
  priceRange: "$$",
  image: `${SITE_URL}/hero/logo.png`,
  openingHoursSpecification: openingHours,
  hasBranch: [
    {
      "@type": "Restaurant",
      name: "Nõva Sushi — Nueva Córdoba",
      telephone: "+54 9 351 258 3838",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ambrosio Olmos 939",
        addressLocality: "Córdoba",
        addressRegion: "Córdoba",
        addressCountry: "AR",
      },
      openingHoursSpecification: openingHours,
    },
    {
      "@type": "Restaurant",
      name: "Nõva Sushi — Alta Gracia",
      telephone: "+54 9 3547 32-2240",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rafael Lozada 87",
        addressLocality: "Alta Gracia",
        addressRegion: "Córdoba",
        addressCountry: "AR",
      },
      openingHoursSpecification: openingHours,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
