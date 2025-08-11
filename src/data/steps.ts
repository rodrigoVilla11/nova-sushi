import { StoryStep } from "src/components/Story";

export const STEPS: StoryStep[] = [
  {
    id: "origen",
    label: "2019",
    title: "El origen",
    text: "Arrancamos con una barra pequeña y mucho fuego creativo. El objetivo: traer una mirada callejera al sushi.",
    media: { type: "image", src: "/us.jpg", alt: "Barra inicial" },
  },
  {
    id: "sushidog",
    label: "2021",
    title: "Nace el Sushidog",
    text: "Nuestro clásico: técnica japonesa y espíritu de street food. Crocante, fresco, adictivo.",
    media: { type: "video", src: "/story/sushidog.mp4" },
  },
  {
    id: "equipo",
    label: "2024",
    title: "Equipo y comunidad",
    text: "Crecimos de forma orgánica con un equipo que ama lo que hace y clientes que recomiendan.",
    media: { type: "image", src: "/story/equipo.jpg" },
  },
];