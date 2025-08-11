"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CollageBackground({
  images,
  interval = 4000,
}: { images: string[]; interval?: number }) {
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const imagePoolRef = useRef<string[]>([...images]);

  // Inicializar con tantas imágenes como capas queramos (3-4 capas superpuestas)
  useEffect(() => {
    const initial = [] as string[];
    for (let i = 0; i < Math.min(4, images.length); i++) {
      initial.push(imagePoolRef.current.shift()!);
    }
    setCurrentImages(initial);
  }, [images]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      setCurrentImages((prev) => {
        const nextPool = [...imagePoolRef.current];
        if (nextPool.length === 0) {
          // resetear pool para no repetir hasta pasar todas
          imagePoolRef.current = [...images];
        }
        const nextImage = imagePoolRef.current.shift()!;
        const updated = [...prev.slice(1), nextImage]; // descarta la más vieja y añade nueva
        return updated;
      });
    }, interval);

    return () => clearInterval(id);
  }, [images, interval]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <AnimatePresence>
        {currentImages.map((img, i) => (
          <motion.div
            key={img}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2 }}
            style={{ zIndex: i }}
          >
            <Image
              src={img}
              alt=""
              fill
              priority={i === currentImages.length - 1}
              className="object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}