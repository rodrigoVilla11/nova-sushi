"use client";
import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Producto diferencial",
    desc: "Formatos exclusivos — Sushidogs, Sushi Burgers, Hot Rolls — sin competencia directa en el mercado.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 17.5H21M17.5 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Operación replicable",
    desc: "Manual completo, fichas técnicas y proveedores homologados. Un sistema probado, listo para operar.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Marca con tracción",
    desc: "Comunidad real, alta tasa de recompra. El cliente ya busca los productos por nombre.",
  },
];

export default function FranchiseConcept() {
  return (
    <section className="py-20 md:py-28 bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-4">
                Qué es Nõva Sushi
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                No es otro sushi.<br />
                <span className="text-white/90">Es una marca con identidad propia.</span>
              </h2>
            </div>

            <p className="text-white/70 leading-relaxed">
              Nõva nació en Córdoba con una propuesta clara: sushi de calidad real, a precio
              accesible, con formatos propios que no existen en ningún otro lado. El Sushidog,
              la Sushi Burger, los Hot Rolls — productos que la gente repite y recomienda.
              No necesitamos convencer a nadie: el producto habla solo.
            </p>

            <p className="text-white/70 leading-relaxed">
              Una operación gastronómica tiene que ser replicable. Por eso Nõva tiene manual
              de operaciones, fichas técnicas y proveedores homologados. No te vendemos un
              nombre — te entregamos un sistema.
            </p>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center text-brand-accent">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-white/70 leading-snug">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
