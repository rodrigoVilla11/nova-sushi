"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { CONTACT } from "src/lib/config";

function WA(number: string, msg: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

const BENEFITS = [
  {
    title: "Marca con tracción",
    desc: "Productos diferenciales (Sushidog, burgers y hot rolls) con alta recompra.",
  },
  {
    title: "Playbook operativo",
    desc: "Manual de operaciones, fichas técnicas y proveedores homologados.",
  },
  {
    title: "Marketing & lanzamientos",
    desc: "Calendario de campañas, assets y soporte de performance.",
  },
  {
    title: "Capacitación",
    desc: "Onboarding de cocina, atención y liderazgo de equipo.",
  },
];

const FAQ = [
  {
    q: "¿Cuál es la inversión inicial?",
    a: "Varía según el local y la ubicación. Podemos compartir un presupuesto estimado luego de tu aplicación.",
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

const MAX_MSG = 300;

function buildWaBody(fd: FormData) {
  const lines = [
    "Nueva solicitud de franquicia:",
    `• Nombre: ${fd.get("name")}`,
    `• Email: ${fd.get("email")}`,
    `• Teléfono: ${fd.get("phone")}`,
    `• Ciudad: ${fd.get("city")}`,
    `• Experiencia: ${fd.get("exp") || "-"}`,
    "",
    `Mensaje: ${fd.get("msg") || "-"}`,
  ];
  return lines.join("\n");
}

export default function Franchise({
  whatsappNumber = CONTACT.whatsappAdmin,
  email = CONTACT.email,
}: {
  whatsappNumber?: string;
  email?: string;
}) {
  const waMsg = useMemo(
    () => "Hola Nõva, me interesa abrir una franquicia. ¿Podemos conversar?",
    []
  );
  const [open, setOpen] = useState<number | null>(null);

  const [sent, setSent] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [msgLen, setMsgLen] = useState(0);
  const [error, setError] = useState("");

  return (
    <section
      id="franquicias"
      className="relative py-20 md:py-28 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/hero/fondo3.png')" }}
    >
      {/* fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_0%)]"
      />

      <div className="mx-auto max-w-6xl px-6">
        {/* HERO */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start ">
          <div className="md:col-span-6 space-y-4 ring-1 ring-white/10 p-5 md:p-6 rounded-2xl bg-black">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider">
              Programa de franquicias
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Abrí tu <span className="text-white/90">Nõva Sushi</span> en tu
              ciudad
            </h2>
            <p className="text-white/70">
              Sumate a una marca con productos icónicos y soporte operativo
              integral. Buscamos operadores comprometidos para expandir el
              modelo en nuevas plazas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4"
                >
                  <h4 className="font-semibold">{b.title}</h4>
                  <p className="text-sm text-white/70">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href="/franquicias"
                className="btn-primary px-5 py-3"
              >
                Ver programa completo →
              </a>
              <a
                href={WA(whatsappNumber, waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa px-5 py-3"
                style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.25)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16.004 2.003c-7.74 0-14 6.262-14 14 0 2.465.648 4.87 1.884 6.992l-1.996 7.324 7.512-1.968c2.057 1.122 4.375 1.711 6.738 1.711h.002c7.74 0 14-6.262 14-14s-6.26-14.059-14-14.059zM16.002 26.941c-2.07 0-4.084-.555-5.844-1.605l-.418-.246-4.457 1.168 1.184-4.34-.273-.445c-1.168-1.902-1.785-4.09-1.785-6.34 0-6.605 5.383-11.984 12-11.984 3.199 0 6.207 1.246 8.469 3.504 2.266 2.27 3.516 5.277 3.516 8.48-.001 6.615-5.384 12.008-12.392 12.008zM22.602 19.441c-.336-.168-1.992-.984-2.301-1.098-.309-.113-.535-.168-.762.168s-.871 1.098-1.07 1.328c-.197.223-.395.252-.73.084-.336-.168-1.418-.523-2.699-1.672-1-.891-1.672-1.992-1.871-2.328-.197-.336-.021-.516.148-.684.152-.152.336-.395.504-.59.168-.197.223-.336.336-.559.113-.223.057-.418-.029-.59-.084-.168-.762-1.84-1.043-2.523-.275-.66-.555-.57-.762-.582-.195-.012-.418-.014-.641-.014s-.59.084-.898.418c-.309.336-1.18 1.152-1.18 2.812s1.207 3.266 1.375 3.492c.168.223 2.367 3.613 5.73 5.059.801.344 1.426.551 1.914.703.805.256 1.539.219 2.121.133.648-.098 1.992-.812 2.273-1.598.281-.785.281-1.457.197-1.598-.084-.141-.309-.223-.645-.391z" />
                </svg>
                Hablar por WhatsApp
              </a>

              <a
                href={`mailto:${email}?subject=${encodeURIComponent(
                  "Franquicia Nõva Sushi"
                )}`}
                className="btn-outline px-5 py-3"
              >
                Pedir dossier por mail
              </a>
            </div>
          </div>
          {/* FORMULARIO */}
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const fd = new FormData(form);

              const name = String(fd.get("name") || "").trim();
              const emailVal = String(fd.get("email") || "").trim();
              const phone = String(fd.get("phone") || "").trim();
              const city = String(fd.get("city") || "").trim();

              const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
              const phoneOk = phone.replace(/\D/g, "").length >= 8;
              if (!name || !emailOk || !phoneOk || !city) {
                setSent(false);
                setError("Revisá los datos: nombre, email, teléfono y ciudad.");
                return;
              }

              setError("");
              const body = buildWaBody(fd);
              const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`;
              const popup = window.open(url, "_blank");

              form.reset();
              setMsgLen(0);
              setSent(true);
              if (!popup) setWaLink(url);
              setTimeout(() => { setSent(false); setWaLink(""); }, 5000);
            }}
            className="md:col-span-6 rounded-3xl bg-black ring-1 ring-white/10 p-0 overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* header del form */}
            <div className="px-6 pt-6 pb-4 border-b border-white/10 bg-white/[0.02] backdrop-blur">
              <h3 className="text-lg font-semibold tracking-tight">
                Aplicá para franquicia
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Dejanos tus datos y te contactamos en 24–48 hs.
              </p>
            </div>

            {/* mensajes */}
            {error && (
              <div
                role="alert"
                className="mx-6 mt-4 rounded-xl bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30 px-3 py-2 text-sm"
              >
                {error}
              </div>
            )}
            {sent && (
              <div
                role="status"
                className="mx-6 mt-4 rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30 px-3 py-2 text-sm"
              >
                {waLink ? (
                  <>
                    Tu solicitud está lista.{" "}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium"
                    >
                      Tocá acá para enviarla por WhatsApp →
                    </a>
                  </>
                ) : (
                  "¡Listo! Te abrimos WhatsApp con tu solicitud."
                )}
              </div>
            )}

            {/* campos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-neutral-900/80 rounded-2xl border border-white/10 shadow-xl">
              {/* nombre */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">
                  👤
                </span>
                <input
                  name="name"
                  required
                  placeholder=" "
                  autoComplete="name"
                  className="w-full h-12 bg-white/5 text-white placeholder-transparent pl-10 pr-3 rounded-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-brand-accent/60 transition peer"
                />
                <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm text-white/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-brand-accent/80">
                  Nombre y apellido
                </label>
              </div>

              {/* email */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">
                  ✉️
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder=" "
                  autoComplete="email"
                  className="w-full h-12 bg-white/5 text-white placeholder-transparent pl-10 pr-3 rounded-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-brand-accent/60 transition peer"
                />
                <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm text-white/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-brand-accent/80">
                  Email
                </label>
              </div>

              {/* teléfono */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">
                  📞
                </span>
                <input
                  name="phone"
                  required
                  placeholder=" "
                  inputMode="tel"
                  autoComplete="tel"
                  className="w-full h-12 bg-white/5 text-white placeholder-transparent pl-10 pr-3 rounded-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-brand-accent/60 transition peer"
                  onInput={(e) =>
                    (e.currentTarget.value = e.currentTarget.value.replace(
                      /[^\d+\s()-]/g,
                      ""
                    ))
                  }
                />
                <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm text-white/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-brand-accent/80">
                  Teléfono
                </label>
              </div>

              {/* ciudad */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">
                  📍
                </span>
                <input
                  name="city"
                  required
                  placeholder=" "
                  className="w-full h-12 bg-white/5 text-white placeholder-transparent pl-10 pr-3 rounded-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-brand-accent/60 transition peer"
                />
                <label className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm text-white/60 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/50 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-brand-accent/80">
                  Ciudad / Provincia
                </label>
              </div>

              {/* experiencia */}
              <div className="relative md:col-span-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">
                  🏷️
                </span>
                <label htmlFor="franchise-exp" className="sr-only">
                  Experiencia operando locales
                </label>
                <select
                  id="franchise-exp"
                  name="exp"
                  className="appearance-none w-full h-12 bg-neutral-900 text-white pl-10 pr-10 rounded-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-brand-accent/60 transition"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Experiencia operando locales
                  </option>
                  <option>Sin experiencia</option>
                  <option>1-3 años</option>
                  <option>+3 años</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
                <span className="absolute left-10 -top-2 text-xs text-brand-accent/80 bg-neutral-900 px-1 rounded">
                  Experiencia
                </span>
              </div>

              {/* mensaje */}
              <div className="relative md:col-span-2">
                <span className="absolute left-3 top-3 text-white/50" aria-hidden="true">📝</span>
                <textarea
                  name="msg"
                  rows={4}
                  placeholder=" "
                  aria-label="Mensaje adicional (opcional)"
                  className="w-full bg-white/5 text-white placeholder-transparent pt-3 pl-10 pr-3 rounded-xl outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-brand-accent/60 transition peer"
                  maxLength={MAX_MSG}
                  onInput={(e) => setMsgLen(e.currentTarget.value.length)}
                />
                <label className="pointer-events-none absolute left-10 top-3 text-sm text-white/60 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand-accent/80 bg-neutral-900 px-1 rounded">
                  Mensaje
                </label>
                <div className="mt-2 text-[11px] text-white/60 text-right">
                  {msgLen}/{MAX_MSG}
                </div>
              </div>

              {/* consentimiento */}
              <label className="md:col-span-2 flex items-start gap-3 text-xs text-white/80">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-[2px] h-4 w-4 rounded-md border-white/20 bg-white/10 accent-brand-accent"
                />
                <span>
                  Acepto ser contactadx por WhatsApp y email con fines
                  comerciales.
                </span>
              </label>

              {/* CTA */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="btn-primary w-full h-12"
                >
                  Enviar
                </button>
              </div>
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
                <li
                  key={item.q}
                  className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 bg-black"
                >
                  <button
                    onClick={() => setOpen(active ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between bg-black"
                    aria-expanded={active}
                  >
                    <span className="font-medium">{item.q}</span>
                    <span className="text-white/60" aria-hidden="true">{active ? "–" : "+"}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 pb-4 text-white/80 bg-black"
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
    </section>
  );
}
