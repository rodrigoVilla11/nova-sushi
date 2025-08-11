"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

function WA(number: string, msg: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

const BENEFITS = [
  { title: "Marca con tracción", desc: "Productos diferenciales (Sushidog, burgers y hot rolls) con alta recompra." },
  { title: "Playbook operativo", desc: "Manual de operaciones, fichas técnicas y proveedores homologados." },
  { title: "Marketing & lanzamientos", desc: "Calendario de campañas, assets y soporte de performance." },
  { title: "Capacitación", desc: "Onboarding de cocina, atención y liderazgo de equipo." },
];

const FAQ = [
  {
    q: "¿Cuál es la inversión inicial?",
    a: "Varía según el local y la plaza. Podemos compartir un presupuesto estimado luego de tu aplicación.",
  },
  {
    q: "¿Qué incluye el fee de franquicia?",
    a: "Uso de marca, transferencia de know-how, manuales y acompañamiento en apertura y primeros 90 días.",
  },
  {
    q: "¿Necesito experiencia previa?",
    a: "Es deseable, pero no excluyente. Lo clave es el compromiso del operador y un buen equipo.",
  },
  {
    q: "¿Zonas disponibles?",
    a: "Evaluamos Argentina y ciudades seleccionadas en LatAm. Contanos tu ciudad en el formulario.",
  },
];

export default function Franchise({
  whatsappNumber = "5493512345678", // <— cambiá por tu número
  email = "franquicias@novasushi.com", // <— cambiá por tu email
}: {
  whatsappNumber?: string;
  email?: string;
}) {
  const waMsg = useMemo(
    () => "Hola Nõva, me interesa abrir una franquicia. ¿Podemos conversar?",
    []
  );
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="franquicias" className="relative py-20 md:py-28">
      {/* fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"
      />

      <div className="mx-auto max-w-6xl px-6">
        {/* HERO */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-6 space-y-4">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider">
              Programa de franquicias
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Abrí tu <span className="text-white/90">Nõva Sushi</span> en tu ciudad
            </h2>
            <p className="text-white/70">
              Sumate a una marca con productos icónicos y soporte operativo integral. Buscamos operadores
              comprometidos para expandir el modelo en nuevas plazas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {BENEFITS.map((b) => (
                <div key={b.title} className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
                  <h4 className="font-semibold">{b.title}</h4>
                  <p className="text-sm text-white/70">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={WA(whatsappNumber, waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium tracking-wide hover:brightness-110 active:scale-95 transition shadow-xl"
                style={{ backgroundColor: "#25D366", boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}
              >
                {/* WhatsApp svg */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16.004 2.003c-7.74 0-14 6.262-14 14 0 2.465.648 4.87 1.884 6.992l-1.996 7.324 7.512-1.968c2.057 1.122 4.375 1.711 6.738 1.711h.002c7.74 0 14-6.262 14-14s-6.26-14.059-14-14.059zM16.002 26.941c-2.07 0-4.084-.555-5.844-1.605l-.418-.246-4.457 1.168 1.184-4.34-.273-.445c-1.168-1.902-1.785-4.09-1.785-6.34 0-6.605 5.383-11.984 12-11.984 3.199 0 6.207 1.246 8.469 3.504 2.266 2.27 3.516 5.277 3.516 8.48-.001 6.615-5.384 12.008-12.392 12.008zM22.602 19.441c-.336-.168-1.992-.984-2.301-1.098-.309-.113-.535-.168-.762.168s-.871 1.098-1.07 1.328c-.197.223-.395.252-.73.084-.336-.168-1.418-.523-2.699-1.672-1-.891-1.672-1.992-1.871-2.328-.197-.336-.021-.516.148-.684.152-.152.336-.395.504-.59.168-.197.223-.336.336-.559.113-.223.057-.418-.029-.59-.084-.168-.762-1.84-1.043-2.523-.275-.66-.555-.57-.762-.582-.195-.012-.418-.014-.641-.014s-.59.084-.898.418c-.309.336-1.18 1.152-1.18 2.812s1.207 3.266 1.375 3.492c.168.223 2.367 3.613 5.73 5.059.801.344 1.426.551 1.914.703.805.256 1.539.219 2.121.133.648-.098 1.992-.812 2.273-1.598.281-.785.281-1.457.197-1.598-.084-.141-.309-.223-.645-.391z"/>
                </svg>
                Hablar por WhatsApp
              </a>

              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Franquicia Nõva Sushi")}`}
                className="px-5 py-3 rounded-full bg-white text-black font-medium tracking-wide hover:brightness-95 active:scale-95 transition"
              >
                Pedir dossier por mail
              </a>
            </div>
          </div>

          {/* FORMULARIO */}
          <motion.form
            onSubmit={(e) => {
              // sin backend: usar mailto simple con campos clave
              e.preventDefault();
              const fd = new FormData(e.currentTarget as HTMLFormElement);
              const body = [
                `Nombre: ${fd.get("name")}`,
                `Email: ${fd.get("email")}`,
                `Teléfono: ${fd.get("phone")}`,
                `Ciudad: ${fd.get("city")}`,
                `Experiencia: ${fd.get("exp")}`,
                `Mensaje: ${fd.get("msg")}`,
              ].join("%0D%0A");
              window.location.href = `mailto:${email}?subject=${encodeURIComponent(
                "Solicitud de franquicia"
              )}&body=${body}`;
            }}
            className="md:col-span-6 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-5 md:p-6 space-y-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold">Aplicá para franquicia</h3>
            <p className="text-sm text-white/70">Contanos de vos y tu plaza. Te contactamos en 24–48hs.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <input name="name" required placeholder="Nombre y apellido" className="input" />
              <input name="email" type="email" required placeholder="Email" className="input" />
              <input name="phone" required placeholder="Teléfono" className="input" />
              <input name="city" required placeholder="Ciudad / Provincia" className="input" />
              <select name="exp" className="input md:col-span-2">
                <option value="">Experiencia operando locales</option>
                <option>Sin experiencia</option>
                <option>1-3 años</option>
                <option>+3 años</option>
              </select>
              <textarea name="msg" rows={4} placeholder="Contanos brevemente tu interés" className="input md:col-span-2" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#e8e0cf] text-black font-medium tracking-widest hover:brightness-95 active:scale-95"
              >
                Enviar
              </button>
              <a
                href={WA(whatsappNumber, waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-white underline underline-offset-4"
              >
                O escribinos por WhatsApp
              </a>
            </div>
          </motion.form>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Preguntas frecuentes</h3>
          <ul className="space-y-3">
            {FAQ.map((item, i) => {
              const active = open === i;
              return (
                <li key={item.q} className="rounded-xl bg-white/[0.04] ring-1 ring-white/10">
                  <button
                    onClick={() => setOpen(active ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between"
                    aria-expanded={active}
                  >
                    <span className="font-medium">{item.q}</span>
                    <span className="text-white/60">{active ? "–" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 pb-4 text-white/80"
                      >
                        {item.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* estilos utilitarios locales */}
      <style jsx>{`
        .input {
          @apply rounded-xl bg-white/10 px-4 py-2 outline-none ring-1 ring-white/15 focus:ring-white/30 placeholder-white/50;
        }
      `}</style>
    </section>
  );
}
