"use client";
import { motion } from "framer-motion";
import { FRANCHISE_METRICS } from "src/data/franchise-data";

export default function FranchiseNumbers() {
  return (
    <section className="py-20 md:py-28 bg-brand-accent/10 border-y border-brand-accent/20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full bg-brand-accent/20 border border-brand-accent/30 px-3 py-1 text-xs tracking-wider text-brand-accent mb-4">
            Operación real
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Los números que importan</h2>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">
            Sin promesas vacías. Esto es lo que ves en operación real.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {FRANCHISE_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-accent leading-none mb-1">
                {m.value}
              </div>
              {m.unit && (
                <div className="text-sm text-brand-accent/70 font-medium mb-2">{m.unit}</div>
              )}
              <div className="text-xs text-white/60 leading-tight">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-xs text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          Los números corresponden al local propio de la marca. Los resultados individuales dependen
          de la ubicación, la operación y el capital invertido. Compartimos proyecciones detalladas
          durante el proceso de evaluación.
        </motion.p>
      </div>
    </section>
  );
}
