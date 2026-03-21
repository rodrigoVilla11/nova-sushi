"use client";
import { motion } from "framer-motion";
import { FRANCHISE_METRICS } from "src/data/franchise-data";

const DIFFS = [
  {
    icon: "🍣",
    title: "Producto con identidad",
    desc: "No sos \"otro sushi delivery\". Sushidogs, burgers y hot rolls son formatos propios con identidad visual fuerte. El cliente ya los busca por nombre.",
  },
  {
    icon: "📋",
    title: "Sistema operativo completo",
    desc: "Manual de operaciones, fichas técnicas, proveedores homologados. No arrancás de cero: tenés un playbook probado en operación real.",
  },
  {
    icon: "📣",
    title: "Marketing incluido",
    desc: "Assets, calendario de contenido y soporte de campañas desde el lanzamiento. No tenés que ser community manager para funcionar bien en digital.",
  },
  {
    icon: "🎓",
    title: "Capacitación real",
    desc: "Onboarding de cocina, atención y manejo de equipo. Tu staff arranca entrenado antes del día 1.",
  },
  {
    icon: "📊",
    title: "Demanda comprobada",
    desc: `El local de Córdoba procesa ${FRANCHISE_METRICS[0].value} pedidos diarios. No es una idea — es un modelo que ya funciona y tiene historia.`,
  },
  {
    icon: "🤝",
    title: "Soporte post-apertura",
    desc: "Acompañamiento activo los primeros 90 días. Tenés a alguien del lado de Nõva cuando lo necesitás.",
  },
];

export default function FranchiseDiff() {
  return (
    <section className="py-20 md:py-28 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-4">
            Ventajas competitivas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Por qué Nõva y no otra franquicia
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {DIFFS.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/[0.07] transition"
            >
              <span className="text-2xl mb-4 block" aria-hidden="true">{d.icon}</span>
              <h3 className="font-semibold text-lg mb-2">{d.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="#apply-form"
            className="btn-primary px-8 py-4"
          >
            Quiero más información →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
