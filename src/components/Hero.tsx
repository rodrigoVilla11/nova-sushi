"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import OverlapCollage from "./OverlapCollage";
import Image from "next/image";
import { CONTACT } from "src/lib/config";
import WaBranchPicker from "./WaBranchPicker";

// Lista de imágenes del collage — muestra representativa (~40 fotos)
const IMAGES = [
  "/DSC00331.jpg",
  "/DSC00372.jpg",
  "/DSC00386.jpg",
  "/DSC00395.jpg",
  "/DSC00410.jpg",
  "/DSC00416.jpg",
  "/DSC00425.jpg",
  "/DSC00444.jpg",
  "/DSC00481.jpg",
  "/DSC00503.jpg",
  "/DSC00511.jpg",
  "/DSC00515.jpg",
  "/DSC00531.jpg",
  "/DSC00559.jpg",
  "/DSC00570.jpg",
  "/DSC00582.jpg",
  "/DSC00007.jpg",
  "/DSC00070.jpg",
  "/DSC00115.jpg",
  "/DSC00140.jpg",
  "/DSC00176.jpg",
  "/DSC00196.jpg",
  "/DSC00215.jpg",
  "/DSC00256.jpg",
  "/DSC00281.jpg",
  "/DSC00304.jpg",
  "/DSC00318.jpg",
  "/DSC00337.jpg",
  "/DSC00351.jpg",
  "/DSC00402.jpg",
  "/DSC09737.jpg",
  "/DSC09795.jpg",
  "/DSC09826.jpg",
  "/DSC09843.jpg",
  "/DSC09864.jpg",
  "/DSC09894.jpg",
  "/DSC09912.jpg",
  "/DSC09933.jpg",
  "/DSC09961.jpg",
  "/DSC00544.jpg",
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
          <Image
            src="/hero/logo.png"
            alt="Nõva Sushi"
            width={300}
            height={200}
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 text-white/70 text-base tracking-wide"
        >
          Fresco al día · Piezas generosas · Precio justo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={CONTACT.pedisyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 py-3 text-sm"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
          >
            Ver carta
          </a>
          <WaBranchPicker
            className="btn-wa px-7 py-3 text-sm shadow-lg"
            label="Pedir por WhatsApp"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
          />
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5 text-xs text-white/50 tracking-wide"
        >
          2 sucursales · Desde 2023 · Córdoba
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        aria-hidden="true"
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
