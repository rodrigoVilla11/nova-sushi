"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FranchiseHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
      style={{ backgroundImage: "url('/hero/fondo3.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/hero/logo.png"
            alt="Nõva Sushi"
            width={180}
            height={120}
            priority
            className="mx-auto mb-8 opacity-90"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block rounded-full bg-brand-accent/20 border border-brand-accent/30 px-4 py-1 text-xs tracking-widest text-brand-accent uppercase mb-6">
            Programa de Franquicias
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
            Abrí tu propio<br />
            <span className="text-brand-accent">Nõva Sushi.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Un modelo probado, productos únicos y soporte real desde el día&nbsp;1.
            Buscamos operadores comprometidos para expandir la marca en nuevas ciudades.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <a
            href="#apply-form"
            className="btn-primary px-8 py-4 text-base shadow-lg"
          >
            Quiero más información →
          </a>
          <a
            href="#proceso"
            className="btn-outline px-8 py-4 text-base"
          >
            Ver cómo funciona ↓
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60"
        >
          <span>✓ Local propio en operación</span>
          <span>✓ Soporte desde el día 1</span>
          <span>✓ Proceso transparente</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
