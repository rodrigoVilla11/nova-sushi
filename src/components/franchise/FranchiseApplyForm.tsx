"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "src/lib/config";
import { FRANCHISE_CAPITAL_OPTIONS, FRANCHISE_EXP_OPTIONS } from "src/data/franchise-data";

function buildMessage(fd: FormData): string {
  const lines = [
    "Nueva aplicación de franquicia Nõva Sushi:",
    `• Nombre: ${fd.get("name")}`,
    `• WhatsApp: ${fd.get("phone")}`,
    `• Ciudad/Provincia: ${fd.get("city")}`,
    `• Capital estimado: ${fd.get("capital")}`,
    `• Experiencia gastronómica: ${fd.get("exp") || "No especificó"}`,
  ];
  return lines.join("\n");
}

type SubmitState = "idle" | "success-wa" | "success-email" | "blocked-wa" | "blocked-email";

export default function FranchiseApplyForm() {
  const [error, setError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [waLink, setWaLink] = useState("");
  const [emailLink, setEmailLink] = useState("");

  function validate(fd: FormData): string | null {
    if (!String(fd.get("name") || "").trim()) return "Ingresá tu nombre.";
    const phone = String(fd.get("phone") || "").replace(/\D/g, "");
    if (phone.length < 8) return "Ingresá un teléfono válido (mínimo 8 dígitos).";
    if (!String(fd.get("city") || "").trim()) return "Ingresá tu ciudad.";
    if (!String(fd.get("capital") || "")) return "Seleccioná un rango de capital.";
    return null;
  }

  function handleSubmit(mode: "wa" | "email") {
    const form = document.getElementById("apply-form-inner") as HTMLFormElement | null;
    if (!form) return;

    const fd = new FormData(form);
    const validationError = validate(fd);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const body = buildMessage(fd);
    const subject = "Aplicación a franquicia Nõva Sushi";

    if (mode === "wa") {
      const url = `https://wa.me/${CONTACT.whatsappAdmin}?text=${encodeURIComponent(body)}`;
      const popup = window.open(url, "_blank");
      if (!popup) {
        setWaLink(url);
        setSubmitState("blocked-wa");
      } else {
        setSubmitState("success-wa");
      }
    } else {
      const url = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const popup = window.open(url, "_self");
      if (!popup) {
        setEmailLink(url);
        setSubmitState("blocked-email");
      } else {
        setSubmitState("success-email");
      }
    }
  }

  if (submitState === "success-wa" || submitState === "success-email") {
    return (
      <section id="apply-form" className="py-20 md:py-28 bg-neutral-950">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-emerald-500/10 ring-1 ring-emerald-500/30 p-10"
          >
            <div className="text-4xl mb-4" aria-hidden="true">🎉</div>
            <h2 className="text-2xl font-bold mb-3">¡Recibimos tu aplicación!</h2>
            <p className="text-white/70 leading-relaxed">
              {submitState === "success-wa"
                ? "Te abrimos WhatsApp con tu solicitud. Respondemos en 24–48 hs."
                : "Te abrimos tu cliente de email con la solicitud. Respondemos en 24–48 hs."}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply-form" className="py-20 md:py-28 bg-neutral-950">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-brand-accent/20 border border-brand-accent/30 px-3 py-1 text-xs tracking-wider text-brand-accent mb-4">
            Aplicar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Aplicá a franquicia Nõva Sushi</h2>
          <p className="mt-3 text-white/60 max-w-lg mx-auto">
            Completá este formulario. Te respondemos en 24–48&nbsp;hs con información
            real, no con un vendedor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl bg-black ring-1 ring-white/10 overflow-hidden"
        >
          {/* Alert de error */}
          {error && (
            <div
              role="alert"
              className="mx-6 mt-6 rounded-xl bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30 px-4 py-3 text-sm"
            >
              {error}
            </div>
          )}

          {/* Blocked fallback links */}
          {(submitState === "blocked-wa" || submitState === "blocked-email") && (
            <div
              role="status"
              className="mx-6 mt-6 rounded-xl bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30 px-4 py-3 text-sm"
            >
              Tu solicitud está lista.{" "}
              <a
                href={submitState === "blocked-wa" ? waLink : emailLink}
                target={submitState === "blocked-wa" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="underline font-semibold"
              >
                {submitState === "blocked-wa"
                  ? "Tocá acá para enviarla por WhatsApp →"
                  : "Tocá acá para enviarla por email →"}
              </a>
            </div>
          )}

          <form
            id="apply-form-inner"
            onSubmit={(e) => e.preventDefault()}
            noValidate
            className="grid grid-cols-1 md:grid-cols-2 gap-5 p-8"
          >
            {/* Nombre */}
            <div className="md:col-span-2 relative">
              <label htmlFor="af-name" className="block text-xs text-white/70 mb-2 uppercase tracking-wider">
                Nombre completo *
              </label>
              <input
                id="af-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Juan Pérez"
                className="w-full h-12 bg-white/5 text-white placeholder-white/30 px-4 rounded-xl outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-brand-accent/60 transition"
              />
            </div>

            {/* Teléfono */}
            <div className="relative">
              <label htmlFor="af-phone" className="block text-xs text-white/70 mb-2 uppercase tracking-wider">
                WhatsApp / Teléfono *
              </label>
              <input
                id="af-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+54 9 351 xxx xxxx"
                className="w-full h-12 bg-white/5 text-white placeholder-white/30 px-4 rounded-xl outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-brand-accent/60 transition"
                onInput={(e) =>
                  (e.currentTarget.value = e.currentTarget.value.replace(/[^\d+\s()-]/g, ""))
                }
              />
            </div>

            {/* Ciudad */}
            <div className="relative">
              <label htmlFor="af-city" className="block text-xs text-white/70 mb-2 uppercase tracking-wider">
                Ciudad / Provincia *
              </label>
              <input
                id="af-city"
                name="city"
                type="text"
                required
                placeholder="Ej: Rosario, Santa Fe"
                className="w-full h-12 bg-white/5 text-white placeholder-white/30 px-4 rounded-xl outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-brand-accent/60 transition"
              />
            </div>

            {/* Capital */}
            <div className="relative md:col-span-2">
              <label htmlFor="af-capital" className="block text-xs text-white/70 mb-2 uppercase tracking-wider">
                Capital estimado disponible *
              </label>
              <div className="relative">
                <select
                  id="af-capital"
                  name="capital"
                  required
                  defaultValue=""
                  className="appearance-none w-full h-12 bg-neutral-900 text-white px-4 pr-10 rounded-xl outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-brand-accent/60 transition"
                >
                  <option value="" disabled>Seleccioná un rango</option>
                  {FRANCHISE_CAPITAL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>

            {/* Experiencia */}
            <div className="relative md:col-span-2">
              <label htmlFor="af-exp" className="block text-xs text-white/70 mb-2 uppercase tracking-wider">
                Experiencia en gastronomía (opcional)
              </label>
              <div className="relative">
                <select
                  id="af-exp"
                  name="exp"
                  defaultValue=""
                  className="appearance-none w-full h-12 bg-neutral-900 text-white px-4 pr-10 rounded-xl outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-brand-accent/60 transition"
                >
                  <option value="">No quiero especificar</option>
                  {FRANCHISE_EXP_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                  width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>

            {/* Consentimiento */}
            <label className="md:col-span-2 flex items-start gap-3 text-sm text-white/70 cursor-pointer">
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/20 bg-white/10 accent-brand-accent"
              />
              <span>
                Acepto ser contactadx por WhatsApp o email con fines comerciales.
              </span>
            </label>

            {/* Botones de envío */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSubmit("wa")}
                className="btn-wa justify-center h-12 px-6 py-4 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M16.004 2.003c-7.74 0-14 6.262-14 14 0 2.465.648 4.87 1.884 6.992l-1.996 7.324 7.512-1.968c2.057 1.122 4.375 1.711 6.738 1.711h.002c7.74 0 14-6.262 14-14s-6.26-14.059-14-14.059zM16.002 26.941c-2.07 0-4.084-.555-5.844-1.605l-.418-.246-4.457 1.168 1.184-4.34-.273-.445c-1.168-1.902-1.785-4.09-1.785-6.34 0-6.605 5.383-11.984 12-11.984 3.199 0 6.207 1.246 8.469 3.504 2.266 2.27 3.516 5.277 3.516 8.48-.001 6.615-5.384 12.008-12.392 12.008zM22.602 19.441c-.336-.168-1.992-.984-2.301-1.098-.309-.113-.535-.168-.762.168s-.871 1.098-1.07 1.328c-.197.223-.395.252-.73.084-.336-.168-1.418-.523-2.699-1.672-1-.891-1.672-1.992-1.871-2.328-.197-.336-.021-.516.148-.684.152-.152.336-.395.504-.59.168-.197.223-.336.336-.559.113-.223.057-.418-.029-.59-.084-.168-.762-1.84-1.043-2.523-.275-.66-.555-.57-.762-.582-.195-.012-.418-.014-.641-.014s-.59.084-.898.418c-.309.336-1.18 1.152-1.18 2.812s1.207 3.266 1.375 3.492c.168.223 2.367 3.613 5.73 5.059.801.344 1.426.551 1.914.703.805.256 1.539.219 2.121.133.648-.098 1.992-.812 2.273-1.598.281-.785.281-1.457.197-1.598-.084-.141-.309-.223-.645-.391z" />
                </svg>
                Enviar por WhatsApp
              </button>

              <button
                type="button"
                onClick={() => handleSubmit("email")}
                className="flex items-center justify-center gap-2 h-12 px-6 py-4 rounded-full bg-white text-black font-semibold hover:brightness-95 active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Enviar por email
              </button>
            </div>

            <p className="md:col-span-2 text-center text-xs text-white/30">
              No te vamos a mandar spam. Solo te contactamos para responder tu aplicación.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
