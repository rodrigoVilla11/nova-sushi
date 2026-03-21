"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT } from "src/lib/config";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 1) Tipo que usa la UI
export type Dish = {
  id: string;
  name: string;
  desc: string;
  img: string;
  price: number | null;
  category: string;
  tags?: string[];
};

// 2) Tipamos el JSON crudo y normalizamos al tipo Dish
type RawDish = {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  img?: string;
  price?: number;
  category?: string;
  tags?: string[];
};

import rawDishes from "../data/dishes.json" assert { type: "json" };

// helper por si faltara id en algún ítem del JSON
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const DISHES: Dish[] = (rawDishes as unknown as RawDish[]).map((d, i) => ({
  id: d.id ?? `${slug(d.name ?? "dish")}-${i}`,
  name: d.name ?? "",
  desc: d.description ?? "",
  img: d.image ? encodeURI(d.image) : d.img ? encodeURI(d.img) : "",
  price: typeof d.price === "number" ? d.price : null,
  category: d.category ?? "Otros",
  tags: Array.isArray(d.tags) ? d.tags : [],
}));

export default function MenuShowcase() {
  const [cat, setCat] = useState<"Todos" | Dish["category"]>("Todos");
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  const CATEGORIES = useMemo(() => {
    const cats = Array.from(new Set(DISHES.map((d) => d.category))).sort(
      (a, b) => a.localeCompare(b)
    );
    return ["Todos", ...cats] as Array<Dish["category"] | "Todos">;
  }, []);

  const { filtered, totalCount } = useMemo(() => {
    const byCat =
      cat === "Todos" ? DISHES : DISHES.filter((d) => d.category === cat);
    const byQ = debouncedQ.trim()
      ? byCat.filter((d) =>
          [d.name, d.desc, d.tags?.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(debouncedQ.toLowerCase())
        )
      : byCat;
    return { filtered: byQ.slice(0, 12), totalCount: byQ.length };
  }, [cat, debouncedQ]);

  return (
    <section
      id="menu"
      className="min-h-screen flex flex-col justify-center pb-8 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/hero/fondo3.png')" }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="mb-8 space-y-5">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider mb-3">
              Nuestro menú
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Elegí lo que se te antoja.
            </h2>
            <p className="mt-2 text-white/60 text-base">
              Sushidogs, burgers, rolls y más — entrá al menú para ver el detalle completo.
            </p>
          </div>

          {/* Categorías: scroll horizontal en mobile, wrap en desktop */}
          <div
            className="flex items-center gap-2 overflow-x-auto md:flex-wrap md:justify-center pb-1 md:pb-0 no-scrollbar"
            role="tablist"
            aria-label="Categorías de la carta"
          >
            {CATEGORIES.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c)}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
          ${
            active
              ? "bg-white text-black ring-white"
              : "bg-black ring-white/20 text-white/80 hover:bg-white/10"
          }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Buscador con icono y limpiar */}
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="opacity-70"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, descripción o tags…"
              className="w-full rounded-full bg-white/10 placeholder-white/50 pl-10 pr-10 py-3 outline-none ring-1 ring-white/15 focus:ring-white/30"
              aria-label="Buscar platos"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute inset-y-0 right-2 my-auto h-7 w-7 grid place-items-center rounded-full hover:bg-white/10"
                aria-label="Limpiar búsqueda"
                title="Limpiar"
              >
                ✕
              </button>
            )}
          </div>
        </header>

        {/* Estado vacío */}
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-white/60 text-lg">
              No encontramos platos para{" "}
              <span className="text-white/90">&ldquo;{q}&rdquo;</span>
            </p>
            <button
              onClick={() => {
                setQ("");
                setCat("Todos");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition"
            >
              Ver todos los platos
            </button>
          </div>
        )}

        {/* Mobile: carrusel snap; Desktop: grid */}
        {filtered.length > 0 && (
          <>
            <div className="md:hidden -mx-4 px-4">
              <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                {filtered.map((d) => (
                  <li key={d.id} className="snap-start shrink-0 w-[74%]">
                    <Card dish={d} onOpen={() => setOpenId(d.id)} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:grid grid-cols-12 gap-5">
              {filtered.map((d) => (
                <div key={d.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
                  <Card dish={d} onOpen={() => setOpenId(d.id)} />
                </div>
              ))}
            </div>

            {totalCount > 12 && (
              <p className="mt-3 text-center text-white/50 text-xs">
                Mostrando 12 de {totalCount} platos
              </p>
            )}

            <div className="mt-6 text-center">
              <a
                href={CONTACT.pedisyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver menú completo en Pedisy (abre en nueva pestaña)"
                className="btn-primary px-7 py-3"
              >
                Ver menú completo →
              </a>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {openId && (
          <DishModal
            dish={DISHES.find((d) => d.id === openId)!}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Card({ dish, onOpen }: { dish: Dish; onOpen: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="group bg-white/5 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-white/25 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative h-48">
        <Image
          src={dish.img}
          alt={dish.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 74vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* fade rectangular a negro */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: `
              inset 0 50px 60px -40px rgba(0,0,0,0.9),
              inset 0 -50px 60px -40px rgba(0,0,0,0.9),
              inset 50px 0 60px -40px rgba(0,0,0,0.9),
              inset -50px 0 60px -40px rgba(0,0,0,0.9)
            `,
          }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base leading-snug">{dish.name}</h3>
        </div>

        <p className="mt-1 text-sm text-white/70 line-clamp-2">{dish.desc}</p>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 flex-wrap">
            {dish.tags?.map((t) => (
              <span
                key={t}
                className="text-[11px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={onOpen}
            className="btn-primary shrink-0 text-xs px-3 py-1"
          >
            VER DETALLE
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function DishModal({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Foco al abrir
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 outline-none"
      >
        <div className="relative h-64">
          <Image
            src={dish.img}
            alt={dish.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 512px"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-black/60 hover:bg-black/80"
            aria-label="Cerrar detalle del plato"
          >
            ✕
          </button>
        </div>
        <div className="p-5">
          <div>
            <h3 id="dish-modal-title" className="text-xl font-semibold leading-snug">
              {dish.name}
            </h3>
          </div>
          <p className="mt-2 text-white/70 text-sm leading-relaxed">{dish.desc}</p>
          {dish.tags && dish.tags.length > 0 && (
            <div className="mt-3 flex gap-1.5 flex-wrap">
              {dish.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={CONTACT.pedisyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 text-center px-6 py-3"
            >
              Pedir online →
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`¡Hola! Quiero pedir ${dish.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa justify-center flex-1 px-6 py-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M16.004 2.003c-7.74 0-14 6.262-14 14 0 2.465.648 4.87 1.884 6.992l-1.996 7.324 7.512-1.968c2.057 1.122 4.375 1.711 6.738 1.711h.002c7.74 0 14-6.262 14-14s-6.26-14.059-14-14.059zM16.002 26.941c-2.07 0-4.084-.555-5.844-1.605l-.418-.246-4.457 1.168 1.184-4.34-.273-.445c-1.168-1.902-1.785-4.09-1.785-6.34 0-6.605 5.383-11.984 12-11.984 3.199 0 6.207 1.246 8.469 3.504 2.266 2.27 3.516 5.277 3.516 8.48-.001 6.615-5.384 12.008-12.392 12.008zM22.602 19.441c-.336-.168-1.992-.984-2.301-1.098-.309-.113-.535-.168-.762.168s-.871 1.098-1.07 1.328c-.197.223-.395.252-.73.084-.336-.168-1.418-.523-2.699-1.672-1-.891-1.672-1.992-1.871-2.328-.197-.336-.021-.516.148-.684.152-.152.336-.395.504-.59.168-.197.223-.336.336-.559.113-.223.057-.418-.029-.59-.084-.168-.762-1.84-1.043-2.523-.275-.66-.555-.57-.762-.582-.195-.012-.418-.014-.641-.014s-.59.084-.898.418c-.309.336-1.18 1.152-1.18 2.812s1.207 3.266 1.375 3.492c.168.223 2.367 3.613 5.73 5.059.801.344 1.426.551 1.914.703.805.256 1.539.219 2.121.133.648-.098 1.992-.812 2.273-1.598.281-.785.281-1.457.197-1.598-.084-.141-.309-.223-.645-.391z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
