import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "src/lib/config";
import FranchiseHero from "src/components/franchise/FranchiseHero";
import FranchiseConcept from "src/components/franchise/FranchiseConcept";
import FranchiseDiff from "src/components/franchise/FranchiseDiff";
import FranchiseNumbers from "src/components/franchise/FranchiseNumbers";
import FranchiseFormats from "src/components/franchise/FranchiseFormats";
import FranchiseInvestment from "src/components/franchise/FranchiseInvestment";
import FranchiseROI from "src/components/franchise/FranchiseROI";
import FranchiseProcess from "src/components/franchise/FranchiseProcess";
import FranchiseTrust from "src/components/franchise/FranchiseTrust";
import FranchiseApplyForm from "src/components/franchise/FranchiseApplyForm";
import { FRANCHISE_PROCESS_STEPS } from "src/data/franchise-data";

const PAGE_URL = `${CONTACT.siteUrl}/franquicias`;

export const metadata: Metadata = {
  title: "Franquicias Nõva Sushi | Abrí tu local en tu ciudad",
  description:
    "Invertí en una franquicia Nõva Sushi. Productos únicos (Sushidog, Sushi Burger, Hot Rolls), sistema operativo completo y soporte real desde el día 1. Conocé los números y aplicá.",
  metadataBase: new URL(CONTACT.siteUrl),
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Franquicias Nõva Sushi | Abrí tu local",
    description:
      "Un modelo probado, productos únicos y soporte real. Buscamos operadores para expandir Nõva Sushi en nuevas ciudades.",
    type: "website",
    url: PAGE_URL,
    locale: "es_AR",
    images: [
      {
        url: "/hero/logo.png",
        width: 300,
        height: 200,
        alt: "Nõva Sushi Franquicias",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Franquicias Nõva Sushi | Abrí tu local",
    description:
      "Invertí en franquicia Nõva Sushi. Modelo probado, soporte real, productos únicos.",
    images: ["/hero/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: CONTACT.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Franquicias",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FRANCHISE_PROCESS_STEPS.map((s) => ({
        "@type": "Question",
        name: s.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: s.desc,
        },
      })),
    },
  ],
};

export default function FranquiciasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Navegación de franquicias"
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-black/85 backdrop-blur-md border-b border-white/10"
      >
        <Link
          href="/"
          className="text-sm text-white/60 hover:text-white transition flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Inicio
        </Link>
        <a
          href="#apply-form"
          className="btn-primary px-5 py-2 text-sm"
        >
          Aplicar ahora →
        </a>
      </nav>
      <main>
        <FranchiseHero />
        <FranchiseConcept />
        <FranchiseDiff />
        <FranchiseNumbers />
        <FranchiseFormats />
        <FranchiseInvestment />
        <FranchiseROI />
        <FranchiseProcess />
        <FranchiseTrust />
        <FranchiseApplyForm />
      </main>
    </>
  );
}
