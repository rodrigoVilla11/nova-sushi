"use client";
import { motion } from "framer-motion";
import { FRANCHISE_INVESTMENT } from "src/data/franchise-data";

export default function FranchiseInvestment() {
  return (
    <section className="py-20 md:py-28 bg-neutral-950">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-4">
            Inversión
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">¿Cuánto necesito para arrancar?</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden"
        >
          {/* Rango */}
          <div className="p-8 md:p-10 border-b border-white/10 text-center bg-white/[0.02]">
            <p className="text-sm text-white/40 uppercase tracking-widest mb-3">
              Rango de inversión total estimada
            </p>
            <div className="text-4xl md:text-5xl font-bold text-brand-accent">
              {FRANCHISE_INVESTMENT.rangeMin}
              <span className="text-white/30 mx-3">—</span>
              {FRANCHISE_INVESTMENT.rangeMax}
            </div>
          </div>

          {/* Incluye / No incluye */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
                Qué incluye
              </h3>
              <ul className="space-y-3">
                {FRANCHISE_INVESTMENT.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="text-brand-accent mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
                Qué no incluye
              </h3>
              <ul className="space-y-3">
                {FRANCHISE_INVESTMENT.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="text-white/30 mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-xl bg-white/5 ring-1 ring-white/10">
                <p className="text-xs text-white/50 leading-relaxed">
                  {FRANCHISE_INVESTMENT.royaltyNote}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 border-t border-white/10 text-center bg-white/[0.02]">
            <a
              href="#apply-form"
              className="btn-primary px-8 py-4"
            >
              Ver condiciones en detalle →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
