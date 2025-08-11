import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nombre del Resto – Cocina Nikkei",
  description: "Experiencia nikkei en Buenos Aires. Reservas, carta y música.",
  openGraph: {
    title: "Nombre del Resto – Cocina Nikkei",
    description: "Experiencia nikkei en Buenos Aires.",
    type: "website"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}