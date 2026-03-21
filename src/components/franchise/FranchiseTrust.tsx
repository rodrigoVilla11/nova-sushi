"use client";
import { motion } from "framer-motion";
import { FRANCHISE_TRUST } from "src/data/franchise-data";

const SIGNALS = [
  {
    icon: "📅",
    label: "En operación desde",
    value: FRANCHISE_TRUST.openingSince,
  },
  {
    icon: "🧾",
    label: "Pedidos procesados",
    value: `${FRANCHISE_TRUST.totalOrders}+`,
  },
  {
    icon: "📍",
    label: "Local propio",
    value: "Podés venir a verlo funcionar",
  },
  {
    icon: "💬",
    label: "Tiempo de respuesta",
    value: FRANCHISE_TRUST.responseTime,
  },
];

export default function FranchiseTrust() {
  return (
    <section className="py-20 md:py-28 bg-black border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-4">
            Por qué confiar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Una marca construida con operación real</h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            No somos una idea. Somos un local que funciona todos los días.
          </p>
        </motion.div>

        {/* Trust signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 text-center"
            >
              <span className="text-2xl mb-3 block" aria-hidden="true">{s.icon}</span>
              <p className="text-xs text-white/60 mb-1">{s.label}</p>
              <p className="text-sm font-semibold text-white/90">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* "Primer local" message (sin franquiciados activos) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl bg-brand-accent/5 ring-1 ring-brand-accent/20 p-8 text-center"
        >
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            Somos el primer local.{" "}
            <span className="text-brand-accent font-semibold">El próximo puede ser el tuyo.</span>
          </p>
          <p className="mt-3 text-sm text-white/60">
            Eso significa que tenés la posibilidad de ser parte de algo desde el principio,
            con el soporte y la experiencia de un equipo que ya lo hizo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
