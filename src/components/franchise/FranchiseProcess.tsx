"use client";
import { motion } from "framer-motion";
import { FRANCHISE_PROCESS_STEPS } from "src/data/franchise-data";

export default function FranchiseProcess() {
  return (
    <section id="proceso" className="py-20 md:py-28 bg-neutral-950">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-4">
            Proceso
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Cómo se abre una franquicia Nõva</h2>
          <p className="mt-3 text-white/60">Sin burocracia. Sin promesas. Con fechas y pasos claros.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical (desktop) */}
          <div className="hidden md:block absolute left-[30px] top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />

          <div className="space-y-8">
            {FRANCHISE_PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex gap-6 md:gap-8"
              >
                {/* Step number */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-[60px] h-[60px] rounded-full bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center">
                    <span className="text-brand-accent font-bold text-sm">{s.step}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="pb-2 md:pb-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{s.title}</h3>
                    <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full text-white/50">
                      {s.time}
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="#apply-form"
            className="btn-primary px-8 py-4"
          >
            Empezar ahora →
          </a>
          <p className="mt-3 text-xs text-white/40">El primer paso tarda 3 minutos.</p>
        </motion.div>
      </div>
    </section>
  );
}
