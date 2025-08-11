"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Slot = { top: number; left: number; w: number; h: number };

type Props = {
  images: string[];
  interval?: number; // ms entre reemplazos (rota de a 1)
  feather?: number; // 0..1 borde difuminado (0=duro, 1=muy suave)
};

export default function OverlapCollage({
  images,
  interval = 3400,
  feather = 0.32,
}: Props) {
  // Slots del mock (desktop). Todos fuera del centro.
  // Ajustados para 16:9 aprox. Puedes retocar números fino si querés.
  // En OverlapCollage -> slotsDesktop / slotsMobile
  const slotsDesktop: Slot[] = [
    { top: 4, left: 2, w: 24, h: 66 }, // top mid 1
    { top: 72, left: 2, w: 24, h: 24 }, // top mid 1
    { top: 4, left: 28, w: 24, h: 24 }, // top mid 1
    { top: 4, left: 54, w: 18, h: 24 }, // top mid 2
    { top: 4, left: 76, w: 20, h: 26 }, // top right grande
    { top: 34, left: 76, w: 20, h: 62 }, // right alto
    { top: 72, left: 28, w: 12, h: 24 }, // panorámica abajo centro
    { top: 72, left: 42, w: 12, h: 24 }, // panorámica abajo centro
    { top: 72, left: 56, w: 18, h: 24 }, // panorámica abajo centro
  ];
  // (mobile)
  const slotsMobile: Slot[] = [
    { top: 6, left: 54, w: 40, h: 18 },
    { top: 34, left: 58, w: 36, h: 36 },
    { top: 72, left: 20, w: 60, h: 18 },
    { top: 6, left: 6, w: 40, h: 26 },
    { top: 36, left: 6, w: 36, h: 36 },
  ];

  // zona de exclusión para el logo/CTA (por si querés moverla)
  const exclude = { cx: 50, cy: 45, w: 40, h: 26, pad: 2 };

  // asignación de imágenes (sin repetición simultánea)
  const L = Math.min(images.length, slotsDesktop.length);
  const [idxBySlot, setIdxBySlot] = useState<number[]>(() =>
    Array.from({ length: L }, (_, i) => i % images.length)
  );
  const [verBySlot, setVerBySlot] = useState<number[]>(() =>
    Array.from({ length: L }, () => 0)
  );
  const nextRef = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    const id = setInterval(() => {
      setIdxBySlot((curr) => {
        const used = new Set(curr);
        const t = nextRef.current % L; // slot a reemplazar
        nextRef.current++;

        const pool: number[] = [];
        for (let i = 0; i < images.length; i++) if (!used.has(i)) pool.push(i);
        const pick = pool.length
          ? pool[Math.floor(Math.random() * pool.length)]
          : (curr[t] + 1) % images.length;

        const next = [...curr];
        next[t] = pick;
        setVerBySlot((v) => {
          const vv = [...v];
          vv[t] = vv[t] + 1;
          return vv;
        });
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [images.length, L, interval]);

  const clamp = (n: number, a: number, b: number) =>
    Math.max(a, Math.min(b, n));
  const maskStop = clamp(1 - feather, 0, 1) * 100;

  // helper para no invadir el centro
  const touchesExclude = (s: Slot) => {
    const pad = exclude.pad ?? 0;
    const left = exclude.cx - exclude.w / 2 - pad;
    const top = exclude.cy - exclude.h / 2 - pad;
    const w = exclude.w + pad * 2;
    const h = exclude.h + pad * 2;
    return !(
      s.left + s.w < left ||
      left + w < s.left ||
      s.top + s.h < top ||
      top + h < s.top
    );
  };

  return (
    <div className="absolute inset-0 -z-10">
      {/* oscurecido global */}
      <div className="absolute inset-0 bg-black/40" />

      {/* desktop slots */}
      <div className="relative hidden h-full w-full md:block">
        {slotsDesktop.slice(0, L).map((s, i) => {
          if (touchesExclude(s)) return null; // por seguridad
          const imgIdx = idxBySlot[i] % images.length;
          const key = `${i}-d-${verBySlot[i]}`;
          return (
            <div
              key={`d-${i}`}
              className="absolute"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.w}%`,
                height: `${s.h}%`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full rounded-xl overflow-hidden"
                  style={{
                    filter: "drop-shadow(0 24px 36px rgba(0,0,0,0.42))",
                  }}
                >
                  <Image
                    src={images[imgIdx]}
                    alt=""
                    fill
                    className="object-cover"
                  />

                  {/* overlay rectangular negro en bordes */}
                  <div
                    className="pointer-events-none absolute inset-0 z-10"
      //               style={{
      //                 boxShadow: `
      //   inset 0 40px 40px -20px rgba(0,0,0,0.9),  /* arriba */
      //   inset 0 -40px 40px -20px rgba(0,0,0,0.9), /* abajo */
      //   inset 40px 0 40px -20px rgba(0,0,0,0.9),  /* izquierda */
      //   inset -40px 0 40px -20px rgba(0,0,0,0.9)  /* derecha */
      // `,
      //               }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* mobile slots */}
      <div className="relative h-full w-full md:hidden">
        {slotsMobile.slice(0, Math.min(L, slotsMobile.length)).map((s, i) => {
          if (touchesExclude(s)) return null;
          const imgIdx = idxBySlot[i] % images.length;
          const key = `${i}-m-${verBySlot[i]}`;
          return (
            <div
              key={`m-${i}`}
              className="absolute"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.w}%`,
                height: `${s.h}%`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full"
                  style={{
                    maskImage: `radial-gradient(120% 120% at 50% 50%, black ${maskStop}%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(120% 120% at 50% 50%, black ${maskStop}%, transparent 100%)`,
                    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))",
                  }}
                >
                  <Image
                    src={images[imgIdx]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="90vw"
                    priority={i < 2}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
