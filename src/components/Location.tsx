"use client";
import { motion } from "framer-motion";

export default function Location() {
  return (
    <section id="ubicacion" className="relative py-20 md:py-28 bg-black">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl ring-1 ring-white/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.3513947933784!2d-64.19434892468284!3d-31.431991697005405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a3375f3deab1%3A0x96540e6d01fdbe4d!2sN%C3%95VA%20SUSHI%20NUEVA!5e0!3m2!1ses!2sar!4v1754881681784!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ minHeight: "400px", border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div>
              <h2 className="text-3xl font-semibold mb-2">Nuestra ubicación</h2>
              <p className="text-white/70">
                Te esperamos en nuestro local para que disfrutes la experiencia
                Nõva Sushi.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Dirección</h4>
                <p className="text-white/70">
                  Ambrosio Olmos 939, Córdoba, Córdoba.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Horarios</h4>
                <p className="text-white/70">
                  Lunes a Viernes – 11:30 a 14:30 hs - 18:00 a 23:00 hs
                </p>
                <p className="text-white/70">
                  Sábados y Domingos 19:00 a 23:59 hs
                </p>
              </div>
              <div>
                <h4 className="font-medium">Teléfono</h4>
                <p className="text-white/70">+54 9 351 258 3838</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://maps.app.goo.gl/hhF6HzHDkayGUz338" // link a Google Maps directo
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#e8e0cf] text-black font-medium tracking-widest hover:brightness-95 active:scale-95 transition"
              >
                Ver en Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
