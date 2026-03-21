"use client";
import { motion } from "framer-motion";
import { FRANCHISE_FORMATS } from "src/data/franchise-data";

export default function FranchiseFormats() {
  return (
    <section className="py-20 md:py-28 bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-4">
            Formatos disponibles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Qué formato se adapta a tu situación?
          </h2>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">
            Evaluamos el formato más adecuado según tu ciudad, zona y capital disponible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FRANCHISE_FORMATS.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-7 flex flex-col gap-5 hover:ring-white/20 transition"
            >
              <div>
                <h3 className="text-xl font-bold mb-1">{f.name}</h3>
                <p className="text-sm text-white/60">Ideal para: {f.ideal}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-white/40 mb-1">Superficie</p>
                  <p className="text-sm font-medium">{f.surface}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-xs text-white/40 mb-1">Inversión estimada</p>
                  <p className="text-sm font-medium text-brand-accent">{f.investment}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Foco</p>
                <p className="text-sm text-white/70">{f.focus}</p>
              </div>

              <ul className="space-y-2">
                {f.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center text-sm text-white/40"
        >
          Evaluamos el formato más adecuado según tu caso. Sin costo y sin compromiso.
        </motion.p>
      </div>
    </section>
  );
}
