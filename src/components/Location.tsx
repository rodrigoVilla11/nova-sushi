"use client";
import { motion } from "framer-motion";
import { BRANCHES } from "src/lib/config";

const HOURS = [
  "Lun–Vie · 11:30–14:30 / 18:00–23:00",
  "Sáb–Dom · 19:00–23:59",
];

export default function Location() {
  return (
    <section
      id="ubicacion"
      className="relative py-20 md:py-28 bg-black bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/hero/fondo3.png')" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Mapa — Nueva Córdoba */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl ring-1 ring-white/10"
          >
            <iframe
              title="Ubicación Nõva Sushi Nueva Córdoba"
              src={BRANCHES[0].mapsEmbed}
              width="100%"
              height="100%"
              className="w-full aspect-video"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Info — 2 sucursales */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col justify-center space-y-5 bg-black rounded-2xl ring-1 ring-white/10 p-5 md:p-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-2">Nuestros locales</h2>
              <p className="text-white/70">
                Te esperamos en cualquiera de nuestras 2 sucursales.
              </p>
            </div>

            {/* Horarios (compartidos) */}
            <div>
              <h4 className="font-medium mb-1">Horarios</h4>
              {HOURS.map((h) => (
                <p key={h} className="text-white/70 text-sm">{h}</p>
              ))}
            </div>

            {/* Sucursales */}
            <div className="space-y-4">
              {BRANCHES.map((b) => (
                <div
                  key={b.name}
                  className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 space-y-2"
                >
                  <h3 className="font-semibold">{b.name}</h3>
                  <p className="text-white/70 text-sm">{b.address}</p>
                  <a
                    href={`tel:+${b.tel}`}
                    className="text-white/70 text-sm hover:text-white transition block"
                  >
                    {b.phone}
                  </a>
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-block px-4 py-1.5 text-xs"
                  >
                    Ver en Google Maps →
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
