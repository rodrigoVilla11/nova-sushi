import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NÕVA SUSHI",
  description: "El mejor sushi de Cordoba.",
  openGraph: {
    title: "NÕVA SUSHI",
    description: "El mejor sushi de Cordoba..",
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