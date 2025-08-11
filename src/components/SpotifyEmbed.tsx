"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type SpotifyKind = "playlist" | "album" | "artist" | "track";

export default function SpotifyEmbed({
  kind = "playlist",
  id,
  height = 352,        // 152 (compact) / 352 (default)
  theme = "dark",      // "dark" | "light"
  title = "Escuchá nuestra playlist",
  rounded = "rounded-2xl",
  autoLoad = false,    // si querés que cargue sin click
}: {
  kind?: SpotifyKind;
  id: string;
  height?: number;
  theme?: "dark" | "light";
  title?: string;
  rounded?: string;
  autoLoad?: boolean;
}) {
  const [loaded, setLoaded] = useState(autoLoad);
  const src = useMemo(() => {
    const t = theme === "dark" ? 0 : 1;
    return `https://open.spotify.com/embed/${kind}/${encodeURIComponent(id)}?utm_source=generator&theme=${t}`;
  }, [kind, id, theme]);

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        className={`group w-full overflow-hidden ring-1 ring-white/10 bg-white/[0.04] ${rounded}`}
        style={{ height }}
        aria-label={title}
      >
        <div className="h-full w-full relative">
          {/* shimmer esqueletito */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              initial={{ scale: 0.98, opacity: 0.9 }}
              whileHover={{ scale: 1.0, opacity: 1 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#e8e0cf] text-black font-medium tracking-widest"
            >
              ▶️ REPRODUCIR EN SPOTIFY
            </motion.div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={`relative overflow-hidden ring-1 ring-white/10 bg-black/40 ${rounded}`}>
      <iframe
        title={title}
        src={src}
        width="100%"
        height={height}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
    