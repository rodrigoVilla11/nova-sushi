"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import OverlapCollage from "./OverlapCollage";
import Image from "next/image";

// Lista de imágenes del collage (colocalas en /public o usá remotas permitidas)
const IMAGES = [
  "/hero/corte-salmon.jpg",
  "/hero/geisha-niguiri.jpg",
  "/hero/hot-sauce.jpg",
  "/hero/spicy-flame-roll.jpg",
  "/hero/sushi.jpg",
  "/hero/sake-hit.jpg",
  "/hero/furai-smash.jpg",
  "/hero/sushidog-la.jpg",
  "/hero/sushidog-soho.jpg",
  "/hero/armando-sushi.jpg",
  "/hero/foto1.jpg",
  "/hero/foto2.jpg",
  "/hero/foto3.jpg",
  "/hero/foto4.jpg",
  "/hero/foto5.jpg",
  "/hero/foto6.jpg",
  "/hero/foto7.jpg",
  "/hero/foto8.jpg",
  "/hero/foto9.jpg",
  "/hero/foto10.jpg",
  "/hero/foto11.jpg",
  "/hero/foto12.jpg",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
   <section
  id="hero"
  ref={ref}
  className="relative min-h-screen grid place-items-center overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/hero/fondo3.png')" }}
>
  {/* Collage por encima del fondo */}
  <div className="absolute inset-0 z-10">
    <OverlapCollage images={IMAGES} interval={3400} feather={0.1} />
  </div>

  {/* Contenido arriba de todo */}
  <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ y, opacity }}
    >
      <Image src="/hero/logo.png" alt="Nõva Sushi" width={300} height={200} priority />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6 flex items-center justify-center gap-3"
    >
      <a
        href="#menu"
        className="px-6 py-2 rounded-full bg-[#e8e0cf] text-black font-medium tracking-widest hover:brightness-95 active:scale-95 transition"
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      >
        VER CARTA
      </a>
    </motion.div>
  </div>
</section>

  );
}
