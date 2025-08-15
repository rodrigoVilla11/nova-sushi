"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export type StoryStep = {
  id: string;
  label?: string; // año / hito (p.ej. "2019")
  title: string;
  text: string;
  media?: { type: "image" | "video"; src: string; alt?: string };
};

export default function Story({
  title = "Nuestra historia",
  kicker = "Nõva Sushi",
  steps,
}: {
  title?: string;
  kicker?: string;
  steps: StoryStep[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.9"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.08, 0.18]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative py-20 md:py-28 bg-center"
      style={{ backgroundImage: "url('/hero/fondo3.png')" }}
    >
      {/* fondo sutil */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ opacity: glowOpacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)]" />
      </motion.div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 px-6">
        {/* Columna izquierda sticky */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-24 space-y-3">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs tracking-wider">
              {kicker}
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              {title}
            </h2>
            <p className="text-white/70 text-sm">
              Un recorrido por los hitos, sabores y decisiones que nos trajeron
              hasta acá.
            </p>
          </div>
        </div>

        {/* Columna derecha: pasos */}
        <div className="md:col-span-7 space-y-10">
          {steps.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black"
            >
              {/* etiqueta */}
              {s.label && (
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full bg-black/70 backdrop-blur px-2.5 py-1 text-xs tracking-wider">
                    {s.label}
                  </span>
                </div>
              )}

              {/* media */}
              {s.media ? (
                <div className="relative h-56 md:h-64">
                  {s.media.type === "image" ? (
                    <Image
                      src={s.media.src}
                      alt={s.media.alt ?? s.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 90vw"
                    />
                  ) : (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src={s.media.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                  {/* fade rectangular a negro en bordes */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: `
                        inset 0 60px 70px -50px rgba(0,0,0,0.9),
                        inset 0 -60px 70px -50px rgba(0,0,0,0.9),
                        inset 60px 0 70px -50px rgba(0,0,0,0.9),
                        inset -60px 0 70px -50px rgba(0,0,0,0.9)
                      `,
                    }}
                  />
                </div>
              ) : null}

              {/* contenido */}
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed">
                  {s.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
