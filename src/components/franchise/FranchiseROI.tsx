"use client";
import { motion } from "framer-motion";
import { FRANCHISE_ROI_SCENARIOS } from "src/data/franchise-data";

const ROI_ROWS = [
  { key: "pedidos" as const, label: "Pedidos diarios" },
  { key: "ticketPromedio" as const, label: "Ticket promedio" },
  { key: "facturacionMensual" as const, label: "Facturación mensual" },
  { key: "margenNeto" as const, label: "Margen neto estimado" },
  { key: "recupero" as const, label: "Recupero estimado" },
];

export default function FranchiseROI() {
  return (
    <section className="py-20 md:py-28 bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-4">
            Retorno de inversión
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">¿Cuándo recupero la inversión?</h2>
          <p className="mt-3 text-white/60 max-w-2xl mx-auto leading-relaxed">
            Proyecciones basadas en el desempeño del local propio y benchmarks del rubro.
            No son garantías — son números reales para que puedas evaluar con información.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {FRANCHISE_ROI_SCENARIOS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={`rounded-2xl overflow-hidden ring-1 transition ${
                s.highlight
                  ? "ring-brand-accent/60 bg-brand-accent/5"
                  : "ring-white/10 bg-white/5"
              }`}
            >
              {/* Header */}
              <div
                className={`px-6 py-4 border-b ${
                  s.highlight
                    ? "border-brand-accent/20 bg-brand-accent/10"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <p className={`text-xs uppercase tracking-widest mb-1 ${s.highlight ? "text-brand-accent" : "text-white/40"}`}>
                  Escenario
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{s.label}</h3>
                  {s.highlight && (
                    <span className="text-[10px] bg-brand-accent text-black px-2 py-0.5 rounded-full font-semibold tracking-wider">
                      MÁS PROBABLE
                    </span>
                  )}
                </div>
              </div>

              {/* Rows */}
              <div className="px-6 py-5 space-y-4">
                {ROI_ROWS.map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-white/50">{row.label}</span>
                    <span className={`text-sm font-semibold ${s.highlight ? "text-brand-accent" : "text-white/80"}`}>
                      {s[row.key]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center text-xs text-white/35 max-w-2xl mx-auto leading-relaxed"
        >
          Los escenarios no contemplan variables macroeconómicas (inflación, tipo de cambio).
          En la evaluación compartimos el modelo financiero completo en planilla.
        </motion.p>
      </div>
    </section>
  );
}
