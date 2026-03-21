"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRANCHES } from "src/lib/config";

const WA_MSG = encodeURIComponent("¡Hola! Vengo de la web de Nõva Sushi 🍣 Quiero hacer un pedido. ¿Me pueden ayudar?");

function WaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.004 2.003c-7.74 0-14 6.262-14 14 0 2.465.648 4.87 1.884 6.992l-1.996 7.324 7.512-1.968c2.057 1.122 4.375 1.711 6.738 1.711h.002c7.74 0 14-6.262 14-14s-6.26-14.059-14-14.059zM16.002 26.941c-2.07 0-4.084-.555-5.844-1.605l-.418-.246-4.457 1.168 1.184-4.34-.273-.445c-1.168-1.902-1.785-4.09-1.785-6.34 0-6.605 5.383-11.984 12-11.984 3.199 0 6.207 1.246 8.469 3.504 2.266 2.27 3.516 5.277 3.516 8.48-.001 6.615-5.384 12.008-12.392 12.008zM22.602 19.441c-.336-.168-1.992-.984-2.301-1.098-.309-.113-.535-.168-.762.168s-.871 1.098-1.07 1.328c-.197.223-.395.252-.73.084-.336-.168-1.418-.523-2.699-1.672-1-.891-1.672-1.992-1.871-2.328-.197-.336-.021-.516.148-.684.152-.152.336-.395.504-.59.168-.197.223-.336.336-.559.113-.223.057-.418-.029-.59-.084-.168-.762-1.84-1.043-2.523-.275-.66-.555-.57-.762-.582-.195-.012-.418-.014-.641-.014s-.59.084-.898.418c-.309.336-1.18 1.152-1.18 2.812s1.207 3.266 1.375 3.492c.168.223 2.367 3.613 5.73 5.059.801.344 1.426.551 1.914.703.805.256 1.539.219 2.121.133.648-.098 1.992-.812 2.273-1.598.281-.785.281-1.457.197-1.598-.084-.141-.309-.223-.645-.391z" />
    </svg>
  );
}

export default function WaBranchPicker({
  className,
  label = "Pedir por WhatsApp",
  iconSize = 18,
  style,
}: {
  className?: string;
  label?: string;
  iconSize?: number;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      {/* Picker — aparece encima del botón */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 rounded-2xl bg-neutral-900 ring-1 ring-white/15 shadow-2xl overflow-hidden z-10"
          >
            <p className="px-4 pt-3 pb-1 text-xs text-white/50 tracking-wider">
              ¿A qué sucursal querés escribir?
            </p>
            {BRANCHES.map((b) => (
              <a
                key={b.name}
                href={`https://wa.me/${b.whatsapp}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-white/5 transition border-t border-white/10"
              >
                <div>
                  <p className="font-medium text-sm text-white">{b.name}</p>
                  <p className="text-xs text-white/50">{b.address}</p>
                </div>
                <span className="shrink-0 text-[#25D366]">
                  <WaIcon size={18} />
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${label} — elegí sucursal`}
        className={className}
        style={style}
      >
        <WaIcon size={iconSize} />
        {label}
      </button>
    </div>
  );
}
