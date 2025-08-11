"use client";
import { useMemo, useState } from "react";
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

// 2) Importar JSON crudo y normalizar al tipo Dish
import rawDishes from "../data/dishes.json";

// helper por si faltara id en algún ítem del JSON
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
console.log("rawDishes", rawDishes);

const DISHES: Dish[] = (rawDishes as any[]).map((d, i) => ({
  id: d.id ?? `${slug(d.name ?? "dish")}-${i}`,
  name: d.name ?? "",
  desc: d.description ?? "",
  img: d.image ? encodeURI(d.image) : d.img ? encodeURI(d.img) : "",
  price: typeof d.price === "number" ? d.price : null,
  category: d.category ?? "Otros",
  tags: Array.isArray(d.tags) ? d.tags : [],
}));

console.log("DISHES", DISHES);
// 3) Categorías (tomadas del JSON + "Todos")
const CATEGORIES = useMemoCategories(DISHES);

function useMemoCategories(list: Dish[]) {
  const cats = Array.from(new Set(list.map((d) => d.category))).sort((a, b) =>
    a.localeCompare(b)
  );
  return ["Todos", ...cats] as Array<Dish["category"] | "Todos">;
}

const fARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export default function MenuShowcase() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const byCat =
      cat === "Todos" ? DISHES : DISHES.filter((d) => d.category === cat);
    const byQ = q.trim()
      ? byCat.filter((d) =>
          [d.name, d.desc, d.tags?.join(" ")]
            .join(" ")
            .toLowerCase()
            .includes(q.toLowerCase())
        )
      : byCat;
    return byQ.slice(0, 6); // ← límite a 6 resultados
  }, [cat, q]);

  return (
    <section
      id="menu"
      className="min-h-screen flex flex-col justify-center pb-8"
      style={{ backgroundImage: "url('/hero/fondo3.png')" }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="mb-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Carta destacada
              </h2>
              <p className="text-white/70 text-sm">
                Elegí por categoría o buscá un plato
              </p>
            </div>
          </div>

          {/* Categorías: carrusel horizontal con snap */}
          {/* Categorías: sin scroll, con wrap */}
          <div
            className="flex justify-center items-align flex-wrap gap-2"
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
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ring-1 transition
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
              className="w-full rounded-full bg-white/10 placeholder-white/50 pl-10 pr-10 py-2 outline-none ring-1 ring-white/15 focus:ring-white/30"
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

        {/* Mobile: carrusel snap; Desktop: grid */}
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
      className="group bg-white/5 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-white/20"
    >
      <div className="relative h-40">
        <Image
          src={dish.img}
          alt={dish.name}
          fill
          className="object-contain"
          unoptimized
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
          <h3 className="font-semibold leading-snug">{dish.name}</h3>
          {/* <span className="text-sm bg-white/10 rounded-full px-2 py-1">
            {dish.price != null ? fARS.format(dish.price) : "—"}
          </span> */}
        </div>

        <p className="mt-1 text-sm text-white/70 line-clamp-2">{dish.desc}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1">
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
            className="text-xs font-medium px-3 py-1 rounded-full bg-[#e8e0cf] text-black tracking-widest hover:brightness-95 active:scale-95"
          >
            VER DETALLE
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function DishModal({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden bg-black ring-1 ring-white/10"
      >
        <div className="relative h-64">
          <Image
            src={dish.img}
            alt={dish.name}
            fill
            className="object-contain"
            unoptimized
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-black/60 hover:bg-black/80"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold">{dish.name}</h3>
            {/* <span className="text-sm bg-white/10 rounded-full px-2 py-1">
              {dish.price != null ? fARS.format(dish.price) : "—"}
            </span> */}
          </div>
          <p className="mt-2 text-white/80">{dish.desc}</p>
          <div className="mt-3 flex gap-2">
            {dish.tags?.map((t) => (
              <span
                key={t}
                className="text-[11px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
