"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import OverlapCollage from "./OverlapCollage";
import Image from "next/image";

// Lista de imágenes del collage (colocalas en /public o usá remotas permitidas)
const IMAGES = [
  "/DSC00331.jpg",
  "/DSC00372.jpg",
  "/DSC00375.jpg",
  "/DSC00376.jpg",
  "/DSC00386.jpg",
  "/DSC00387.jpg",
  "/DSC00395.jpg",
  "/DSC00397.jpg",
  "/DSC00410.jpg",
  "/DSC00412.jpg",
  "/DSC00416.jpg",
  "/DSC00420.jpg",
  "/DSC00421.jpg",
  "/DSC00425.jpg",
  "/DSC00438.jpg",
  "/DSC00444.jpg",
  "/DSC00452.jpg",
  "/DSC00455.jpg",
  "/DSC00481.jpg",
  "/DSC00485.jpg",
  "/DSC00503.jpg",
  "/DSC00506.jpg",
  "/DSC00509.jpg",
  "/DSC00511.jpg",
  "/DSC00512.jpg",
  "/DSC00514.jpg",
  "/DSC00515.jpg",
  "/DSC00516.jpg",
  "/DSC00520.jpg",
  "/DSC00531.jpg",
  "/DSC00535.jpg",
  "/DSC00559.jpg",
  "/DSC00565.jpg",
  "/DSC00567.jpg",
  "/DSC00570.jpg",
  "/DSC00571.jpg",
  "/DSC00572.jpg",
  "/DSC00582.jpg",
  "/DSC00590.jpg",
  "/DSC00007.jpg",
  "/DSC00030.jpg",
  "/DSC00070.jpg",
  "/DSC00074.jpg",
  "/DSC00087.jpg",
  "/DSC00115.jpg",
  "/DSC00117.jpg",
  "/DSC00137.jpg",
  "/DSC00140.jpg",
  "/DSC00162.jpg",
  "/DSC00176.jpg",
  "/DSC00180.jpg",
  "/DSC00183.jpg",
  "/DSC00188.jpg",
  "/DSC00196.jpg",
  "/DSC00200.jpg",
  "/DSC00201.jpg",
  "/DSC00215.jpg",
  "/DSC00222.jpg",
  "/DSC00256.jpg",
  "/DSC00262.jpg",
  "/DSC00272.jpg",
  "/DSC00274.jpg",
  "/DSC00281.jpg",
  "/DSC00284.jpg",
  "/DSC00288.jpg",
  "/DSC00304.jpg",
  "/DSC00305.jpg",
  "/DSC00310.jpg",
  "/DSC00311.jpg",
  "/DSC00315.jpg",
  "/DSC00318.jpg",
  "/DSC00318-2.jpg",
  "/DSC00327.jpg",
  "/DSC00333.jpg",
  "/DSC00337.jpg",
  "/DSC00338.jpg",
  "/DSC00351.jpg",
  "/DSC00354.jpg",
  "/DSC00357.jpg",
  "/DSC00359.jpg",
  "/DSC00402.jpg",
  "/DSC00405.jpg",
  "/DSC09952.jpg",
  "/DSC09988.jpg",
  "/DSC00001.jpg",
  "/DSC00013.jpg",
  "/DSC00039.jpg",
  "/DSC00071.jpg",
  "/DSC09737.jpg",
  "/DSC09795.jpg",
  "/DSC09802-2.jpg",
  "/DSC09805.jpg",
  "/DSC09814.jpg",
  "/DSC09826.jpg",
  "/DSC09827.jpg",
  "/DSC09833.jpg",
  "/DSC09837.jpg",
  "/DSC09838.jpg",
  "/DSC09840.jpg",
  "/DSC09843.jpg",
  "/DSC09845.jpg",
  "/DSC09846.jpg",
  "/DSC09847.jpg",
  "/DSC09850.jpg",
  "/DSC09854.jpg",
  "/DSC09857.jpg",
  "/DSC09864.jpg",
  "/DSC09872.jpg",
  "/DSC09873.jpg",
  "/DSC09874.jpg",
  "/DSC09877.jpg",
  "/DSC09878.jpg",
  "/DSC09894.jpg",
  "/DSC09895.jpg",
  "/DSC09896.jpg",
  "/DSC09897.jpg",
  "/DSC09898.jpg",
  "/DSC09912.jpg",
  "/DSC09915.jpg",
  "/DSC09917.jpg",
  "/DSC09918.jpg",
  "/DSC09921.jpg",
  "/DSC09923.jpg",
  "/DSC09933.jpg",
  "/DSC09935.jpg",
  "/DSC09961.jpg",
  "/DSC09970.jpg",
  "/DSC09990.jpg",
  "/DSC00048.jpg",
  "/DSC00097.jpg",
  "/DSC00115 2.jpg",
  "/DSC00117 2.jpg",
  "/DSC00170.jpg",
  "/DSC00193.jpg",
  "/DSC00200 2.jpg",
  "/DSC00215 2.jpg",
  "/DSC00222 2.jpg",
  "/DSC00277.jpg",
  "/DSC00297.jpg",
  "/DSC00298.jpg",
  "/DSC00324.jpg",
  "/DSC00343.jpg",
  "/DSC00347.jpg",
  "/DSC00380.jpg",
  "/DSC00427.jpg",
  "/DSC00431.jpg",
  "/DSC00433.jpg",
  "/DSC00491.jpg",
  "/DSC00495.jpg",
  "/DSC00525.jpg",
  "/DSC00547.jpg",
  "/DSC00557 2.jpg",
  "/DSC00557.jpg",
  "/DSC00592.jpg",
  "/DSC00618.jpg",
  "/DSC00620.jpg",
  "/DSC09728.jpg",
  "/DSC09729.jpg",
  "/DSC09730.jpg",
  "/DSC09732.jpg",
  "/DSC09734.jpg",
  "/DSC09741.jpg",
  "/DSC09745.jpg",
  "/DSC09762.jpg",
  "/DSC09763.jpg",
  "/DSC09786.jpg",
  "/DSC09790.jpg",
  "/DSC09797.jpg",
  "/DSC09799.jpg",
  "/DSC09801.jpg",
  "/DSC09807.jpg",
  "/DSC09821.jpg",
  "/DSC09870.jpg",
  "/DSC09927.jpg",
  "/DSC09979.jpg",
  "/DSC00544.jpg",
  "/DSC00320.jpg",
  "/DSC00328.jpg",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen grid place-items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/hero/fondo3.png')" }}
    >
      {/* Collage por encima del fondo */}
      <div className="absolute inset-0 z-10">
        <OverlapCollage images={IMAGES} interval={3400} feather={0.1} />
      </div>

      {/* Contenido arriba de todo */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ y, opacity }}
        >
          <Image
            src="/hero/logo.png"
            alt="Nõva Sushi"
            width={300}
            height={200}
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <a
            href="https://web.pedisy.com/n%C3%B5va-sushi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-[#e8e0cf] text-black font-medium tracking-widest hover:brightness-95 active:scale-95 transition"
            style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          >
            VER CARTA
          </a>
        </motion.div>
      </div>
    </section>
  );
}
