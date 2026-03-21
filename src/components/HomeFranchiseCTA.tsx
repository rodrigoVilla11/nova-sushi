"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeFranchiseCTA() {
  return (
    <section
      id="franquicias"
      className="py-20 md:py-28 bg-neutral-950 relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-6">
            Franquicias
          </span>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Abrí tu franquicia Nõva
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Un negocio gastronómico real, con marca, sistema y acompañamiento.
          </p>

          <Link
            href="/franquicias"
            className="btn-primary w-full sm:w-auto px-7 py-3"
          >
            Ver programa completo →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
