// data/storySteps.ts

import { StoryStep } from "src/components/Story";

export const STEPS: StoryStep[] = [
  {
    id: "inicio-2023",
    label: "2023",
    title: "El inicio del sueño",
    text:
      "A los 22 años decidimos emprender: trajimos una franquicia a Córdoba. Empujando con marketing y mucho esfuerzo, aprendimos a manejar un negocio.",
    media: { type: "image", src: "/armandolocal.png", alt: "Primer local y primeras campañas" },
  },
  {
    id: "aprendizaje-23-24",
    label: "2023–2024",
    title: "Aprendizaje y resiliencia",
    text:
      "Proveedores, equipo, liderazgo y jornadas de 18 horas (7 a 23). Con constancia, las ventas crecieron y la comunidad empezó a conocernos.",
    media: { type: "image", src: "/story/aprendizaje.jpg", alt: "Equipo en cocina y operaciones" },
  },
  {
    id: "nace-nova-2025",
    label: "2025",
    title: "Nace Nõva Sushi",
    text:
      "Al ver que el valor lo construíamos nosotros, decidimos empezar algo propio. Nace Nõva con foco en innovación: piezas más grandes, Sushi Dog y Sushi Burger.",
    media: { type: "image", src: "/us.jpg", alt: "Branding y primeros productos Nõva" },
  },
  {
    id: "filosofia",
    label: "Filosofía",
    title: "Fresco, al día y con valor justo",
    text:
      "Todo se hace en el día, con piezas grandes y producto fresco. Buscamos que el cliente pague el precio que vale por calidad y cantidad.",
    media: { type: "image", src: "/hero/corte-salmon.jpg", alt: "Mise en place y producto fresco" },
  },
  {
    id: "presente-2025",
    label: "2025",
    title: "Presente: Ambrosio Olmos",
    text:
      "Un local en Ambrosio Olmos, 30–90 pedidos diarios, presencia online fuerte y virales gracias a la Sushi Burger y el Sushi Dog.",
    media: { type: "image", src: "/nova-sushi.png", alt: "Local y productos virales" },
  },
  {
    id: "futuro",
    label: "Futuro",
    title: "Franquiciar y expandir",
    text:
      "Primero franquicias en Córdoba, luego expansión nacional y, a futuro, internacional.",
    media: { type: "image", src: "/hero/expansion.png", alt: "Mapa de expansión y aperturas" },
  },
];
